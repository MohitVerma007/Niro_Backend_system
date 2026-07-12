// src/interfaces/user.interface.ts
import { type IPost } from './post.interface.js'; // here we used type-only import to avoid circular dependency issues

export interface IUser {
  id: number;
  name: string;
  email: string;
  password?: string; // Optional tak ki query ke baad password hide kiya ja sake
}

// Jab User ke sath uske saare posts bhi load karne hon
export interface IUserWithPosts extends IUser {
  posts: IPost[];
}