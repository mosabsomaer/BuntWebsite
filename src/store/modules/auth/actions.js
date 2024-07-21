import Axios from 'axios';
import SignupValidations from '../../../services/SignupValidations';
import {
    AUTH_ACTION,
    LOGIN_ACTION,
    AUTO_LOGIN_ACTION,
    LOGOUT_ACTION,
    SET_USER_TOKEN_DATA_MUTATION,
 
    AUTO_LOGOUT_ACTION,
    SET_AUTO_LOGOUT_MUTATION,
} from '../../storeconstants';
import { useFilesStore } from '@/stores/files';
let timer = '';
export default {
    [LOGOUT_ACTION](context) {
        context.commit(SET_USER_TOKEN_DATA_MUTATION, {
            username: null,
            token: null,
            expiresIn: null,
            refreshToken: null,
            userId: null,
        });
        localStorage.removeItem('userData');
        if (timer) {
            clearTimeout(timer);
        }
    },

    [AUTO_LOGOUT_ACTION](context) {
        context.dispatch(LOGOUT_ACTION);
        context.commit(SET_AUTO_LOGOUT_MUTATION);
    },

    async [LOGIN_ACTION](context, payload) {
        return context.dispatch(AUTH_ACTION, {
            ...payload,
            url: useFilesStore().server_link + "/api/auth/login",
        });
    },

    [AUTO_LOGIN_ACTION](context) {
        let userDataString = localStorage.getItem('userData');

        if (userDataString) {
            let userData = JSON.parse(userDataString);
            let expirationTime = userData.expiresIn - new Date().getTime();

            if (expirationTime < 10000) {
                context.dispatch(AUTO_LOGOUT_ACTION);
            } else {
                timer = setTimeout(() => {
                    context.dispatch(AUTO_LOGOUT_ACTION);
                }, expirationTime);
            }

            context.commit(SET_USER_TOKEN_DATA_MUTATION, userData);
        }
    },

    async [AUTH_ACTION](context, payload) {
        
        let postData = {
            username: payload.username,
            password: payload.password,
            returnSecureToken: true,
        };
        let response = '';
        try {
            response = await Axios.post(payload.url, postData);
        } catch (err) {
      
            let errorMessage = SignupValidations.getErrorMessageFromCode(
                err.response.data.message,
            );
            throw errorMessage;
        }
        localStorage.setItem('token', response.data.token);
        
        if (response.status === 200) {
            let expirationTime = +response.data.expiresIn * 1000;

            timer = setTimeout(() => {
                context.dispatch(AUTO_LOGOUT_ACTION);
            }, expirationTime);

            let tokenData = {
                username: response.data.username,
                token: response.data.idToken,
                expiresIn: expirationTime,
                refreshToken: response.data.refreshToken,
                userId: response.data.localId,
            };
            localStorage.setItem('userData', JSON.stringify(tokenData));
            context.commit(SET_USER_TOKEN_DATA_MUTATION, tokenData);
        }
    },
};
