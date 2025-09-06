import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext'; // <-- 1. IMPORT

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <CartProvider> {/* <-- 2. WRAP THE APP */}
                    <App />
                </CartProvider>
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>,
);
