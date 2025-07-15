# MiniFacebook Database Setup

## 🚀 Quick Setup

Your database is ready to deploy! Follow these simple steps:

### 1. **Copy the SQL Script**
- Open `database-setup.sql` in this folder
- Copy all the contents (Ctrl+A, Ctrl+C)

### 2. **Run in Supabase**
- Go to your [Supabase Dashboard](https://supabase.com/dashboard)
- Navigate to your project
- Go to the **SQL Editor** tab
- Paste the copied SQL script
- Click **Run** to execute

### 3. **Verify Setup**
The script will automatically:
- ✅ Create all necessary tables
- ✅ Set up proper relationships
- ✅ Configure security policies
- ✅ Enable automatic profile creation
- ✅ Add timestamp triggers
- ✅ Show verification results

---

## 📊 Database Structure

### **Tables Created:**

#### `profiles`
```sql
- id (UUID) - Links to auth.users
- username (TEXT, unique)
- full_name (TEXT)
- bio (TEXT)
- avatar_url (TEXT)
- website (TEXT)
- location (TEXT)
- email (TEXT)
- created_at, updated_at (timestamps)
```

#### `posts`
```sql
- id (UUID, primary key)
- title (TEXT)
- content (TEXT)
- author_id (UUID) - Links to profiles
- created_at, updated_at (timestamps)
```

---

## 🔒 Security Features

- **Row Level Security (RLS)** enabled on all tables
- **Public read access** for posts and profiles
- **Users can only modify their own data**
- **Automatic cascade deletion** when users are removed

---

## ⚡ Automatic Features

1. **Auto Profile Creation**: When users sign up, a profile is automatically created
2. **Auto Timestamps**: `updated_at` is automatically updated when records change
3. **Safe Migration**: Script can be run multiple times without breaking anything

---

## 🛠 Development Notes

- This script handles both **new** and **existing** databases
- Includes comprehensive error handling
- Uses UTC timezone for all timestamps
- Optimized for your MiniFacebook application

---

## 📝 Next Steps

After running the database setup:

1. **Update your Supabase environment variables** in your Next.js app
2. **Test user registration** to verify auto-profile creation
3. **Test posting** to verify the relationship between users and posts
4. **Check the verification output** in the SQL Editor to confirm everything is working

---

## 🆘 Troubleshooting

If you encounter any issues:

1. **Check the SQL Editor output** for any error messages
2. **Verify your Supabase project is active**
3. **Ensure you have proper permissions** in your Supabase project
4. **The script is safe to re-run** if something goes wrong

---

*This database setup is production-ready and includes all best practices for a social media application.*
