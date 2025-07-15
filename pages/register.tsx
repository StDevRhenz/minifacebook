import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import RegisterForm from '../src/components/features/auth/RegisterForm';
import Header from '../src/components/layout/Header';

const RegisterPage = () => {
    return (
        <>
            <Head>
                <title>Register - Unspoken Letters</title>
                <meta name="description" content="Create your Unspoken Letters account and start sharing your thoughts" />
            </Head>
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
        </>
    );
};

export default RegisterPage;
