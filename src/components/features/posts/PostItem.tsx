import React, { useState } from 'react';
import { Post, UpdatePostRequest } from '../../../types/post';
import { useAuth } from '../../../contexts/AuthContent';
import EditPost from './EditPost';

interface PostItemProps {
  post: Post;
  onDelete: (id: string) => void;
  onEdit: (postId: string, updateData: UpdatePostRequest) => Promise<void>;
}

const PostItem: React.FC<PostItemProps> = ({ post, onDelete, onEdit }) => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const canEdit = user?.id === post.authorId;
  const canDelete = user?.id === post.authorId;

  const handleDelete = () => {
    onDelete(post.id);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = async (postId: string, updateData: UpdatePostRequest) => {
    await onEdit(postId, updateData);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
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

  if (isEditing) {
    return (
      <EditPost
        post={post}
        onSave={handleSaveEdit}
        onCancel={handleCancelEdit}
      />
    );
  }

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
        <div className="post-actions">
          {canEdit && (
            <button
              onClick={handleEdit}
              className="post-edit-btn"
              title="Edit post"
            >
              <span className="edit-icon">Edit Post</span>
            </button>
          )}
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
