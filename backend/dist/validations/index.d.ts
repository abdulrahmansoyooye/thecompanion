import { z, ZodSchema } from "zod";
import { Request, Response, NextFunction } from "express";
export declare const userSchema: z.ZodObject<{
    username: z.ZodString;
    email: z.ZodString;
    role: z.ZodEnum<{
        DEVELOPER: "DEVELOPER";
        STUDENT: "STUDENT";
    }>;
}, z.core.$strip>;
export declare const validate: (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=index.d.ts.map