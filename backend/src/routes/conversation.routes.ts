import express from "express";
import {
    createConversation,
    listConversations,
    getConversation,
    addMessageToConversation,
    removeConversation

} from "../controllers/conversation.controller.js";
import { requireAuth } from "../middlewares/auth.js";

export const conversationRouter = express.Router();

// All conversation routes require authentication
conversationRouter.use(requireAuth);

conversationRouter.post("/", createConversation);
conversationRouter.get("/", listConversations);
conversationRouter.get("/:id", getConversation);
conversationRouter.post("/:id/messages", addMessageToConversation);
conversationRouter.delete("/:id", removeConversation);

