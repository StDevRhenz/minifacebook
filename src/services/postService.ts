import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';
import { Post, CreatePostRequest, UpdatePostRequest } from '../types/post';

// Demo posts for when Supabase is not configured
const demoData: Post[] = [
    {
        id: 'demo-1',
        title: '🎉 Welcome to Unspoken Letters!',
        content: 'This is a demo post to show how our platform works. Create an account to start sharing your thoughts!',
        authorId: 'demo-user-1',
        author: {
            id: 'demo-user-1',
            username: 'admin',
            fullName: 'Admin User',
            avatarUrl: undefined
        },
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2)
    },
    {
        id: 'demo-2',
        title: '🚀 Getting Started',
        content: 'Here are some tips to get the most out of Unspoken Letters:\n\n• Create engaging posts\n• Connect with other users\n• Share your thoughts and experiences\n• Have fun!',
        authorId: 'demo-user-2',
        author: {
            id: 'demo-user-2',
            username: 'demo_user',
            fullName: 'Demo User',
            avatarUrl: undefined
        },
        createdAt: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
        updatedAt: new Date(Date.now() - 1000 * 60 * 30)
    }
];

export const fetchPosts = async (): Promise<Post[]> => {
    if (!isSupabaseConfigured) {
        // Get demo posts from localStorage and combine with default demo data
        const storedPosts = localStorage.getItem('demo_posts');
        const userPosts = storedPosts ? JSON.parse(storedPosts) : [];
        return [...userPosts, ...demoData];
    }

    try {
        // First, try the new schema with profiles table
        let { data, error } = await supabase
            .from('posts')
            .select(`
                *,
                author:profiles(
                    id,
                    username,
                    full_name,
                    avatar_url
                )
            `)
            .order('created_at', { ascending: false });
        
        // If that fails (relationship doesn't exist), try the old schema
        if (error && error.message.includes('relationship')) {
            console.log('Profiles relationship not found, trying fallback approach...');
            
            // Get posts without the profile join
            const postsResult = await supabase
                .from('posts')
                .select('*')
                .order('created_at', { ascending: false });
            
            if (postsResult.error) {
                throw new Error(postsResult.error.message);
            }
            
            // Get all unique author IDs
            const authorIds = [...new Set((postsResult.data || []).map((post: any) => post.author_id))];
            
            // Try to get profiles for these authors
            let profilesMap: { [key: string]: any } = {};
            try {
                const profilesResult = await supabase
                    .from('profiles')
                    .select('id, username, full_name, avatar_url')
                    .in('id', authorIds);
                
                if (profilesResult.data) {
                    profilesResult.data.forEach((profile: any) => {
                        profilesMap[profile.id] = profile;
                    });
                }
            } catch (profileError) {
                console.log('Profiles table not accessible, using auth data fallback');
            }
            
            // Combine posts with available profile data
            data = (postsResult.data || []).map((post: any) => ({
                ...post,
                author: profilesMap[post.author_id] || null
            }));
            error = null;
        }
        
        if (error) {
            console.error('Fetch posts error:', error);
            throw new Error(error.message);
        }
        
        // Convert snake_case to camelCase and handle missing author data
        return (data || []).map((post: any) => ({
            id: post.id,
            title: post.title,
            content: post.content,
            authorId: post.author_id,
            createdAt: new Date(post.created_at),
            updatedAt: new Date(post.updated_at),
            author: post.author ? {
                id: post.author.id,
                username: post.author.username || 'Unknown User',
                fullName: post.author.full_name || post.author.username || 'Unknown User',
                avatarUrl: post.author.avatar_url,
            } : {
                id: post.author_id,
                username: 'Unknown User',
                fullName: 'Unknown User',
                avatarUrl: undefined
            },
        })) as Post[];
    } catch (err) {
        console.error('Failed to fetch posts:', err);
        // Return demo data as fallback
        return demoData;
    }
};

