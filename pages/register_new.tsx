import React from 'react';
import Link from 'next/link';
import RegisterForm from '../src/components/features/auth/RegisterForm';
import Header from '../src/components/layout/Header';

const RegisterPage = () => {
    return (
        <div className="page-container">
            <Header />
            <div className="main-content">
                <div className="form-container">
                    <h1 className="form-title">Create Account</h1>
                    <RegisterForm />
                    <Link href="/login" className="form-link">
                        Already have an account? Sign in here
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
