import { Request, Response } from "express";
import { CompanionService } from "../services/companion.service.js";
import { asyncHandler } from "../lib/asyncHandler.js";
import { AppError } from "../lib/errors/AppError.js";

export const createCompanion = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?.userId;
    if (!userId) throw new AppError("Authentication required", 401, "UNAUTHORIZED");

    const payload = req.body;
    const companion = await CompanionService.create(userId, payload);
    return res.sendMessage(201, true, "Companion created successfully", companion);
});

export const updateCompanion = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const payload = req.body;
    const companion = await CompanionService.update(id as string, payload);
    return res.sendMessage(200, true, "Companion updated successfully", companion);
});

export const getCompanion = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const companion = await CompanionService.getOne(id as string);
    if (!companion) throw new AppError("Companion not found", 404, "NOT_FOUND");
    return res.sendMessage(200, true, "Companion fetched successfully", companion);
});

export const listCompanions = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?.userId;
    if (!userId) throw new AppError("Authentication required", 401, "UNAUTHORIZED");

    const companions = await CompanionService.list(userId);
    return res.sendMessage(200, true, "Companions fetched successfully", companions);
});

export const removeCompanion = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    await CompanionService.remove(id as string);
    return res.sendMessage(200, true, "Companion removed successfully");
});


export const addToHistory = asyncHandler(async (req: Request, res: Response) => {
     const userId = req.user?.userId;
    if (!userId) throw new AppError("Authentication required", 401, "UNAUTHORIZED");
    const { id } = req.params;

    await CompanionService.addToHistory(userId as string,id as string);
    return res.sendMessage(200, true, "Companion added to history successfully");
});


export const getHistory = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?.userId; 
    if (!userId) throw new AppError("Authentication required", 401, "UNAUTHORIZED");

    const history = await CompanionService.getHistory(userId as string,);
    return res.sendMessage(200, true, "History fetched successfully", history);
});