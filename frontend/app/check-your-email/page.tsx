import React from "react";
import Link from "next/link"
export default function CheckYourEmail() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <section className="max-w-[420px] w-full bg-white rounded-[20px] border-2 border-black px-8 py-8 text-center">
        <h1 className="text-2xl font-bold mb-2">Check your email</h1>
        <p className="text-sm text-muted-foreground">
          We sent a sign-in link to your email. Please check your inbox and follow the
          instructions to complete sign-in.
        </p>
        <Link href="/" className="inline-block mt-6 underline">
          Back to home
        </Link>
      </section>
    </main>
  );
}
