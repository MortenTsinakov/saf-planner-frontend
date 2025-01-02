import apiClient from 'services/api/ApiClient'

/**
 * Get all user projects
 */
export const fetchUserProjectsService = async () => {
    const response = await apiClient.get('/project');
    return response.data;
}

/**
 * Post request for creating a new project.
 */
export const createProjectService = async (title, description, estimatedLengthInSeconds) => {
    const postData = {
        title: title,
        description: description,
        estimatedLengthInSeconds: estimatedLengthInSeconds
    };

    const response = await apiClient.post('/project', postData);
    return response.data;
}

export const deleteProjectService = async (projectId) => {
    const deleteData = {
        projectId: projectId
    };
    
    const response = await apiClient.delete('/project', {data: deleteData});
    return response.data;
}