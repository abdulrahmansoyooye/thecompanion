export declare const AuthService: {
    register: (email: string, password: string) => Promise<{
        user: {
            id: string;
            email: string;
        };
        token: string;
    }>;
    login: (email: string, password: string) => Promise<{
        user: {
            id: string;
            email: string;
        };
        token: string;
    }>;
    me: (userId: string) => Promise<{
        user: {
            id: string;
            email: string;
        };
    }>;
    googleSync: (email: string, userId: string) => Promise<{
        user: {
            id: string;
            email: string;
        };
        token: string;
    }>;
    deleteAccount: (userId: string) => Promise<boolean>;
};
//# sourceMappingURL=auth.service.d.ts.map