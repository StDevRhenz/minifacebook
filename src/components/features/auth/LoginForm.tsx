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
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600 text-sm">
                    <span className="mr-2">⚠️</span>
                    {error}
                </div>
            )}
            
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    📧 Email Address
                </label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    className="input-modern"
                    disabled={isLoading}
                    required
                />
            </div>

            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    🔒 Password
                </label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="input-modern"
                    disabled={isLoading}
                    required
                />
            </div>

            <div className="flex items-center justify-between">
                <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-purple-600 focus:ring-purple-500" />
                    <span className="ml-2 text-sm text-gray-600">Remember me</span>
                </label>
                <a href="#" className="text-sm text-purple-600 hover:text-purple-800">
                    Forgot password?
                </a>
            </div>

            <button 
                type="submit" 
                disabled={isLoading}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
                {isLoading ? (
                    <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Signing In...</span>
                    </>
                ) : (
                    <>
                        <span>🔐</span>
                        <span>Sign In</span>
                    </>
                )}
            </button>

            <div className="text-center">
                <p className="text-sm text-gray-600">
                    Or sign in with
                </p>
                <div className="flex justify-center space-x-4 mt-3">
                    <button type="button" className="btn-secondary px-4 py-2 text-sm">
                        🌐 Google
                    </button>
                    <button type="button" className="btn-secondary px-4 py-2 text-sm">
                        📘 Facebook
                    </button>
                </div>
            </div>
        </form>
    );
};

export default LoginForm;