import { supabase } from '../lib/supabaseClient';

export const fetchPosts = async () => {
    const { data, error } = await supabase.from('posts').select('*').order('created_at', { ascending: false });
    if (error) throw new Error('Error fetching posts');
    return data;
};

export const createPost = async (postData) => {
    const { data, error } = await supabase.from('posts').insert([postData]).select().single();
    if (error) throw new Error('Error creating post');
    return data;
};

export const deletePost = async (postId) => {
    const { error } = await supabase.from('posts').delete().eq('id', postId);
    if (error) throw new Error('Error deleting post');
};