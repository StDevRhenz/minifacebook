import React from 'react';
import { UserProfile } from '../../../types/user';

interface ProfileCardProps {
    profile: UserProfile;
    isOwnProfile?: boolean;
    onEditClick?: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile, isOwnProfile = false, onEditClick }) => {
    return (
        <div className="post-card" style={{ marginBottom: 'var(--space-6)' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-4)' }}>
                {/* Avatar */}
                <div style={{ flexShrink: 0 }}>
                    {profile.avatarUrl ? (
                        <img 
                            src={profile.avatarUrl} 
                            alt={profile.username}
                            style={{
                                width: '80px',
                                height: '80px',
                                borderRadius: 'var(--radius-full)',
                                objectFit: 'cover'
                            }}
                        />
                    ) : (
                        <div style={{
                            width: '80px',
                            height: '80px',
                            borderRadius: 'var(--radius-full)',
                            background: 'var(--color-bg-tertiary)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <span style={{
                                fontSize: '1.5rem',
                                fontWeight: '700',
                                color: 'var(--color-text-primary)'
                            }}>
                                {profile.username.charAt(0).toUpperCase()}
                            </span>
                        </div>
                    )}
                </div>

                {/* Profile Info */}
                <div style={{ flexGrow: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div>
                            <h2 style={{
                                fontSize: '1.5rem',
                                fontWeight: '700',
                                color: 'var(--color-text-primary)',
                                marginBottom: 'var(--space-1)'
                            }}>
                                {profile.fullName || profile.username}
                            </h2>
                            <p style={{ color: 'var(--color-text-tertiary)' }}>@{profile.username}</p>
                        </div>
                        {isOwnProfile && (
                            <button 
                                onClick={onEditClick}
                                className="btn btn-secondary"
                            >
                                Edit Profile
                            </button>
                        )}
                    </div>

                    {/* Bio */}
                    {profile.bio && (
                        <p style={{ 
                            marginTop: 'var(--space-3)', 
                            color: 'var(--color-text-secondary)',
                            lineHeight: 1.6
                        }}>
                            {profile.bio}
                        </p>
                    )}

                    {/* Additional Info */}
                    <div style={{ marginTop: 'var(--space-4)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                        {profile.location && (
                            <div style={{ display: 'flex', alignItems: 'center', color: 'var(--color-text-tertiary)' }}>
                                <span style={{ marginRight: 'var(--space-2)' }}>📍</span>
                                <span>{profile.location}</span>
                            </div>
                        )}
                        {profile.website && (
                            <div style={{ display: 'flex', alignItems: 'center', color: 'var(--color-text-tertiary)' }}>
                                <span style={{ marginRight: 'var(--space-2)' }}>🔗</span>
                                <a 
                                    href={profile.website} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    style={{ color: 'var(--color-accent)', textDecoration: 'none' }}
                                    onMouseOver={(e) => e.currentTarget.style.textDecoration = 'underline'}
                                    onMouseOut={(e) => e.currentTarget.style.textDecoration = 'none'}
                                >
                                    {profile.website}
                                </a>
                            </div>
                        )}
                        <div style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            color: 'var(--color-text-muted)', 
                            fontSize: '0.875rem' 
                        }}>
                            <span style={{ marginRight: 'var(--space-2)' }}>📅</span>
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