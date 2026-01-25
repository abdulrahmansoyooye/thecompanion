"use client";

import React, { useEffect, useState } from 'react';
import { X, Sparkles, Wand2, MessageSquare, Mic2, Languages, Trophy } from 'lucide-react';
import { CreateCompanion, updateCompanion } from '@/services/companion.services';
import { toast } from 'sonner';

interface CreateCompanionModalProps {
  isOpen: boolean;
  onClose: () => void;
  editData?: any;
}

const CreateCompanionModal: React.FC<CreateCompanionModalProps> = ({ isOpen, onClose, editData }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    topic: '',
    subject: 'Science',
    voiceType: 'Rachel',
    duration: '',
    style: 'Friendly',
    language: 'English',
    iconColor: "",
    icon: '🧪'
  });

  useEffect(() => {
    if (editData) {
      setFormData({
        name: editData.name || '',
        topic: editData.topic || '',
        duration: editData.duration || '',
        subject: editData.subject || 'Science',
        voiceType: editData.voiceType || 'Rachel',
        style: editData.style || 'Friendly',
        language: editData.language || 'English',
        iconColor: editData.iconColor || '',
        icon: editData.icon || '🧪'
      });
    } else {
      setFormData({
        name: '',
        topic: '',
        duration: '',
        subject: 'Science',
        voiceType: 'Rachel',
        style: 'Friendly',
        language: 'English',
        iconColor: "",
        icon: '🧪'
      });
    }
  }, [editData, isOpen]);

  if (!isOpen) return null;

  const subjects = ['Science', 'Maths', 'Language', 'Coding', 'History', 'Business', 'Economics', 'Geography', 'Finance'];
  const icons = ['🧪', '➗', '🗣️', '⌨️', '📜', '💼', '📊', '🗺️', '💰', '🤖', '🎨', '🪐'];

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
      // Use standard navigation if possible, but reload is fine for now as per code
      setTimeout(() => window.location.reload(), 500);
    } catch (error) {
      // Error is already toasted in service layer
    }
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="px-8 pt-8 pb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#FF5B37] rounded-xl flex items-center justify-center text-white">
              <Sparkles size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{editData ? 'Update' : 'Create'} Companion</h2>
              <p className="text-xs text-gray-500 font-medium">{editData ? 'Modify your companion details' : 'Design your personalized AI tutor'}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 pt-4">
          <div className="space-y-6">
            {/* Step 1: Identity */}
            <div className="space-y-4">
              <div>
                <label className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                  <Wand2 size={16} className="text-[#FF5B37]" />
                  What's their name?
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Neura, the Brainy Explorer"
                  className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#FF5B37]/20 transition-all text-sm font-medium"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div>
                <label className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                  <MessageSquare size={16} className="text-[#FF5B37]" />
                  What will you learn together?
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Quantum Physics basics"
                  className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#FF5B37]/20 transition-all text-sm font-medium"
                  value={formData.topic}
                  onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                    <Trophy size={16} className="text-[#FF5B37]" />
                    Subject
                  </label>
                  <select
                    className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#FF5B37]/20 transition-all text-sm font-medium appearance-none"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  >
                    {subjects.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                    <Mic2 size={16} className="text-[#FF5B37]" />
                    Voice
                  </label>
                  <select
                    className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#FF5B37]/20 transition-all text-sm font-medium appearance-none"
                    value={formData.voiceType}
                    onChange={(e) => setFormData({ ...formData, voiceType: e.target.value })}
                  >
                    <option value="Rachel">Rachel (Natural)</option>
                    <option value="Josh">Josh (Deep)</option>
                    <option value="Bella">Bella (Academic)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">Choose an Icon</label>
                <div className="flex flex-wrap gap-3">
                  {icons.map((icon) => (
                    <button
                      key={icon}
                      type="button"
                      onClick={() => setFormData({ ...formData, icon })}
                      className={`w-12 h-12 flex items-center justify-center text-xl rounded-xl transition-all cursor-pointer ${formData.icon === icon
                        ? 'bg-[#FF5B37] text-white shadow-lg scale-110'
                        : 'bg-gray-50 hover:bg-gray-100 text-gray-600'
                        }`}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-4 px-6 border border-gray-200 rounded-2xl font-bold text-gray-600 hover:bg-gray-50 transition-all active:scale-[0.98]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-2 py-4 px-6 bg-[#FF5B37] hover:bg-[#e64d2b] text-white font-extrabold rounded-2xl transition-all shadow-lg shadow-orange-500/10 active:scale-[0.98] flex items-center justify-center gap-2"
            >
              {editData ? 'Update' : 'Create'} Companion
              <Sparkles size={18} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCompanionModal;
