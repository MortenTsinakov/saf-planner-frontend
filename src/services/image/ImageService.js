import apiClient from "services/api/ApiClient"

export const fetchImageService = async (imageId) => {
    const response = await apiClient.get(`/images?image=${imageId}`, {
        responseType: 'blob'
    });
    return response.data;
}

export const fetchSharedProjectImageService = async (projectId, imageId) => {
    const response = await apiClient.get(`/images/shared?projectId=${projectId}&image=${imageId}`, {
        responseType: 'blob'
    });
    return response.data;
}

export const uploadImageService = async (fragmentId, file, description) => {
    const formData = new FormData();
    formData.append("fragmentId", fragmentId);
    formData.append("image", file);
    formData.append("description", description)

    const response = await apiClient.post("/images", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return response.data;
}

export const deleteImageService = async (imageId) => {
    const response = await apiClient.delete(`/images?image=${imageId}`);
    return response.data;
}