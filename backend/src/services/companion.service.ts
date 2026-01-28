import { prisma } from "../lib/prisma.js";

export interface CompanionPayload {
   name: string;
   icon: string;
   subject: string;
   topic: string;
   voiceType: string;
   iconColor: string;
   style: string;
   language: string;
   duration: number;
}

export const CompanionService = {
   async create(userId: string, payload: CompanionPayload) {
      return prisma.companion.create({
         
         data: {
            userId,
            ...payload

         },
      });
   },

   async list(userId: string) {
      return prisma.companion.findMany({
         orderBy: {
            createdAt: 'desc'
         },
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
   },
   async addToHistory(userId: string, id: string) {
      return prisma.history.create({
         data: {
            userId,
            companionId: id
         }
      })
   },
   async getHistory(userId: string) {
      const history = await prisma.history.findMany({
         where: { userId}
      });

      return prisma.companion.findMany({
         orderBy: {
            createdAt: 'desc'
         },
         where: { id: { in: history.map((h) => h.companionId) } }
      });
   }
};
