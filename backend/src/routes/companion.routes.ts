import express from "express"
import { createComapanion } from "../controllers/comapanion.controllers.ts";
import { requireAuth } from "../middlewares/auth.ts";

export const companionRouter = express.Router();



companionRouter.post("/create",createComapanion)

companionRouter.get("/",createComapanion)
companionRouter.get("/:id",createComapanion)

companionRouter.put("/:id",createComapanion)
companionRouter.delete("/:id",createComapanion)

