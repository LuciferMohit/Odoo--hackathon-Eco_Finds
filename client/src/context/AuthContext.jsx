// In client/src/context/AuthContext.jsx

import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const storeToken = (token) => {
        localStorage.setItem('authToken', token);
    };

    const authenticateUser = async () => {
        const storedToken = localStorage.getItem('authToken');

        if (storedToken) {
            try {
                // We need to create this route on the backend
                // It will verify the token and send back user data
                const response = await axios.get('http://localhost:3000/api/auth/verify', {
                    headers: { Authorization: `Bearer ${storedToken}` },
                });

                // If the token is valid, update the state
                setIsLoggedIn(true);
                setUser(response.data); // The user payload from the token
                setIsLoading(false);
            } catch (error) {
                // If the token is invalid or expired
                setIsLoggedIn(false);
                setUser(null);
                setIsLoading(false);
            }
        } else {
            // If there is no token
            setIsLoggedIn(false);
            setUser(null);
            setIsLoading(false);
        }
    };

    const logOutUser = () => {
        localStorage.removeItem('authToken');
        authenticateUser(); // Re-run auth check to update state
    };

    useEffect(() => {
        authenticateUser(); // Check for a token when the app loads
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, isLoading, storeToken, authenticateUser, logOutUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export { AuthProvider, AuthContext };