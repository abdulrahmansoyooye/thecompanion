"use client"
import React, { useState } from 'react';
import Link from "next/link"
import { signIn } from 'next-auth/react';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    // For demo purposes, we'll just navigate to the dashboard

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

        <p className="text-gray-500 text-sm mb-8 text-center font-medium">Welcome back! Please sign in to continue</p>

        {/* Google Login */}
        <button onClick={() => signIn('google')} className="w-full flex items-center justify-center gap-3 py-3.5 border border-gray-200 cursor-pointer rounded-2xl hover:bg-gray-50 transition-colors mb-6 shadow-sm">
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          <span className="font-semibold text-gray-700 text-sm" >Continue with Google</span>
        </button>

        <div className="w-full flex items-center gap-4 mb-8">
          <div className="h-px flex-1 bg-gray-100"></div>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">or</span>
          <div className="h-px flex-1 bg-gray-100"></div>
        </div>

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
            Continue
          </button>
        </form>

        <p className="mt-8 text-sm font-bold text-gray-400">
          Don't have an account? <Link href="/signup" className="text-[#FF5B37] hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
