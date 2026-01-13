import { prisma } from "../lib/prisma.js";

export const ConversationService = {
    async create(userId: string, companionId: string) {
        return prisma.conversation.create({
            data: {
                userId,
                companionId,
            },
            include: {
                companion: true,
            },
        });
    },

    async list(userId: string) {
        return prisma.conversation.findMany({
            where: { userId },
            include: {
                companion: true,
            },
        });
    },

    async getOne(id: string, userId: string) {
        return prisma.conversation.findFirst({
            where: { id, userId },
            include: {
                companion: true,
                messages: {
                    orderBy: { createdAt: 'asc' }
                }
            },
        });
    },

    async createMessage(conversationId: string, role: string, content: string) {
        return prisma.message.create({
            data: {
                conversationId,
                role,
                content
            }
        });
    },

    async remove(id: string, userId: string) {

        return prisma.conversation.delete({
            where: { id, userId },
        });
    }
};
