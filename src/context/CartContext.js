// client/src/context/CartContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        try {
            const localData = localStorage.getItem('cart');
            return localData ? JSON.parse(localData) : [];
        } catch (error) {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product, quantity = 1) => {
        setCartItems(prevItems => {
            const exist = prevItems.find(item => item._id === product._id);
            if (exist) {
                return prevItems.map(item =>
                    item._id === product._id ? { ...item, qty: item.qty + quantity } : item
                );
            } else {
                return [...prevItems, { ...product, qty: quantity }];
            }
        });
    };

    const removeFromCart = (id) => {
        setCartItems(prevItems => prevItems.filter(item => item._id !== id));
    };
    
    const updateQuantity = (id, qty) => {
        setCartItems(prevItems => 
            prevItems.map(item => item._id === id ? {...item, qty: parseInt(qty)} : item)
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};