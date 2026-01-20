"use client";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";

export function Providers({ children, session }: { children: React.ReactNode, session?: any }) {
    return (
        <SessionProvider session={session}>
            <Toaster position="top-center" richColors />
            {children}
        </SessionProvider>
    );
}
