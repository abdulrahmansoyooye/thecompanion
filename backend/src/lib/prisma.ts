import { PrismaClient } from "@prisma/client";

const prismaGlobal = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  prismaGlobal.prisma ||
  (prismaGlobal.prisma = new PrismaClient({
    log: ["query", "error", "warn"],
  }));