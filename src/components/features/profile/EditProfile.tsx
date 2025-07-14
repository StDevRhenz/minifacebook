import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContent';
import { UserProfile, UpdateProfileRequest } from '../../../types/user';
import Input from '../../common/Input';
import Button from '../../common/Button';
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
        if (!user?.id) return;

        try {
            setSaving(true);
            await updateUserProfile(formData);
            onSave?.();
        } catch (err: any) {
            console.error('Error updating profile:', err);
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <div className="text-center py-4">Loading profile...</div>;
    }

    return (
        <div className="edit-profile bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Edit Profile</h2>
            
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Username
                    </label>
                    <Input
                        type="text"
                        name="username"
                        value={formData.username || ''}
                        onChange={handleChange}
                        placeholder="Enter username"
                        className="w-full"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                    </label>
                    <Input
                        type="text"
                        name="fullName"
                        value={formData.fullName || ''}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        className="w-full"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Bio
                    </label>
                    <textarea
                        name="bio"
                        value={formData.bio || ''}
                        onChange={handleChange}
                        placeholder="Tell us about yourself..."
                        rows={3}
                        className="w-full border rounded p-2 resize-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Website
                    </label>
                    <Input
                        type="url"
                        name="website"
                        value={formData.website || ''}
                        onChange={handleChange}
                        placeholder="https://yourwebsite.com"
                        className="w-full"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Location
                    </label>
                    <Input
                        type="text"
                        name="location"
                        value={formData.location || ''}
                        onChange={handleChange}
                        placeholder="City, Country"
                        className="w-full"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Avatar URL
                    </label>
                    <Input
                        type="url"
                        name="avatarUrl"
                        value={formData.avatarUrl || ''}
                        onChange={handleChange}
                        placeholder="https://example.com/avatar.jpg"
                        className="w-full"
                    />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                    {onCancel && (
                        <Button 
                            type="button" 
                            onClick={onCancel}
                            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                        >
                            Cancel
                        </Button>
                    )}
                    <Button 
                        type="submit" 
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                    >
                        {saving ? 'Saving...' : 'Save Changes'}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default EditProfile;