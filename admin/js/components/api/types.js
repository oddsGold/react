import axios from "axios";

export const INSTANCE = axios.create({
    baseURL: '/api',
    withCredentials: true,
    headers: {'Accept': 'application/json'}
});
