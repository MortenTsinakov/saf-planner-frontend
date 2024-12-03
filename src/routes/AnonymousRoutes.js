import { useAuth } from "hooks";
import { Navigate, Outlet } from "react-router-dom";

const AnonymousRoutes = ({ component: Component, ...rest }) => {

    const { authToken } = useAuth();

    return (
        !authToken ? <Outlet /> : <Navigate to='/dashboard' replace />
    );
}
 
export default AnonymousRoutes;