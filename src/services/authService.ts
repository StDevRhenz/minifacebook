import { supabase } from '../lib/supabaseClient';
import { AuthResponse } from '../types/auth';

export const login = async (email: string, password: string): Promise<AuthResponse> => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw new Error(error.message);
    return { user: data.user, session: data.session };
};

export const register = async (username: string, email: string, password: string): Promise<AuthResponse> => {
    const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { username } } });
    if (error) throw new Error(error.message);
    return { user: data.user, session: data.session };
};