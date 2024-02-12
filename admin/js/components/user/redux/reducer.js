import {
    CLEAR_AUTHENTICATION,
    CLEAR_PASSWORD_FORM, DISABLED_EMAIL_FORM_ERRORS,
    DISABLED_EMAIL_FORM_FIELD_ERROR,
    DISABLED_PASSWORD_FORM_ERRORS,
    DISABLED_PASSWORD_FORM_FIELD_ERROR,
    DISABLED_TFA_AUTHENTICATION,
    ENABLED_EMAIL_FORM_FIELD_ERROR,
    ENABLED_PASSWORD_FORM_FIELD_ERROR,
    ENABLED_TFA_AUTHENTICATION,
    HIDE_EMAIL_FORM,
    HIDE_PASSWORD_FORM,
    SET_AUTHENTICATION_USER,
    SET_EMAIL_FORM_FIELD,
    SET_PASSWORD_FORM_FIELD,
    SET_TFA_QR_CODE,
    SHOW_EMAIL_FORM,
    SHOW_PASSWORD_FORM,
    SUCCESSFUL_AUTHENTICATION,
    TRIED_REFRESH_AUTHENTICATION
} from "./types";

const initialState = {
    authenticated: false,
    triedToRefreshAuthenticated: false,
    tfa: false,
    tfaQrCode: null,
    login: null,
    email: null,
    role: null,
    forms: {
        email: {
            data: {email: {value: '', error: false}},
            show: false
        },
        password: {
            data: {
                old_password: {value: '', error: false},
                password: {value: '', error: false},
                password_confirmation: {value: '', error: false}
            },
            show: false
        }
    }
};

export default (state = initialState, {type, payload}) => {

    switch (type) {

        case SUCCESSFUL_AUTHENTICATION:
            return {...state, authenticated: true};

        case CLEAR_AUTHENTICATION:
            return {...state, authenticated: false};

        case TRIED_REFRESH_AUTHENTICATION:
            return {...state, triedToRefreshAuthenticated: true};

        case SET_AUTHENTICATION_USER:
            return {
                ...state,
                login: payload.login,
                email: payload.email,
                role: payload.role,
            };

        case ENABLED_TFA_AUTHENTICATION:
            return {...state, tfa: true};

        case DISABLED_TFA_AUTHENTICATION:
            return {...state, tfa: false};

        case SET_TFA_QR_CODE:
            return {...state, tfaQrCode: payload};

        case CLEAR_PASSWORD_FORM:
            return {
                ...state,
                forms: {
                    ...state.forms,
                    password: {
                        ...state.forms.password,
                        data: {
                            old_password: {value: '', error: false},
                            password: {value: '', error: false},
                            password_confirmation: {value: '', error: false}
                        }
                    }
                }
            };


        case SET_PASSWORD_FORM_FIELD:
            return {
                ...state,
                forms: {
                    ...state.forms,
                    password: {
                        ...state.forms.password,
                        data: {
                            ...state.forms.password.data,
                            [payload.name]: {
                                ...state.forms.password.data[payload.name],
                                value: payload.value
                            }
                        }
                    }
                }
            };

        case SET_EMAIL_FORM_FIELD:
            return {
                ...state,
                forms: {
                    ...state.forms,
                    email: {
                        ...state.forms.email,
                        data: {
                            ...state.forms.email.data,
                            [payload.name]: {
                                ...state.forms.email.data[payload.name],
                                value: payload.value
                            }
                        }
                    }
                }
            };

        case ENABLED_PASSWORD_FORM_FIELD_ERROR:
            return {
                ...state,
                forms: {
                    ...state.forms,
                    password: {
                        ...state.forms.password,
                        data: {
                            ...state.forms.password.data,
                            [payload]: {
                                ...state.forms.password.data[payload],
                                error: true
                            }
                        }
                    }
                }
            };

        case DISABLED_PASSWORD_FORM_FIELD_ERROR:
            return {
                ...state,
                forms: {
                    ...state.forms,
                    password: {
                        ...state.forms.password,
                        data: {
                            ...state.forms.password.data,
                            [payload]: {
                                ...state.forms.password.data[payload],
                                error: false
                            }
                        }
                    }
                }
            };

        case ENABLED_EMAIL_FORM_FIELD_ERROR:
            return {
                ...state,
                forms: {
                    ...state.forms,
                    email: {
                        ...state.forms.email,
                        data: {
                            ...state.forms.email.data,
                            [payload]: {
                                ...state.forms.email.data[payload],
                                error: true
                            }
                        }
                    }
                }
            };

        case DISABLED_EMAIL_FORM_FIELD_ERROR:
            return {
                ...state,
                forms: {
                    ...state.forms,
                    email: {
                        ...state.forms.email,
                        data: {
                            ...state.forms.email.data,
                            [payload]: {
                                ...state.forms.email.data[payload],
                                error: false
                            }
                        }
                    }
                }
            };

        case DISABLED_PASSWORD_FORM_ERRORS:
            return {
                ...state,
                forms: {
                    ...state.forms,
                    email: {
                        ...state.forms.password,
                        data: {
                            old_password: {...state.forms.password.data.old_password, error: false},
                            password: {...state.forms.password.data.password, error: false},
                            password_confirmation: {...state.forms.password.data.password_confirmation, error: false}
                        }
                    }
                }
            };

        case DISABLED_EMAIL_FORM_ERRORS:
            return {
                ...state,
                forms: {
                    ...state.forms,
                    email: {
                        ...state.forms.email,
                        data: {
                            email: {...state.forms.email.data.email, error: false}
                        }
                    }
                }
            };

        case SHOW_PASSWORD_FORM:
            return {
                ...state,
                forms: {
                    ...state.forms,
                    password: {
                        ...state.forms.password,
                        show: true
                    }
                }
            };

        case HIDE_PASSWORD_FORM:
            return {
                ...state,
                forms: {
                    ...state.forms,
                    password: {
                        ...state.forms.password,
                        show: false
                    }
                }
            };

        case SHOW_EMAIL_FORM:
            return {
                ...state,
                forms: {
                    ...state.forms,
                    password: {
                        ...state.forms.password,
                        show: true
                    }
                }
            };

        case HIDE_EMAIL_FORM:
            return {
                ...state,
                forms: {
                    ...state.forms,
                    email: {
                        ...state.forms.email,
                        show: true
                    }
                }
            };


        default: return state;
    }
};
