import React, { useState } from 'react';
import { useAuth } from '../src/contexts/AuthContent';
import { useProfile } from '../src/hooks/useProfile';
import Header from '../src/components/layout/Header';
import ProfileCard from '../src/components/features/profile/ProfileCard';
import EditProfile from '../src/components/features/profile/EditProfile';
import PostList from '../src/components/features/posts/PostList';
import CreatePost from '../src/components/features/posts/CreatePost';
import { usePosts } from '../src/contexts/PostsContext';

const ProfilePage = () => {
    const { user } = useAuth();
    const { profile, loading: profileLoading } = useProfile();
    const { posts, removePost } = usePosts();
    const [isEditing, setIsEditing] = useState(false);

    // Filter posts by current user
    const userPosts = posts.filter(post => post.authorId === user?.id);

    if (!user) {
        return (
            <div className="page-container">
                <Header />
                <div className="main-content">
                    <div className="text-center" style={{ padding: 'var(--space-16)' }}>
                        <p style={{ color: 'var(--color-text-secondary)' }}>
                            Please log in to view your profile.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    if (profileLoading) {
        return (
            <div className="page-container">
                <Header />
                <div className="main-content">
                    <div className="loading">
                        Loading profile...
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="page-container">
            <Header />
            <div className="main-content">
                {isEditing ? (
                    <EditProfile
                        onSave={() => setIsEditing(false)}
                        onCancel={() => setIsEditing(false)}
                    />
                ) : (
                    profile && (
                        <ProfileCard
                            profile={profile}
                            isOwnProfile={true}
                            onEditClick={() => setIsEditing(true)}
                        />
                    )
                )}

                {/* Create Post Section */}
                {!isEditing && (
                    <div style={{ marginBottom: 'var(--space-6)' }}>
                        <CreatePost />
                    </div>
                )}

                {/* User's Posts */}
                {!isEditing && (
                    <div>
                        <h3 style={{ 
                            fontSize: '1.25rem', 
                            fontWeight: '600', 
                            marginBottom: 'var(--space-4)',
                            color: 'var(--color-text-primary)'
                        }}>
                            Your Posts ({userPosts.length})
                        </h3>
                        <PostList posts={userPosts} removePost={removePost} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;
