import { useCallback, useState } from 'react';
import { fetchUserProjectsService } from 'services';

export const useProjects = () => {

    const [userProjects, setUserProjects] = useState([]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchUserProjects = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetchUserProjectsService();
            setUserProjects(response);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        fetchUserProjects,
        userProjects,
        loading,
        error,
        setError,
    };

}