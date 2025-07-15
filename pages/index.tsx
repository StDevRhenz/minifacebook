import React from 'react';
import Head from 'next/head';
import Header from '../src/components/layout/Header';
import PostList from '../src/components/features/posts/PostList';
import CreatePost from '../src/components/features/posts/CreatePost';
import { useAuth } from '../src/contexts/AuthContent';
import { usePosts } from '../src/contexts/PostsContext';

const HomePage = () => {
    const { posts, removePost } = usePosts();
    const { user } = useAuth();

    if (!user) {
        return (
            <>
                <Head>
                    <title>Welcome to Unspoken Letters</title>
                    <meta name="description" content="Connect with friends and share your thoughts on Unspoken Letters" />
                </Head>
                <div className="page-container">
                <Header />
                <div className="main-content">
                    <div className="text-center" style={{ padding: 'var(--space-16)' }}>
                        <h1 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: 'var(--space-4)', color: 'var(--color-text-primary)' }}>
                            Welcome to Unspoken Letters
                        </h1>
                        <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-8)' }}>
                            Connect with friends and share your thoughts
                        </p>
                        <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center' }}>
                            <a href="/login" className="btn btn-primary">Sign In</a>
                            <a href="/register" className="btn btn-secondary">Create Account</a>
                        </div>
                    </div>
                </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Head>
                <title>Unspoken Letters - Share Your Thoughts</title>
                <meta name="description" content="Share your thoughts and connect with friends on Unspoken Letters" />
            </Head>
            <div className="page-container">
            <Header />
            <div className="main-content">
                <CreatePost />
                <PostList posts={posts} removePost={removePost} />
            </div>
            </div>
        </>
    );
};

export default HomePage;
