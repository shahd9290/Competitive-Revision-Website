import axios from 'axios';
import exp from 'constants';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/',
    timeout: 1000,
    headers: {'Content-Type': 'application/json'},
    withCredentials: true
});

axiosInstance.interceptors.request.use(
    config => {
        // Skips interception if request is to refresh the token
        if (config.url !== config.baseURL + 'api/refresh/refresh-token' && typeof window !== 'undefined') {
            const expiry = document.cookie
            .split('; ')
            .find(row => row.startsWith("tokenExpiry="))
            ?.split('=')[1];

            if (expiry) {
                // Compare expiry epoch against the current time (converted to seconds)
                var now = Math.floor(Date.now()/ 1000)
                console.log (Number(expiry) < now)
                if (Number(expiry) < now) {
                    const confirm = axios.post(config.baseURL + 'api/refresh/refresh-token', {withCredentials: true})
                }
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