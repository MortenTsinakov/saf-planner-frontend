import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [authToken, setAuthToken] = useState(null);
    const navigate = useNavigate();

    const signIn = (token) => {
        setAuthToken(token);
    }

    const signOut = () => {
        setAuthToken(null);
        navigate('/');
    }

    const value = {
        authToken,
        setAuthToken,
        signIn,
        signOut,
    };

    return (
        <AuthContext.Provider value={value} >
            {children}
        </AuthContext.Provider>
    )

}

export default AuthContext;