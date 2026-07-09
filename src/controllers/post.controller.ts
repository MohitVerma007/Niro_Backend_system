import {type Request, type Response} from 'express';
import * as PostService from '../services/post.service.js';
import {HTTP_STATUS} from '../constants/httpStatus.js';
import {logger} from '../utils/logger.js';

export async function createPost(req: Request, res: Response){
    try {
        const newPost = await PostService.createPost(req.body);
        res.status(HTTP_STATUS.CREATED).json({ post: newPost});

    } catch (error) {
        logger.error({ message: "❌ ERROR IN CREATE POST:", error });
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: 'Something went wrong' });
    }
}

export async function getAllPost(req: Request, res: Response){
    try {
        const posts = await PostService.getAllPosts();
        res.status(HTTP_STATUS.OK).json({ posts: posts});
    } catch (error) {
        logger.error({ message: "❌ ERROR IN GET ALL POST:", error });
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: 'Something went wrong'});
    }
}

// export async function getPostById(req: Request, res: Response){
//     try {
//         const postId = req.params.id;
//         const post = await PostService.getPostById(postId);
//         if (!post) {
//             return res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'Post not found' });
//         }
//         res.status(HTTP_STATUS.OK).json({ post: post });
//     } catch (error) {
//         logger.error({ message: "❌ ERROR IN GET POST BY ID:", error });
//         res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: 'Something went wrong' });
//     }
// }           