// src/types/user.types.ts
import { type IUser } from '../interfaces/user.interface.js';

export type CreateUserInput = Omit<IUser, 'id'>; 
export type UpdateUserInput = Partial<Omit<CreateUserInput, 'email'>>; 