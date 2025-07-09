import React, { useState, useContext, createContext } from "react";
import { useEffect } from "react";

// Create the Cart Context
const CartContext = createContext();

// Cart Provider Component
const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        let existingCartItem = localStorage.getItem('cart')
        if (existingCartItem) setCart(JSON.parse(existingCartItem))
    }, [])

    return (
        <CartContext.Provider value={{ cart, setCart }}>
            {children}
        </CartContext.Provider>
    );
};

// Custom Hook to use Cart Context
const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};

export { CartProvider, useCart };
