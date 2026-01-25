export declare const ConversationService: {
    create(userId: string, companionId: string): Promise<any>;
    list(userId: string): Promise<any>;
    getOne(id: string, userId: string): Promise<any>;
    createMessage(conversationId: string, role: string, content: string): Promise<any>;
    remove(id: string, userId: string): Promise<any>;
};
//# sourceMappingURL=conversation.service.d.ts.map