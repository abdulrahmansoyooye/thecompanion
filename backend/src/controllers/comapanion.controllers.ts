import { Request, Response } from "express";
import { ComapnionService } from "../services/companion.services.ts";
import { asyncHandler } from "../lib/asyncHandler.ts";

export const createComapanion  = asyncHandler(async(req:Request, res:Response)=>{
    const userId = req.user?.userId;
    const payload = req.body;
    const comp = await ComapnionService.create(userId,payload);
    return res.sendMessage(201,true,"Companion created Sucessfully", comp)
})