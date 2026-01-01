import Image from 'next/image';
import React from 'react';

interface SignInHeaderProps {
  logoSrc?: string;
  title: string;
  subtitle: string;
}


export const SignInHeader: React.FC<SignInHeaderProps> = ({
  logoSrc = "/api/placeholder/50/48",
  title,
  subtitle
}) => {
  return (
    <header className="flex flex-col items-center gap-[7px] self-stretch relative">
      <Image
        src={logoSrc}
        alt="nionnion Logo"
        width={30}
        height={40}
        className="w-[50px] h-12 aspect-[25/24] rounded relative max-sm:w-10 max-sm:h-[38px]"
      />
      <h1 className="text-black text-xl font-bold leading-[30px] relative gap-[7px] text-center self-stretch max-md:text-lg max-md:leading-[26px] max-sm:text-base max-sm:leading-6">
        {title}
      </h1>
      <p className="self-stretch text-[#111] text-center text-sm font-normal leading-5 relative max-md:text-[13px] max-md:leading-[18px] max-sm:text-xs max-sm:leading-4">
        {subtitle}
      </p>
    </header>
  );
};
