import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
    PORT: z.string().default("4000"),
    DATABASE_URL: z.string().url(),
    JWT_SECRET: z.string(),
    GOOGLE_CLIENT_ID: z.string().optional(),
    GOOGLE_CLIENT_SECRET: z.string().optional(),
    CLOUDINARY_CLOUD_NAME: z.string().optional(),
    CLOUDINARY_API_KEY: z.string().optional(),
    CLOUDINARY_API_SECRET: z.string().optional(),
    NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
});

const envVars = envSchema.safeParse(process.env);

if (!envVars.success) {
    console.error("❌ Invalid environment variables:", envVars.error.format());
    process.exit(1);
}

export const config = {
    port: parseInt(envVars.data.PORT, 10),
    databaseUrl: envVars.data.DATABASE_URL,
    jwtSecret: envVars.data.JWT_SECRET,
    google: {
        clientId: envVars.data.GOOGLE_CLIENT_ID,
        clientSecret: envVars.data.GOOGLE_CLIENT_SECRET,
    },
    cloudinary: {
        cloudName: envVars.data.CLOUDINARY_CLOUD_NAME,
        apiKey: envVars.data.CLOUDINARY_API_KEY,
        apiSecret: envVars.data.CLOUDINARY_API_SECRET,
    },
    nodeEnv: envVars.data.NODE_ENV,
};

