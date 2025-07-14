import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Post } from '../types/post';
import { fetchPosts, createPost, deletePost } from '../services/postService';

interface PostsContextType {
    posts: Post[];
    loading: boolean;
    error: string | null;
    addPost: (newPost: any) => Promise<void>;
    removePost: (postId: string) => Promise<void>;
    refreshPosts: () => Promise<void>;
}

const PostsContext = createContext<PostsContextType | undefined>(undefined);

interface PostsProviderProps {
    children: ReactNode;
}

export const PostsProvider: React.FC<PostsProviderProps> = ({ children }) => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const loadPosts = async () => {
        try {
            setLoading(true);
            const fetchedPosts = await fetchPosts();
            // Sort posts by creation date (newest first)
            const sortedPosts = fetchedPosts.sort((a, b) => 
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
            setPosts(sortedPosts);
            setError(null);
        } catch (err) {
            setError('Failed to load posts');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadPosts();
    }, []);

    const addPost = async (newPost: any) => {
        try {
            const createdPost = await createPost(newPost);
            // Add the new post to the beginning of the list for real-time update
            setPosts((prevPosts) => [createdPost, ...prevPosts]);
            setError(null);
        } catch (err) {
            setError('Failed to create post');
            throw err;
        }
    };

    const removePost = async (postId: string) => {
        try {
            await deletePost(postId);
            setPosts((prevPosts) => prevPosts.filter(post => post.id !== postId));
            setError(null);
        } catch (err) {
            setError('Failed to delete post');
            throw err;
        }
    };

    const refreshPosts = async () => {
        await loadPosts();
    };

    const value: PostsContextType = {
        posts,
        loading,
        error,
        addPost,
        removePost,
        refreshPosts,
    };

    return (
        <PostsContext.Provider value={value}>
            {children}
        </PostsContext.Provider>
    );
};

export const usePosts = (): PostsContextType => {
    const context = useContext(PostsContext);
    if (context === undefined) {
        throw new Error('usePosts must be used within a PostsProvider');
    }
    return context;
};

export default usePosts;
