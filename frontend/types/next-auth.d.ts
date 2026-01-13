import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
    interface Session {
        idToken?: string;
        backendToken?: string;
        user: {
            id: string;
            backendToken?: string;
        } & DefaultSession["user"];
    }

    interface User {
        backendToken?: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        idToken?: string;
        backendToken?: string;
    }
}