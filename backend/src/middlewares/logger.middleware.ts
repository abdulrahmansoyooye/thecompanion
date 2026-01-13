import { Request, Response, NextFunction } from 'express';
import logger from '../lib/logger.js';

export const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const start = Date.now();

    res.on('finish', () => {
        const duration = Date.now() - start;
        const { method, originalUrl, ip } = req;
        const { statusCode } = res;

        const message = `${method} ${originalUrl} ${statusCode} ${duration}ms - ${ip}`;

        if (statusCode >= 500) {
            logger.error(message);
        } else if (statusCode >= 400) {
            logger.warn(message);
        } else {
            logger.http(message);
        }
    });

    next();
};
