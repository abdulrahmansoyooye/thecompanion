"use client";

import React, { useEffect } from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import Link from "next/link";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-[80vh] flex items-center justify-center p-6">
            <div className="max-w-md w-full text-center space-y-8 animate-in fade-in zoom-in duration-500">
                {/* Error Icon */}
                <div className="relative mx-auto w-24 h-24">
                    <div className="absolute inset-0 bg-red-100 rounded-full animate-ping opacity-20"></div>
                    <div className="relative w-24 h-24 bg-red-50 rounded-3xl flex items-center justify-center text-red-500 border border-red-100 shadow-sm">
                        <AlertTriangle size={48} />
                    </div>
                </div>

                {/* Text Content */}
                <div className="space-y-4">
                    <h1 className="text-3xl font-bold text-gray-900">Oops! Something went wrong</h1>
                    <p className="text-gray-500 font-medium">
                        We encountered an unexpected error while processing your request. Don't worry, it's not your fault.
                    </p>
                    {error.digest && (
                        <div className="bg-gray-50 px-4 py-2 rounded-xl border border-gray-100 inline-block">
                            <code className="text-[10px] text-gray-400 font-mono">ID: {error.digest}</code>
                        </div>
                    )}
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                        onClick={() => reset()}
                        className="flex items-center justify-center gap-2 px-8 py-4 bg-black text-white rounded-2xl font-bold hover:bg-black/80 transition-all active:scale-95 shadow-lg shadow-black/10"
                    >
                        <RefreshCw size={20} />
                        Try Again
                    </button>
                    <Link
                        href="/"
                        className="flex items-center justify-center gap-2 px-8 py-4 bg-white border border-gray-200 text-gray-700 rounded-2xl font-bold hover:bg-gray-50 transition-all active:scale-95"
                    >
                        <Home size={20} />
                        Back Home
                    </Link>
                </div>

                {/* Technical help */}
                <p className="text-xs text-gray-400 font-medium pt-8">
                    If the problem persists, please contact support.
                </p>
            </div>
        </div>
    );
}
