import apiClient from "services/api/ApiClient"

export const fetchImageService = async (imageId) => {
    const response = await apiClient.get(`/images?image=${imageId}`, {
        responseType: 'blob'
    });
    return response.data;
}

export const uploadImageService = async (fragmentId, file) => {
    const formData = new FormData();
    formData.append("fragmentId", fragmentId);
    formData.append("image", file);

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