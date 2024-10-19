import axios from 'axios';

const iAX = axios.create({
    baseURL: 'https://reqres.in/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

iAX.interceptors.request.use(
    config => {
        console.log('Intercepting request');
        // Aquí puedes modificar las cabeceras antes de enviar la solicitud
        if (config.url.includes('/users')) {
            config.headers['Authorization'] = `Bearer ${localStorage.getItem('token') || ''}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

iAX.interceptors.response.use(
    response => {
        console.log('Intercepting response:', JSON.stringify(response));

        // Aquí puedes modificar la respuesta si es necesario
        if (response.config.url.includes('/login')) {
            const token = response.data.token;
            localStorage.setItem('token', token); // Guardamos el token en localStorage
        }

        return response;
    },
    error => {
        return Promise.reject(error);
    }
);

export default iAX;