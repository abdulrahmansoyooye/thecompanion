import { z, ZodSchema } from "zod";
import { Request, Response, NextFunction } from "express";

export const userSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long")
    .max(30, "Username must be at most 30 characters long")
    .trim(),
  email: z.string()
    .email("Invalid email format")
    .toLowerCase(),
  role: z.enum(["DEVELOPER", "STUDENT"]),
});

export const validate = (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: error.issues.map(err => ({
          path: err.path.join("."),
          message: err.message
        }))
      });
    }
    next(error);
  }
};
