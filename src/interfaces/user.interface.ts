// src/interfaces/user.interface.ts
import { type IPost } from './post.interface.js'; // here we used type-only import to avoid circular dependency issues
import { type IProduct } from './product.interface.js';

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

export interface IUserWithProducts extends IUser {
  products: IProduct[];
}