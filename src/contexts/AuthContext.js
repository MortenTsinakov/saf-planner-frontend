import { createContext, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInService, signOutService, signUpService } from "services";

const AuthContext = createContext();

/**
 * Hooks for signing user up, signing user in and signing user out.
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

    /**
     * Helper function for validating email format
     * @param {*} email - provided email to validate
     * @returns True if email is valid, else false
     */
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

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    /**
     * Sign user in
     */
    const signIn = useCallback( async (email, password) => {
        if (!validateEmail(email)) {
            setError("Email is not in the correct format")
            return;
        }

        if (password.length === 0) {
            setError("Password was not provided");
            return;
        }

        try {
            const user = await signInService(email, password);
            localStorage.setItem('user', JSON.stringify(user));
            setUser(user);
            setError(null);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || "Sign in failed");   
        }
    }, [navigate]);

    /**
     * Sign user out
     */
    const signOut = useCallback(async () => {
        try {
            localStorage.clear();
            setUser(null);
            await signOutService();
            setError(null);
        } catch (err) {
            setError("Please log in again");
        } finally {
            navigate("/");
        }
    }, [navigate]);

    /**
     * Register new user
     */
    const signUp = useCallback(async (email, firstName, lastName, password) => {
        if (!validateEmail(email)) {
            setError('Email is not in the correct format');
            return;
        }

        if (!firstName) {
            setError('First name is missing');
            return;
        }

        if (!lastName) {
            setError('Last name is missing');
            return;
        }

        if (!(password.length >= 8)) {
            setError('Password has to be at least 8 characters long');
            return;
        }

        try {
            const user = await signUpService(email, firstName, lastName, password);
            localStorage.setItem('user', JSON.stringify(user));
            setUser(user);
            setError(null);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || "Sign up failed");
        }
    }, [navigate]);


    const value = {
        user,
        loading,
        error,
        setError,
        signIn,
        signOut,
        signUp,
    };

    return (
        <AuthContext.Provider value={value} >
            {children}
        </AuthContext.Provider>
    )

}

export default AuthContext;