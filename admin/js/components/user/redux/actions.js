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
    SET_PASSWORD_FORM_FIELD,
    SET_TFA_QR_CODE,
    SHOW_EMAIL_FORM,
    SHOW_PASSWORD_FORM,
    SUCCESSFUL_AUTHENTICATION,
    TRIED_REFRESH_AUTHENTICATION
} from "./types";
import {startFetching, stopFetching} from "../../settings/redux/actions";
import API from "../../../utils/API";
import {Notification} from "../../../utils/Notification";

export const triedRefreshAuthentication = () => ({type: TRIED_REFRESH_AUTHENTICATION});
export const successfulAuthentication = () => ({type: SUCCESSFUL_AUTHENTICATION});
export const clearAuthentication = () => ({type: CLEAR_AUTHENTICATION});

export const setAuthUser = (login, email, role) => ({type: SET_AUTHENTICATION_USER, payload: {login, email, role}});
export const enabledTfaAuthentication = () => ({type: ENABLED_TFA_AUTHENTICATION});
export const disabledTfaAuthentication = () => ({type: DISABLED_TFA_AUTHENTICATION});
export const setTfaQrCode = (code) => ({type: SET_TFA_QR_CODE, payload: code});
export const clearTfaQrCode = () => (dispatch) => dispatch(setTfaQrCode(null));

export const clearPasswordForm = () => ({type: CLEAR_PASSWORD_FORM});
export const showPasswordForm = () => ({type: SHOW_PASSWORD_FORM});
export const hidePasswordForm = () => ({type: HIDE_PASSWORD_FORM});
export const showEmailForm = () => ({type: SHOW_EMAIL_FORM});
export const hideEmailForm = () => ({type: HIDE_EMAIL_FORM});

export const enabledPasswordFormFieldError = (name) => ({type: ENABLED_PASSWORD_FORM_FIELD_ERROR, payload: name});
export const disabledPasswordFormFieldError = (name) => ({type: DISABLED_PASSWORD_FORM_FIELD_ERROR, payload: name});
export const disabledPasswordFormErrors = () => ({type: DISABLED_PASSWORD_FORM_ERRORS});
export const disabledEmailFormErrors = () => ({type: DISABLED_EMAIL_FORM_ERRORS});
export const enabledEmailFormFieldError = (name) => ({type: ENABLED_EMAIL_FORM_FIELD_ERROR, payload: name});
export const disabledEmailFormFieldError = (name) => ({type: DISABLED_EMAIL_FORM_FIELD_ERROR, payload: name});

export const setPasswordFormField = (name, value) => {
    return (dispatch, getState) => {
        const {user} = getState();
        const {data} = user.forms.password;
        if(typeof data[name] !== 'undefined'){
            if(data[name].value !== value){
                dispatch({type: SET_PASSWORD_FORM_FIELD, payload: {name, value}});
            }
        }
    };
};

export const setEmailFormField = (name, value) => {
    return (dispatch, getState) => {
        const {user} = getState();
        const {data} = user.forms.email;
        if(typeof data[name] !== 'undefined'){
            if(data[name].value !== value){
                dispatch({type: SET_PASSWORD_FORM_FIELD, payload: {name, value}});
            }
        }
    };
};

export const login = (login, password) => {
    return async (dispatch, getState) => {

        const {user} = getState();
        const {authenticated} = user;

        dispatch(startFetching());

        try {
            const auth = await API.login(login, password);
            if(auth.authentication){
                dispatch(successfulAuthentication());
                dispatch(clearTfaQrCode());
                dispatch(disabledTfaAuthentication());
            }

            if(!auth.authentication && auth.isTfaEnabled){
                dispatch(enabledTfaAuthentication());
                if(auth.tfaQrCode){
                    dispatch(setTfaQrCode(auth.tfaQrCode));
                }
            }

        } catch (e) {
            if(authenticated){
                dispatch(clearAuthentication())
            }
        }

        dispatch(stopFetching());
    }
};

export const loginTFA = (code) => {
    return async (dispatch, getState) => {

        const {user} = getState();
        const {authenticated} = user;

        dispatch(startFetching());

        try {
            const authentication = await API.loginTFA(code);
            if(authentication){
                dispatch(successfulAuthentication());
                dispatch(clearTfaQrCode());
                dispatch(disabledTfaAuthentication());
            }
        } catch (e) {
            if(authenticated){
                dispatch(clearAuthentication())
            }
        }

        dispatch(stopFetching());
    }
};

export const refreshAuthentication = () => {
    return async (dispatch, getState) => {

        const {user} = getState();
        const {authenticated} = user;

        dispatch(startFetching());

        try {
            const authentication = await API.refreshToken();
            dispatch(stopFetching());
            if(authentication){
                await dispatch(successfulAuthentication());
            }
        } catch (e) {
            dispatch(stopFetching());
            if(authenticated){
                dispatch(clearAuthentication())
            }
        }
        await dispatch(triedRefreshAuthentication());
        //dispatch(stopFetching());
    }
};

export const fetchUser = () => {
    return async (dispatch) => {

        dispatch(startFetching());
        try {
            const response = await API.getUser();
            if(response && response.data && response.data.data && response.status === 200){
                dispatch(setAuthUser(
                    response.data.data.login,
                    response.data.data.email,
                    response.data.data.role.name
                ));

            }
        } catch (e) {

        }
        dispatch(stopFetching());
    };
};

export const logout = () => {
    return async (dispatch) => {

        dispatch(startFetching());
        try {
            await API.logout();
        } catch (e) {

        }
        await dispatch(clearAuthentication());
        dispatch(stopFetching());
    }
};

export const forgotTFA = () => {
    return async (dispatch) => {
        dispatch(startFetching());
        try {
            await API.forgotTFA();
        } catch (e) {

        }
        dispatch(stopFetching());
    }
};

export const changePassword = (o, n, c) => {
    return async (dispatch) => {
        dispatch(startFetching());
        try {
            const response = await API.changePasswordCurrentUser(o, n, c);
            if(response && response.status === 200){
                dispatch(clearPasswordForm());
                dispatch(hidePasswordForm());
                Notification.success(null, 'Пароль успешно изменен')
            }
        } catch (e) {
            if(e.response && e.response.status === 422 && e.response.data && e.response.data.errors){
                const errors = e.response.data.errors;
                dispatch(disabledPasswordFormErrors());
                for(let i in errors){
                    enabledPasswordFormFieldError(i);
                    Notification.error(null, errors[i][0]);
                }
            }
        }
        dispatch(stopFetching());
    }
};

export const changeEmail = (e) => {
    return async (dispatch) => {
        dispatch(startFetching());
        try {
            const response = await API.changeEmailCurrentUser(e);
            if(response && response.status === 200){
                Notification.success(null, 'Email успешно изменен')
            }
        } catch (e) {
            if(e.response && e.response.status === 422 && e.response.data && e.response.data.errors){
                const errors = e.response.data.errors;
                dispatch(disabledEmailFormErrors());
                for(let i in errors){
                    enabledEmailFormFieldError(i);
                    Notification.error(null, errors[i][0]);
                }
            }
        }
        dispatch(stopFetching());
    }
}
