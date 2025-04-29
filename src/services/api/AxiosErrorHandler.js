import axios from 'axios';
import { useAuth } from 'hooks';
import { useEffect } from 'react';

const AxiosErrorHandler = ({children}) => {

    const { frontendSignOut } = useAuth();

    useEffect(() => {
        const responseInterceptor = axios.interceptors.response.use(
            response => response,
            async (error) => {
                console.log(error);
                frontendSignOut();
            });

            return () => {
                axios.interceptors.response.eject(responseInterceptor);
            }
    }, [frontendSignOut]);

    return children;
}
 
export default AxiosErrorHandler;