import React from 'react';
import Head from 'next/head';
import Header from '../src/components/layout/Header';
import PostList from '../src/components/features/posts/PostList';
import CreatePost from '../src/components/features/posts/CreatePost';
import { useAuth } from '../src/contexts/AuthContent';
import { usePosts } from '../src/contexts/PostsContext';

const HomePage = () => {
    const { posts, removePost, editPost } = usePosts();
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
                <div className="main-content" style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    minHeight: 'calc(100vh - 120px)',
                    padding: 'var(--space-8)'
                }}>
                    <div className="text-center" style={{ maxWidth: '600px', width: '100%' }}>
                        <h1 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: 'var(--space-6)', color: 'var(--color-text-primary)' }}>
                            Welcome to Unspoken Letters
                        </h1>
                        <p style={{ fontSize: '1.1rem', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-10)', lineHeight: '1.6' }}>
                            This is a freedom wall to confess your unsaid thoughts.
                        </p>
                        <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <a href="/login" className="btn btn-primary" style={{ minWidth: '120px' }}>Sign In</a>
                            <a href="/register" className="btn btn-secondary" style={{ minWidth: '120px' }}>Create Account</a>
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
                <PostList posts={posts} removePost={removePost} editPost={editPost} />
            </div>
            </div>
        </>
    );
};

export default HomePage;
