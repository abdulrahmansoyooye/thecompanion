import jwt from "jsonwebtoken";
import { AppError } from "../lib/errors/AppError.js"
import { config } from "../config/index.js";

export const messageHandler = (message: string, success: boolean, statusCode: number, data: any) => {

  return { message, success, statusCode, data }

}



export const generateAccessToken = async (
  payload: object,
  expiresIn: string | number = "15m"
) => {
  const secret = config.jwtSecret;
  if (!secret) {
    throw new AppError("JWT_SECRET is missing in config", 500, "JWT_MISSING");
  }

  return jwt.sign(payload, secret);
}
