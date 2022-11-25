import { getToken } from './auth';
import axios from 'axios';
import { NotificationSystem } from '../components/NotificationSystem/NotificationSystem';

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
        return response.data;
    },
    (error) => {
        console.log('Here will be error caching');
        NotificationSystem.allInstances.forEach((instance) => {
            console.log(instance);
            const id = instance.state.notifications.length
                ? (instance.state.notifications[
                      instance.state.notifications.length - 1
                  ]?.id || 0) + 1
                : 1;
            console.log(id);

            instance.addNotification({
                id,
                type: 'err',
                description: 'Auth error'
            });
        });
        // Do something with request error
        return Promise.reject(error.response);
    }
);
