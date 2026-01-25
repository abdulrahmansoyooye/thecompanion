interface CompanionPayload {
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
export declare const CompanionService: {
    create(userId: string, payload: CompanionPayload): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        userId: string;
        icon: string;
        subject: string;
        topic: string;
        voiceType: string;
        iconColor: string;
        style: string;
        duration: number;
        language: string;
        updatedAt: Date;
    }>;
    list(userId: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        userId: string;
        icon: string;
        subject: string;
        topic: string;
        voiceType: string;
        iconColor: string;
        style: string;
        duration: number;
        language: string;
        updatedAt: Date;
    }[]>;
    getOne(id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        userId: string;
        icon: string;
        subject: string;
        topic: string;
        voiceType: string;
        iconColor: string;
        style: string;
        duration: number;
        language: string;
        updatedAt: Date;
    } | null>;
    update(id: string, payload: Partial<CompanionPayload>): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        userId: string;
        icon: string;
        subject: string;
        topic: string;
        voiceType: string;
        iconColor: string;
        style: string;
        duration: number;
        language: string;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        userId: string;
        icon: string;
        subject: string;
        topic: string;
        voiceType: string;
        iconColor: string;
        style: string;
        duration: number;
        language: string;
        updatedAt: Date;
    }>;
    addToHistory(userId: string, id: string): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        companionId: string;
    }>;
};
export {};
//# sourceMappingURL=companion.service.d.ts.map