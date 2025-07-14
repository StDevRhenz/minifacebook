import React from 'react';
import Header from '../src/components/layout/Header';
import Sidebar from '../src/components/layout/Sidebar';
import Footer from '../src/components/layout/Footer';
import PostList from '../src/components/features/posts/PostList';
import CreatePost from '../src/components/features/posts/CreatePost';
import { useAuth } from '../src/contexts/AuthContent';
import usePosts from '../src/hooks/usePosts';

const HomePage = () => {
    const { posts, removePost } = usePosts();
    const { user } = useAuth();

    return (
        <div className="min-h-screen">
            <Header />
            <div className="main-container fade-in">
                <div className="container mx-auto px-4 py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        <div className="lg:col-span-1">
                            <div className="slide-up">
                                <Sidebar />
                            </div>
                        </div>
                        <div className="lg:col-span-3 space-y-6">
                            {/* Create Post - Only show if user is logged in */}
                            {user && (
                                <div className="card-modern slide-up">
                                    <div className="flex items-center space-x-3 mb-4">
                                        <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                                            <span className="text-white font-bold text-lg">
                                                {user.username?.charAt(0).toUpperCase() || '👤'}
                                            </span>
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold text-gray-800">What's on your mind, {user.username}?</h2>
                                            <p className="text-gray-600 text-sm">Share your thoughts with the world ✨</p>
                                        </div>
                                    </div>
                                    <CreatePost />
                                </div>
                            )}
                            
                            {/* Posts Feed */}
                            <div className="card-modern slide-up">
                                <div className="flex items-center space-x-2 mb-6">
                                    <span className="text-2xl">📰</span>
                                    <h2 className="text-2xl font-bold text-gray-800">Recent Posts</h2>
                                </div>
                                <PostList posts={posts} removePost={removePost} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default HomePage;