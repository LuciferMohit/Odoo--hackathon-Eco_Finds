// In client/src/pages/AddProductPage.jsx

import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddProductPage() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('Electronics'); // Default category
    const [price, setPrice] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Get the token from localStorage
        const storedToken = localStorage.getItem('authToken');

        const newProduct = { title, description, category, price };

        try {
            // Send the POST request with the token in the headers
            await axios.post('http://localhost:3000/api/products', newProduct, {
                headers: { Authorization: `Bearer ${storedToken}` },
            });

            // If successful, navigate to the homepage to see the new product
            navigate('/');
        } catch (err) {
            setError('Failed to create product. Please try again.');
            console.error('Error creating product:', err);
        }
    };

    return (
        <div>
            <h1>Add New Product</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div>
                    <label>Description</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
                </div>
                <div>
                    <label>Category</label>
                    <select value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="Electronics">Electronics</option>
                        <option value="Furniture">Furniture</option>
                        <option value="Clothing">Clothing</option>
                        <option value="Eco-friendly">Eco-friendly</option>
                    </select>
                </div>
                <div>
                    <label>Price</label>
                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
                </div>
                <button type="submit">Submit Listing</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default AddProductPage;