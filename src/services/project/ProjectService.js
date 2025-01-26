import apiClient from 'services/api/ApiClient'


/**
 * GET request for fetching project with given id
 */
export const fetchProjectByIdService = async(projectId) => {
    const response = await apiClient.get(`/project?projectId=${projectId}`);
    return response.data;
}

/**
 * GET request for fetching all user projects.
 */
export const fetchUserProjectsService = async () => {
    const response = await apiClient.get('/project/all');
    return response.data;
}

/**
 * POST request for creating a new project.
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

/**
 * PUT request for updating project title
 */
export const updateProjectTitleService = async (projectId, title) => {
    const putData = {
        projectId: projectId,
        title: title,
    }

    const response = await apiClient.put('/project/title', putData);
    return response.data;
}

/**
 * PUT request for updating project description.
 */
export const updateProjectDescriptionService = async (projectId, description) => {
    const putData = {
        projectId: projectId,
        description: description,
    }

    const response = await apiClient.put('/project/description', putData);
    return response.data;
}

/**
 * PUT request for updating project's estimated length.
 */
export const updateProjectEstimatedLengthService = async (projectId, estimatedLengthInSeconds) => {
    const putData = {
        projectId: projectId,
        estimatedLengthInSeconds: estimatedLengthInSeconds,
    }

    const response = await apiClient.put('/project/estimated-length', putData);
    return response.data;
}

/**
 * Delete request for deleting a project with given id.
 */
export const deleteProjectService = async (projectId) => {
    const deleteData = {
        projectId: projectId
    };
    
    const response = await apiClient.delete('/project', {data: deleteData});
    return response.data;
}