export const createPost = async (postData: CreatePostRequest): Promise<Post> => {
    if (!isSupabaseConfigured) {
        // Demo mode - create a mock post
        const newPost: Post = {
            id: `demo-${Date.now()}`,
            title: postData.title,
            content: postData.content,
            authorId: postData.authorId,
            author: {
                id: postData.authorId,
                username: 'demo_user',
                fullName: 'Demo User',
                avatarUrl: undefined
            },
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        
        // Store in localStorage for demo persistence
        const existingPosts = localStorage.getItem('demo_posts');
        const posts = existingPosts ? JSON.parse(existingPosts) : [];
        posts.unshift(newPost);
        localStorage.setItem('demo_posts', JSON.stringify(posts));
        
        return newPost;
    }

    try {
        // First, ensure the user has a profile
        const { data: existingProfile, error: profileCheckError } = await supabase
            .from('profiles')
            .select('id')
            .eq('id', postData.authorId)
            .single();
        
        // If profile doesn't exist, create one
        if (profileCheckError || !existingProfile) {
            console.log('Profile not found, creating one for user:', postData.authorId);
            
            // Get user data from auth
            const { data: userData, error: userError } = await supabase.auth.getUser();
            if (userData.user && userData.user.id === postData.authorId) {
                const { error: createProfileError } = await supabase
                    .from('profiles')
                    .insert([{
                        id: postData.authorId,
                        username: userData.user.user_metadata?.username || 'user',
                        full_name: userData.user.user_metadata?.username || 'User',
                    }]);
                
                if (createProfileError) {
                    console.error('Failed to create profile:', createProfileError);
                    throw new Error('Unable to create user profile. Please try again.');
                }
            } else {
                throw new Error('Unable to verify user identity. Please try logging in again.');
            }
        }

        // First try with profiles join
        let { data, error } = await supabase
            .from('posts')
            .insert([{
                title: postData.title,
                content: postData.content,
                author_id: postData.authorId,
            }])
            .select(`
                *,
                author:profiles(
                    id,
                    username,
                    full_name,
                    avatar_url
                )
            `)
            .single();
        
        // If profile join fails, insert without join and get profile separately
        if (error && error.message.includes('relationship')) {
            console.log('Profiles relationship not found, using fallback approach...');
            
            const insertResult = await supabase
                .from('posts')
                .insert([{
                    title: postData.title,
                    content: postData.content,
                    author_id: postData.authorId,
                }])
                .select('*')
                .single();
            
            if (insertResult.error) {
                throw new Error(insertResult.error.message);
            }
            
            // Try to get profile data
            let authorProfile = null;
            try {
                const profileResult = await supabase
                    .from('profiles')
                    .select('id, username, full_name, avatar_url')
                    .eq('id', postData.authorId)
                    .single();
                
                if (profileResult.data) {
                    authorProfile = profileResult.data;
                }
            } catch (profileError) {
                console.log('Could not fetch profile data');
            }
            
            data = {
                ...insertResult.data,
                author: authorProfile
            };
            error = null;
        }
        
        if (error) {
            throw new Error(error.message);
        }
        
        // Convert snake_case to camelCase
        return {
            id: data.id,
            title: data.title,
            content: data.content,
            authorId: data.author_id,
            createdAt: new Date(data.created_at),
            updatedAt: new Date(data.updated_at),
            author: data.author ? {
                id: data.author.id,
                username: data.author.username || 'Unknown User',
                fullName: data.author.full_name || data.author.username || 'Unknown User',
                avatarUrl: data.author.avatar_url,
            } : {
                id: data.author_id,
                username: 'Unknown User',
                fullName: 'Unknown User',
                avatarUrl: undefined
            },
        } as Post;
    } catch (err) {
        console.error('Failed to create post:', err);
        throw err;
    }
};

export const deletePost = async (postId: string): Promise<void> => {
    const { error } = await supabase.from('posts').delete().eq('id', postId);
    if (error) throw new Error(error.message);
};

export const updatePost = async (postId: string, updateData: UpdatePostRequest): Promise<Post> => {
    if (!isSupabaseConfigured) {
        // Demo mode - update mock post
        const existingPosts = localStorage.getItem('demo_posts');
        const posts = existingPosts ? JSON.parse(existingPosts) : [];
        const postIndex = posts.findIndex((p: Post) => p.id === postId);
        
        if (postIndex === -1) {
            throw new Error('Post not found');
        }
        
        posts[postIndex] = {
            ...posts[postIndex],
            title: updateData.title,
            content: updateData.content,
            updatedAt: new Date(),
        };
        
        localStorage.setItem('demo_posts', JSON.stringify(posts));
        return posts[postIndex];
    }

    try {
        // First try with profiles join
        let { data, error } = await supabase
            .from('posts')
            .update({
                title: updateData.title,
                content: updateData.content,
                updated_at: new Date().toISOString(),
            })
            .eq('id', postId)
            .select(`
                *,
                author:profiles(
                    id,
                    username,
                    full_name,
                    avatar_url
                )
            `)
            .single();
        
        // If profile join fails, update without join and get profile separately
        if (error && error.message.includes('relationship')) {
            console.log('Profiles relationship not found, using fallback approach...');
            
            const updateResult = await supabase
                .from('posts')
                .update({
                    title: updateData.title,
                    content: updateData.content,
                    updated_at: new Date().toISOString(),
                })
                .eq('id', postId)
                .select('*')
                .single();
            
            if (updateResult.error) {
                throw new Error(updateResult.error.message);
            }
            
            // Try to get profile data
            let authorProfile = null;
            try {
                const profileResult = await supabase
                    .from('profiles')
                    .select('id, username, full_name, avatar_url')
                    .eq('id', updateResult.data.author_id)
                    .single();
                
                if (profileResult.data) {
                    authorProfile = profileResult.data;
                }
            } catch (profileError) {
                console.log('Could not fetch profile data');
            }
            
            data = {
                ...updateResult.data,
                author: authorProfile
            };
            error = null;
        }
        
        if (error) {
            throw new Error(error.message);
        }
        
        // Convert snake_case to camelCase
        return {
            id: data.id,
            title: data.title,
            content: data.content,
            authorId: data.author_id,
            createdAt: new Date(data.created_at),
            updatedAt: new Date(data.updated_at),
            author: data.author ? {
                id: data.author.id,
                username: data.author.username || 'Unknown User',
                fullName: data.author.full_name || data.author.username || 'Unknown User',
                avatarUrl: data.author.avatar_url,
            } : {
                id: data.author_id,
                username: 'Unknown User',
                fullName: 'Unknown User',
                avatarUrl: undefined
            },
        } as Post;
    } catch (err) {
        console.error('Failed to update post:', err);
        throw err;
    }
};

export const deletePostById = deletePost;