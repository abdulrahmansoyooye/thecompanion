import React from 'react';

interface SignUpLinkProps {
  onSignUpClick?: () => void;
}

export const SignUpLink: React.FC<SignUpLinkProps> = ({ onSignUpClick }) => {
  const handleSignUpClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onSignUpClick) {
      onSignUpClick();
    }
  };

  return (
    <p className="self-stretch text-[#111] text-center text-sm font-normal leading-5 relative max-md:text-[13px] max-sm:text-xs">
      <span>Don't have an account? </span>
      <button
        type="button"
        onClick={handleSignUpClick}
        className="text-[#FE5933] font-bold cursor-pointer hover:underline focus:outline-none focus:underline"
        aria-label="Sign up for a new account"
      >
        Sign up
      </button>
    </p>
  );
};
