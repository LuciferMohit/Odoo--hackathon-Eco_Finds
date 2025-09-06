// In client/src/pages/HomePage.jsx

import { useState, useEffect } from 'react';
import axios from 'axios';

function HomePage() {
    const [products, setProducts] = useState([]); // State to hold the products array
    const [error, setError] = useState(null);     // State to hold any potential error message

    useEffect(() => {
        // This function runs once when the component is first rendered
        const fetchProducts = async () => {
            try {
                // IMPORTANT: Make sure your backend server is running on port 3000
                const response = await axios.get('http://localhost:3000/api/products');
                setProducts(response.data); // Update the state with the products from the API
            } catch (err) {
                console.error("Error fetching products:", err);
                setError("Failed to load products. Is the backend server running?");
            }
        };

        fetchProducts();
    }, []); // The empty dependency array [] ensures this effect runs only once

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    return (
        <div>
            <h1>Products for Sale</h1>
            {products.length === 0 ? (
                <p>No products found.</p>
            ) : (
                <ul>
                    {products.map(product => (
                        <li key={product._id} style={{ borderBottom: '1px solid #ccc', marginBottom: '10px' }}>
                            <h2>{product.title}</h2>
                            <p>Price: ${product.price}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default HomePage;