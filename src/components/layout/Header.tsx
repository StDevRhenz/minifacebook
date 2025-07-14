import React from 'react';
import { useAuth } from '../../contexts/AuthContent';

const Header: React.FC = () => {
    const { user, logout } = useAuth();

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <header className="header-gradient text-white p-4 shadow-lg sticky top-0 z-50">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-3xl font-bold">
                    <a href="/" className="hover:text-blue-200 transition-all duration-300 flex items-center">
                        <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-3 backdrop-blur-sm">
                            <span className="text-xl">📘</span>
                        </div>
                        Mini Facebook
                    </a>
                </h1>
                <nav>
                    <ul className="flex space-x-6 items-center">
                        <li>
                            <a href="/" className="hover:text-blue-200 transition-all duration-300 px-4 py-2 rounded-lg hover:bg-white hover:bg-opacity-10">
                                🏠 Home
                            </a>
                        </li>
                        {user ? (
                            <>
                                <li>
                                    <a href="/profile" className="hover:text-blue-200 transition-all duration-300 px-4 py-2 rounded-lg hover:bg-white hover:bg-opacity-10">
                                        👤 Profile
                                    </a>
                                </li>
                                <li>
                                    <div className="bg-white bg-opacity-20 px-4 py-2 rounded-lg backdrop-blur-sm">
                                        <span className="text-sm">Welcome back, <strong>{user.username}</strong>! 👋</span>
                                    </div>
                                </li>
                                <li>
                                    <button 
                                        onClick={handleLogout}
                                        className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                    >
                                        🚪 Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <a href="/login" className="hover:text-blue-200 transition-all duration-300 px-4 py-2 rounded-lg hover:bg-white hover:bg-opacity-10">
                                        🔐 Login
                                    </a>
                                </li>
                                <li>
                                    <a href="/register" className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition-all duration-300 font-medium backdrop-blur-sm">
                                        ✨ Register
                                    </a>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;