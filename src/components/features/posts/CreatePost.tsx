import React, { useState } from 'react';
import { usePosts } from '../../../contexts/PostsContext';
import { useAuth } from '../../../contexts/AuthContent';

const CreatePost = () => {
    const { addPost } = usePosts();
    const { user } = useAuth();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !content.trim() || !user) return;

        setIsSubmitting(true);
        const postData = { 
            title: title.trim(),
            content: content.trim(),
            authorId: user.id 
        };
        
        try {
            await addPost(postData);
            setTitle('');
            setContent('');
        } catch (error) {
            console.error('Error creating post:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!user) {
        return (
            <div className="create-post-form text-center">
                <p style={{ marginBottom: 'var(--space-4)', color: 'var(--color-text-secondary)' }}>
                    Please log in to create posts
                </p>
                <a href="/login" className="btn btn-primary">
                    Login Now
                </a>
            </div>
        );
    }

    return (
        <div className="create-post-form">
            <h2 className="create-post-title">Create Post</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Post title"
                        className="form-input"
                        disabled={isSubmitting}
                        required
                    />
                </div>

                <div className="form-group">
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="What's on your mind?"
                        className="form-textarea"
                        disabled={isSubmitting}
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting || !title.trim() || !content.trim()}
                    className="btn btn-primary"
                    style={{ width: '100%' }}
                >
                    {isSubmitting ? 'Publishing...' : 'Share Post'}
                </button>
            </form>
        </div>
    );
};

export default CreatePost;
