import apiClient from 'services/api/ApiClient'

export const fetchUserProjectsService = async () => {
    const response = await apiClient.get('/project');
    return response.data;
}