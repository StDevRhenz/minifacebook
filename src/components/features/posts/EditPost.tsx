import React, { useState } from 'react';
import { Post, UpdatePostRequest } from '../../../types/post';
import Button from '../../common/Button';
import Input from '../../common/Input';

interface EditPostProps {
  post: Post;
  onSave: (postId: string, updateData: UpdatePostRequest) => Promise<void>;
  onCancel: () => void;
}

const EditPost: React.FC<EditPostProps> = ({ post, onSave, onCancel }) => {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      setError('Title and content are required');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await onSave(post.id, { title: title.trim(), content: content.trim() });
      onCancel();
    } catch (err) {
      setError('Failed to update post. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="edit-post-card">
      <div className="edit-post-header">
        <div className="edit-post-title-section">
          <span className="edit-icon-large">✏️</span>
          <h3>Edit Your Post</h3>
        </div>
        <button
          type="button"
          onClick={onCancel}
          className="edit-close-btn"
          disabled={isLoading}
          title="Cancel editing"
        >
          ×
        </button>
      </div>

      {error && (
        <div className="edit-error-message">
          <span className="error-icon">⚠️</span>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="edit-post-form">
        <div className="edit-form-section">
          <label className="edit-form-label">Title</label>
          <Input
            type="text"
            placeholder="Give your post a title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isLoading}
            required
            className="edit-title-input"
          />
        </div>

        <div className="edit-form-section">
          <label className="edit-form-label">Content</label>
          <textarea
            className="edit-content-textarea"
            placeholder="Share your thoughts..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={isLoading}
            required
            rows={8}
          />
        </div>

        <div className="edit-post-footer">
          <div className="edit-char-count">
            <span className={content.length > 1000 ? 'char-limit-warning' : ''}>
              {content.length} characters
            </span>
          </div>
          <div className="edit-action-buttons">
            <Button
              type="button"
              variant="secondary"
              onClick={onCancel}
              disabled={isLoading}
              className="edit-cancel-btn"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={isLoading || !title.trim() || !content.trim()}
              className="edit-save-btn"
            >
              {isLoading ? (
                <>
                  <span className="loading-spinner"></span>
                  Saving...
                </>
              ) : (
                <>
                  <span className="save-icon">💾</span>
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditPost;
