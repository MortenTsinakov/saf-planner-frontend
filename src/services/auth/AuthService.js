import { apiClient } from "services";

/**
 * Services for authentication operations.
 */
export const signInService = async (credentials) => {
    const response = await apiClient.post('/auth/sign-in', credentials);
    return response.data;
}

export const signOutService = async () => {
    await apiClient.post('/auth/sign-out');
}