import { MAIN_PAGE_ANONYMOUS } from 'constants/Constants';
import { useAuth } from "hooks";
import { Navigate, Outlet } from "react-router-dom";

/**
 * Wraps all routes that a non-signed in user
 * shouldn't see and visit (for example: projects)
 */
const ProtectedRoutes = ({ component: Component, ...rest }) => {

    const { user, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        user ? <Outlet /> : <Navigate to={`${MAIN_PAGE_ANONYMOUS}`} replace />
    );
}
 
export default ProtectedRoutes;