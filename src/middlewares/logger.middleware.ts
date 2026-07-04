import { type Request, type Response, type NextFunction } from 'express';
import { logger } from '../utils/logger.js';

export function loggerMiddleware(req: Request, res: Response, next: NextFunction) {
    const startTime = Date.now();

    // Capture the original res.json to log after response is sent
    const originalJson = res.json.bind(res);

    res.json = function (data: any) {
        const duration = Date.now() - startTime;

        logger.info({
            method: req.method,
            url: req.url,
            statusCode: res.statusCode,
            duration: `${duration}ms`,
            timestamp: new Date().toISOString(),
            body: req.body,
            response: data
        });

        return originalJson(data);
    };

    next();
}
