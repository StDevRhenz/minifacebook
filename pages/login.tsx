import React from 'react';
import LoginForm from '../src/components/features/auth/LoginForm';
import Header from '../src/components/layout/Header';
import Footer from '../src/components/layout/Footer';
import ConfigurationStatus from '../src/components/common/ConfigurationStatus';

const LoginPage = () => {
    return (
        <div className="min-h-screen">
            <Header />
            <div className="main-container fade-in">
                <div className="container mx-auto px-4 py-12">
                    <div className="max-w-md mx-auto">
                        <ConfigurationStatus />
                        <div className="card-modern">
                            <div className="text-center mb-8">
                                <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-white text-2xl">🔐</span>
                                </div>
                                <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back!</h1>
                                <p className="text-gray-600">Sign in to continue to your account</p>
                            </div>
                            <LoginForm />
                            <div className="mt-6 text-center">
                                <p className="text-gray-600">
                                    Don't have an account?{' '}
                                    <a href="/register" className="text-purple-600 hover:text-purple-800 font-medium">
                                        Create one here ✨
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default LoginPage;