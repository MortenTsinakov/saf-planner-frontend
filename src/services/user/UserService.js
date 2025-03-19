import apiClient from "services/api/ApiClient"

export const searchUsersService = async (searchTerm) => {
    const response = await apiClient.get(`/user/search?query=${searchTerm}`);
    return response.data;
}