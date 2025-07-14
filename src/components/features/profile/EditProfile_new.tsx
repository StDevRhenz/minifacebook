import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContent';
import { UserProfile, UpdateProfileRequest } from '../../../types/user';
import { useProfile } from '../../../hooks/useProfile';

interface EditProfileProps {
    onSave?: () => void;
    onCancel?: () => void;
}

const EditProfile: React.FC<EditProfileProps> = ({ onSave, onCancel }) => {
    const { user } = useAuth();
    const { profile, updateProfile: updateUserProfile, loading, error } = useProfile();
    const [formData, setFormData] = useState<UpdateProfileRequest>({});
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (profile) {
            setFormData({
                username: profile.username,
                fullName: profile.fullName || '',
                bio: profile.bio || '',
                website: profile.website || '',
                location: profile.location || '',
                avatarUrl: profile.avatarUrl || '',
            });
        }
    }, [profile]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        
        try {
            await updateUserProfile(formData);
            onSave?.();
        } catch (err) {
            console.error('Error updating profile:', err);
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="loading">
                Loading profile...
            </div>
        );
    }

    return (
        <div className="post-card">
            <h2 style={{ 
                fontSize: '1.5rem', 
                fontWeight: '700', 
                marginBottom: 'var(--space-6)',
                color: 'var(--color-text-primary)'
            }}>
                Edit Profile
            </h2>
            
            {error && (
                <div className="error">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        type="text"
                        name="username"
                        value={formData.username || ''}
                        onChange={handleChange}
                        placeholder="Username"
                        className="form-input"
                        disabled={saving}
                        required
                    />
                </div>

                <div className="form-group">
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName || ''}
                        onChange={handleChange}
                        placeholder="Full Name"
                        className="form-input"
                        disabled={saving}
                    />
                </div>

                <div className="form-group">
                    <textarea
                        name="bio"
                        value={formData.bio || ''}
                        onChange={handleChange}
                        placeholder="Bio"
                        className="form-textarea"
                        disabled={saving}
                        rows={3}
                    />
                </div>

                <div className="form-group">
                    <input
                        type="text"
                        name="location"
                        value={formData.location || ''}
                        onChange={handleChange}
                        placeholder="Location"
                        className="form-input"
                        disabled={saving}
                    />
                </div>

                <div className="form-group">
                    <input
                        type="url"
                        name="website"
                        value={formData.website || ''}
                        onChange={handleChange}
                        placeholder="Website"
                        className="form-input"
                        disabled={saving}
                    />
                </div>

                <div className="form-group">
                    <input
                        type="url"
                        name="avatarUrl"
                        value={formData.avatarUrl || ''}
                        onChange={handleChange}
                        placeholder="Avatar URL"
                        className="form-input"
                        disabled={saving}
                    />
                </div>

                <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'flex-end' }}>
                    <button
                        type="button"
                        onClick={onCancel}
                        className="btn btn-secondary"
                        disabled={saving}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={saving}
                    >
                        {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditProfile;
