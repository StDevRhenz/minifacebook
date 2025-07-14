import React, { useState } from 'react';
import usePosts from '../../../hooks/usePosts';
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
            <div className="card card-padding text-center">
                <p className="mb-4">🔐 Please log in to create posts</p>
                <a href="/login" className="btn btn-primary">
                    Login Now
                </a>
            </div>
        );
    }

    return (
        <div className="card mb-4">
            <div className="p-4">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="form-group">
                        <label htmlFor="title" className="form-label">
                            📝 Post Title
                        </label>
                        <input
                            id="title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="What's on your mind?"
                            className="input"
                            disabled={isSubmitting}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="content" className="form-label">
                            💭 Share your thoughts
                        </label>
                        <textarea
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Tell us more..."
                            className="input textarea"
                            disabled={isSubmitting}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting || !title.trim() || !content.trim()}
                        className="btn btn-primary w-full"
                    >
                        {isSubmitting ? '📤 Posting...' : '🚀 Share Post'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreatePost;
