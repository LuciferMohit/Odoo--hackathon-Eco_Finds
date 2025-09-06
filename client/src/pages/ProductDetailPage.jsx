import { useState, useEffect, useContext } from 'react'; // <-- 1. IMPORT useContext
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartContext'; // <-- 2. IMPORT CartContext

function ProductDetailPage() {
    const [product, setProduct] = useState(null);
    const [error, setError] = useState('');
    const { productId } = useParams();
    const { addToCart } = useContext(CartContext); // <-- 3. GET addToCart function

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/products/${productId}`);
                setProduct(response.data);
            } catch (err) {
                setError('Failed to load product details.');
                console.error('Fetch product detail error:', err);
            }
        };

        fetchProduct();
    }, [productId]);

    if (error) {
        return <p className="text-center text-red-500">{error}</p>;
    }

    if (!product) {
        return <p className="text-center mt-8">Loading product details...</p>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-white rounded-lg shadow-lg p-8">
                {/* Image Placeholder */}
                <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center mb-8">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14" />
                    </svg>
                </div>

                <h1 className="text-4xl font-bold text-gray-900">{product.title}</h1>
                <p className="text-3xl font-semibold text-green-600 mt-2">${product.price}</p>

                {product.seller && <p className="text-md text-gray-600 mt-4">Sold by: <span className="font-semibold">{product.seller.username}</span></p>}

                <p className="text-md text-gray-600 mt-1"><strong>Category:</strong> {product.category}</p>

                <div className="mt-6">
                    <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">Description</h3>
                    <p className="text-gray-700 mt-4">{product.description}</p>
                </div>

                {/* --- 4. ADD THE BUTTON --- */}
                <div className="mt-8">
                    <button
                        onClick={() => addToCart(product)}
                        className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-300 ease-in-out"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductDetailPage;

