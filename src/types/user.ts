export interface User {
    id: string;
    username: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserProfile {
    id: string;
    username: string;
    fullName?: string;
    bio?: string;
    avatarUrl?: string;
    website?: string;
    location?: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface UpdateProfileRequest {
    username?: string;
    fullName?: string;
    bio?: string;
    avatarUrl?: string;
    website?: string;
    location?: string;
}