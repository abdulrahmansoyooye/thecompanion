
import React from 'react';
import Link from "next/link"
import { Companion } from '@/types/types';

interface CompanionCardProps {
  companion: Companion;
  compact?: boolean;
}

const CompanionCard: React.FC<CompanionCardProps> = ({ companion, compact }) => {
  return (
    <div className={`${companion.color} border p-5 rounded-3xl flex flex-col h-full shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group`}>
      <div className="flex justify-between items-start mb-4">
        <span className="bg-black text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          {companion.subject}
        </span>
        <button className="text-black/60 hover:text-black">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
        </button>
      </div>
      
      <div className="mb-4">
        <h3 className="font-bold text-lg mb-1">{companion.name}</h3>
        <p className="text-gray-700 text-sm">Topic: {companion.topic}</p>
      </div>

      <div className="mt-auto">
        <div className="flex items-center gap-1.5 text-gray-600 text-xs mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          {companion.duration} duration
        </div>
        
        <Link 
          href={`/lesson/${companion.id}`}
          className="block w-full bg-[#FF5B37] text-white font-bold py-3 rounded-xl text-center hover:bg-[#e64d2b] transition-colors"
        >
          Launch Lesson
        </Link>
      </div>
    </div>
  );
};

export default CompanionCard;
