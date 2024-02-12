import axios from "axios";
import {INSTANCE} from "../components/api/types";
import {getSubscribes} from "../components/subscribes/redux/actions";

const getInstance = () => {

    return axios.create ({
        baseURL : '/api',
        withCredentials: true,
        headers: {'Accept': 'application/json'}
    });
};

export default (() => {

    const instance = getInstance();
    const auth = (() => {

        let token = null;
        let isTfaEnabled = false;
        let tfaQrCode = null;
        let isRefreshingToken = false;
        let refreshSubscribers = [];

        return {

            setToken: (t) => {
                token = t;
            },
            getToken: () => token,
            isRefreshingToken: () => isRefreshingToken,
            setRefreshingToken: (v) => isRefreshingToken = v,
            isRefreshUrl: url => String(url).includes('/auth/refresh-tokens'), //TODO token !== null
            isTokenExpiredError: response => response.status === 401 && token !== null, //TODO token !== null
            addRefreshSubscriber: s => refreshSubscribers.push(s),
            onTokenRefreshed: t => refreshSubscribers = refreshSubscribers.filter(c => c(t)),
            checkToken: (r) => {
                if(r.data['access-token']){
                    return r.data['access-token'];
                }
                return false
            },
            checkTfa: (r) => {
                if(r.data['tfa']){
                    return r.data['tfa'];
                }
                return false
            },
            refresh: () => {
                return instance.post('/auth/refresh-tokens', {});
            },
            login: (login, password) => {
                return instance.post('/auth/login', {login,password})
                    .then(r => {
                        let authentication = false;
                        if(r.data['access-token']){
                            token = r.data['access-token'];

                            if(!r.data['tfa']){
                                authentication = true;
                            }

                            if(r.data['tfa']){
                                isTfaEnabled = true;
                                tfaQrCode = r.data['tfa_qr_code'];
                            }
                        }
                        return {authentication, isTfaEnabled, tfaQrCode};
                    });
            },
            loginTFA: (code) => {
                return instance.post('/auth/tfa', {code});
            },
            forgotTFA: () => {
                return instance.get('/auth/tfa/forgot');
            },
            isEnabledTfa: () => {

            },
            logout: () => {
                return instance.post('/auth/logout', {})
                    .then(r => {
                        token = null;
                    });
            },
        }
    })();

    instance.interceptors.request.use((config) => {
        if(auth.getToken() && String(auth.getToken()).length > 10){
            config.headers.Authorization = 'Bearer ' + auth.getToken();
        }
        return config;
    });

    instance.interceptors.response.use(r => r, (error) => {

        if(auth.isTokenExpiredError(error.response) && !auth.isRefreshUrl(error.config.url)){

            if(!auth.isRefreshingToken()){
                auth.setRefreshingToken(true);

                auth.refreshToken()
                    .then(r => {
                        if(auth.checkToken(r)){
                            auth.setToken(auth.checkToken(r));
                            auth.onTokenRefreshed(auth.getToken());
                        }
                    }).catch((e) => {
                        auth.setToken(null);
                    }).finally(() => {
                        auth.setRefreshingToken(false);
                    });

            }

            return new Promise((resolve) => {
                auth.addRefreshSubscriber((token) => {
                    error.config.headers.Authorization = 'Bearer ' + token;
                    resolve(axios(error.config));
                });
            });
        }

        return Promise.reject(error);
    });

    return {

        login: (login, password) => {
            return auth.login(login, password);
        },
        loginTFA: (code) => {
            return auth.loginTFA(code)
                .then(r => {
                    if(auth.checkToken(r)){
                        auth.setToken(auth.checkToken(r));
                        return true;
                    }
                    return false;
                });
        },
        forgotTFA: () => {
            return auth.forgotTFA();
        },
        refreshToken: () => {
            return auth.refresh()
                .then(r => {
                    if(auth.checkToken(r)){
                        auth.setToken(auth.checkToken(r));
                        return true;
                    }
                    return false;
                });
        },
        logout: () => {
            return auth.logout();
        },


        getUser: () => {
            return instance.get('/account');
        },

        getSidebarMenus: () => {
            return instance.get('/account/menus');
        },


        changePasswordCurrentUser: (o, n, c) => {
            return instance.post('/account/password', {old_password: o, password: n, password_confirmation: c})
        },
        changeEmailCurrentUser: (e) => {
            return instance.post('/account/email', {email: e})
        },

        getVideo:(pageNumber, pageSize) => {
            return instance.get(`/video?page=${pageNumber}&limit=${pageSize}`)
                .then(response => {
                    return response.data
                })
        },

        getCurrentVideo: (id) => {
            return instance.get(`/currentVideo/`+id)
                .then(response => {
                    return response.data
                })
        },

        updateVideo: (id, data) => {
            return instance.post(`/video/update/`+id, data)
                .then(response => {
                    return response.data
                })
        },

        createVideo: (data) => {
            return instance.post(`/video/create`, data)
                .then(response => {
                    return response.data
                })
        },

        deleteVideo: (id) => {
            return instance.post(`/video/delete/`+id)
                .then(response => {
                    return response.data
                })
        },

        getSubscribes: (pageNumber, pageSize) => {
            return instance.get(`/subscribe?page=${pageNumber}&limit=${pageSize}`)
                .then(response => {
                    return response.data
                })
        },

        deleteSubscribes:id => {
            return instance.post(`/subscribe/delete/`+id)
                .then(response => {
                    return response.data
                })
        },

        getExcelOrders: () => {
            return instance.get('/subscribe/export',{responseType: 'blob'});
        },


    };

})();
