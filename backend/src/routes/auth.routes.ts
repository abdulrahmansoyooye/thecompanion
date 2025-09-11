
import express from 'express';
import { userSchema, validate } from '../validations/index.ts';
import { getOneUser, loginController, registerController } from '../controllers/auth.controller.ts';

export const authRouter = express.Router();


authRouter.post("/register",registerController )
authRouter.post("/login",loginController)
authRouter.get("/:id",getOneUser)