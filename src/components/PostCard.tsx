interface PostCardProps {
  id: string;
  caption: string;
  imageUrl?: string;
  author: string;
}

const PostCard: React.FC<PostCardProps> = ({ id, caption, imageUrl, author }) => {
  return (
    <div className="post-card">
      <h3>{author}</h3>
      {imageUrl && <img src={imageUrl} alt="Post" />}
      <p>{caption}</p>
    </div>
  );
};

export default PostCard;
