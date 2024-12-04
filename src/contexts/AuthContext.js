import { createContext, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInService, signOutService } from "services";

const AuthContext = createContext();

/**
 * Hooks for signing user in and signing user out.
 * Provides information about the user.
 */
export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const isValid = String(email)
                            .toLowerCase()
                            .match(
                                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                            );
        if (!isValid) {
            return false;
        }
        return true;
    };

    const validatePassword = (password) => {
        if (!password.length > 0) {
            return false;
        }
        return true;
    };

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const signIn = useCallback( async (e, credentials) => {
        e.preventDefault();

        const validateCredentials = (credentials) => {
            const email = credentials.email;
            const password = credentials.password;
            return (
                validateEmail(email) &&
                validatePassword(password)
            );
        };

        if (!validateCredentials(credentials)) {
            setError("Sign in failed: please check your credentials");
            return;
        }
        try {
            const user = await signInService(credentials);
            localStorage.setItem('user', JSON.stringify(user));
            setUser(user);
            navigate('/');
        } catch (err) {
            setError(err);   
        }
    }, [navigate]);

    const signOut = useCallback(async () => {
        try {
            await signOutService();
            localStorage.removeItem('user');
            setUser(null);
            navigate('/');
        } catch (err) {
            setError(err);
        }
    }, [navigate]);


    const value = {
        user,
        loading,
        error,
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