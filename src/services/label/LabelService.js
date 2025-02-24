import apiClient from 'services/api/ApiClient'

/**
 * Create new label
 */
export const createLabelService = async (projectId, description, color) => {
    const postData = {
        projectId: projectId,
        description: description,
        color: color,
    }
    const response = await apiClient.post('/label', postData);
    return response.data;
}

/**
 * Update existing label
 */
export const updateLabelService = async (labelId, description, color) => {
    const putData = {
        description: description,
        color: color,
    }
    const response = await apiClient.put(`/label?id=${labelId}`, putData);
    return response.data;
}

/**
 * Delete label from entire project
 */
export const deleteLabelService = async (labelId) => {
    const response = await apiClient.delete(`/label?id=${labelId}`);
    return response.data;
}

/**
 * Attach label to fragment
 */
export const attachLabeltoFragmentService = async (labelId, fragmentId) => {
    const postData = {
        labelId: labelId,
        fragmentId: fragmentId,
    }
    const response = await apiClient.post('/fragment/label', postData);
    return response.data;
}

/**
 * Attach several labels to fragment
 */
export const attachLabelsToFragmentService = async (labelIds, fragmentId) => {
    const postData = {
        labelIds: labelIds,
        fragmentId: fragmentId,
    }
    const response = await apiClient.post('/fragment/labels', postData);
    return response.data;
}

/**
 * Remove label from fragment
 */
export const removeLabelFromFragmentService = async (labelId, fragmentId) => {
    const response = await apiClient.delete(`/fragment/label?labelId=${labelId}&fragmentId=${fragmentId}`);
    return response.data;
}