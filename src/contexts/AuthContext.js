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
            setError("Sign in failed: incorrect email format")
            return;
        }

        if (password.length === 0) {
            setError("Sign in failed: password not provided");
            return;
        }

        try {
            const user = await signInService(email, password);
            localStorage.setItem('user', JSON.stringify(user));
            setUser(user);
            setError(null);
            navigate('/');
        } catch (err) {
            setError(err.response.data.message);   
        }
    }, [navigate]);

    /**
     * Sign user out
     */
    const signOut = useCallback(async () => {
        try {
            await signOutService();
            localStorage.removeItem('user');
            setUser(null);
            setError(null);
            navigate('/');
        } catch (err) {
            setError(err.response.data.message || "Sign out failed");
        }
    }, [navigate]);

    /**
     * Register new user
     */
    const signUp = useCallback(async (email, firstName, lastName, password) => {
        if (!validateEmail(email)) {
            setError('Sign up failed: Email is not in the correct format');
            return;
        }

        if (!firstName) {
            setError('Sign up failed: First name is missing');
            return;
        }

        if (!lastName) {
            setError('Sign up failed: Last name is missing');
            return;
        }

        if (!(password.length >= 8)) {
            setError('Sign up failed: Password has to be at least 8 characters long');
            return;
        }

        try {
            const user = await signUpService(email, firstName, lastName, password);
            localStorage.setItem('user', JSON.stringify(user));
            setUser(user);
            setError(null);
            navigate('/');
        } catch (err) {
            setError(err.response.data.message || "Sign up failed");
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