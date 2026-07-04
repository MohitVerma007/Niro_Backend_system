import { type Request, type Response } from 'express';  // here type is used to import only the types from the express module, which helps in reducing the bundle size and improving performance.
import * as Authservice from '../services/auth.service.js' //astrik use for importing all the functions from the auth.service module
import { generateToken } from '../utils/jwt.js';
import { comparePassword } from '../utils/password.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';
import { logger } from '../utils/logger.js';

export async function register(req: Request, res: Response) {
    try {
        const existingUser = await Authservice.findUserByEmail(req.body.email);
        if (existingUser) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'User already exists' });
        }

        const newUser = await Authservice.createUser(req.body);
        const token = generateToken({ userId: newUser.id }); // error here, userId is not defined in the newUser object, it should be newUser.id instead of newUser.userId

        res.status(HTTP_STATUS.CREATED).json({ user:{ id: newUser.id, name: newUser.name, email: newUser.email }, token });
    } catch (error) {
        logger.error("❌ ERROR IN REGISTER:", error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: 'Something went wrong' });
    }

}

export async function login(req: Request, res: Response) {
    try {
        const user = await Authservice.findUserByEmail(req.body.email);
        if (!user) {
            return res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'User not found' });
        }

        const isPasswordValid = await comparePassword(req.body.password, user.password);
        if (!isPasswordValid) {
            return res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: 'Invalid password' });
        }

        const token = generateToken({ userId: user.id });

        res.status(HTTP_STATUS.OK).json({ user: { id: user.id, name: user.name, email: user.email }, token });
    } catch (error) {
        logger.error("❌ ERROR IN LOGIN:", error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: 'Something went wrong' });
    }
}