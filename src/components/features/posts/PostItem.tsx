import React from 'react';
import { Post } from '../../../types/post';
import { useAuth } from '../../../contexts/AuthContent';

interface PostItemProps {
  post: Post;
  onDelete: (id: string) => void;
}

const PostItem: React.FC<PostItemProps> = ({ post, onDelete }) => {
  const { user } = useAuth();
  const canDelete = user?.id === post.authorId;

  const handleDelete = () => {
    onDelete(post.id);
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
        <div className="post-author-info">
          <div className="post-avatar">
            {post.author?.username?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div className="post-meta">
            <div className="post-author-name">
              {post.author?.fullName || post.author?.username || 'Unknown User'}
            </div>
            <div className="post-time">
              {formatDate(post.createdAt)}
            </div>
          </div>
        </div>
        {canDelete && (
          <button
            onClick={handleDelete}
            className="post-delete-btn"
            title="Delete post"
          >
            <span className="delete-icon">×</span>
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
    </div>
  );
};

export default PostItem;
