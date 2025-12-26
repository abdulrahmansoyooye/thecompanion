import { signIn } from 'next-auth/react';
import React from 'react';

interface GoogleSignInButtonProps {
  onClick?: () => void;
  disabled?: boolean;
}

export const GoogleSignInButton: React.FC<GoogleSignInButtonProps> = ({
  onClick,
  disabled = false
}) => {
  const handleClick = () => {
    if (!disabled && onClick) {
      signIn("google",{redirectTo:"/"});
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className="flex h-10 justify-center items-center gap-2 self-stretch border border-neutral-200 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.11)] relative cursor-pointer bg-white px-2.5 py-2 rounded-lg border-solid max-sm:h-9 max-sm:px-2 max-sm:py-1.5 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      aria-label="Continue with Google"
    >
      <div className="w-4 h-4 relative">
        <svg
          width="17"
          height="16"
          viewBox="0 0 17 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4"
        >
          <path
            d="M15.037 6.69431H14.5V6.66665H8.49998V9.33331H12.2676C11.718 10.8856 10.241 12 8.49998 12C6.29098 12 4.49998 10.209 4.49998 7.99998C4.49998 5.79098 6.29098 3.99998 8.49998 3.99998C9.51965 3.99998 10.4473 4.38465 11.1536 5.01298L13.0393 3.12731C11.8486 2.01765 10.256 1.33331 8.49998 1.33331C4.81831 1.33331 1.83331 4.31831 1.83331 7.99998C1.83331 11.6816 4.81831 14.6666 8.49998 14.6666C12.1816 14.6666 15.1666 11.6816 15.1666 7.99998C15.1666 7.55298 15.1206 7.11665 15.037 6.69431Z"
            fill="#FFC107"
          />
          <path
            d="M2.60199 4.89698L4.79232 6.50331C5.38499 5.03598 6.82032 3.99998 8.49999 3.99998C9.51966 3.99998 10.4473 4.38465 11.1537 5.01298L13.0393 3.12731C11.8487 2.01765 10.256 1.33331 8.49999 1.33331C5.93932 1.33331 3.71866 2.77898 2.60199 4.89698Z"
            fill="#FF3D00"
          />
          <path
            d="M8.5 14.6667C10.222 14.6667 11.7867 14.0077 12.9697 12.936L10.9063 11.19C10.2146 11.7163 9.36919 12.0009 8.5 12C6.766 12 5.29367 10.8943 4.739 9.35132L2.565 11.0263C3.66834 13.1853 5.909 14.6667 8.5 14.6667Z"
            fill="#4CAF50"
          />
          <path
            d="M15.037 6.69435H14.5V6.66669H8.5V9.33335H12.2677C12.0047 10.0722 11.5311 10.7177 10.9053 11.1904L10.9063 11.1897L12.9697 12.9357C12.8237 13.0684 15.1667 11.3334 15.1667 8.00002C15.1667 7.55302 15.1207 7.11669 15.037 6.69435Z"
            fill="#1976D2"
          />
        </svg>
      </div>
      <span className="text-[#111] text-center text-sm font-normal leading-5 relative max-md:text-[13px] max-sm:text-xs">
        Continue with Google
      </span>
    </button>
  );
};
