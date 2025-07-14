import React from 'react';
import { UserProfile } from '../../../types/user';

interface ProfileCardProps {
    profile: UserProfile;
    isOwnProfile?: boolean;
    onEditClick?: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile, isOwnProfile = false, onEditClick }) => {
    return (
        <div className="profile-card bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-start space-x-4">
                {/* Avatar */}
                <div className="flex-shrink-0">
                    {profile.avatarUrl ? (
                        <img 
                            src={profile.avatarUrl} 
                            alt={profile.username}
                            className="w-20 h-20 rounded-full object-cover"
                        />
                    ) : (
                        <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center">
                            <span className="text-2xl font-bold text-gray-600">
                                {profile.username.charAt(0).toUpperCase()}
                            </span>
                        </div>
                    )}
                </div>

                {/* Profile Info */}
                <div className="flex-grow">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">
                                {profile.fullName || profile.username}
                            </h2>
                            <p className="text-gray-600">@{profile.username}</p>
                        </div>
                        {isOwnProfile && (
                            <button 
                                onClick={onEditClick}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                            >
                                Edit Profile
                            </button>
                        )}
                    </div>

                    {/* Bio */}
                    {profile.bio && (
                        <p className="mt-3 text-gray-700">{profile.bio}</p>
                    )}

                    {/* Additional Info */}
                    <div className="mt-4 space-y-2">
                        {profile.location && (
                            <div className="flex items-center text-gray-600">
                                <span className="mr-2">📍</span>
                                <span>{profile.location}</span>
                            </div>
                        )}
                        {profile.website && (
                            <div className="flex items-center text-gray-600">
                                <span className="mr-2">🔗</span>
                                <a 
                                    href={profile.website} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline"
                                >
                                    {profile.website}
                                </a>
                            </div>
                        )}
                        <div className="flex items-center text-gray-500 text-sm">
                            <span className="mr-2">📅</span>
                            <span>
                                Joined {new Date(profile.createdAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long'
                                })}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;