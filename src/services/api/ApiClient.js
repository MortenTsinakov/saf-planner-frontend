import axios from "axios";
import { API_BASE_URL } from "constants/Constants";

/**
 * API client.
 * Defines interceptors for providing JWT to the server
 * and refreshing the JWT once it's expired. Used in services
 * to make API calls.
 */
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
});

apiClient.interceptors.response.use((response) => {
    return response;
}, async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && localStorage.getItem('user') && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
            const response = await axios.post(`${API_BASE_URL}/auth/refresh-token`, {}, {
                withCredentials: true
            });
            localStorage.setItem('user', JSON.stringify(response.data));
            return apiClient(originalRequest);
        } catch (refreshError) {
            console.log(refreshError);
            return Promise.reject(refreshError);
        }
    }
    return Promise.reject(error);
});


export default apiClient;