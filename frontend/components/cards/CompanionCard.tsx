"use client";

import React from 'react';
import Link from "next/link";
import { Companion } from '@/types/types';
import { motion } from 'framer-motion';
import { Play, Clock, BookOpen, Star, ChevronRight } from 'lucide-react';

interface CompanionCardProps {
  companion: Companion;
  compact?: boolean;
}

const CompanionCard: React.FC<CompanionCardProps> = ({ companion, compact }) => {
  // Extract background class for the card tint
  const themeParts = companion.iconColor.split(' ');
  const bgTint = themeParts[0]; // e.g., bg-purple-50
  const textColor = themeParts.find(p => p.startsWith('text-')) || 'text-gray-900';

  return (
    <motion.div
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className={`relative group ${bgTint}/40 hover:bg-white bg-white rounded-3xl border border-gray-100 p-6 flex flex-col h-full shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden`}
    >
      {/* Decorative background element */}
      <div className={`absolute top-0 right-0 w-full h-full   transition-all duration-500 scale-150 ${companion.iconColor}`} />

      <div className="flex justify-between items-start mb-6 relative z-10">
        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm ${companion.iconColor} bg-white border border-white/50`}>
          {companion.subject}
        </span>
        <button className="text-gray-300 hover:text-[#FF5B37] transition-colors p-2 hover:bg-orange-50 rounded-xl cursor-pointer">
          <Star size={18} fill="currentColor" />
        </button>
      </div>

      <div className="mb-6 relative z-10">
        <div className={`w-16 h-16 ${companion.iconColor} rounded-2xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-sm border border-white/20`}>
          {companion.icon}
        </div>
        <h3 className="font-extrabold text-2xl mb-1 text-gray-900 leading-tight">
          {companion.name}
        </h3>
        <div className="flex items-center gap-2 text-gray-500 text-sm font-medium">
          <BookOpen size={14} className={textColor} />
          <span className="truncate">{companion.topic}</span>
        </div>
      </div>

      <div className="mt-auto space-y-5 relative z-10">
        <div className="flex items-center gap-4 text-gray-400 text-[10px] font-black uppercase tracking-widest">
          <div className="flex items-center gap-1.5">
            <Clock size={12} />
            {companion.duration}
          </div>
          <div className="w-1 h-1 bg-gray-200 rounded-full" />
          <div className="flex items-center gap-1.5">
            <Play size={12} fill="currentColor" />
            VAPI Session
          </div>
        </div>

        <Link
          href={`/companions/${companion.id}`}
          className="flex items-center justify-center gap-3 w-full bg-gray-900 text-white font-black py-4 rounded-2xl text-center hover:bg-[#FF5B37] transition-all duration-300 shadow-xl shadow-gray-200 hover:shadow-orange-500/20 cursor-pointer text-xs uppercase tracking-[0.15em]"
        >
          <span>Launch Session</span>
          <ChevronRight size={16} />
        </Link>
      </div>
    </motion.div>
  );
};

export default CompanionCard;
