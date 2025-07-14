import React from 'react';
import Link from 'next/link';
import { useAuth } from '../../contexts/AuthContent';

const Sidebar: React.FC = () => {
    const { user } = useAuth();

    return (
        <aside className="space-y-4">
            {/* User Info Card */}
            {user && (
                <div className="sidebar-card">
                    <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-xl">
                                {user.username?.charAt(0).toUpperCase() || '👤'}
                            </span>
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-800">{user.username}</h3>
                            <p className="text-gray-600 text-sm">Welcome back! 👋</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Navigation Card */}
            <div className="sidebar-card">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center">
                    <span className="mr-2">🧭</span>
                    Navigation
                </h3>
                <nav>
                    <ul className="space-y-3">
                        <li>
                            <Link href="/" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-50 transition-all duration-300 group">
                                <span className="text-xl group-hover:scale-110 transition-transform">🏠</span>
                                <span className="font-medium text-gray-700 group-hover:text-blue-600">Home</span>
                            </Link>
                        </li>
                        {user ? (
                            <li>
                                <Link href="/profile" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-50 transition-all duration-300 group">
                                    <span className="text-xl group-hover:scale-110 transition-transform">👤</span>
                                    <span className="font-medium text-gray-700 group-hover:text-blue-600">Profile</span>
                                </Link>
                            </li>
                        ) : (
                            <>
                                <li>
                                    <Link href="/login" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-50 transition-all duration-300 group">
                                        <span className="text-xl group-hover:scale-110 transition-transform">🔐</span>
                                        <span className="font-medium text-gray-700 group-hover:text-blue-600">Login</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/register" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-50 transition-all duration-300 group">
                                        <span className="text-xl group-hover:scale-110 transition-transform">✨</span>
                                        <span className="font-medium text-gray-700 group-hover:text-blue-600">Register</span>
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
            </div>

            {/* Quick Stats Card */}
            <div className="sidebar-card">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center">
                    <span className="mr-2">📊</span>
                    Quick Stats
                </h3>
                <div className="space-y-3">
                    <div className="flex justify-between items-center p-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                        <span className="text-gray-600 text-sm">👥 Users Online</span>
                        <span className="font-bold text-blue-600">42</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                        <span className="text-gray-600 text-sm">📝 Posts Today</span>
                        <span className="font-bold text-green-600">18</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                        <span className="text-gray-600 text-sm">❤️ Likes Today</span>
                        <span className="font-bold text-purple-600">156</span>
                    </div>
                </div>
            </div>

            {/* Fun Fact Card */}
            <div className="sidebar-card">
                <h3 className="font-bold text-gray-800 mb-3 flex items-center">
                    <span className="mr-2">💡</span>
                    Did You Know?
                </h3>
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-3 rounded-lg border-l-4 border-yellow-400">
                    <p className="text-sm text-gray-700">
                        The average person checks social media <strong>2.5 hours</strong> per day! 📱✨
                    </p>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;