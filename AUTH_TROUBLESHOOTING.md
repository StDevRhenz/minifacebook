# 🔧 Authentication Error Solutions

## Current Error: `access_denied&error_code=otp_expired`

This error occurs when the email verification link has expired or is invalid.

### 🚀 Quick Solutions:

#### Option 1: Use Demo Mode (Immediate)
The app now works in demo mode without Supabase configuration. Just try registering again!

#### Option 2: Disable Email Confirmation (Recommended for Development)
1. Go to your Supabase project: https://app.supabase.com/
2. Navigate to **Authentication** → **Settings**
3. Scroll to **Email confirmation**
4. **Disable** "Enable email confirmations"
5. Try registering again

#### Option 3: Handle Email Verification Properly
1. Make sure your redirect URL in Supabase matches: `http://localhost:3001/auth/callback`
2. Check your Authentication → URL Configuration in Supabase
3. Add `http://localhost:3001/**` to your allowed redirect URLs

### 🔍 What Each Error Means:

- `otp_expired`: The email verification link has expired (usually after 1 hour)
- `access_denied`: The authentication request was rejected
- `invalid_request`: The authentication parameters are malformed

### 💡 Best Practices:

1. **For Development**: Disable email confirmation in Supabase
2. **For Production**: Set up proper email templates and redirect URLs
3. **For Demo**: Use the built-in demo mode (no Supabase required)

### 📧 Email Configuration:
If you want to keep email confirmation enabled:
1. Set up custom SMTP in Supabase (optional)
2. Configure proper redirect URLs
3. Test the full email flow

The app now handles all these cases gracefully with helpful error messages and fallback options!
