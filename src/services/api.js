import axios from 'axios';

const api = axios.create({
    baseURL: 'https://twitter-chat.herokuapp.com/',
    // baseURL: 'http://192.168.1.124:3000',
});

export default api;