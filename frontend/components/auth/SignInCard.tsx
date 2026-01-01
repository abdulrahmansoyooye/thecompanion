
import React, { useState } from 'react';
import { SignInHeader } from './SignInHeader';
import { GoogleSignInButton } from './GoogleSignInButton';
import { Divider } from './Divider';
import { EmailForm } from './EmailForm';
import { SignUpLink } from './SignUpLink';

interface EmailFormData {
  email: string;
}

interface SignInCardProps {
  onGoogleSignIn?: () => void;
  onEmailSignIn?: (data: EmailFormData) => void;
  onSignUpClick?: () => void;
  isLoading?: boolean;
}

export const SignInCard: React.FC<SignInCardProps> = ({
  onGoogleSignIn,
  onEmailSignIn,
  onSignUpClick,
  isLoading = false
}) => {
  const [isEmailLoading, setIsEmailLoading] = useState(false);

  const handleGoogleSignIn = () => {
    console.log('Google sign-in clicked');
    if (onGoogleSignIn) {
      onGoogleSignIn();
    }
  };

  const handleEmailSubmit = async (data: EmailFormData) => {
    setIsEmailLoading(true);
    console.log('Email sign-in:', data);
    
    try {
      if (onEmailSignIn) {
        await onEmailSignIn(data);
      }
    } catch (error) {
      console.error('Email sign-in error:', error);
    } finally {
      setIsEmailLoading(false);
    }
  };

  const handleSignUpClick = () => {
    console.log('Sign up clicked');
    if (onSignUpClick) {
      onSignUpClick();
    }
  };

  return (
    <>
      
      <main className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
        <section
          className="max-w-none flex w-[400px] flex-col items-start gap-7 min-h-[492px] box-border bg-white mx-auto my-0 px-[30px] py-9 rounded-[30px] border-2 border-solid border-black max-md:max-w-[400px] max-md:w-[90%] max-md:gap-6 max-md:px-6 max-md:py-8 max-sm:max-w-[350px] max-sm:w-[95%] max-sm:gap-5 max-sm:px-5 max-sm:py-6 max-sm:rounded-[20px]"
          style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
          role="form"
          aria-labelledby="signin-title"
        >
          <SignInHeader
            title="Sign in to The Companion App"
            subtitle="Welcome back! Please sign in to continue"
          />
          
          <div className="flex flex-col items-start gap-3 self-stretch relative">
            <GoogleSignInButton
              onClick={handleGoogleSignIn}
              disabled={isLoading || isEmailLoading}
            />
          </div>
          
          <Divider />
          
          <EmailForm
            onSubmit={handleEmailSubmit}
            isLoading={isEmailLoading || isLoading}
          />
          
          <SignUpLink onSignUpClick={handleSignUpClick} />
        </section>
      </main>
    </>
  );
};

