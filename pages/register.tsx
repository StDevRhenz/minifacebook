import React from 'react';
import RegisterForm from '../src/components/features/auth/RegisterForm';
import Header from '../src/components/layout/Header';
import Footer from '../src/components/layout/Footer';
import ConfigurationStatus from '../src/components/common/ConfigurationStatus';
import AuthErrorHandler from '../src/components/common/AuthErrorHandler';

const RegisterPage = () => {
    return (
        <div className="min-h-screen">
            <Header />
            <div className="main-container fade-in">
                <div className="container mx-auto px-4 py-12">
                    <div className="max-w-md mx-auto">
                        <ConfigurationStatus />
                        <AuthErrorHandler />
                        <div className="card-modern">
                            <div className="text-center mb-8">
                                <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-white text-2xl">✨</span>
                                </div>
                                <h1 className="text-3xl font-bold text-gray-800 mb-2">Join Us Today!</h1>
                                <p className="text-gray-600">Create your account and start connecting</p>
                            </div>
                            <RegisterForm />
                            <div className="mt-6 text-center">
                                <p className="text-gray-600">
                                    Already have an account?{' '}
                                    <a href="/login" className="text-purple-600 hover:text-purple-800 font-medium">
                                        Sign in here 🔐
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

export default RegisterPage;