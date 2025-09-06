import { Routes, Route, Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import { CartContext } from './context/CartContext'; // <-- 1. IMPORT CART CONTEXT
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import AddProductPage from './pages/AddProductPage';
import MyListingsPage from './pages/MyListingsPage';
import EditProductPage from './pages/EditProductPage';
import ProductDetailPage from './pages/ProductDetailPage';
import UserDashboardPage from './pages/UserDashboardPage';
import CartPage from './pages/CartPage'; // <-- 2. IMPORT CART PAGE
import IsPrivate from './components/IsPrivate';

function App() {
    const { isLoggedIn, user, logOutUser, isLoading } = useContext(AuthContext);
    const { cartItems } = useContext(CartContext); // <-- 3. GET CART ITEMS

    if (isLoading) return <p className="text-center mt-8">Loading...</p>;

    return (
        <div className="bg-gray-100 min-h-screen font-sans">
            <nav className="bg-white shadow-md p-4 flex justify-between items-center">
                <div className="flex items-center">
                    <Link to="/" className="text-2xl font-bold text-green-600 hover:text-green-700">EcoFinds</Link>
                </div>

                <div className="flex items-center">
                    {/* 4. ADD CART LINK/ICON */}
                    <Link to="/cart" className="relative mr-4 text-gray-600 hover:text-green-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        {cartItems.length > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItems.length}
              </span>
                        )}
                    </Link>

                    {isLoggedIn ? (
                        <>
                            <span className="mr-4 text-gray-700">Welcome, {user?.username || ''}</span>
                            <Link to="/dashboard" className="text-gray-600 hover:text-green-600 mr-4">Dashboard</Link>
                            <Link to="/products/add" className="text-gray-600 hover:text-green-600 mr-4">Add Product</Link>
                            <Link to="/my-listings" className="text-gray-600 hover:text-green-600 mr-4">My Listings</Link>
                            <button onClick={logOutUser} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/signup" className="text-gray-600 hover:text-green-600 mr-4">Sign Up</Link>
                            <Link to="/login" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">Login</Link>
                        </>
                    )}
                </div>
            </nav>

            <main className="p-8">
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<HomePage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/products/:productId" element={<ProductDetailPage />} />
                    <Route path="/cart" element={<CartPage />} /> {/* <-- 5. ADD CART ROUTE */}

                    {/* Private Routes */}
                    <Route path="/dashboard" element={<IsPrivate><UserDashboardPage /></IsPrivate>} />
                    <Route path="/products/add" element={<IsPrivate><AddProductPage /></IsPrivate>} />
                    <Route path="/my-listings" element={<IsPrivate><MyListingsPage /></IsPrivate>} />
                    <Route path="/products/edit/:productId" element={<IsPrivate><EditProductPage /></IsPrivate>} />
                </Routes>
            </main>
        </div>
    );
}

export default App;

