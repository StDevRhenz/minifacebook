import React, { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContent';
import { useRouter } from 'next/router';

const RegisterForm = () => {
    const { register, error: authError, clearError } = useAuth();
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    // Check if email verification is required based on auth error
    const needsEmailVerification = authError === 'EMAIL_VERIFICATION_REQUIRED';

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
            await register({ username: username.trim(), email: email.trim(), password });
            
            // Check if email verification is required
            if (authError === 'EMAIL_VERIFICATION_REQUIRED') {
                // Email verification required - don't redirect, show verification message
                return;
            }
            
            // Registration successful - proceed normally
            setSuccess(true);
            setTimeout(() => {
                router.push('/');
            }, 2000);
        } catch (err: any) {
            const errorMessage = err.message || 'Registration failed. Please try again.';
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    if (needsEmailVerification) {
        return (
            <div className="text-center py-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-blue-600 text-2xl">📧</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Check Your Email!</h3>
                <p className="text-gray-600 mb-4">
                    We've sent a verification link to <strong>{email}</strong>. 
                    Please click the link in your email to activate your account.
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-blue-700 text-sm mb-4">
                    <p>📝 <strong>Tip:</strong> Check your spam folder if you don't see the email</p>
                </div>
                <button
                    onClick={() => {
                        // Reset form and clear auth error
                        setUsername('');
                        setEmail('');
                        setPassword('');
                        setConfirmPassword('');
                        setError('');
                        clearError(); // Clear the auth error
                    }}
                    className="btn-secondary"
                >
                    Register with Different Email
                </button>
            </div>
        );
    }

    if (success) {
        return (
            <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-green-600 text-2xl">✅</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Welcome to Mini Facebook!</h3>
                <p className="text-gray-600">Your account has been created successfully. Redirecting...</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600 text-sm">
                    <span className="mr-2">⚠️</span>
                    {error}
                </div>
            )}
            
            <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                    👤 Username
                </label>
                <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Choose a unique username"
                    className="input-modern"
                    disabled={isLoading}
                    required
                />
            </div>

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
                    placeholder="Create a secure password"
                    className="input-modern"
                    disabled={isLoading}
                    required
                />
            </div>

            <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    🔒 Confirm Password
                </label>
                <input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    className="input-modern"
                    disabled={isLoading}
                    required
                />
            </div>

            <button 
                type="submit" 
                disabled={isLoading}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
                {isLoading ? (
                    <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Creating Account...</span>
                    </>
                ) : (
                    <>
                        <span>✨</span>
                        <span>Create Account</span>
                    </>
                )}
            </button>

            <div className="text-center text-sm text-gray-500 mt-4">
                <p>By creating an account, you agree to our Terms of Service and Privacy Policy</p>
            </div>
        </form>
    );
};

export default RegisterForm;