import { NextFunction, Request, Response } from "express";
import { AppError } from "../lib/errors/AppError.js";
import { asyncHandler } from "../lib/asyncHandler.js";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import { config } from "../config/index.js";

const client = new OAuth2Client(config.google.clientId);

export const requireAuth = asyncHandler((req: Request, res: Response, next: NextFunction) => {
    const auth = req.headers.authorization;
    if (!auth) throw new AppError("No Authorization Header Found", 401, "NO_TOKEN");

    const token = auth.split(" ")[1];
    if (!token) throw new AppError("Malformed Token", 401, "NO_TOKEN");

    try {

        const payload = jwt.verify(token, config.jwtSecret) as any;
        req.user = { userId: payload.id, email: payload.email };
        next();
    } catch (error) {
        console.log(error);
        throw new AppError("Invalid or Expired Token", 401, "INVALID_TOKEN");
    }
});

export const verifyGoogleToken = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const auth = req.headers.authorization;
    if (!auth) throw new AppError("No Authorization Header Found", 401, "NO_TOKEN");

    const token = auth.split(" ")[1];
    if (!token) throw new AppError("Malformed Token", 401, "NO_TOKEN");

    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: config.google.clientId!,
        });

        const payload = ticket.getPayload();
        if (!payload) throw new AppError("Invalid Google Token", 401, "NO_TOKEN");

        req.user = { userId: payload.sub, email: payload.email! };
        next();
    } catch (error) {
        console.error("Google Token Verification Error:", error);
        throw new AppError("Google Token Verification Failed", 401, "INVALID_TOKEN");
    }
});


