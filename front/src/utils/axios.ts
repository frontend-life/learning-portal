import axios from 'axios';

const myRequest = axios.create({
    baseURL: 'http://localhost:8000/',
    timeout: 1000
});

export const post = myRequest.post;
export const get = myRequest.get;
