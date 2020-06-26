import axios from 'axios';
const api = axios.create({
    baseURL: `http://192.168.2.8:3333`
});

// axios.defaults.baseURL = 'http://Dominio';
// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
// axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export default api;