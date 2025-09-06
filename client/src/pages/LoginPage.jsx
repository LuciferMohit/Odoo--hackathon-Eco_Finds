import { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const { storeToken, authenticateUser } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const credentials = { email, password };
        try {
            const response = await axios.post('http://localhost:3000/api/auth/login', credentials);
            storeToken(response.data.token);
            await authenticateUser(); // Update the auth state
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed.');
            console.error("Login error:", err);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-[calc(100vh-160px)]">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold text-gray-900">Welcome Back</h1>
                    <p className="mt-2 text-gray-600">Log in to continue to EcoFinds.</p>
                </div>

                {/* Removed cart/logo placeholder */}

                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email-address" className="sr-only">Email address</label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                                placeholder="Email address"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                            />
                        </div>
                    </div>

                    {error && <p className="text-sm text-red-600 text-center">{error}</p>}

                    <div>
                        <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                            Log In
                        </button>
                    </div>
                </form>

                <div className="text-center">
                    <p className="text-sm text-gray-600">
                        Don't have an account yet?{' '}
                        <Link to="/signup" className="font-medium text-green-600 hover:text-green-500">
                            Sign up here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;