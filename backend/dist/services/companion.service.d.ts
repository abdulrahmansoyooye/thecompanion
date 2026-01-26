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
    }>;
    addToHistory(userId: string, id: string): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        companionId: string;
    }>;
};
//# sourceMappingURL=companion.service.d.ts.map