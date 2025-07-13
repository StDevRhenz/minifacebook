export interface User {
  id: string;
  email: string;
  username: string;
  createdAt: Date;
}

export interface Post {
  id: string;
  content: string;
  imageUrl?: string;
  userId: string;
  user: User;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreatePostData {
  content: string;
  imageUrl?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  username: string;
  password: string;
}