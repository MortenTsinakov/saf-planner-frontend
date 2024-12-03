import { useAuth } from "hooks";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = ({ component: Component, ...rest }) => {

    const { authToken } = useAuth();

    return (
        authToken ? <Outlet /> : <Navigate to='/login' replace />
    );
}
 
export default ProtectedRoutes;