import express from "express";
import {
    createCompanion,
    listCompanions,
    getCompanion,
    updateCompanion,
    removeCompanion
} from "../controllers/companion.controller.js";

export const companionRouter = express.Router();

companionRouter.post("/create", createCompanion);
companionRouter.get("/", listCompanions);
companionRouter.get("/:id", getCompanion);
companionRouter.put("/:id", updateCompanion);
companionRouter.delete("/:id", removeCompanion);


