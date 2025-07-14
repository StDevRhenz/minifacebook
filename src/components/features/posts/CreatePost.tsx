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
            <div className="text-center py-8">
                <p className="text-gray-600 mb-4">🔐 Please log in to create posts</p>
                <a href="/login" className="btn-primary inline-block">
                    Login Now
                </a>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="✨ What's your post title?"
                    className="input-modern text-lg font-medium"
                    disabled={isSubmitting}
                />
            </div>
            
            <div>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="💭 Share your thoughts with the world..."
                    rows={4}
                    className="input-modern resize-none"
                    disabled={isSubmitting}
                />
            </div>
            
            <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                    <button 
                        type="button" 
                        className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300"
                    >
                        <span>📸</span>
                        <span className="text-sm">Photo</span>
                    </button>
                    <button 
                        type="button" 
                        className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-300"
                    >
                        <span>😊</span>
                        <span className="text-sm">Emoji</span>
                    </button>
                    <button 
                        type="button" 
                        className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-300"
                    >
                        <span>📍</span>
                        <span className="text-sm">Location</span>
                    </button>
                </div>
                
                <button 
                    type="submit" 
                    disabled={!title.trim() || !content.trim() || isSubmitting}
                    className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                    {isSubmitting ? (
                        <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Posting...</span>
                        </>
                    ) : (
                        <>
                            <span>🚀</span>
                            <span>Share Post</span>
                        </>
                    )}
                </button>
            </div>
        </form>
    );
};

export default CreatePost;