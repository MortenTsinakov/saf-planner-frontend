import { MAIN_PAGE_PROTECTED } from 'constants/Constants';
import { useAuth } from "hooks";
import { Navigate, Outlet } from "react-router-dom";

/**
 * Wraps all routes that the signed-in user shouldn't
 * see and visit (for example: sign-in page)
 */
const AnonymousRoutes = ({ component: Component, ...rest }) => {

    const { user, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        !user ? <Outlet /> : <Navigate to={`${MAIN_PAGE_PROTECTED}`} replace />
    );
}
 
export default AnonymousRoutes;