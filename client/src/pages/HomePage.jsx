import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function HomePage() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/products');
                setProducts(response.data);
            } catch (err) {
                console.error("Error fetching products:", err);
                setError("Failed to load products. Is the backend server running?");
            }
        };
        fetchProducts();
    }, []);

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    return (
        <div className="min-h-screen bg-gray-50 px-6 py-8">
            {/* Header */}
            <header className="flex justify-between items-center mb-8">
                <h1 className="text-5xl font-extrabold text-green-700">EcoFinds</h1>
                {/* Replaced cart icon with words */}
                <Link to="/cart" className="text-lg font-medium text-green-600 hover:text-green-800 transition">
                    View Cart
                </Link>
            </header>

            {/* Product List */}
            {products.length === 0 ? (
                <p className="text-gray-600">No products found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {products.map(product => (
                        <Link
                            to={`/products/${product._id}`}
                            key={product._id}
                            className="block bg-white shadow-md rounded-2xl p-5 border border-gray-200 hover:shadow-lg hover:border-green-400 transition"
                        >
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">{product.title}</h2>
                            <p className="text-gray-600">Price: ${product.price}</p>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}

export default HomePage;