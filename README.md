# MiniFacebook 🚀

A modern social media application built with Next.js and Supabase. This project is ideal for learning CRUD operations, authentication, and client-server architecture.

## Features ✨

**Users can:**
- **Sign up / log in** with secure authentication
- **Create posts** with titles and content
- **View others' posts** in a beautiful timeline
- **Delete their own posts**
- **Manage their profile** with custom information

## Technologies Used 🛠️

- **Next.js** - React framework
- **TypeScript** - Type safety
- **Supabase** - Backend-as-a-Service (PostgreSQL)
- **Authentication** - Built-in Supabase Auth
- **CSS** - Custom Midnight Bloom theme

## Quick Setup 🏃‍♂️

### 1. Database Setup
```bash
# Navigate to database folder
cd database

# Follow instructions in database/README.md
# Run database-setup.sql in your Supabase SQL Editor
```

### 2. Environment Variables
Create a `.env.local` file:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Install & Run
```bash
npm install
npm run dev
```
