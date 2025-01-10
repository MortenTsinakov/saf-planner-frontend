import { useCallback, useState } from 'react'
import { fetchFragmentsService, updateFragmentOnTimelineStatusService } from 'services';

export const useFragments = () => {
    const [fragments, setFragments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    /**
     * Fetch all fragments for a project with given id
     */
    const fetchFragments = useCallback(async (projectId) => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetchFragmentsService(projectId);
            setFragments(response);
        } catch (err) {
            setError(err.response?.data?.messsage || "Fetch fragments failed");
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Create new fragment
     */
    const createFragment = useCallback(async () => {
        try {
            setError(null);
        } catch (err) {
            setError(err.response?.data?.message || "Creating fragment failed");
        }
    }, []);

    /**
     * Update fragment on timeline status
     */
    const updateFragmentOnTimelineStatus = useCallback(async (fragmentId, onTimeline) => {
        try {
            setError(null);
            const response = await updateFragmentOnTimelineStatusService(fragmentId, onTimeline);
            setFragments(f => f.map((item) => (item.id === fragmentId ? response : item)));
        } catch (err) {
            setError(err.response?.data?.message || "Updating fragment failed");
        }
    }, []);

    return {
        fragments,
        fetchFragments,
        updateFragmentOnTimelineStatus,
        loading,
        error,
        setError,
    };
}