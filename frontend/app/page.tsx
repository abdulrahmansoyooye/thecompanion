"use client";

import React, { useEffect, useState } from 'react';
import CompanionCard from '@/components/cards/CompanionCard';
import CreateCompanionModal from '@/components/modals/CreateCompanionModal';
import { getAllCompanions, getHistory } from '../services/companion.services';
import { Companion, Lesson } from '@/types/types';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { CompanionSkeleton } from '@/components/cards/CompanionSkeleton';
import { TableSkeleton } from '@/components/ui/TableSkeleton';
import Link from 'next/link';
import { RecentLessons } from '@/components/cards/RecentLessons';
const Dashboard: React.FC = () => {
  const { data: session, status } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [companions, setCompanions] = useState<Companion[]>([]);
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState<Lesson[]>([]);
  const navigate = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      navigate.push('/sign-in');
    }
  }, [status, navigate]);

  useEffect(() => {
    if (status !== "authenticated") return;

    const fetchCompanions = async () => {
      try {
        setLoading(true);
        const response = await getAllCompanions();
        if (response.data) {
          setCompanions(response.data);
        }
      } catch (error) {
        console.error('Error fetching companions:', error);
      } finally {
        setLoading(false);
      }
    };
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
    fetchCompanions();
    fetchLessons();
  }, [status, session?.user?.id])
  const featuredCompanions = companions.slice(0, 3);
  const recent_lessons = history.slice(0, 5);
  return (
    <main className="">
      <h1 className="mb-8">Dashboard</h1>

      {/* Featured Grid */}
      <div className="companions-grid mb-12">
        {loading ? (
          <>
            <CompanionSkeleton />
            <CompanionSkeleton />
            <CompanionSkeleton />
          </>
        ) : featuredCompanions.length > 0 ? (
          featuredCompanions.map((comp) => (
            <CompanionCard key={comp.id} companion={comp} />
          ))
        ) : (
          <div className="col-span-full py-12 text-center bg-gray-50 rounded-[2.5rem] border border-dashed border-gray-200">
            <p className="text-gray-500 font-medium">No companions created yet.</p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-4 text-[#FF5B37] font-bold hover:underline"
            >
              + Create your first companion
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
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
                {loading ? (
                  <tr>
                    <td colSpan={3} className="py-8">
                      <TableSkeleton />
                    </td>
                  </tr>
                ) : recent_lessons.length > 0 ? (
                  recent_lessons.map((lesson) => (
                    <RecentLessons key={lesson.id} lesson={lesson} />
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="py-10 text-center text-gray-400">
                      No recent lessons found.
                    </td>
                  </tr>
                )}
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

          <Link
            href={"/companions/new"}
            className="w-full bg-[#FF5B37] hover:bg-[#e64d2b] text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-orange-500/20 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span className="text-xl">+</span>
            Build New Companion
          </Link>
        </div>
      </div>

      <CreateCompanionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </main>
  );
};

export default Dashboard;
