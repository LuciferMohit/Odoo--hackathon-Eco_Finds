import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function EditProductPage() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [error, setError] = useState('');

    const { productId } = useParams(); // Gets the product ID from the URL (e.g., /products/edit/123)
    const navigate = useNavigate();

    // 1. Fetch the product's current data when the page loads
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/products/${productId}`);
                const product = response.data;
                // Pre-fill the form with the fetched data
                setTitle(product.title);
                setDescription(product.description);
                setCategory(product.category);
                setPrice(product.price);
            } catch (err) {
                setError('Failed to load product data.');
                console.error('Fetch product error:', err);
            }
        };

        fetchProduct();
    }, [productId]); // This runs whenever the productId in the URL changes

    // 2. Handle the form submission to update the product
    const handleSubmit = async (e) => {
        e.preventDefault();
        const storedToken = localStorage.getItem('authToken');
        const updatedProduct = { title, description, category, price };

        try {
            await axios.put(`http://localhost:3000/api/products/${productId}`, updatedProduct, {
                headers: { Authorization: `Bearer ${storedToken}` },
            });
            // Redirect to the "My Listings" page after a successful update
            navigate('/my-listings');
        } catch (err) {
            setError('Failed to update product.');
            console.error('Update error:', err);
        }
    };

    return (
        <div>
            <h1>Edit Product</h1>
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
                <button type="submit">Update Listing</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default EditProductPage;
