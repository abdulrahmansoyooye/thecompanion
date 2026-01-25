"use client";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";
import { SessionWatcher } from "../auth/SessionWatcher";

export function Providers({ children, session }: { children: React.ReactNode, session?: any }) {
    return (
        <SessionProvider session={session}>
            <Toaster position="top-center" richColors />
            <SessionWatcher />
            {children}
        </SessionProvider>
    );
}
