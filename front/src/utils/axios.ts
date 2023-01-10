import { getToken } from './auth';
import axios from 'axios';
import { addErrorNt } from './notification';

const NO_TOKEN_ERROR = 'No token';
const API_PREFIX = 'api';

export const getPort = () => 3001;

export const getBaseApiUrl = () => `${getBaseUrl()}/${API_PREFIX}`;

export const getBaseUrl = () => {
    return process.env.NODE_ENV === 'production'
        ? 'https://thelabl.academy'
        : `http://localhost:${getPort()}`;
};

export const myRequest = axios.create({
    baseURL: getBaseApiUrl(),
    timeout: 10000
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

// Prefix /api added in interceptor
export const API_URLS = {
    SIGN_IN: `/user/signin`,
    SIGN_UP: `/user/signup`,
    LESSONS: `/lesson/lessons`,
    LESSON: `/lesson`,
    COURSES: `/course/courses`,
    ME: '/user/me',
    HOMEWORK: '/homework',
    CHAT: '/chat',
    MESSAGE: '/message',
    LESSON_CREATE: '/lesson/create'
};
