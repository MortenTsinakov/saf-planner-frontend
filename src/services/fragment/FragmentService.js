import apiClient from 'services/api/ApiClient'

/**
 * Fetch all fragments for the project with the given id
 */
export const fetchFragmentsService = async (projectId) => {
    const response = await apiClient.get(`/fragment?projectId=${projectId}`);
    return response.data;
}

/**
 * Create a new fragment.
 * Parameters:
 *  shortDescription: fragment summary
 *  longDescription: detailed description of the fragment
 *  durationInSeconds: fragment duration in seconds
 *  onTimeline: whether the fragment will be displayed on timeline or not
 *  position: position where the fragment will be added
 *  projectId: project where the fragment is added
 */
export const createFragmentService = async (shortDescription, longDescription, durationInSeconds, onTimeline, position, projectId) => {
    const postData = {
        shortDescription: shortDescription,
        longDescription: longDescription,
        durationInSeconds: durationInSeconds,
        onTimeline: onTimeline,
        position: position,
        projectId: projectId,
    }
    const response = await apiClient.post('/fragment', postData);
    return response.data;
}

/**
 * Add/remove fragment to/from timeline
 */
export const updateFragmentOnTimelineStatusService = async (fragmentId, onTimeline) => {
    const putData = {
        fragmentId: fragmentId,
        onTimeline: onTimeline
    }
    const response = await apiClient.put('/fragment/on-timeline', putData);
    return response.data;
}

/**
 * Update fragment's short description
 */
export const updateFragmentShortDescriptionService = async (fragmentId, shortDescription) => {
    const putData = {
        fragmentId: fragmentId,
        shortDescription: shortDescription
    }
    const response = await apiClient.put('/fragment/short-description', putData);
    return response.data;
}

/**
 * Update fragment's long description
 */
export const updateFragmentLongDescriptionService = async (fragmentId, longDescription) => {
    const putData = {
        fragmentId: fragmentId,
        longDescription: longDescription
    }
    const response = await apiClient.put('/fragment/long-description', putData);
    return response.data;
}

/**
 * Update fragment's duration (in seconds)
 */
export const updateFragmentDurationService = async (fragmentId, durationInSeconds) => {
    const putData = {
        fragmentId: fragmentId,
        durationInSeconds: durationInSeconds
    }
    const response = await apiClient.put('/fragment/duration', putData);
    return response.data;
}

/**
 * Delete the fragment with given id.
 */
export const deleteFragmentService = async (fragmentId) => {
    const deleteData = {
        fragmentId: fragmentId
    };
    
    const response = await apiClient.delete('/fragment', {data: deleteData});
    return response.data;
}