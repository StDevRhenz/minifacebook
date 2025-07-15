-- Mini Facebook Database Migration Script
-- Run this in your Supabase SQL Editor to fix the relationship between posts and profiles

-- Step 1: First, ensure the profiles table exists with correct structure
CREATE TABLE IF NOT EXISTS profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    full_name TEXT,
    bio TEXT,
    avatar_url TEXT,
    website TEXT,
    location TEXT,
    email TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Step 2: Create profiles for existing users (if any)
-- This will create a profile for any existing auth user that doesn't have one
-- First, check what columns exist in the profiles table and insert accordingly
DO $$
BEGIN
    -- Check if email column exists
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'profiles' AND column_name = 'email'
    ) THEN
        -- Insert with email column
        INSERT INTO profiles (id, username, full_name, email, created_at, updated_at)
        SELECT 
            au.id,
            COALESCE(au.email, 'user_' || substr(au.id::text, 1, 8)) as username,
            COALESCE(au.raw_user_meta_data->>'full_name', au.email, 'User') as full_name,
            au.email,
            au.created_at,
            au.updated_at
        FROM auth.users au
        WHERE NOT EXISTS (
            SELECT 1 FROM profiles p WHERE p.id = au.id
        )
        ON CONFLICT (id) DO NOTHING;
    ELSE
        -- Insert without email column (existing table structure)
        INSERT INTO profiles (id, username, full_name, created_at, updated_at)
        SELECT 
            au.id,
            COALESCE(au.email, 'user_' || substr(au.id::text, 1, 8)) as username,
            COALESCE(au.raw_user_meta_data->>'full_name', au.email, 'User') as full_name,
            au.created_at,
            au.updated_at
        FROM auth.users au
        WHERE NOT EXISTS (
            SELECT 1 FROM profiles p WHERE p.id = au.id
        )
        ON CONFLICT (id) DO NOTHING;
    END IF;
    
    RAISE NOTICE 'Created profiles for existing users';
END $$;

-- Step 3: Check if posts table exists and what its current structure is
DO $$
BEGIN
    -- If posts table exists, we need to update its foreign key relationship
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'posts') THEN
        
        -- Drop the existing foreign key constraint if it exists
        IF EXISTS (
            SELECT 1 FROM information_schema.table_constraints 
            WHERE constraint_name = 'posts_author_id_fkey' 
            AND table_name = 'posts'
        ) THEN
            ALTER TABLE posts DROP CONSTRAINT posts_author_id_fkey;
        END IF;
        
        -- Add the new foreign key constraint to profiles
        ALTER TABLE posts ADD CONSTRAINT posts_author_id_fkey 
        FOREIGN KEY (author_id) REFERENCES profiles(id) ON DELETE CASCADE;
        
        RAISE NOTICE 'Updated posts table foreign key to reference profiles';
    ELSE
        -- Create posts table with correct relationship
        CREATE TABLE posts (
            id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
            title TEXT NOT NULL,
            content TEXT NOT NULL,
            author_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
        );
        
        RAISE NOTICE 'Created posts table with correct relationship to profiles';
    END IF;
END $$;

-- Step 4: Enable Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Step 5: Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Posts are viewable by everyone" ON posts;
DROP POLICY IF EXISTS "Users can insert their own posts" ON posts;
DROP POLICY IF EXISTS "Users can update own posts" ON posts;

-- Step 6: Create policies for profiles
CREATE POLICY "Public profiles are viewable by everyone." ON profiles
    FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile." ON profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile." ON profiles
    FOR UPDATE USING (auth.uid() = id);

-- Step 7: Create policies for posts
CREATE POLICY "Posts are viewable by everyone." ON posts
    FOR SELECT USING (true);

CREATE POLICY "Users can insert their own posts." ON posts
    FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can update own posts." ON posts
    FOR UPDATE USING (auth.uid() = author_id);

CREATE POLICY "Users can delete own posts." ON posts
    FOR DELETE USING (auth.uid() = author_id);

-- Step 8: Create function to automatically update updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Step 9: Create triggers to automatically update updated_at
DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at 
    BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_posts_updated_at ON posts;
CREATE TRIGGER update_posts_updated_at 
    BEFORE UPDATE ON posts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Step 10: Create function to automatically create profile when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
    -- Check if email column exists and insert accordingly
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'profiles' AND column_name = 'email'
    ) THEN
        INSERT INTO public.profiles (id, username, full_name, email)
        VALUES (
            new.id,
            COALESCE(new.email, 'user_' || substr(new.id::text, 1, 8)),
            COALESCE(new.raw_user_meta_data->>'full_name', new.email, 'User'),
            new.email
        );
    ELSE
        INSERT INTO public.profiles (id, username, full_name)
        VALUES (
            new.id,
            COALESCE(new.email, 'user_' || substr(new.id::text, 1, 8)),
            COALESCE(new.raw_user_meta_data->>'full_name', new.email, 'User')
        );
    END IF;
    RETURN new;
END;
$$;

-- Step 11: Create trigger to automatically create profile on user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Verification: Check the relationships
SELECT 
    'Migration completed successfully!' as status,
    (SELECT COUNT(*) FROM profiles) as profiles_count,
    (SELECT COUNT(*) FROM posts) as posts_count;

-- Show the foreign key relationship
SELECT 
    tc.constraint_name, 
    tc.table_name, 
    kcu.column_name, 
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name 
FROM 
    information_schema.table_constraints AS tc 
    JOIN information_schema.key_column_usage AS kcu
      ON tc.constraint_name = kcu.constraint_name
      AND tc.table_schema = kcu.table_schema
    JOIN information_schema.constraint_column_usage AS ccu
      ON ccu.constraint_name = tc.constraint_name
      AND ccu.table_schema = tc.table_schema
WHERE tc.constraint_type = 'FOREIGN KEY' 
    AND tc.table_name='posts' 
    AND kcu.column_name='author_id';
