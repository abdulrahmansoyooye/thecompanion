"use client";

import { getAllCompanions } from '@/services/companion.services';
import { Companion } from '@/types/types';
import CompanionCard from '@/components/cards/CompanionCard';
import { CompanionSkeleton } from '@/components/cards/CompanionSkeleton';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Sparkles, BookOpen, SlidersHorizontal } from 'lucide-react';

const CompanionLibrary: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [companions, setCompanions] = useState<Companion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanions = async () => {
      try {
        setLoading(true);
        const res = await getAllCompanions();
        if (res?.data) {
          setCompanions(res.data);
        }
      } catch (error) {
        console.error("Failed to fetch companions", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCompanions();
  }, []);

  const filteredCompanions = companions.filter(comp => {
    const matchesSearch = comp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comp.topic.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === 'All' || comp.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  const subjects = ['All', 'Science', 'Maths', 'Language', 'Coding', 'History', 'Business', 'Economics', 'Geography', 'Finance'];

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
    <div className="max-w-7xl mx-auto px-6 sm:px-8 py-10 space-y-10">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Your Companions</h1>
          <p className="text-gray-500 text-sm font-medium">Manage and launch sessions with your AI mentors.</p>
        </div>

        <div className="relative group w-full md:w-80">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#FF5B37] transition-colors pointer-events-none">
            <Search size={18} />
          </div>
          <input
            type="text"
            placeholder="Search mentors..."
            className="w-full pl-11 pr-4 py-3 bg-white border border-gray-100 rounded-xl text-sm font-semibold shadow-sm focus:outline-none focus:ring-4 focus:ring-orange-500/5 focus:border-orange-500/20 transition-all placeholder:text-gray-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-4 border-b border-gray-100 pb-6">
        <div className="flex items-center gap-2 text-gray-400 shrink-0">
          <SlidersHorizontal size={14} />
          <span className="text-[10px] font-black uppercase tracking-widest">Filter Domain</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {subjects.map(s => (
            <button
              key={s}
              onClick={() => setSelectedSubject(s)}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all active:scale-95 cursor-pointer ${selectedSubject === s
                ? 'bg-gray-900 text-white shadow-md'
                : 'bg-white text-gray-500 border border-gray-100 hover:bg-gray-50'
                }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedSubject + searchTerm}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <CompanionSkeleton key={i} />
            ))
          ) : filteredCompanions.length > 0 ? (
            filteredCompanions.map((comp) => (
              // <motion.div key={comp.id} variants={itemVariants}>
                <CompanionCard companion={comp} key={comp.id} />
              // </motion.div>
            ))
          ) : null}
        </motion.div>
      </AnimatePresence>

      {!loading && filteredCompanions.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-24 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200"
        >
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm mb-4">
            <Search size={32} className="text-gray-300" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">No mentors found</h3>
          <p className="text-gray-500 text-sm font-medium mb-6">Try adjusting your filters or search.</p>
          <button
            onClick={() => { setSearchTerm(''); setSelectedSubject('All'); }}
            className="px-6 py-2 bg-white border border-gray-200 text-gray-900 font-bold rounded-xl hover:bg-gray-50 transition cursor-pointer text-sm"
          >
            Clear filters
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default CompanionLibrary;
