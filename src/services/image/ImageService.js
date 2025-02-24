import apiClient from "services/api/ApiClient"

export const fetchImageService = async (imageId) => {
    const response = await apiClient.get(`images?image=${imageId}`, {
        responseType: 'blob'
    });
    return response.data;
}