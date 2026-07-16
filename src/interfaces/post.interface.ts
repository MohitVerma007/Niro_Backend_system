// src/interfaces/post.interface.ts
import { type IUser } from './user.interface.js';

export interface IPost {
  id: number;
  title: string;
  content: string;
  userId: number;
  tags: string;
}

export interface IPostWithUser extends IPost {
  user: Omit<IUser, 'password'>; 
}