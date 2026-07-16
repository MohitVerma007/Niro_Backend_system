import {type IPost} from '../interfaces/post.interface.js';

export type CreatePostInput = Omit<IPost, 'id'>; 
export type UpdatePostInput = Partial<Omit<CreatePostInput, 'id'>>; 

export type PostFilters = {
  tag?: string;
  search?: string;
};