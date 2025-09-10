import express from "express"
import { createComapanion } from "../controllers/comapanion.controllers.ts";

const companionRouter = express.Router();

companionRouter.post("/create/companions",createComapanion)

companionRouter.get("/companions",createComapanion)
companionRouter.get("/companions/:id",createComapanion)

companionRouter.put("/companions/:id",createComapanion)
companionRouter.delete("/companions/:id",createComapanion)

