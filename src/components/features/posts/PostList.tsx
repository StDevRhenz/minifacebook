import React from 'react';
import PostItem from './PostItem';
import { Post } from '../../../types/post';

interface PostListProps {
  posts?: Post[];
  removePost?: (id: string) => void;
}

const PostList: React.FC<PostListProps> = ({ posts = [], removePost }) => {
  const handleRemovePost = (id: string) => {
    if (removePost) {
      removePost(id);
    }
  };

  return (
    <div className="posts-container">
      {posts.length === 0 ? (
        <div className="text-center text-sm" style={{ color: 'var(--color-text-muted)', padding: 'var(--space-8)' }}>
          No posts yet. Be the first to share something!
        </div>
      ) : (
        posts.map(post => <PostItem key={post.id} post={post} onDelete={handleRemovePost} />)
      )}
    </div>
  );
};

export default PostList;