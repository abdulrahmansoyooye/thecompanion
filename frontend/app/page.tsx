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
import { motion } from 'framer-motion';
import { Zap, Clock, Trophy, Plus, Sparkles, BookOpen } from 'lucide-react';

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <main className="max-w-7xl mx-auto px-6 sm:px-8 py-8 space-y-10">
      {/* Hero Welcome */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm"
      >
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-1">
            Welcome back, {session?.user?.name?.split(' ')[0] || 'Explorer'}! <span className="text-[#FF5B37]">👋</span>
          </h1>
          <p className="text-gray-500 font-medium">
            Ready to continue your journey? Your companions are waiting.
          </p>
        </div>

        <div className="flex gap-4">
          <Link
            href="/companions/new"
            className="flex items-center gap-2 px-6 py-3 bg-[#FF5B37] text-white font-bold rounded-xl hover:bg-[#e64d2b] transition-all shadow-md active:scale-95 cursor-pointer text-sm"
          >
            <Plus size={18} />
            <span>New Companion</span>
          </Link>
        </div>
      </motion.div>

      {/* Stats Summary */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {[
          { label: 'Total Lessons', value: history.length, icon: BookOpen, color: 'text-blue-500', bg: 'bg-blue-50' },
          { label: 'Companions', value: companions.length, icon: Zap, color: 'text-orange-500', bg: 'bg-orange-50' },
          { label: 'Learning Time', value: `${history.reduce((acc, l) => acc + (parseInt(l.duration) || 0), 0)}m`, icon: Clock, color: 'text-purple-500', bg: 'bg-purple-50' },
          { label: 'Streak', value: '5 Days', icon: Trophy, color: 'text-yellow-500', bg: 'bg-yellow-50' },
        ].map((stat, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow"
          >
            <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center`}>
              <stat.icon size={20} />
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">{stat.label}</p>
              <p className="text-xl font-black text-gray-900 leading-none">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Featured Companions */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
            <Sparkles className="text-orange-500" size={20} />
            Your Favorites
          </h2>
          <Link href="/companions" className="text-xs font-bold text-[#FF5B37] hover:underline">
            View Library →
          </Link>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {loading ? (
            Array(3).fill(0).map((_, i) => <CompanionSkeleton key={i} />)
          ) : featuredCompanions.length > 0 ? (
            featuredCompanions.map((comp) => (
              // <motion.div key={comp.id} variants={itemVariants}>
                <CompanionCard companion={comp} key={comp.id}/>
              // </motion.div>
            ))
          ) : (
            <motion.div
              variants={itemVariants}
              className="col-span-full py-12 text-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200"
            >
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                <Sparkles size={32} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">No companions yet</h3>
              <p className="text-gray-500 text-sm font-medium mb-6">Start your journey by creating your first AI mentor.</p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-6 py-2.5 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition active:scale-95 cursor-pointer text-sm"
              >
                + Create Companion
              </button>
            </motion.div>
          )}
        </motion.div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recently Completed */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-7 bg-white border border-gray-100 rounded-3xl p-8 shadow-sm"
        >
          <h2 className="text-xl font-extrabold text-gray-900 mb-6 tracking-tight">Recent Progress</h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-gray-400 text-[10px] font-black uppercase tracking-widest border-b border-gray-50">
                  <th className="pb-4 px-2">Companion & Topic</th>
                  <th className="pb-4 px-2">Category</th>
                  <th className="pb-4 px-2">Duration</th>
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
                    <td colSpan={3} className="py-12 text-center">
                      <div className="text-gray-300 mb-2 flex justify-center">
                        <BookOpen size={40} />
                      </div>
                      <p className="text-gray-400 text-sm font-bold tracking-tight">Your learning history will appear here.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Builder Promo */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-5 bg-gray-900 rounded-3xl p-10 flex flex-col items-center text-center text-white relative overflow-hidden group shadow-xl"
        >
          <div className="absolute top-0 right-0 w-48 h-48 bg-orange-500/10 rounded-full -mr-24 -mt-24 blur-3xl group-hover:bg-orange-500/20 transition-colors" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/10 rounded-full -ml-24 -mb-24 blur-3xl group-hover:bg-purple-500/20 transition-colors" />

          <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-orange-500/20 rotate-3 group-hover:rotate-6 transition-transform">
            <Plus size={32} className="text-white" />
          </div>

          <span className="bg-orange-500/20 text-orange-400 font-bold text-[9px] px-4 py-1.5 rounded-full uppercase tracking-[0.2em] mb-4">
            Custom Mentors
          </span>

          <h2 className="text-2xl font-black mb-3 leading-tight">
            Craft Your Perfect <br /> <span className="text-orange-500">AI Mentor</span>
          </h2>
          <p className="text-gray-400 text-sm font-medium mb-8 leading-relaxed max-w-xs">
            Design a companion tailored to your goals. Choose their personality, voice, and expertise.
          </p>

          <Link
            href="/companions/new"
            className="w-full bg-[#FF5B37] hover:bg-[#FF5B37]/90 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-orange-500/10 flex items-center justify-center gap-2 cursor-pointer group/btn text-sm"
          >
            <span>Start Building</span>
            <Sparkles size={16} className="group-hover/btn:animate-pulse" />
          </Link>
        </motion.div>
      </div>

      <CreateCompanionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </main>
  );
};

export default Dashboard;
