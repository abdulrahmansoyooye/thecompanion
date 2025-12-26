import { AppError } from "../lib/errors/AppError.ts";
import { prisma } from "../lib/prisma.ts"
import bcrypt from "bcrypt"
import { generateAcessToken } from "../utils/index.ts";
export const AuthService = {
    register: async (email: string, passowrd: string, role: string) => {
        const existingUser = await prisma.user.findUnique({ where: { email } });

        if (existingUser) throw new AppError("Email already registered", 400, "EMAIL_REGISTERED");

        const passwordHash = await bcrypt.hash(passowrd, 10);
        const user =await prisma.user.create({
            data: {
                email,
                passwordHash,
                role
            }
        })


        const token = await generateAcessToken(user)
        return { user: { id: ( user).id, email: ( user).email, role: ( user).role }, token }

    },

      login: async (email: string, passowrd: string,) => {
        const user =await  prisma.user.findUnique({ where: { email } });


        if (!user) throw new AppError("Invalid email", 401, "AUTH_FAILED");

        const ok = await bcrypt.compare(passowrd, user.passwordHash);
        if (!ok) throw new AppError("Invalid password", 401, "AUTH_FAILED");
        


        const token = await generateAcessToken(user)
        return { user: { id: ( user).id, email: ( user).email, role: ( user).role }, token }
    },
    me: async (userId:string ) => {
        const user = await prisma.user.findUnique({ where: { id:userId } });

        if (!user) throw new AppError("User not found", 404, "NOT_FOUND");

        return { user: { id: ( user).id, email: ( user).email, role: ( user).role }}
    }
}
