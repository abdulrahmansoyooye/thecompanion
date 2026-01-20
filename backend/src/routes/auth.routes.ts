import express from 'express';
import { userSchema, validate } from '../validations/index.ts';
import { deleteAccountController, getOneUser, googleSyncController, loginController, registerController } from '../controllers/auth.controller.ts';
import { requireAuth, verifyGoogleToken } from '../middlewares/auth.ts';

export const authRouter = express.Router();

authRouter.post("/register", validate(userSchema), registerController);
authRouter.post("/login", loginController);
authRouter.post("/google-sync", verifyGoogleToken, googleSyncController);
authRouter.get("/me", requireAuth, getOneUser);
authRouter.delete("/delete-account", requireAuth, deleteAccountController);
