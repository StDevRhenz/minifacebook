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
    <div className="post-card">
      {/* Author Header */}
      <div className="post-header">
        <div className="post-avatar">
          {post.author?.username?.charAt(0).toUpperCase() || 'U'}
        </div>
        <div className="post-author">
          <div className="post-author-name">
            {post.author?.fullName || post.author?.username || 'Unknown User'}
          </div>
          <div className="post-time">
            {formatDate(post.createdAt)}
          </div>
        </div>
        {canDelete && (
          <button
            onClick={handleDelete}
            className="btn btn-ghost btn-sm"
            title="Delete post"
          >
            🗑️
          </button>
        )}
      </div>

      {/* Post Content */}
      <div className="post-content">
        {post.title && (
          <h3 className="post-title">{post.title}</h3>
        )}
        <p className="post-text">{post.content}</p>
      </div>

      {/* Post Actions */}
      <div className="post-actions">
        <button
          onClick={handleLike}
          className={`post-action ${isLiked ? 'liked' : ''}`}
        >
          {isLiked ? '❤️' : '🤍'} {likesCount}
        </button>
        <button className="post-action">
          💬 Comment
        </button>
        <button className="post-action">
          🔗 Share
        </button>
      </div>
    </div>
  );
};

export default PostItem;
