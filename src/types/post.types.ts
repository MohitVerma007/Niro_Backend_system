import {type IPost} from '../interfaces/post.interface.js';

export type CreatePostInput = Omit<IPost, 'id'>; // Create ID by database automatically, so we omit it from the input type
export type UpdatePostInput = Partial<Omit<CreatePostInput, 'id'>>; // here partial means that all fields are optional, and we omit 'id' because it should not be updated

export type PostFilters = {
  tag?: string;
  search?: string;
};