import apiClient from "services/api/ApiClient"

/**
 * Fetch screenplay for a project
 */
export const fetchScreenplayService = async(projectId) => {
    const response = await apiClient.get(`/screenplays?projectId=${projectId}`);
    return response.data;
}

/**
 * Create a new screenplay for the project
 */
export const createScreenplayService = async(projectId, content) => {
    const postData = {
        projectId: projectId,
        content: content,
    }

    const response = await apiClient.post("/screenplays", postData);
    return response.data;
}

/**
 * Update screenplay with given id
 */
export const updateScreenplayService = async(id, content) => {
    const putData = {
        id: id,
        content: content,
    }

    const response = await apiClient.put("/screenplays", putData);
    return response.data;
}

/**
 * Delete screenplay with given id
 */
export const deleteScreenplayService = async(id) => {
    const response = await apiClient.delete(`/screenplays?id=${id}`);
    return response.data;
}

/**
 * Download PDF file of the script with given id
 */
export const downloadScreenplayAsPDFService = async (id) => {
    const response = await apiClient.get(`/screenplays/export?id=${id}`, {
        responseType: 'blob'
    });
    return response.data;
}