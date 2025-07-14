import React, { useState } from 'react';
import { useAuth } from '../src/contexts/AuthContent';
import { useProfile } from '../src/hooks/useProfile';
import Header from '../src/components/layout/Header';
import Footer from '../src/components/layout/Footer';
import ProfileCard from '../src/components/features/profile/ProfileCard';
import EditProfile from '../src/components/features/profile/EditProfile';
import PostList from '../src/components/features/posts/PostList';
import CreatePost from '../src/components/features/posts/CreatePost';
import usePosts from '../src/hooks/usePosts';

const ProfilePage = () => {
    const { user } = useAuth();
    const { profile, loading: profileLoading } = useProfile();
    const { posts, removePost } = usePosts();
    const [isEditing, setIsEditing] = useState(false);

    // Filter posts by current user
    const userPosts = posts.filter(post => post.authorId === user?.id);

    if (!user) {
        return (
            <div>
                <Header />
                <div className="container mx-auto px-4 py-8">
                    <p className="text-center text-gray-600">Please log in to view your profile.</p>
                </div>
                <Footer />
            </div>
        );
    }

    if (profileLoading) {
        return (
            <div>
                <Header />
                <div className="container mx-auto px-4 py-8">
                    <p className="text-center">Loading profile...</p>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div>
            <Header />
            <div className="container mx-auto px-4 py-8 max-w-4xl">
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
                    <div className="mb-8">
                        <h3 className="text-xl font-bold mb-4">Create a Post</h3>
                        <CreatePost />
                    </div>
                )}

                {/* User's Posts */}
                {!isEditing && (
                    <div>
                        <h3 className="text-xl font-bold mb-4">
                            Your Posts ({userPosts.length})
                        </h3>
                        <PostList posts={userPosts} removePost={removePost} />
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default ProfilePage;
