import { Request, Response, NextFunction } from "express";

export const responseMiddleware = (req: Request, res: Response, next: NextFunction) => {
    res.sendMessage = (statusCode: number, success: boolean, message: string, data: any = null) => {
        return res.status(statusCode).json({
            success,
            message,
            data,
        });
    };
    next();
};
