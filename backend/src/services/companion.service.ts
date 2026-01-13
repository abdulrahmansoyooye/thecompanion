import { prisma } from "../lib/prisma.js";

interface CompanionPayload {
   name: string;
   icon: string;
   iconImage: string;
   topic: string;
   voiceType: string;
   style: string;
   language: string; // Fix typo from schema if applicable, or keep as is if restricted by DB
   mode: string;
}

export const CompanionService = {
   async create(userId: string, payload: CompanionPayload) {
      return prisma.companion.create({
         data: {
            userId,
            ...payload
         }
      });
   },

   async list(userId: string) {
      return prisma.companion.findMany({
         where: { userId }
      });
   },

   async getOne(id: string) {
      return prisma.companion.findUnique({
         where: { id }
      });
   },

   async update(id: string, payload: Partial<CompanionPayload>) {
      return prisma.companion.update({
         where: { id },
         data: payload
      });
   },

   async remove(id: string) {
      return prisma.companion.delete({
         where: { id }
      });
   }
};
