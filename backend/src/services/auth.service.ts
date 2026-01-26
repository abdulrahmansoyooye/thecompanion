import { AppError } from "../lib/errors/AppError.js";
import { prisma } from "../lib/prisma.js";
import bcrypt from "bcrypt";
import { generateAcessToken } from "../utils/index.js";
import { companions } from "../constants/companions.js";


export const AuthService = {
    register: async (email: string, password: string) => {
        const existingUser = await prisma.user.findUnique({ where: { email } });

        if (existingUser) {
            throw new AppError("Email already registered", 400, "EMAIL_REGISTERED");
        }

        const passwordHash = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                email,
                passwordHash,
                // Or make it optional in schema
            }
        });

        const token = await generateAcessToken(user);
        return {
            user: { id: user.id, email: user.email },
            token
        };
    },

    login: async (email: string, password: string) => {
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user || !user.passwordHash) {
            throw new AppError("Invalid email or password", 401, "AUTH_FAILED");
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash);
        if (!isPasswordCorrect) {
            throw new AppError("Invalid email or password", 401, "AUTH_FAILED");
        }

        const token = await generateAcessToken(user);
        return {
            user: { id: user.id, email: user.email },
            token
        };
    },

    me: async (userId: string) => {
        const user = await prisma.user.findUnique({ where: { id: userId } });

        if (!user) {
            throw new AppError("User not found", 404, "NOT_FOUND");
        }

        return {
            user: { id: user.id, email: user.email }
        };
    },

    googleSync: async (email: string, userId: string) => {
        let user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            user = await prisma.user.create({
                data: {
                    email,
                    passwordHash: "",

                }
            });

            const defaultCompanion = companions[0];
            if (defaultCompanion) {
                await prisma.companion.createMany({
                    data: companions.map((companion) => {
                        return {
                            userId: user!.id,
                            ...companion
                        }
                    })
                });
            }
        }

        const token = await generateAcessToken(user);
        return {
            user: { id: user.id, email: user.email },
            token
        };
    },

    deleteAccount: async (userId: string) => {
        const user = await prisma.user.findUnique({ where: { id: userId } });

        if (!user) {
            throw new AppError("User not found", 404, "NOT_FOUND");
        }

        await prisma.user.delete({ where: { id: userId } });
        return true;
    }
};

