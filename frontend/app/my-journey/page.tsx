"use client"

import { RECENT_LESSONS } from '@/constants/constants';
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { ProfileSkeleton } from '@/components/ui/ProfileSkeleton';
import { StatsSkeleton } from '@/components/ui/StatsSkeleton';
import { TableSkeleton } from '@/components/ui/TableSkeleton';
import { getHistory } from '@/services/companion.services';
import { Lesson } from '@/types/types';

const MyJourney: React.FC = () => {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState<Lesson[]>([]);

  useEffect(() => {
   const fetchLessons = async () => {
         try {
           setLoading(true);
   
           const response = await getHistory();
           console.log(response)
           if (response.data) {
             setHistory(response.data);
           }
         } catch (error) {
           console.error('Error fetching history:', error);
         } finally {
           setLoading(false);
         }
       };
       fetchLessons();
  }, []);
  return (
    <div className="max-w-7xl mx-auto px-8 py-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
        <div className="flex items-center gap-6 ">
          {loading ? (
            <ProfileSkeleton />
          ) : (
            <>
              <div className="w-20 h-20 bg-[#FF5B37] rounded-full flex items-center justify-center text-3xl text-white font-bold">
                {session?.user?.name?.[0] || '👤'}
              </div>
              <div>
                <h1 className="text-3xl font-extrabold text-gray-900">{session?.user?.name || 'User'}</h1>
                <p className="text-gray-500 font-small">{session?.user?.email}</p>
              </div>
            </>
          )}
        </div>

        <div className="flex gap-4">
          {loading ? (
            <StatsSkeleton />
          ) : (
            <div className='md:flex space-y-4'>
              <div className="bg-white border border-gray-200 p-6 rounded-4xl shadow-sm flex items-center gap-4 min-w-[200px]">
                 <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center text-[#FF5B37] border border-red-100">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg>
                </div>
                <div>
                  <div className="text-2xl font-bold">{history.length}</div>
                  <div className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Lessons Completed</div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 p-6 rounded-4xl shadow-sm flex  items-center gap-4 min-w-[200px]">
               
                <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500 border border-orange-100">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                </div>
                <div>
                  <div className="text-2xl font-bold">{history.reduce((total, lesson)=> total + Number(lesson.duration),0)}</div>
                  <div className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Minutes Spent</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-[2.5rem] p-10 shadow-sm">
        <h2 className="text-2xl font-bold mb-8">Completed lessons</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-400 text-sm font-semibold uppercase tracking-wider border-b border-gray-100 pb-4">
                <th className="pb-4">Lessons</th>
                <th className="pb-4">Subject</th>
                <th className="pb-4 text-right pr-4">Duration</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr>
                  <td colSpan={3} className="py-8">
                    <TableSkeleton />
                  </td>
                </tr>
              ) : history.map((lesson) => (
                <tr key={lesson.id} className="group hover:bg-gray-50 transition-all duration-300">
                  <td className="py-6 pr-4 flex items-center gap-5">
                    <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                      {lesson.icon}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 text-lg leading-tight">{lesson.name}</div>
                      <div className="text-sm text-gray-500 font-medium">Topic: {lesson.topic}</div>
                    </div>
                  </td>
                  <td className="py-6">
                    <span className="bg-[#2D2D2D] text-white text-[10px] font-bold px-4 py-2 rounded-full uppercase tracking-widest">
                      {lesson.subject}
                    </span>
                  </td>
                  <td className="py-6 text-right font-bold text-gray-700 text-lg pr-4">{lesson.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyJourney;
