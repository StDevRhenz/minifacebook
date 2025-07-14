import React, { useState } from 'react';
import { Post } from '../../../types/post';
import { useAuth } from '../../../contexts/AuthContent';

interface PostItemProps {
  post: Post;
  onDelete: (id: string) => void;
}

const PostItem: React.FC<PostItemProps> = ({ post, onDelete }) => {
  const { user } = useAuth();
  const canDelete = user?.id === post.authorId;
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(Math.floor(Math.random() * 20) + 1);

  const handleDelete = () => {
    onDelete(post.id);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="post-card slide-up">
      {/* Author Header */}
      <div className="flex items-center mb-4">
        {post.author?.avatarUrl ? (
          <img 
            src={post.author.avatarUrl} 
            alt={post.author.username}
            className="w-12 h-12 rounded-full mr-4 ring-2 ring-purple-200"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center mr-4 ring-2 ring-purple-200">
            <span className="text-white font-bold text-lg">
              {post.author?.username?.charAt(0).toUpperCase() || 'U'}
            </span>
          </div>
        )}
        <div className="flex-1">
          <h4 className="font-bold text-gray-900 text-lg">
            {post.author?.fullName || post.author?.username || 'Unknown User'}
          </h4>
          <div className="flex items-center space-x-2">
            <p className="text-sm text-gray-500">@{post.author?.username || 'unknown'}</p>
            <span className="text-gray-300">•</span>
            <p className="text-sm text-gray-500">{formatDate(post.createdAt)}</p>
          </div>
        </div>
        {canDelete && (
          <button 
            onClick={handleDelete}
            className="text-red-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-full transition-all duration-300"
            title="Delete post"
          >
            <span className="text-lg">🗑️</span>
          </button>
        )}
      </div>

      {/* Post Content */}
      <div className="mb-4">
        <h3 className="text-xl font-bold mb-3 text-gray-900 leading-tight">{post.title}</h3>
        <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{post.content}</p>
      </div>

      {/* Actions Bar */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex space-x-1">
          <button 
            onClick={handleLike}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
              isLiked 
                ? 'bg-red-50 text-red-600 hover:bg-red-100' 
                : 'text-gray-600 hover:bg-gray-50 hover:text-red-500'
            }`}
          >
            <span className="text-lg">{isLiked ? '❤️' : '🤍'}</span>
            <span className="text-sm font-medium">{likesCount}</span>
          </button>
          
          <button className="flex items-center space-x-2 px-4 py-2 rounded-full text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-all duration-300">
            <span className="text-lg">💬</span>
            <span className="text-sm font-medium">{Math.floor(Math.random() * 10)}</span>
          </button>
          
          <button className="flex items-center space-x-2 px-4 py-2 rounded-full text-gray-600 hover:bg-green-50 hover:text-green-600 transition-all duration-300">
            <span className="text-lg">🔄</span>
            <span className="text-sm font-medium">Share</span>
          </button>
        </div>
        
        <button className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-50 transition-all duration-300">
          <span className="text-lg">📎</span>
        </button>
      </div>
    </div>
  );
};

export default PostItem;