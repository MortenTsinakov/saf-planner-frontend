import { apiClient } from "services";

/**
 * Services for authentication operations.
 */
export const signInService = async (email, password) => {
    const credentials = {
        email: email,
        password: password,
    }
    const response = await apiClient.post('/auth/sign-in', credentials);
    return response.data;
}

export const signOutService = async () => {
    await apiClient.post('/auth/sign-out');
}

export const signUpService = async (email, firstName, lastName, password) => {
    const credentials = {
        email: email,
        firstName: firstName,
        lastName: lastName,
        password: password,
    }
    const response = await apiClient.post('/auth/sign-up', credentials);
    return response.data;
}