import { Request, Response } from "express";
import { asyncHandler } from "../lib/asyncHandler.js";
import { ConversationService } from "../services/conversation.service.js";
import { AppError } from "../lib/errors/AppError.js";

export const createConversation = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?.userId;
    const { companionId } = req.body;

    if (!userId) throw new AppError("Authentication required", 401, "UNAUTHORIZED");
    if (!companionId) throw new AppError("Companion ID is required", 400, "MISSING_FIELDS");

    const conversation = await ConversationService.create(userId, companionId);
    return res.sendMessage(201, true, "Conversation started successfully", conversation);
});

export const listConversations = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?.userId;
    if (!userId) throw new AppError("Authentication required", 401, "UNAUTHORIZED");

    const conversations = await ConversationService.list(userId);
    return res.sendMessage(200, true, "Conversations fetched successfully", conversations);
});

export const getConversation = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?.userId;
    const { id } = req.params;

    if (!userId) throw new AppError("Authentication required", 401, "UNAUTHORIZED");

    const conversation = await ConversationService.getOne(id!, userId);
    if (!conversation) throw new AppError("Conversation not found", 404, "NOT_FOUND");

    return res.sendMessage(200, true, "Conversation fetched successfully", conversation);
});

export const addMessageToConversation = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?.userId;
    const { id } = req.params;
    const { role, content } = req.body;

    if (!userId) throw new AppError("Authentication required", 401, "UNAUTHORIZED");
    if (!role || !content) throw new AppError("Role and content are required", 400, "MISSING_FIELDS");

    // Verify ownership
    const conversation = await ConversationService.getOne(id!, userId);
    if (!conversation) throw new AppError("Conversation not found", 404, "NOT_FOUND");

    const message = await ConversationService.createMessage(id!, role, content);
    return res.sendMessage(201, true, "Message added successfully", message);
});

export const removeConversation = asyncHandler(async (req: Request, res: Response) => {

    const userId = req.user?.userId;
    const { id } = req.params;

    if (!userId) throw new AppError("Authentication required", 401, "UNAUTHORIZED");

    await ConversationService.remove(id!, userId);
    return res.sendMessage(200, true, "Conversation removed successfully");
});
