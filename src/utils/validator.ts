export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
    return password.length >= 6; // Password must be at least 6 characters long
};

export const validateUsername = (username: string): boolean => {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/; // Username must be 3-20 characters long and can include letters, numbers, and underscores
    return usernameRegex.test(username);
};

export const validatePostContent = (content: string): boolean => {
    return content.trim().length > 0; // Post content must not be empty
};