import { useState, useEffect } from 'react';
import { Post } from '../types/post';
import { fetchPosts, createPost, deletePost } from '../services/postService';

const usePosts = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadPosts = async () => {
            try {
                const fetchedPosts = await fetchPosts();
                setPosts(fetchedPosts);
            } catch (err) {
                setError('Failed to load posts');
            } finally {
                setLoading(false);
            }
        };

        loadPosts();
    }, []);

    const addPost = async (newPost: any) => {
        try {
            const createdPost = await createPost(newPost);
            setPosts((prevPosts) => [...prevPosts, createdPost]);
        } catch (err) {
            setError('Failed to create post');
        }
    };

    const removePost = async (postId: string) => {
        try {
            await deletePost(postId);
            setPosts((prevPosts) => prevPosts.filter(post => post.id !== postId));
        } catch (err) {
            setError('Failed to delete post');
        }
    };

    return { posts, loading, error, addPost, removePost };
};

export default usePosts;