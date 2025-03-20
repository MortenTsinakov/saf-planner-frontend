import apiClient from "services/api/ApiClient"

/**
 * Fetch project information for a shared project.
 */
export const fetchSharedProjectService = async (projectId) => {
    const response = await apiClient.get(`/projects/shared?projectId=${projectId}`);
    return response.data;
}

/**
 * Fetch fragments for a shared project.
 */
export const fetchSharedProjectFragmentsService = async (projectId) => {
    const response = await apiClient.get(`/projects/shared/fragments?projectId=${projectId}`);
    return response.data;
}

/**
 * Stop sharing project with another user
 */
export const stopSharingProjectService = async (projectId, userId) => {
    const response = await apiClient.delete(`/projects/shared?projectId=${projectId}&userId=${userId}`);
    return response.data;
}