import {type Request, type Response, type NextFunction} from 'express';
import { verifyToken } from '../utils/jwt.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';
import { logger } from '../utils/logger.js';

export interface AuthenticatedRequest extends Request {  // Define a new interface that extends the Request interface from Express bcs 
    userId?: any;  // Add a new property userId to the interface, which will hold the user ID extracted from the JWT token and any is 
}

export function authenticateToken(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: 'Authorization header missing or malformed or Unauthorized access' });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: 'Authorization token missing' });
    }
    try {
        const decoded = verifyToken(token);
        req.userId = decoded.userId;  // Attach the user ID to the request object for use in subsequent middleware or route handlers
        next();
    } catch (error) {
        logger.error({ message: "❌ ERROR IN AUTHENTICATION:", error });
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: 'Invalid or expired token' });
    }



}
