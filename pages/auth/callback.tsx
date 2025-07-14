import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../../src/lib/supabaseClient';
import Header from '../../src/components/layout/Header';
import Footer from '../../src/components/layout/Footer';

const AuthCallback = () => {
    const router = useRouter();
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const handleAuthCallback = async () => {
            try {
                // Get the current URL
                const hashParams = new URLSearchParams(window.location.hash.substring(1));
                const error = hashParams.get('error');
                const errorDescription = hashParams.get('error_description');

                if (error) {
                    // Handle error cases
                    if (error === 'access_denied' && errorDescription?.includes('expired')) {
                        setStatus('error');
                        setMessage('The email verification link has expired. Please request a new one.');
                        return;
                    }
                    
                    setStatus('error');
                    setMessage(errorDescription || 'Authentication failed');
                    return;
                }

                // Handle successful authentication
                const { data, error: authError } = await supabase.auth.getSession();
                
                if (authError) {
                    setStatus('error');
                    setMessage('Failed to verify authentication');
                    return;
                }

                if (data.session) {
                    setStatus('success');
                    setMessage('Email verified successfully! Redirecting...');
                    
                    // Redirect to home page after 2 seconds
                    setTimeout(() => {
                        router.push('/');
                    }, 2000);
                } else {
                    setStatus('error');
                    setMessage('No active session found');
                }
            } catch (err) {
                console.error('Auth callback error:', err);
                setStatus('error');
                setMessage('An unexpected error occurred');
            }
        };

        // Only run on client side
        if (typeof window !== 'undefined') {
            handleAuthCallback();
        }
    }, [router]);

    const resendVerification = async () => {
        try {
            // This would need the user's email - in a real app you might store this temporarily
            setMessage('Please try registering again to receive a new verification email.');
        } catch (err) {
            setMessage('Failed to resend verification email');
        }
    };

    return (
        <div className="min-h-screen">
            <Header />
            <div className="main-container fade-in">
                <div className="container mx-auto px-4 py-12">
                    <div className="max-w-md mx-auto">
                        <div className="card-modern text-center">
                            {status === 'loading' && (
                                <>
                                    <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    </div>
                                    <h1 className="text-2xl font-bold text-gray-800 mb-2">Verifying...</h1>
                                    <p className="text-gray-600">Please wait while we verify your email</p>
                                </>
                            )}

                            {status === 'success' && (
                                <>
                                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <span className="text-green-600 text-2xl">✅</span>
                                    </div>
                                    <h1 className="text-2xl font-bold text-gray-800 mb-2">Email Verified!</h1>
                                    <p className="text-gray-600 mb-4">{message}</p>
                                </>
                            )}

                            {status === 'error' && (
                                <>
                                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <span className="text-red-600 text-2xl">⚠️</span>
                                    </div>
                                    <h1 className="text-2xl font-bold text-gray-800 mb-2">Verification Failed</h1>
                                    <p className="text-gray-600 mb-6">{message}</p>
                                    
                                    <div className="space-y-3">
                                        <button
                                            onClick={() => router.push('/register')}
                                            className="btn-primary w-full"
                                        >
                                            Try Registering Again
                                        </button>
                                        <button
                                            onClick={() => router.push('/login')}
                                            className="btn-secondary w-full"
                                        >
                                            Go to Login
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AuthCallback;
