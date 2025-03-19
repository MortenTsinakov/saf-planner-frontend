import { debounce } from "lodash";
import { useCallback, useMemo, useState } from "react";
import { searchUsersService } from "services";

export const useUser = () => {

    const [searchResults, setSearchResults] = useState([]);
    const [error, setError] = useState(null);
    
    const fetchSearchResults = useCallback(async (searchTerm) => {
        const response = searchUsersService(searchTerm);
        return response;
    }, []);


    const searchUsers = useMemo(() => {
        return debounce(async (searchTerm) => {
            if (searchTerm.trim().length < 3) {
                setSearchResults([]);
                return;
            }

            try {
                setError(null);
                const response = await fetchSearchResults(searchTerm);
                setSearchResults(response);
            } catch (err) {
                setError(err.message);
            }
        }, 500);
    }, [fetchSearchResults]);


    return {
        searchUsers,
        searchResults,
        setSearchResults,
        error,
    };
}