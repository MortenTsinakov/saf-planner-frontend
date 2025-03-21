import { useCallback, useState } from "react"
import { fetchSharedProjectFragmentsService, fetchSharedProjectService } from "services";

export const useSharedProject = () => {
    const [project, setProject] = useState(null);
    const [fragments, setFragments] = useState([]);

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchSharedProject = useCallback(async (projectId) => {
        try {
            setError(null);
            setLoading(true);
            const [projectResponse, fragmentsResponse] = await Promise.all([
                        fetchSharedProjectService(projectId),
                        fetchSharedProjectFragmentsService(projectId),
                    ]);
            setProject(projectResponse);
            setFragments(fragmentsResponse);
        } catch (err) {
            setError(err.response?.data?.message || "Fetching shared project failed");
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        project,
        fragments,
        fetchSharedProject,
        error,
        setError,
        loading,
    }
}