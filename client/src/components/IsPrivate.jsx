// In client/src/components/IsPrivate.jsx

import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

function IsPrivate({ children }) {
    const { isLoggedIn, isLoading } = useContext(AuthContext);

    // If the authentication is still loading
    if (isLoading) {
        return <p>Loading ...</p>;
    }

    if (!isLoggedIn) {
        // If the user is not logged in, redirect to the login page
        return <Navigate to="/login" />;
    } else {
        // If the user is logged in, allow them to see the page
        return children;
    }
}

export default IsPrivate;