import axios, { AxiosError } from 'axios';
import Cookies from 'js-cookie';

// Cliente axios configurado
export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Interceptor para agregar el token a todas las peticiones
api.interceptors.request.use((config) => {
   const token = Cookies.get('auth-token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});


api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        // Si es 401, redirigir a login
        if (error.response?.status === 401) {
            Cookies.remove('auth-token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);