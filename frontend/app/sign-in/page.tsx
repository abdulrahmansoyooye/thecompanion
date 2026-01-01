
"use client";
import React, { useState } from "react";
import { SignInCard } from "@/components/auth/SignInCard";
import { signIn, type SignInResponse } from "next-auth/react";
import { useRouter } from "next/navigation";

const SignInPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      // NextAuth will redirect to callbackUrl on success
      await signIn("google", { callbackUrl: "/" });
    } catch (err) {
      console.error("Google sign-in error", err);
      // Minimal user feedback for now
      alert("Google sign-in failed. Please try again.");
      setIsLoading(false);
    }
  };

  const handleEmailSignIn = async (data: { email: string }) => {
    setIsLoading(true);
    try {
      const res = (await signIn("email", {
        email: data.email,
        redirect: false,
        callbackUrl: "/check-your-email",
      })) as SignInResponse | undefined;

      // signIn with redirect:false returns an object with error/url
      if (res?.error) {
        throw new Error(res.error || "Email sign-in failed");
      }

      router.push("/check-your-email");
    } catch (err) {
      console.error("Email sign-in error", err);
      alert(err instanceof Error ? err.message : "Email sign-in failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUpClick = () => router.push("/sign-up");

  return (
    <main>
      <SignInCard
        onGoogleSignIn={handleGoogleSignIn}
        onEmailSignIn={handleEmailSignIn}
        onSignUpClick={handleSignUpClick}
        isLoading={isLoading}
      />
    </main>
  );
};

export default SignInPage;
