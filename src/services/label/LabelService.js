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
        labelId: labelId,
        description: description,
        color: color,
    }
    const response = await apiClient.put('/label', putData);
    return response.data;
}

/**
 * Delete label from entire project
 */
export const deleteLabelService = async (labelId) => {
    const deleteData = {
        labelId: labelId
    };
    const response = await apiClient.delete('/label', {data: deleteData});
    return response.data;
}