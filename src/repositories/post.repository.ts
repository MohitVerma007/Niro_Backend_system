import {prisma} from '../config/prisma.js';
import {type CreatePostInput, type UpdatePostInput, type PostFilters} from '../types/post.types.js';
import {type IPost, type IPostWithUser} from '../interfaces/post.interface.js';

export const postRepository = {
  async create(data: CreatePostInput): Promise<IPost> {
    return await prisma.post.create({ data });
  },

  // Filters ke sath posts search karna (Tag filter ya Title search)
// 🛠️ FIX: Dynamic where clause builder to prevent Prisma validation runtime crashes
  async findAll(filters?: PostFilters): Promise<IPostWithUser[]> {
    const whereClause: any = {};

    if (filters) {
      const conditions: any[] = [];

      // Agar tag bhej rahe hain
      if (filters.tag) {
        conditions.push({
          tags: {
            contains: filters.tag,
          },
        });
      }

      // Agar search title text bhej rahe hain
      if (filters.search) {
        conditions.push({
          title: {
            contains: filters.search,
            mode: 'insensitive', // Case insensitive search
          },
        });
      }

      // Agar conditions array me kuch add hua hai, tabhi AND apply karein
      if (conditions.length > 0) {
        whereClause.AND = conditions;
      }
    }

    // Clear query execution
    return await prisma.post.findMany({
      where: whereClause,
      include: {
        user: {
          select: { id: true, name: true, email: true }
        }
      }
    }) as IPostWithUser[];
  },

  async findById(id: number): Promise<IPostWithUser | null> {
    return await prisma.post.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, name: true, email: true } }
      }
    }) as IPostWithUser | null;
  },

  async delete(id: number): Promise<IPost> {
    return await prisma.post.delete({ where: { id } });
  }
};