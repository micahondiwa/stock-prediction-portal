import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_BASE_API
const axiosInstance = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Request interceptor
axiosInstance.interceptors.request.use(
    function (config) {
        const accessToken = localStorage.getItem('accessToken')
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
)

// Response Interceptors
axiosInstance.interceptors.response.use(
    function (response) {
        return response;
    },
    // handle failed responses 
    async function (error) {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest.retry) {
            originalRequest.retry = true;
            const refreshToken = localStorage.getItem('refreshToken');
            try {
                const response = await axiosInstance.post('/token/refresh', { refresh: refreshToken })
                console.log('New access token==>', response.data.acess)
                localStorage.setItem('accessToken', response.data.acess)
                originalRequest.headers['Authorization'] = `Bearer ${response.data.acess}`
                return axiosInstance(originalRequest)
            } catch (error) {
                localStorage.removeItem('accessToken')
                localStorage.removeItem('refreshToken')
            }
        }
        return Promise.reject(error);
    }
)
export default axiosInstance;