import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';

function CartPage() {
    const { cartItems, removeFromCart, clearCart } = useContext(CartContext);

    // Calculate the total price
    const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-6">Your Cart</h1>

            {cartItems.length === 0 ? (
                <div className="text-center py-10 bg-white rounded-lg shadow-md">
                    <p className="text-gray-600 text-lg">Your cart is empty.</p>
                    <Link to="/" className="mt-4 inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
                        Continue Shopping
                    </Link>
                </div>
            ) : (
                <div className="bg-white rounded-lg shadow-md p-6">
                    {cartItems.map(item => (
                        <div key={item._id} className="flex justify-between items-center border-b border-gray-200 py-4">
                            <div>
                                <h2 className="text-xl font-semibold text-gray-800">{item.title}</h2>
                                <p className="text-gray-600">${item.price}</p>
                            </div>
                            <button
                                onClick={() => removeFromCart(item._id)}
                                className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded text-sm"
                            >
                                Remove
                            </button>
                        </div>
                    ))}

                    <div className="mt-6 text-right">
                        <h3 className="text-2xl font-bold text-gray-800">Total: ${totalPrice.toFixed(2)}</h3>
                        <div className="mt-4">
                            <button
                                onClick={clearCart}
                                className="text-sm text-gray-500 hover:text-red-500 mr-4"
                            >
                                Clear Cart
                            </button>
                            <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded">
                                Checkout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CartPage;
