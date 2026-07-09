import {prisma} from '../config/prisma.js';


export async function getAllPosts(){
    return await prisma.post.findMany({})
}

export async function createPost(data: any) {
    return await prisma.post.create({
        data: {
            title: data.title,
            content: data.content,
            userId: data.userId,
            tags: data.tags,
        }
    })
}