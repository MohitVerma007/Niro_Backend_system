// src/interfaces/post.interface.ts
import { type IUser } from './user.interface.js';

export interface IPost {
  id: number;
  title: string;
  content: string;
  userId: number;
  tags: string; // Prisma me String hai, to comma-separated string store hogi
}

// Jab Post ke sath uske Author (User) ki details bhi chahiye hon
export interface IPostWithUser extends IPost {
  user: Omit<IUser, 'password'>; // Security ke liye user ka password include nahi karenge
}