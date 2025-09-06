// In client/src/pages/LoginPage.jsx

import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const credentials = { email, password };

        try {
            // Send a POST request to the backend's login endpoint
            const response = await axios.post('http://localhost:3000/api/auth/login', credentials);

            // On successful login, the backend will send back a token.
            // We store this token in the browser's localStorage.
            localStorage.setItem('authToken', response.data.token);

            // Redirect the user to the homepage
            navigate('/');

        } catch (err) {
            setError(err.response.data.message || 'Login failed.');
            console.error("Login error:", err);
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default LoginPage;