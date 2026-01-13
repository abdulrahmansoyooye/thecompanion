import { Request, Response, NextFunction } from "express";
import { AppError } from "../lib/errors/AppError.js";
import logger from "../lib/logger.js";

export const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
    logger.error(`[${err.code || 'ERROR'}] ${err.message}`, {
        stack: err.stack,
        path: req.path,
        method: req.method
    });

    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            code: err.code,
        });
    }

    // Default error
    return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        code: "INTERNAL_ERROR",
    });
};
