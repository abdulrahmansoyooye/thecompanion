"use client"
import React, { useState } from 'react';
import Link from "next/link"

const SignUp: React.FC = () => {
    const [email, setEmail] = useState('');

    const handleContinue = (e: React.FormEvent) => {
        e.preventDefault();
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6">
            <div className="w-full max-w-[440px] bg-white border border-gray-200 rounded-[3rem] p-10 shadow-sm flex flex-col items-center">
                {/* Logo */}
                <div className="flex flex-col items-center mb-6">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-[#FF5B37] rounded-lg flex items-center justify-center text-white font-bold">TC</div>
                        <span className="font-bold text-xl tracking-tight">The Companion</span>
                    </Link>
                </div>

                <p className="text-gray-500 text-sm mb-8 text-center font-medium">Create an account to get started</p>

                <form onSubmit={handleContinue} className="w-full space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                        <input
                            type="email"
                            required
                            placeholder="e.g. name@company.com"
                            className="w-full px-5 py-3.5 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#FF5B37]/20 transition-all text-sm font-medium"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#FF5B37] hover:bg-[#e64d2b] text-white font-extrabold py-4 rounded-[1.25rem] transition-all shadow-lg shadow-orange-500/10 active:scale-[0.98]"
                    >
                        Create Account
                    </button>
                </form>

                <p className="mt-8 text-sm font-bold text-gray-400">
                    Already have an account? <Link href="/sign-in" className="text-[#FF5B37] hover:underline">Sign in</Link>
                </p>
            </div>
        </div>
    );
};

export default SignUp;
