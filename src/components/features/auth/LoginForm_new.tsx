import React, { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContent';
import { useRouter } from 'next/router';

const LoginForm = () => {
    const { login } = useAuth();
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        
        if (!email.trim() || !password) {
            setError('Please fill in all fields');
            return;
        }

        setIsLoading(true);

        try {
            await login(email.trim(), password);
            router.push('/');
        } catch (err: any) {
            setError('Invalid email or password. Please try again.');
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
                    placeholder="Password"
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
                {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
        </form>
    );
};

export default LoginForm;
