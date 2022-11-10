import axios from 'axios';

export const myRequest = axios.create({
    baseURL: 'http://localhost:8000/',
    timeout: 1000
});

myRequest.interceptors.request.use(
    function (config) {
        const token = localStorage.getItem('token');
        config.headers = {
            ...config.headers,
            'Authorization': `Bearer ${token}`
        }
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
    }
);
