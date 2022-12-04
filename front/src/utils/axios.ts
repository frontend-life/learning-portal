import { getToken } from './auth';
import axios from 'axios';
import { NotificationSystem } from '../components/NotificationSystem/NotificationSystem';
import addNt, { addErrorNt } from './notification';

export const myRequest = axios.create({
    baseURL: 'http://localhost:8000',
    timeout: 1000
});

myRequest.interceptors.request.use(
    function (config) {
        const token = getToken();
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
        if (error.response.status === 404) {
            addErrorNt('404: Not found');
        }
        console.log('Here will be error system caching');
        // addNt({ type: 'err', description: 'response error' });
        // Do something with request error
        return Promise.reject(error.response);
    }
);
