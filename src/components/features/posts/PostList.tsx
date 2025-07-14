import React from 'react';
import PostItem from './PostItem';
import { Post } from '../../../types/post';
import './PostList.css'; // Assuming you have some styles for the PostList

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
    <div className="post-list">
      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        posts.map(post => <PostItem key={post.id} post={post} onDelete={handleRemovePost} />)
      )}
    </div>
  );
};

export default PostList;