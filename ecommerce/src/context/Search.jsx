import axios from "axios";
import React, { useState, useContext, createContext } from "react";

// Create the Search Context
const SearchContext = createContext();

// Search Provider Component
const SearchProvider = ({ children }) => {
    const [search, setSearch] = useState({
        keyword: "",
        result: [],
    });

    return (
        <SearchContext.Provider value={{ search, setSearch }}>
            {children}
        </SearchContext.Provider>
    );
};

// Custom Hook to use Search Context
const useSearch = () => {
    const context = useContext(SearchContext);
    if (!context) {
        throw new Error("useSearch must be used within a SearchProvider");
    }
    return context;
};

export { SearchProvider, useSearch };
