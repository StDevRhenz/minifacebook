import React from 'react';
import PostItem from './PostItem';
import { Post, UpdatePostRequest } from '../../../types/post';

interface PostListProps {
  posts?: Post[];
  removePost?: (id: string) => Promise<void>;
  editPost?: (postId: string, updateData: UpdatePostRequest) => Promise<void>;
}

const PostList: React.FC<PostListProps> = ({ posts = [], removePost, editPost }) => {
  const handleRemovePost = async (id: string) => {
    if (removePost) {
      await removePost(id);
    }
  };

  const handleEditPost = async (postId: string, updateData: UpdatePostRequest) => {
    if (editPost) {
      await editPost(postId, updateData);
    }
  };

  return (
    <div className="posts-container">
      {posts.length === 0 ? (
        <div className="text-center text-sm" style={{ color: 'var(--color-text-muted)', padding: 'var(--space-8)' }}>
          No posts yet. Be the first to share something!
        </div>
      ) : (
        posts.map(post => (
          <PostItem 
            key={post.id} 
            post={post} 
            onDelete={handleRemovePost} 
            onEdit={handleEditPost}
          />
        ))
      )}
    </div>
  );
};

export default PostList;