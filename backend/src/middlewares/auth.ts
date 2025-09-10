import { NextFunction, Request, Response } from "express";
import { AppError } from "../lib/errors/AppError.ts";
import { asyncHandler } from "../lib/asyncHandler.ts";
import jwt  from "jsonwebtoken"
const JWT_SECRET = process.env.JWT_SECRET || "jwtsecret"

export const requireAuth = asyncHandler((req:Request,res:Response,next:NextFunction) =>{
    const auth  = req.headers.authorization;
    if(!auth) throw new AppError("No Authorization Header Found", 401,"NO_TOKEN")
    

    const token  = auth?.split(" ")[1]
    if(!token) throw new AppError("Malformed Token", 401,"NO_TOKEN")


    const payload = jwt.verify(token,JWT_SECRET) as any

    req.user = {userId:payload.userId, role:payload.role,email:payload.email}


    next();
})