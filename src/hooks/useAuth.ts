import { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';
import { User } from '../types/auth';
import type { User as SupabaseUser } from '@supabase/supabase-js';

export const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Demo mode for when Supabase is not configured
    const createDemoUser = (username: string, email: string): User => {
        return {
            id: `demo-${Date.now()}`,
            username,
            email,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
    };

    // 🔄 This function converts Supabase user to our User format
    const convertToOurUser = (supabaseUser: SupabaseUser): User => {
        return {
            id: supabaseUser.id,                                           // ✅ Same property
            username: supabaseUser.user_metadata?.username || '',          // 🔄 Get from metadata
            email: supabaseUser.email || '',                              // ✅ Same property  
            createdAt: new Date(supabaseUser.created_at),                 // 🔄 Convert to Date
            updatedAt: new Date(supabaseUser.updated_at || supabaseUser.created_at), // 🔄 Convert to Date
        };
    };

    useEffect(() => {
        const fetchUser = async () => {
            if (!isSupabaseConfigured) {
                console.log('🔧 Running in demo mode - Supabase not configured');
                // Check if there's a demo user in localStorage
                const demoUserData = localStorage.getItem('demo_user');
                if (demoUserData) {
                    try {
                        const demoUser = JSON.parse(demoUserData);
                        setUser(demoUser);
                    } catch (err) {
                        console.error('Failed to parse demo user data');
                    }
                }
                setLoading(false);
                return;
            }

            const { data, error } = await supabase.auth.getUser();
            if (error) {
                setError('Failed to fetch user');
                setUser(null);
            } else if (data.user) {
                // Fetch profile data from profiles table
                try {
                    const { data: profileData, error: profileError } = await supabase
                        .from('profiles')
                        .select('*')
                        .eq('id', data.user.id)
                        .single();
                    
                    if (profileError) {
                        console.error('Profile fetch error:', profileError);
                        // Fall back to auth user data
                        setUser(convertToOurUser(data.user));
                    } else {
                        // Use profile data if available
                        const userWithProfile: User = {
                            id: profileData.id,
                            username: profileData.username || data.user.user_metadata?.username || '',
                            email: profileData.email || data.user.email || '',
                            createdAt: new Date(profileData.created_at || data.user.created_at),
                            updatedAt: new Date(profileData.updated_at || data.user.updated_at || data.user.created_at),
                        };
                        setUser(userWithProfile);
                    }
                } catch (profileErr) {
                    console.error('Failed to fetch profile:', profileErr);
                    // Fall back to auth user data
                    setUser(convertToOurUser(data.user));
                }
            }
            setLoading(false);
        };
        fetchUser();
    }, []);

    const login = async (email: string, password: string) => {
        setLoading(true);
        setError(null);
        
        try {
            if (!isSupabaseConfigured) {
                // Demo mode login
                const demoUser = createDemoUser('demo_user', email);
                setUser(demoUser);
                localStorage.setItem('demo_user', JSON.stringify(demoUser));
                return;
            }

            const { data, error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) throw new Error(error.message);
            
            if (data.user) {
                // Fetch profile data from profiles table
                try {
                    const { data: profileData, error: profileError } = await supabase
                        .from('profiles')
                        .select('*')
                        .eq('id', data.user.id)
                        .single();
                    
                    if (profileError) {
                        console.error('Profile fetch error:', profileError);
                        // Fall back to auth user data
                        setUser(convertToOurUser(data.user));
                    } else {
                        // Use profile data if available
                        const userWithProfile: User = {
                            id: profileData.id,
                            username: profileData.username || data.user.user_metadata?.username || '',
                            email: profileData.email || data.user.email || '',
                            createdAt: new Date(profileData.created_at || data.user.created_at),
                            updatedAt: new Date(profileData.updated_at || data.user.updated_at || data.user.created_at),
                        };
                        setUser(userWithProfile);
                    }
                } catch (profileErr) {
                    console.error('Failed to fetch profile:', profileErr);
                    // Fall back to auth user data
                    setUser(convertToOurUser(data.user));
                }
            }
        } catch (err: any) {
            const errorMessage = err.message || 'Login failed';
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const register = async ({ username, email, password }: { username: string; email: string; password: string }) => {
        setLoading(true);
        setError(null);
        
        try {
            if (!isSupabaseConfigured) {
                // Demo mode registration
                const demoUser = createDemoUser(username, email);
                setUser(demoUser);
                localStorage.setItem('demo_user', JSON.stringify(demoUser));
                return; // Return void for consistency
            }

            const { data, error } = await supabase.auth.signUp({ 
                email, 
                password, 
                options: { 
                    data: { username },  // 📝 Store username in metadata
                    emailRedirectTo: `${window.location.origin}/auth/callback` // Set proper redirect
                }
            });
            
            if (error) {
                console.error('Supabase registration error:', error);
                
                // Handle specific error cases
                if (error.message.includes('Email not confirmed')) {
                    throw new Error('Please check your email and click the confirmation link before signing in.');
                }
                if (error.message.includes('User already registered')) {
                    throw new Error('An account with this email already exists. Please try logging in instead.');
                }
                
                throw new Error(error.message);
            }
            
            if (data.user) {
                console.log('User registered successfully:', data.user);
                
                // Create profile in the profiles table
                try {
                    const { error: profileError } = await supabase
                        .from('profiles')
                        .insert([{
                            id: data.user.id,
                            username,
                            email,
                            full_name: username, // Use username as initial full name
                            created_at: new Date().toISOString(),
                            updated_at: new Date().toISOString(),
                        }]);
                    
                    if (profileError) {
                        console.error('Profile creation error:', profileError);
                        // Don't throw here - the user is already created in auth
                    } else {
                        console.log('Profile created successfully');
                    }
                } catch (profileErr) {
                    console.error('Failed to create profile:', profileErr);
                }
                
                // Check if email confirmation is required
                if (!data.user.email_confirmed_at) {
                    // Email confirmation required - set a special error that the component can handle
                    setError('EMAIL_VERIFICATION_REQUIRED');
                    return; // Don't throw, just return
                }
                
                // 🔄 Convert and set user if email is confirmed
                setUser(convertToOurUser(data.user));
                return; // Return void for consistency
            }
        } catch (err: any) {
            console.error('Registration error:', err);
            const errorMessage = err.message || 'Registration failed';
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    // ...existing code...
    const logout = async () => {
        setLoading(true);
        setError(null);
        
        try {
            if (!isSupabaseConfigured) {
                // Demo mode logout
                setUser(null);
                localStorage.removeItem('demo_user');
                return;
            }

            const { error } = await supabase.auth.signOut();
            if (error) throw new Error(error.message);
            setUser(null);
        } catch (err: any) {
            const errorMessage = err.message || 'Logout failed';
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const clearError = () => {
        setError(null);
    };

    return {
        user,
        loading,
        error,
        login,
        register,
        logout,
        clearError,
    };
};