// src/types/user.types.ts
import { type IUser } from '../interfaces/user.interface.js';

export type CreateUserInput = Omit<IUser, 'id'>; // ID db khud banayega
export type UpdateUserInput = Partial<Omit<CreateUserInput, 'email'>>; // Email update allow nahi kar rahe // partial mean ki jo bhi fields update karni ho wo optional ho jaye