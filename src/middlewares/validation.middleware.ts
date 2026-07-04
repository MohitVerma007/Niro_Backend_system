import { type Request, type Response, type NextFunction } from 'express';
import { type ZodSchema, ZodError } from 'zod';
import { HTTP_STATUS } from '../constants/httpStatus.js';

export function validateRequest(schema: ZodSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const validated = schema.parse(req.body);
            req.body = validated; // Replace req.body with validated data
            next();
        } catch (error: any) {
            if (error instanceof ZodError) {
                const errors = error.issues.map((err: any) => ({
                    field: err.path.join('.') || 'unknown',
                    message: err.message
                }));
                return res.status(HTTP_STATUS.BAD_REQUEST).json({
                    message: 'Validation failed',
                    errors
                });
            }
            return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
                message: 'Validation error'
            });
        }
    };
}
