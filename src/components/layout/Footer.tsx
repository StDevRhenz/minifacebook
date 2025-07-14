import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-8 mt-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand Section */}
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                                <span className="text-lg">📘</span>
                            </div>
                            <h3 className="text-xl font-bold">Mini Facebook</h3>
                        </div>
                        <p className="text-gray-300 mb-4 max-w-md">
                            Connect with friends, share your thoughts, and discover what's happening in your world. 
                            Join our growing community today! ✨
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-300 hover:text-white transition-colors p-2 bg-white bg-opacity-10 rounded-full">
                                <span className="text-lg">📧</span>
                            </a>
                            <a href="#" className="text-gray-300 hover:text-white transition-colors p-2 bg-white bg-opacity-10 rounded-full">
                                <span className="text-lg">🐦</span>
                            </a>
                            <a href="#" className="text-gray-300 hover:text-white transition-colors p-2 bg-white bg-opacity-10 rounded-full">
                                <span className="text-lg">📷</span>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><a href="/" className="text-gray-300 hover:text-white transition-colors">🏠 Home</a></li>
                            <li><a href="/profile" className="text-gray-300 hover:text-white transition-colors">👤 Profile</a></li>
                            <li><a href="/login" className="text-gray-300 hover:text-white transition-colors">🔐 Login</a></li>
                            <li><a href="/register" className="text-gray-300 hover:text-white transition-colors">✨ Register</a></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Support</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-300 hover:text-white transition-colors">❓ Help Center</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-white transition-colors">🛡️ Privacy Policy</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-white transition-colors">📋 Terms of Service</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-white transition-colors">📞 Contact Us</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-8 pt-6 text-center">
                    <p className="text-gray-400">
                        &copy; {new Date().getFullYear()} Mini Facebook. All rights reserved. Made with ❤️ by the community.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;