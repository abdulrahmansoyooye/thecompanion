import React from 'react';

interface DividerProps {
  text?: string;
}

export const Divider: React.FC<DividerProps> = ({ text = "or" }) => {
  return (
    <div className="flex items-center gap-2.5 self-stretch relative" role="separator" aria-label={text}>
      <div className="h-px flex-[1_0_0] relative bg-neutral-200" />
      <span className="text-[#111] text-center text-[10px] font-normal leading-[10px] relative">
        {text}
      </span>
      <div className="h-px flex-[1_0_0] relative bg-neutral-200" />
    </div>
  );
};
