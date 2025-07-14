import React from 'react';
import Link from 'next/link';
import LoginForm from '../src/components/features/auth/LoginForm';
import Header from '../src/components/layout/Header';

const LoginPage = () => {
    return (
        <div className="page-container">
            <Header />
            <div className="main-content">
                <div className="form-container">
                    <h1 className="form-title">Welcome Back</h1>
                    <LoginForm />
                    <Link href="/register" className="form-link">
                        Don't have an account? Create one here
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
