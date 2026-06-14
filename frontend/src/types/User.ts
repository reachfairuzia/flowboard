export interface User {
    id: string;
    name: string;
    email: string;
    avatarUrl: string;
    bio: string;
}

export interface UserPayload {
    id?: string;
    name: string;
    email: string;
    avatar_url?: string;
    bio?: string;
}