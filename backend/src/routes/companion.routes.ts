import express from "express";
import {
    createCompanion,
    listCompanions,
    getCompanion,
    updateCompanion,
    removeCompanion,
    addToHistory,
    getHistory
} from "../controllers/companion.controller.js";

export const companionRouter = express.Router();

companionRouter.post("/create", createCompanion);
companionRouter.get("/", listCompanions);
companionRouter.get("/:id", getCompanion);
companionRouter.put("/:id", updateCompanion);
companionRouter.delete("/:id", removeCompanion);
companionRouter.get("/history", getHistory);
companionRouter.post("/add-to-history/:id",addToHistory)


