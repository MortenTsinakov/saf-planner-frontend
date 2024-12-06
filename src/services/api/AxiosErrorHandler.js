import axios from 'axios';
import { useAuth } from 'hooks';
import { useEffect } from 'react';

const AxiosErrorHandler = ({children}) => {

    const { signOut } = useAuth();

    useEffect(() => {
        const responseInterceptor = axios.interceptors.response.use(
            response => response,
            async (error) => {
                console.log(error);
                signOut();
            });

            return () => {
                axios.interceptors.response.eject(responseInterceptor);
            }
    }, [signOut]);

    return children;
}
 
export default AxiosErrorHandler;