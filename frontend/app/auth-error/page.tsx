"use client";

import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ShieldAlert, ArrowLeft, RefreshCw, Home } from "lucide-react";

const AuthErrorContent = () => {
    const searchParams = useSearchParams();
    const error = searchParams.get("error");

    const getErrorMessage = (errorCode: string | null) => {
        switch (errorCode) {
            case "Configuration":
                return "There is a problem with the server configuration. Please try again later.";
            case "AccessDenied":
                return "Access denied. You do not have permission to view this page.";
            case "Verification":
                return "The verification link has expired or has already been used.";
            case "OAuthSignin":
            case "OAuthCallback":
            case "OAuthCreateAccount":
            case "EmailSignin":
            case "Callback":
                return "An error occurred during the authentication process. Please try again.";
            default:
                return "An unexpected authentication error occurred. Please try again.";
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center p-4">
            <div className="max-w-md w-full text-center space-y-8 animate-in fade-in zoom-in duration-500">
                <div className="relative inline-block">
                    <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-150 animate-pulse" />
                    <div className="relative bg-white dark:bg-zinc-900 size-24 rounded-3xl flex items-center justify-center shadow-2xl border-4 border-primary/10 mx-auto">
                        <ShieldAlert className="size-12 text-primary" strokeWidth={1.5} />
                    </div>
                </div>

                <div className="space-y-4">
                    <h1 className="text-4xl font-black tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
                        Auth <span className="text-primary">Error</span>
                    </h1>
                    <p className="text-lg text-zinc-500 dark:text-zinc-400 font-medium max-w-xs mx-auto">
                        {getErrorMessage(error)}
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-6 justify-center">
                    <Link
                        href="/sign-in"
                        className="group relative flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-2xl hover:scale-105 transition-all shadow-xl shadow-primary/25 active:scale-95 overflow-hidden"
                    >
                        <div className="absolute inset-x-0 bottom-0 h-1 bg-black/10 transform scale-x-0 group-hover:scale-x-100 transition-transform" />
                        <RefreshCw className="size-5 group-hover:rotate-180 transition-transform duration-500" />
                        Try Again
                    </Link>

                    <Link
                        href="/"
                        className="flex items-center justify-center gap-2 px-8 py-4 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white font-bold rounded-2xl hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-all border-2 border-zinc-100 dark:border-zinc-700 active:scale-95"
                    >
                        <Home className="size-5" />
                        Go Home
                    </Link>
                </div>

                <p className="text-zinc-400 text-sm font-medium pt-8">
                    Error code: <code className="bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded-lg text-zinc-600 dark:text-zinc-300 font-mono italic">{error || "Unknown"}</code>
                </p>
            </div>
        </div>
    );
};

const AuthErrorPage = () => {
    return (
        <React.Suspense fallback={
            <div className="min-h-[80vh] flex items-center justify-center p-4 text-primary">
                <RefreshCw className="size-8 animate-spin" />
            </div>
        }>
            <AuthErrorContent />
        </React.Suspense>
    );
};


export default AuthErrorPage;
