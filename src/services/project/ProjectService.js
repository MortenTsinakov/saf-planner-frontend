import apiClient from 'services/api/ApiClient'


/**
 * GET request for fetching project with given id
 */
export const fetchProjectByIdService = async(projectId) => {
    const response = await apiClient.get(`/projects?id=${projectId}`);
    return response.data;
}

/**
 * GET request for fetching all user projects.
 */
export const fetchUserProjectsService = async () => {
    const response = await apiClient.get('/projects');
    return response.data;
}

/**
 * GET request for fetching all projects shared with the user.
 */
export const fetchSharedProjectsService = async () => {
    const response = await apiClient.get('/projects/shared');
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

    const response = await apiClient.post('/projects', postData);
    return response.data;
}

/**
 * PATCH request for updating project title
 */
export const updateProjectTitleService = async (projectId, title) => {
    const patchData = {
        title: title,
    }

    const response = await apiClient.patch(`/projects?id=${projectId}`, patchData);
    return response.data;
}

/**
 * PATCH request for updating project description.
 */
export const updateProjectDescriptionService = async (projectId, description) => {
    const patchData = {
        description: description,
    }

    const response = await apiClient.patch(`/projects?id=${projectId}`, patchData);
    return response.data;
}

/**
 * PATCH request for updating project's estimated length.
 */
export const updateProjectEstimatedLengthService = async (projectId, estimatedLengthInSeconds) => {
    const patchData = {
        estimatedLengthInSeconds: estimatedLengthInSeconds,
    }

    const response = await apiClient.patch(`/projects?id=${projectId}`, patchData);
    return response.data;
}

/**
 * Delete request for deleting a project with given id.
 */
export const deleteProjectService = async (projectId) => {
    const response = await apiClient.delete(`/projects?id=${projectId}`);
    return response.data;
}

/**
 * Share project with another user
 */
export const shareProjectService = async (projectId, shareWithId) => {
    const postData = {
        projectId: projectId,
        shareWithId: shareWithId,
    }
    const response = await apiClient.post('/projects/shared', postData);
    return response.data;
}