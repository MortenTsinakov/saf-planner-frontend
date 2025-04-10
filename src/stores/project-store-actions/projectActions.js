import { fetchFragmentsService, fetchProjectByIdService } from 'services';

export const fetchProject = (set) => async (projectId) => {
    try {
        set({ loading: true, error: null});
        const [projectResponse, fragmentsResponse] = await Promise.all([
            fetchProjectByIdService(projectId),
            fetchFragmentsService(projectId),
        ]);
        set({ project: projectResponse, fragments: fragmentsResponse, filteredFragments: [...fragmentsResponse.filter(f => f.onTimeline)], loading: false });
    } catch (err) {
        set({ error: {message: err.response?.data?.message || "Fetching project failed", status: err.status }});
    } finally {
        set({ loading: false});
    }
}