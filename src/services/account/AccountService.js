import apiClient from "services/api/ApiClient"

/**
 * Update user's first name, last name or both
 */
export const updateNameService = async(firstName, lastName) => {
    const data = {
        firstName: firstName,
        lastName: lastName,
    }
    const response = await apiClient.patch('/account/name', data);
    return response.data;
}

/**
 * Update user's password.
 */
export const updatePasswordService = async(oldPassword, newPassword) => {
    const data = {
        oldPassword: oldPassword,
        newPassword: newPassword,
    }
    const response = await apiClient.patch('/account/password', data);
    return response.data;
}

/**
 * Delete user's account
 * TODO: As it's not recommended to use request body with DELETE method,
 * we are using POST method instead. Research if there is a better approach.
 */
export const deleteAccountService = async(password) => {
    const data = {
        password: password,
    }
    const response = await apiClient.post('/account/delete', data);
    return response.data;
}