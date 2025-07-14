import React from 'react';
import { useRouter } from 'next/router';

const AuthErrorHandler: React.FC = () => {
    const router = useRouter();
    const { error, error_description } = router.query;

    if (!error) return null;

    const getErrorInfo = () => {
        if (error === 'access_denied' && error_description?.toString().includes('expired')) {
            return {
                icon: '⏰',
                title: 'Verification Link Expired',
                description: 'The email verification link has expired or is invalid.',
                solutions: [
                    'Register again to receive a new verification email',
                    'Make sure to click the verification link within 1 hour',
                    'Check your spam/junk folder for the verification email'
                ]
            };
        }

        return {
            icon: '⚠️',
            title: 'Authentication Error',
            description: error_description?.toString() || 'An authentication error occurred',
            solutions: [
                'Try registering or logging in again',
                'Make sure your internet connection is stable',
                'Contact support if the problem persists'
            ]
        };
    };

    const errorInfo = getErrorInfo();

    return (
        <div className="max-w-md mx-auto mb-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                    <span className="text-2xl mr-3">{errorInfo.icon}</span>
                    <h3 className="text-lg font-bold text-red-800">{errorInfo.title}</h3>
                </div>
                
                <p className="text-red-700 mb-4">{errorInfo.description}</p>
                
                <div className="space-y-2 mb-4">
                    <p className="text-sm font-medium text-red-800">How to fix this:</p>
                    <ul className="list-disc list-inside space-y-1 text-sm text-red-700">
                        {errorInfo.solutions.map((solution, index) => (
                            <li key={index}>{solution}</li>
                        ))}
                    </ul>
                </div>
                
                <div className="flex space-x-3">
                    <button
                        onClick={() => router.push('/register')}
                        className="btn-primary flex-1 text-sm"
                    >
                        Try Again
                    </button>
                    <button
                        onClick={() => router.push('/')}
                        className="btn-secondary flex-1 text-sm"
                    >
                        Go Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AuthErrorHandler;
