import axios from "axios";
import { API_BASE_URL } from "constants/Constants";
import { useAuth } from "hooks";

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
    const { authToken } = useAuth();

    if (authToken) {
        config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

apiClient.interceptors.response.use((response) => {
    return response;
}, async (error) => {

    const { setAuthToken } = useAuth();

    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
            const response = await axios.post(`${API_BASE_URL}/auth/refresh-token`, {}, {
                withCredentials: true
            });
            const newToken = response.data.jwt;
            setAuthToken(newToken);
            apiClient.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
            return apiClient(originalRequest);
        } catch (refreshError) {
            return Promise.reject(refreshError);
        }
    }
    return Promise.reject(error);
});