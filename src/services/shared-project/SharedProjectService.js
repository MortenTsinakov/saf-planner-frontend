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

/**
 * Comment shared project fragment
 */
export const commentFragmentService = async (fragmentId, content) => {
    const postData = {
        fragmentId: fragmentId,
        content: content,
    }
    const response = await apiClient.post('/comments', postData);
    return response.data;
}

/**
 * Edit shared project's fragment comment
 */
export const editCommentService = async (commentId, content) => {
    const putData = {
        commentId: commentId,
        content: content,
    }
    const response = await apiClient.put('/comments', putData);
    return response.data;
}

/**
 * Delete shared project's fragment comment
 */
export const deleteCommentService = async (commentId) => {
    const response = await apiClient.delete(`/comments?id=${commentId}`);
    return response.data;
}