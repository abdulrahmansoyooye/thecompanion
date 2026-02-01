"use client";

import React, { useState, useEffect } from 'react';
import { COLORS } from '@/constants/constants';
import { CreateCompanion } from '@/services/companion.services';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ChevronRight, Check, Mic2, MessageSquare, Globe, BookOpen } from 'lucide-react';

const ICONS = ['🧠', '🧪', '➗', '⌨️', '📜', '📊', '💬', '🎨', '🌍', '♟️', '🔭', '📐', '🧬', '💡', '🚀'];

const CompanionBuilder: React.FC = () => {
  const [selectedIcon, setSelectedIcon] = useState(ICONS[0]);
  const [selectedColorKey, setSelectedColorKey] = useState<keyof typeof COLORS>('Science');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    topic: '',
    icon: selectedIcon,
    iconColor: COLORS['Science'],
    voiceType: 'Female',
    style: 'Formal',
    language: 'English',
    duration: 30
  });

  // Keep formData in sync with visual selections
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      icon: selectedIcon,
      iconColor: COLORS[selectedColorKey]
    }));
  }, [selectedIcon, selectedColorKey]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.subject || !formData.topic) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await CreateCompanion(formData);
      if (res.success) {
        toast.success(`Companion "${formData.name}" created!`);
        router.push(`/companions/${res.data.id}`);
      } else {
        toast.error(res.message || "Failed to create companion");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred during creation");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = "w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-[1.25rem] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#FF5B37]/10 focus:border-[#FF5B37] focus:bg-white placeholder-gray-400 transition-all duration-300";
  const labelClass = "flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-[0.15em] mb-3 ml-1";

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-20 lg:py-24">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10 md:mb-16 space-y-4"
      >
        <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50 text-[#FF5B37] rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">
          <Sparkles size={12} />
          Forge Your Mentor
        </span>
        <h1 className="text-3xl md:text-6xl font-black text-gray-900 tracking-tighter">
          Companion Builder
        </h1>
        <p className="text-gray-500 max-w-2xl mx-auto text-base md:text-xl font-medium leading-relaxed">
          Design an intelligent presence that understands your goals and speaks your language.
        </p>
      </motion.div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Visual Identity Panel */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-5 space-y-8 lg:sticky lg:top-32"
        >
          <div className="bg-white p-6 md:p-10 rounded-3xl md:rounded-[3.5rem] border border-gray-100 shadow-2xl shadow-gray-200/50 flex flex-col items-center relative overflow-hidden group">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#FF5B37]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            <h2 className="text-xs md:text-sm font-black text-gray-900 mb-6 md:mb-10 uppercase tracking-widest">Visual Identity</h2>

            <AnimatePresence mode="wait">
              <motion.div
                key={`${selectedIcon}-${selectedColorKey}`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.1, opacity: 0 }}
                className={`relative w-40 h-40 md:w-56 md:h-56 mb-8 md:mb-12 ${COLORS[selectedColorKey]} border-4 rounded-[2.5rem] md:rounded-[4rem] p-1 shadow-2xl transition-all duration-500`}
              >
                <div className="w-full h-full rounded-[2.2rem] md:rounded-[3.5rem] overflow-hidden flex items-center justify-center bg-white/60 backdrop-blur-md">
                  <span className="text-6xl md:text-8xl drop-shadow-2xl filter saturate-150">{selectedIcon}</span>
                </div>
                <div className="absolute -bottom-3 md:-bottom-4 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-auto md:right-auto bg-white px-4 py-1.5 md:px-6 md:py-2 rounded-xl md:rounded-2xl shadow-xl border border-gray-50 flex items-center gap-2 whitespace-nowrap">
                  <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-[8px] md:text-[10px] font-black text-gray-900 uppercase tracking-widest">Active Link</span>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="w-full space-y-8 md:space-y-10">
              <div>
                <label className={labelClass}>
                  Choose Avatar
                  <span className="text-[#FF5B37] text-lg leading-none">•</span>
                </label>
                <div className="grid grid-cols-5 gap-2 md:gap-3">
                  {ICONS.map((icon, i) => (
                    <button
                      key={`${icon}-${i}`}
                      type="button"
                      onClick={() => setSelectedIcon(icon)}
                      className={`aspect-square flex items-center justify-center rounded-xl md:rounded-2xl transition-all duration-300 ${selectedIcon === icon
                        ? 'bg-gray-900 text-white scale-110 shadow-xl'
                        : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
                        }`}
                    >
                      <span className="text-lg md:text-xl">{icon}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className={labelClass}>
                  Core Palette
                  <span className="text-[#FF5B37] text-lg leading-none">•</span>
                </label>
                <div className="flex flex-wrap gap-3 md:gap-4">
                  {(Object.keys(COLORS) as Array<keyof typeof COLORS>).map(key => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setSelectedColorKey(key)}
                      className={`w-8 h-8 md:w-10 md:h-10 rounded-xl md:rounded-2xl border-2 transition-all duration-300 relative group/color ${COLORS[key].split(' ')[0]
                        } ${selectedColorKey === key
                          ? 'border-gray-900 scale-125 shadow-lg'
                          : 'border-white hover:scale-110'
                        }`}
                    >
                      {selectedColorKey === key && (
                        <div className="absolute inset-0 flex items-center justify-center text-gray-900">
                          <Check size={12} strokeWidth={3} />
                        </div>
                      )}
                      <span className="hidden md:block absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover/color:opacity-100 transition-opacity text-[8px] font-bold text-gray-500 uppercase tracking-widest whitespace-nowrap">
                        {key}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Configuration Panel */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-7 space-y-8 md:space-y-10"
        >
          <div className="bg-white p-6 md:p-12 rounded-3xl md:rounded-[3.5rem] border border-gray-100 shadow-sm space-y-8 md:space-y-10">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-50 rounded-xl md:rounded-2xl flex items-center justify-center text-gray-900">
                <MessageSquare size={20} />
              </div>
              <div>
                <h2 className="text-lg md:text-xl font-black text-gray-900 tracking-tight">Configuration</h2>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Setup behavior & personality</p>
              </div>
            </div>

            <div className="space-y-6 md:space-y-8">
              <div>
                <label className={labelClass}>Companion Name</label>
                <input
                  type="text"
                  className={inputClass}
                  placeholder="e.g., Professor Zephyr"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div>
                  <label className={labelClass}>Subject Domain</label>
                  <div className="relative">
                    <select
                      className={`${inputClass} appearance-none cursor-pointer`}
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      required
                    >
                      <option value="">Select Domain</option>
                      <option>Science</option>
                      <option>Maths</option>
                      <option>Language</option>
                      <option>Coding</option>
                      <option>History</option>
                      <option>Business</option>
                    </select>
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                      <ChevronRight size={18} className="rotate-90" />
                    </div>
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Native Language</label>
                  <div className="relative">
                    <select
                      className={`${inputClass} appearance-none cursor-pointer`}
                      value={formData.language}
                      onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                    >
                      <option>English</option>
                      <option>Spanish</option>
                      <option>French</option>
                      <option>German</option>
                      <option>Chinese</option>
                    </select>
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                      <Globe size={18} />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className={labelClass}>Learning Objective</label>
                <div className="relative">
                  <input
                    type="text"
                    className={`${inputClass} pr-12`}
                    placeholder="e.g., Understanding Quantum Entanglement"
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    required
                  />
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300">
                    <BookOpen size={20} />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div>
                  <label className={labelClass}>Voice Identity</label>
                  <div className="flex p-1.5 bg-gray-50 rounded-2xl border border-gray-100">
                    {['Female', 'Male'].map(v => (
                      <button
                        key={v}
                        type="button"
                        onClick={() => setFormData({ ...formData, voiceType: v })}
                        className={`flex-1 py-3 md:py-3.5 rounded-xl md:rounded-[1rem] text-[10px] md:text-xs font-black uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 ${formData.voiceType === v
                          ? 'bg-white text-gray-900 shadow-lg shadow-gray-200/50'
                          : 'text-gray-400 hover:text-gray-600'
                          }`}
                      >
                        <Mic2 size={14} className={formData.voiceType === v ? 'text-[#FF5B37]' : 'text-gray-300'} />
                        {v}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Conversational Style</label>
                  <div className="relative">
                    <select
                      className={`${inputClass} appearance-none cursor-pointer`}
                      value={formData.style}
                      onChange={(e) => setFormData({ ...formData, style: e.target.value })}
                    >
                      <option>Formal</option>
                      <option>Casual</option>
                      <option>Cheerful</option>
                      <option>Socratic</option>
                    </select>
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                      <ChevronRight size={18} className="rotate-90" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`group w-full bg-gray-900 hover:bg-black text-white font-black py-5 md:py-6 rounded-2xl md:rounded-3xl transition-all duration-300 shadow-xl flex items-center justify-center gap-4 relative overflow-hidden active:scale-[0.98] ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                }`}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 md:w-5 md:h-5 border-2 md:border-3 border-white/30 border-t-white rounded-full animate-spin" />
                  <span className="uppercase tracking-widest text-[10px] md:text-xs">Architecting...</span>
                </div>
              ) : (
                <>
                  <span className="uppercase tracking-[0.1em] md:tracking-[0.2em] text-xs md:text-sm">Generate Companion</span>
                  <div className="w-7 h-7 md:w-8 md:h-8 bg-orange-500 rounded-lg md:rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform shadow-lg shadow-orange-500/20">
                    <Sparkles size={14} fill="currentColor" />
                  </div>
                </>
              )}
            </button>
          </div>

          <div className="bg-orange-50 rounded-3xl md:rounded-[2.5rem] p-6 md:p-8 border border-orange-100 flex items-center gap-4 md:gap-6">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-xl md:rounded-2xl flex items-center justify-center shrink-0 shadow-sm">
              <Sparkles className="text-orange-500" size={20} />
            </div>
            <div className="flex-1">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5 md:mb-1">AI Recommendation</p>
              <p className="text-gray-700 text-xs md:text-sm font-medium">Use a <span className="text-gray-900 font-bold">Socratic</span> style for deep learning, or <span className="text-gray-900 font-bold">Cheerful</span> for quick drills.</p>
            </div>
          </div>
        </motion.div>
      </form>
    </div>
  );
};

export default CompanionBuilder;
