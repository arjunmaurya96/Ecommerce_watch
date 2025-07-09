import axios from "axios";
import React, { useState, useContext, createContext, useEffect } from "react";

// Create the Auth Context
const AuthContext = createContext();

// Auth Provider Component
const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        user: null,
        token: "",
    });

    // axios.defaults.headers.common['Authorization'] = auth?.token

    useEffect(() => {
        const data = localStorage.getItem("auth");
        if (data) {
            const parsedData = JSON.parse(data);
            setAuth(parsedData);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom Hook to use Auth Context
const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export { AuthProvider, useAuth };
