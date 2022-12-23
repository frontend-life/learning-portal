import { getToken } from './auth';
import axios from 'axios';
import { addErrorNt } from './notification';

const NO_TOKEN_ERROR = 'No token';

export const getPort = () => 3001;

export const getBaseUrl = () =>
    process.env.NODE_ENV === 'production'
        ? ''
        : `http://localhost:${getPort()}`;

export const myRequest = axios.create({
    baseURL: getBaseUrl(),
    timeout: 1000
});

myRequest.interceptors.request.use(
    function (config) {
        const token = getToken();
        if (
            !token &&
            ![API_URLS.SIGN_IN, API_URLS.SIGN_UP].includes(config.url as string)
        ) {
            throw new Error(NO_TOKEN_ERROR);
        }
        config.headers = {
            ...config.headers,
            Authorization: `Bearer ${token}`
        };
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

myRequest.interceptors.response.use(
    (response) => {
        console.group(response.config.url);
        console.log(response.data);
        console.groupEnd();
        return response.data;
    },
    (error) => {
        console.log(error);
        if (error.message === NO_TOKEN_ERROR) {
            return Promise.reject(error.message);
        }
        if (error.response.status === 404) {
            addErrorNt('404: Not found');
        }
        console.log('Here will be error system caching');
        // addNt({ type: 'err', description: 'response error' });
        // Do something with request error
        return Promise.reject(error.response);
    }
);

export const API_URLS = {
    SIGN_IN: '/user/signin',
    SIGN_UP: '/user/signup'
};
