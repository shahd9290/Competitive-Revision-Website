import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/',
    timeout: 1000,
    headers: {'Content-Type': 'application/json'},
    withCredentials: true
});

axiosInstance.interceptors.request.use(
    config => {
        if (typeof window !== 'undefined') {
            const expiry = document.cookie
            .split('; ')
            .find(row => row.startsWith("tokenExpiry="))
            ?.split('=')[1];

            if (expiry) {
                console.log("expiry");
            }
        }
        return config;
    },
   error => {return Promise.reject(error);}
);

axiosInstance.interceptors.response.use(
    response => response,
    error => {
        if (error.response.status === 401) {
            window.location.href = '/login'
        }
    }
)

export default axiosInstance