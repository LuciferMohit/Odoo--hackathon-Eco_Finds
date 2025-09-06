import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom'; // Make sure Link is imported

function MyListingsPage() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');
    const { user } = useContext(AuthContext);

    const fetchUserProducts = async () => {
        // ... (existing fetch logic)
        const storedToken = localStorage.getItem('authToken');
        if (!storedToken) {
            setError('You must be logged in to see your listings.');
            return;
        }
        try {
            const response = await axios.get('http://localhost:3000/api/products/my-listings', {
                headers: { Authorization: `Bearer ${storedToken}` },
            });
            setProducts(response.data);
        } catch (err) {
            setError('Failed to fetch your listings.');
            console.error('Fetch user listings error:', err);
        }
    };

    useEffect(() => {
        if (user) {
            fetchUserProducts();
        }
    }, [user]);

    const handleDelete = async (productId) => {
        // ... (existing delete logic)
        const storedToken = localStorage.getItem('authToken');
        try {
            await axios.delete(`http://localhost:3000/api/products/${productId}`, {
                headers: { Authorization: `Bearer ${storedToken}` },
            });
            fetchUserProducts();
        } catch (err) {
            setError('Failed to delete the product.');
            console.error('Delete error:', err);
        }
    };

    return (
        <div>
            <h1>My Listings</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {products.length > 0 ? (
                products.map(product => (
                    <div key={product._id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
                        <h3>{product.title}</h3>
                        <p>Price: ${product.price}</p>
                        {/* --- THIS IS THE CHANGE --- */}
                        {/* The button is now a Link that navigates to the edit page */}
                        <Link to={`/products/edit/${product._id}`}>
                            <button>Edit</button>
                        </Link>
                        <button onClick={() => handleDelete(product._id)}>Delete</button>
                    </div>
                ))
            ) : (
                <p>You have not listed any products yet. <Link to="/products/add">Add one now!</Link></p>
            )}
        </div>
    );
}

export default MyListingsPage;

