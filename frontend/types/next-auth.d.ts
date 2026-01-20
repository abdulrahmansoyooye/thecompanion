import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User {
    backendToken?: string;
    backendUserId?: string;
  }

  interface Session {
    backendToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    backendToken?: string;
    userId?: string;
  }
}