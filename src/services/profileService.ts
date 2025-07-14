import { supabase } from '../lib/supabaseClient';
import { UserProfile, UpdateProfileRequest } from '../types/user';

export const getProfile = async (userId: string): Promise<UserProfile | null> => {
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
    
    if (error) {
        if (error.code === 'PGRST116') return null; // No profile found
        throw new Error(error.message);
    }
    
    // Convert snake_case to camelCase
    return {
        id: data.id,
        username: data.username,
        fullName: data.full_name,
        bio: data.bio,
        avatarUrl: data.avatar_url,
        website: data.website,
        location: data.location,
        email: '', // Will be populated from auth context
        createdAt: new Date(data.created_at),
        updatedAt: new Date(data.updated_at),
    } as UserProfile;
};

export const updateProfile = async (userId: string, profileData: UpdateProfileRequest): Promise<UserProfile> => {
    const updateData: any = {};
    
    if (profileData.username) updateData.username = profileData.username;
    if (profileData.fullName !== undefined) updateData.full_name = profileData.fullName;
    if (profileData.bio !== undefined) updateData.bio = profileData.bio;
    if (profileData.avatarUrl !== undefined) updateData.avatar_url = profileData.avatarUrl;
    if (profileData.website !== undefined) updateData.website = profileData.website;
    if (profileData.location !== undefined) updateData.location = profileData.location;
    
    const { data, error } = await supabase
        .from('profiles')
        .update(updateData)
        .eq('id', userId)
        .select()
        .single();
    
    if (error) throw new Error(error.message);
    
    // Convert snake_case to camelCase
    return {
        id: data.id,
        username: data.username,
        fullName: data.full_name,
        bio: data.bio,
        avatarUrl: data.avatar_url,
        website: data.website,
        location: data.location,
        email: '', // Will be populated from auth context
        createdAt: new Date(data.created_at),
        updatedAt: new Date(data.updated_at),
    } as UserProfile;
};

export const getAllProfiles = async (): Promise<UserProfile[]> => {
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });
    
    if (error) throw new Error(error.message);
    
    return (data || []).map((profile: any) => ({
        id: profile.id,
        username: profile.username,
        fullName: profile.full_name,
        bio: profile.bio,
        avatarUrl: profile.avatar_url,
        website: profile.website,
        location: profile.location,
        email: '',
        createdAt: new Date(profile.created_at),
        updatedAt: new Date(profile.updated_at),
    })) as UserProfile[];
};
