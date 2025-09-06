import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

function UserDashboardPage() {
    const { user, authenticateUser } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    // When the component loads, pre-fill the form with the user's current data
    useEffect(() => {
        if (user) {
            setUsername(user.username || '');
            setEmail(user.email || '');
        }
    }, [user]); // This effect runs whenever the user object changes

    const handleUpdate = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        const updatedData = { username, email };
        const storedToken = localStorage.getItem('authToken');

        try {
            // We will create this backend route in the next step
            await axios.put('http://localhost:3000/api/users/profile', updatedData, {
                headers: { Authorization: `Bearer ${storedToken}` },
            });

            // Refresh the user data in the context to show the changes everywhere
            await authenticateUser();
            setMessage('Profile updated successfully!');

        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update profile.');
            console.error('Update profile error:', err);
        }
    };

    if (!user) {
        return <p>Loading user data...</p>;
    }

    return (
        <div>
            <h1>User Dashboard</h1>
            <p>Welcome, {user.username}!</p>

            <form onSubmit={handleUpdate}>
                <h3>Edit Your Profile</h3>
                <div>
                    <label>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Update Profile</button>
            </form>

            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default UserDashboardPage;
