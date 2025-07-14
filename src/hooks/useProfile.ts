import { useState, useEffect } from 'react';
import { UserProfile, UpdateProfileRequest } from '../types/user';
import { getProfile, updateProfile } from '../services/profileService';
import { useAuth } from '../contexts/AuthContent';

export const useProfile = (userId?: string) => {
    const { user } = useAuth();
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    
    const targetUserId = userId || user?.id;

    useEffect(() => {
        const fetchProfile = async () => {
            if (!targetUserId) {
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const profileData = await getProfile(targetUserId);
                if (profileData && user) {
                    profileData.email = user.email; // Add email from auth context
                }
                setProfile(profileData);
                setError(null);
            } catch (err: any) {
                setError(err.message || 'Failed to fetch profile');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [targetUserId, user]);

    const updateUserProfile = async (profileData: UpdateProfileRequest) => {
        if (!user?.id) throw new Error('User not authenticated');
        
        try {
            setLoading(true);
            const updatedProfile = await updateProfile(user.id, profileData);
            updatedProfile.email = user.email; // Add email from auth context
            setProfile(updatedProfile);
            setError(null);
            return updatedProfile;
        } catch (err: any) {
            setError(err.message || 'Failed to update profile');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        profile,
        loading,
        error,
        updateProfile: updateUserProfile,
        refreshProfile: () => {
            if (targetUserId) {
                getProfile(targetUserId).then(profileData => {
                    if (profileData && user) {
                        profileData.email = user.email;
                    }
                    setProfile(profileData);
                });
            }
        }
    };
};
