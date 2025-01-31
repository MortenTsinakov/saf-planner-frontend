import apiClient from 'services/api/ApiClient'

export const updateLabelService = async (labelId, description, color) => {
    const putData = {
        labelId: labelId,
        description: description,
        color: color,
    }
    const response = await apiClient.put('/label', putData);
    return response.data;
}