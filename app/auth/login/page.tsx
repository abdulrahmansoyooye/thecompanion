// app/auth/login/page.tsx
"use client";
import { SignInCard } from "@/components/auth/SignInCard";
import { useState } from "react";


interface EmailFormData {
  email: string;
}

const LoginPage = () => {
  const handleGoogleSignIn = () => {
    // Implement Google OAuth integration here
    console.log('Initiating Google sign-in...');
    // Example: redirect to Google OAuth or open popup
  };

  const handleEmailSignIn = async (data: EmailFormData) => {
    // Implement email sign-in logic here
    console.log('Email sign-in attempt:', data);
    
    // Example API call
    try {
      // const response = await fetch('/api/auth/signin', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data)
      // });
      
      // if (response.ok) {
      //   // Handle successful sign-in
      //   console.log('Sign-in successful');
      // }
    } catch (error) {
      console.error('Sign-in error:', error);
    }
  };

  const handleSignUpClick = () => {
    // Navigate to sign-up page or show sign-up modal
    console.log('Navigating to sign-up...');
    // Example: navigate('/signup') or setShowSignUpModal(true)
  };

  return (
    <SignInCard
      onGoogleSignIn={handleGoogleSignIn}
      onEmailSignIn={handleEmailSignIn}
      onSignUpClick={handleSignUpClick}
    />
  );
};


export default LoginPage