import { useCallback, useState } from 'react'
import { createFragmentService, deleteFragmentService, fetchFragmentsService, updateFragmentOnTimelineStatusService } from 'services';

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

    const incrementFragmentPositions = useCallback((prev, position) => {
        prev.forEach(f => {
            if (f.position >= position) {
                f.position += 1;
            }
        });
        return prev;
    }, []);

    const decrementFragmentPositions = useCallback((prev, position) => {
        prev.forEach(f => {
            if (f.position >= position) {
                f.position -= 1;
            }
        });
        return prev;
    }, []);

    /**
     * Create new fragment
     */
    const createFragment = useCallback(async (shortDescription, longDescription, durationInSeconds, onTimeline, position, projectId) => {
        try {
            setError(null);
            const response = await createFragmentService(shortDescription, longDescription, durationInSeconds, onTimeline, position, projectId);
            setFragments(prev => [...incrementFragmentPositions(prev, position)]);
            setFragments(prev => [...prev, response].sort((a, b) => {return a.position - b.position}));
            return true;
        } catch (err) {
            setError(err.response?.data?.message || "Creating fragment failed");
            return false;
        }
    }, [incrementFragmentPositions]);

    /**
     * Update fragment on timeline status
     */
    const updateFragmentOnTimelineStatus = useCallback(async (fragment, onTimeline) => {
        try {
            setError(null);
            const response = await updateFragmentOnTimelineStatusService(fragment.id, onTimeline);
            setFragments(f => f.map((item) => (item.id === fragment.id ? response : item)));
        } catch (err) {
            setError(err.response?.data?.message || "Updating fragment failed");
        }
    }, []);

    /**
     * Delete fragment.
     * Return true if fragment was successfully deleted, else false.
     */
    const deleteFragment = useCallback(async (fragment) => {
        try {
            setError(null);
            await deleteFragmentService(fragment.id);
            setFragments(prev => decrementFragmentPositions(prev.filter((f) => f.id !== fragment.id), fragment.position));
            return true;
        } catch (err) {
            setError(err.response?.data?.message || "Deleting fragment failed");
            return false;
        }
    }, [decrementFragmentPositions]);

    return {
        fragments,
        fetchFragments,
        createFragment,
        updateFragmentOnTimelineStatus,
        deleteFragment,
        loading,
        error,
        setError,
    };
}