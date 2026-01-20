import { Request, Response } from "express";
import { asyncHandler } from "../lib/asyncHandler.js";
import { AuthService } from "../services/auth.service.js";
import { AppError } from "../lib/errors/AppError.js";

export const registerController = asyncHandler(async (req: Request, res: Response) => {
   const { email, password, role } = req.body;
   if (!email || !password) throw new AppError("Email and password are required", 400, "MISSING_FIELDS");

   const result = await AuthService.register(email, password);
   return res.sendMessage(201, true, "User successfully registered", result);
});

export const loginController = asyncHandler(async (req: Request, res: Response) => {
   const { email, password } = req.body;
   if (!email || !password) throw new AppError("Email and password are required", 400, "MISSING_FIELDS");

   const result = await AuthService.login(email, password);
   return res.sendMessage(200, true, "User logged in successfully", result);
});

export const googleSyncController = asyncHandler(async (req: Request, res: Response) => {
   const user = req.user;
   if (!user || !user.email) throw new AppError("Google authentication failed", 401, "AUTH_FAILED");

   const result = await AuthService.googleSync(user.email, user.userId);
   return res.sendMessage(200, true, "User synced with Google successfully", result);
});

export const getOneUser = asyncHandler(async (req: Request, res: Response) => {
   const userId = req.user?.userId;
   if (!userId) throw new AppError("Authentication required", 401, "UNAUTHORIZED");

   const result = await AuthService.me(userId);
   return res.sendMessage(200, true, "User fetched successfully", result);
});

export const deleteAccountController = asyncHandler(async (req: Request, res: Response) => {
   const userId = req.user?.userId;
   if (!userId) throw new AppError("Authentication required", 401, "UNAUTHORIZED");

   await AuthService.deleteAccount(userId);
   return res.sendMessage(200, true, "Account deleted successfully");
});
