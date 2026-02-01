"use client";

import React, { useEffect, useState } from 'react';
import { X, Sparkles, Wand2, MessageSquare, Mic2, Languages, Trophy, Check } from 'lucide-react';
import { CreateCompanion, updateCompanion } from '@/services/companion.services';
import { COLORS } from '@/constants/constants';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

interface CreateCompanionModalProps {
  isOpen: boolean;
  onClose: () => void;
  editData?: any;
}

const CreateCompanionModal: React.FC<CreateCompanionModalProps> = ({ isOpen, onClose, editData }) => {
  const [formData, setFormData] = useState({
    name: '',
    topic: '',
    subject: 'Science',
    voiceType: 'Rachel',
    duration: 30,
    style: 'Friendly',
    language: 'English',
    iconColor: COLORS.Science,
    icon: '🧪'
  });

  useEffect(() => {
    if (editData) {
      setFormData({
        name: editData.name || '',
        topic: editData.topic || '',
        duration: editData.duration || '30',
        subject: editData.subject || 'Science',
        voiceType: editData.voiceType || 'Rachel',
        style: editData.style || 'Friendly',
        language: editData.language || 'English',
        iconColor: editData.iconColor || COLORS.Science,
        icon: editData.icon || '🧪'
      });
    } else {
      setFormData({
        name: '',
        topic: '',
        duration: 30,
        subject: 'Science',
        voiceType: 'Rachel',
        style: 'Friendly',
        language: 'English',
        iconColor: COLORS.Science,
        icon: '🧪'
      });
    }
  }, [editData, isOpen]);

  if (!isOpen) return null;

  const subjects = ['Science', 'Maths', 'Language', 'Coding', 'History', 'Business', 'Economics', 'Geography', 'Finance'];
  const icons = ['🧪', '➗', '🗣️', '⌨️', '📜', '💼', '📊', '🗺️', '💰', '🎨', '🪐'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editData) {
        await updateCompanion(editData.id, formData);
        toast.success("Companion updated successfully!");
      } else {
        await CreateCompanion(formData);
        toast.success("Companion created successfully!");
      }
      onClose();
      setTimeout(() => window.location.reload(), 500);
    } catch (error) {
    }
  };

  const labelClass = "text-xs font-black text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2 ml-1";
  const inputClass = "w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-500/5 focus:border-orange-500/20 transition-all text-sm font-semibold placeholder:text-gray-300";

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-gray-900/40 backdrop-blur-md"
          onClick={onClose}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="px-8 pt-8 pb-4 flex items-center justify-between border-b border-gray-50">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-orange-50 text-[#FF5B37] rounded-xl flex items-center justify-center">
                <Sparkles size={20} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 tracking-tight">{editData ? 'Update' : 'New'} Companion</h2>
                <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">{editData ? 'Adjust settings' : 'Design your perfect mentor'}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors group"
            >
              <X size={18} className="text-gray-400 group-hover:text-gray-900 transition-colors" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[75vh] overflow-y-auto no-scrollbar">
            <div className="space-y-5">
              <div>
                <label className={labelClass}>Mentors Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Professor Zephyr"
                  className={inputClass}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div>
                <label className={labelClass}>Core Topic</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. History of Rome"
                  className={inputClass}
                  value={formData.topic}
                  onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Domain</label>
                  <select
                    className={`${inputClass} appearance-none cursor-pointer`}
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  >
                    {subjects.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Session Goal</label>
                  <select
                    className={`${inputClass} appearance-none cursor-pointer`}
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
                  >
                    <option value="15">15 Minutes</option>
                    <option value="30">30 Minutes</option>
                    <option value="45">45 Minutes</option>
                    <option value="60">1 Hour</option>
                  </select>
                </div>
              </div>

              <div>
                <label className={labelClass}>Choose Theme</label>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(COLORS).map(([key, value]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setFormData({ ...formData, iconColor: value })}
                      className={`w-8 h-8 rounded-lg border-2 transition-all ${value.split(' ')[0]} ${formData.iconColor === value ? 'border-gray-900 scale-110 shadow-sm' : 'border-white'}`}
                    >
                      {formData.iconColor === value && <Check size={12} className="mx-auto text-gray-900" />}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className={labelClass}>Choose Avatar</label>
                <div className="grid grid-cols-6 gap-2">
                  {icons.map((icon) => (
                    <button
                      key={icon}
                      type="button"
                      onClick={() => setFormData({ ...formData, icon })}
                      className={`aspect-square flex items-center justify-center text-lg rounded-xl transition-all relative ${formData.icon === icon
                        ? 'bg-gray-900 text-white shadow-md'
                        : 'bg-gray-50 hover:bg-gray-100 text-gray-500 hover:text-gray-900'
                        }`}
                    >
                      {icon}
                      {formData.icon === icon && (
                        <div className="absolute -top-1 -right-1 bg-[#FF5B37] text-white rounded-full p-0.5 shadow-sm">
                          <Check size={8} strokeWidth={4} />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 px-4 bg-gray-50 text-gray-500 font-bold text-xs rounded-xl hover:bg-gray-100 transition-all active:scale-[0.98]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-[2] py-3 px-4 bg-[#FF5B37] text-white font-bold text-xs rounded-xl hover:bg-[#e64d2b] transition-all shadow-md active:scale-[0.98] flex items-center justify-center gap-2 group"
              >
                {editData ? 'Update mentor' : 'Create mentor'}
                <Sparkles size={14} className="group-hover:rotate-12 transition-transform" />
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CreateCompanionModal;
