import apiClient from 'services/api/ApiClient'

export const fetchFragmentsService = async (projectId) => {
    const response = await apiClient.get(`/fragment?projectId=${projectId}`);
    return response.data;
}

export const updateFragmentOnTimelineStatusService = async (fragmentId, onTimeline) => {
    const putData = {
        fragmentId: fragmentId,
        onTimeline: onTimeline
    }
    const response = await apiClient.put('/fragment/on-timeline', putData);
    return response.data;
}