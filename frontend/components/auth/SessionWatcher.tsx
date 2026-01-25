"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { LogOut, ShieldAlert } from "lucide-react";

export function SessionWatcher() {
    const { data: session, status } = useSession();
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        // If we were authenticated but now we aren't, and it's not a manual logout
        // (NextAuth sets status to 'unauthenticated' when token expires or session is cleared)
        if (status === "unauthenticated" && !localStorage.getItem("manual_logout")) {
            // Check if we previously had a session to avoid showing this on first load for guests
            if (document.cookie.includes("next-auth.session-token") || document.cookie.includes("__Secure-next-auth.session-token")) {
                setShowModal(true);
            }
        }
    }, [status]);

    const handleLogout = () => {
        localStorage.removeItem("manual_logout");
        signOut({ callbackUrl: "/sign-in" });
    };

    return (
        <AlertDialog open={showModal} onOpenChange={setShowModal}>
            <AlertDialogContent className="bg-white rounded-4xl border-none shadow-2xl max-w-md p-8">
                <AlertDialogHeader className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mb-6">
                        <ShieldAlert size={32} />
                    </div>
                    <AlertDialogTitle className="text-2xl font-bold text-gray-900">Session Expired</AlertDialogTitle>
                    <AlertDialogDescription className="text-gray-500 font-medium text-base mt-2">
                        Your secure session has ended. To keep your account safe, please log in again to continue.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="mt-8">
                    <AlertDialogAction
                        onClick={handleLogout}
                        className="w-full bg-[#FF5B37] hover:bg-[#e64d2b] text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-orange-500/10 flex items-center justify-center gap-2 border-none h-auto"
                    >
                        <LogOut size={18} />
                        Sign In Again
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
