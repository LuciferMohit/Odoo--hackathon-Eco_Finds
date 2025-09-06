import { Routes, Route, Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage'; // <-- This path is now corrected
import LoginPage from './pages/LoginPage';
import AddProductPage from './pages/AddProductPage';
import MyListingsPage from './pages/MyListingsPage';
import EditProductPage from './pages/EditProductPage';
import IsPrivate from './components/IsPrivate';

function App() {
    const { isLoggedIn, logOutUser, isLoading } = useContext(AuthContext);

    if (isLoading) return <p>Loading...</p>;

    return (
        <div>
            <nav style={{ padding: '10px', borderBottom: '1px solid #ccc', marginBottom: '20px' }}>
                <Link to="/" style={{ marginRight: '10px' }}>Home</Link>

                {isLoggedIn ? (
                    <>
                        <Link to="/products/add" style={{ marginRight: '10px' }}>Add Product</Link>
                        <Link to="/my-listings" style={{ marginRight: '10px' }}>My Listings</Link>
                        <button onClick={logOutUser}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/signup" style={{ marginRight: '10px' }}>Sign Up</Link>
                        <Link to="/login" style={{ marginRight: '10px' }}>Login</Link>
                    </>
                )}
            </nav>

            <main>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/login" element={<LoginPage />} />

                    <Route path="/products/add" element={<IsPrivate><AddProductPage /></IsPrivate>} />
                    <Route path="/my-listings" element={<IsPrivate><MyListingsPage /></IsPrivate>} />

                    {/* 2. ADD THE EDIT ROUTE (must be protected) */}
                    <Route path="/products/edit/:productId" element={<IsPrivate><EditProductPage /></IsPrivate>} />

                </Routes>
            </main>
        </div>
    );
}

export default App;

