import React from 'react';

const PostSkeleton: React.FC = () => {
  return (
    <div className="skeleton-post">
      <div className="skeleton-header">
        <div className="skeleton skeleton-avatar"></div>
        <div className="skeleton-meta">
          <div className="skeleton skeleton-name"></div>
          <div className="skeleton skeleton-date"></div>
        </div>
      </div>
      <div className="skeleton-content">
        <div className="skeleton skeleton-line"></div>
        <div className="skeleton skeleton-line"></div>
        <div className="skeleton skeleton-line"></div>
      </div>
      <div className="skeleton-actions">
        <div className="skeleton skeleton-action"></div>
        <div className="skeleton skeleton-action"></div>
        <div className="skeleton skeleton-action"></div>
      </div>
    </div>
  );
};

const PostListSkeleton: React.FC = () => {
  return (
    <div className="posts-container">
      <PostSkeleton />
      <PostSkeleton />
      <PostSkeleton />
    </div>
  );
};

export { PostSkeleton, PostListSkeleton };
