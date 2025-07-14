import React, { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContent';
import { useRouter } from 'next/router';

const RegisterForm = () => {
    const { register } = useAuth();
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const validateForm = () => {
        if (!username.trim()) return 'Username is required';
        if (username.length < 3) return 'Username must be at least 3 characters';
        if (!email.trim()) return 'Email is required';
        if (!/\S+@\S+\.\S+/.test(email)) return 'Email is invalid';
        if (!password) return 'Password is required';
        if (password.length < 6) return 'Password must be at least 6 characters';
        if (password !== confirmPassword) return 'Passwords do not match';
        return null;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        
        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }

        setIsLoading(true);

        try {
            await register({ 
                email: email.trim(), 
                password, 
                username: username.trim() 
            });
            router.push('/login');
        } catch (err: any) {
            setError('Registration failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && (
                <div className="error mb-4">
                    {error}
                </div>
            )}
            
            <div className="form-group">
                <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    className="form-input"
                    disabled={isLoading}
                    required
                />
            </div>

            <div className="form-group">
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address"
                    className="form-input"
                    disabled={isLoading}
                    required
                />
            </div>

            <div className="form-group">
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password (min 6 characters)"
                    className="form-input"
                    disabled={isLoading}
                    required
                />
            </div>

            <div className="form-group">
                <input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm password"
                    className="form-input"
                    disabled={isLoading}
                    required
                />
            </div>

            <button 
                type="submit" 
                disabled={isLoading}
                className="btn btn-primary"
                style={{ width: '100%' }}
            >
                {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
        </form>
    );
};

export default RegisterForm;
