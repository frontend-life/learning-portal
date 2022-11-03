import axios from 'axios';

export const myRequest = axios.create({
    baseURL: 'http://localhost:8000/',
    timeout: 1000
});

myRequest.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        console.log('Here will be error caching');
    }
);
