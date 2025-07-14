export interface PostAuthor {
    id: string;
    username: string;
    fullName?: string;
    avatarUrl?: string;
}

export interface Post {
    id: string;
    title: string;
    content: string;
    authorId: string;
    author?: PostAuthor;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreatePostRequest {
    title: string;
    content: string;
    authorId: string;
}