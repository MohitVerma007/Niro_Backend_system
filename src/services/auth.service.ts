import { prisma } from '../config/prisma.js';
import { hashPassword   } from '../utils/password.js';

export async function findUserByEmail(email: string) {
    return await prisma.user.findUnique({
        where: {
            email: email,
        },
    });
}

export async function createUser(data: any) {
    const hashedPassword = await hashPassword(data.password);
    return await prisma.user.create({
        data: {
            name: data.name,
            email: data.email,
            password: hashedPassword,
        },
    });
}