
import express from 'express';
import { userSchema, validate } from '../validations/index.ts';
import { registerController } from '../controllers/authControllers.ts';

export const authRouter = express.Router();


authRouter.post("/register",validate(userSchema),registerController )
// authRouter.post("/login",)
// authRouter.get("/:id",)