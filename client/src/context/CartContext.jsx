import { createContext, useState } from 'react';

const CartContext = createContext();

function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product) => {
        // Check if the product is already in the cart
        const existingItem = cartItems.find(item => item._id === product._id);
        if (existingItem) {
            // In a real app, you might increase the quantity here
            alert(`${product.title} is already in your cart!`);
        } else {
            setCartItems([...cartItems, product]);
            alert(`${product.title} has been added to your cart!`);
        }
    };

    const removeFromCart = (productId) => {
        setCartItems(cartItems.filter(item => item._id !== productId));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}

export { CartProvider, CartContext };
