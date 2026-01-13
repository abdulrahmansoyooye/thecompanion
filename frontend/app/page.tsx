"use client";

import React, { useState } from 'react';
import CompanionCard from '@/components/cards/CompanionCard';
import { INITIAL_COMPANIONS, RECENT_LESSONS } from '@/constants/constants';
import CreateCompanionModal from '@/components/modals/CreateCompanionModal';

const Dashboard: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const featuredCompanions = INITIAL_COMPANIONS.slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-8 py-10">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      {/* Featured Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {featuredCompanions.map((comp) => (
          <CompanionCard key={comp.id} companion={comp} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recently Completed */}
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-[2.5rem] p-8 shadow-sm">
          <h2 className="text-xl font-bold mb-6">Recently completed lessons</h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-gray-400 text-sm border-b border-gray-100 pb-2">
                  <th className="font-medium pb-4">Lessons</th>
                  <th className="font-medium pb-4">Subject</th>
                  <th className="font-medium pb-4">Duration</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {RECENT_LESSONS.map((lesson) => (
                  <tr key={lesson.id} className="group hover:bg-gray-50 transition-colors">
                    <td className="py-5 pr-4 flex items-center gap-4">
                      <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-xl">
                        {lesson.icon}
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">{lesson.name}</div>
                        <div className="text-sm text-gray-500">Topic: {lesson.topic}</div>
                      </div>
                    </td>
                    <td className="py-5">
                      <span className="bg-black text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                        {lesson.subject}
                      </span>
                    </td>
                    <td className="py-5 font-medium text-gray-700">{lesson.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Builder Promo */}
        <div className="bg-[#2D2D2D] rounded-[2.5rem] p-10 flex flex-col items-center text-center text-white relative overflow-hidden h-full">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24 blur-3xl"></div>

          <span className="bg-[#FCD34D] text-[#854D0E] font-bold text-[10px] px-4 py-1.5 rounded-full uppercase tracking-widest mb-6">
            Start learning your way
          </span>

          <h2 className="text-2xl font-bold mb-4">Build a Personalized Learning Companion</h2>
          <p className="text-gray-400 text-sm mb-8 leading-relaxed">
            Pick a name, subject, voice, & personality — and start learning through voice conversations that feel natural and fun.
          </p>

          <div className="grid grid-cols-3 gap-6 mb-8 w-full max-w-xs">
            {['🧪', '➗', '⌨️', '📜', '📊', '💬'].map((icon, idx) => (
              <div key={idx} className="bg-white/10 w-12 h-12 rounded-2xl flex items-center justify-center text-xl hover:scale-110 transition-transform cursor-pointer">
                {icon}
              </div>
            ))}
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full bg-[#FF5B37] hover:bg-[#e64d2b] text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-orange-500/20 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span className="text-xl">+</span>
            Build New Companion
          </button>
        </div>
      </div>

      <CreateCompanionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Dashboard;
