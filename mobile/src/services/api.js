import axios from 'axios';
const api = axios.create({
    baseURL: `http://192.168.100.4:3333`
});

api.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export default api;