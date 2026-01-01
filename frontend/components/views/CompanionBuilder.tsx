
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { COLORS } from '../constants';

const ICONS = ['🧠', '🧪', '➗', '⌨️', '📜', '📊', '💬', '🧬', '🎨', '🌍', '♟️', '🔭', '📐', '🧬', '💡', '🚀'];

const CompanionBuilder: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedIcon, setSelectedIcon] = useState(ICONS[0]);
  const [selectedColorKey, setSelectedColorKey] = useState<keyof typeof COLORS>('Science');
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    topic: '',
    voiceType: 'Female',
    speakingStyle: 'Formal',
    language: 'English'
  });

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate a brief generation delay for effect
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      
      // Navigate after the user sees the success state
      setTimeout(() => {
        navigate('/library');
      }, 2500);
    }, 1500);
  };

  const inputClass = "w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FF5B37]/20 placeholder-gray-400 transition-all";
  const labelClass = "block text-sm font-semibold text-gray-700 mb-2";

  if (showSuccess) {
    return (
      <div className="max-w-4xl mx-auto px-8 py-32 flex flex-col items-center text-center animate-in-scale">
        <div className="w-32 h-32 bg-green-500 rounded-full flex items-center justify-center text-white mb-8 shadow-xl shadow-green-500/20">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="animate-bounce"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Companion Created!</h1>
        <p className="text-gray-500 text-lg max-w-md">
          <span className="font-bold text-gray-900">{formData.name || 'Your companion'}</span> is ready to help you learn. Redirecting you to your library...
        </p>
        <div className="mt-10 flex gap-2">
           <div className="w-2 h-2 bg-[#FF5B37] rounded-full animate-bounce"></div>
           <div className="w-2 h-2 bg-[#FF5B37] rounded-full animate-bounce [animation-delay:0.2s]"></div>
           <div className="w-2 h-2 bg-[#FF5B37] rounded-full animate-bounce [animation-delay:0.4s]"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold mb-4 text-gray-900 tracking-tight">Companion Builder</h1>
        <p className="text-gray-500 max-w-xl mx-auto text-lg">Personalize your AI mentor with a unique identity, voice, and visual style.</p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Visual Identity Panel */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col items-center">
            <h2 className="text-lg font-bold mb-6 w-full text-center">Appearance</h2>
            
            <div 
              onClick={handleImageClick}
              className={`relative group cursor-pointer w-48 h-48 mb-8 ${COLORS[selectedColorKey]} border-4 rounded-[3.5rem] p-1 shadow-inner overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95`}
            >
              <div className="w-full h-full rounded-[3rem] overflow-hidden flex items-center justify-center bg-white/50 backdrop-blur-sm">
                {previewUrl ? (
                  <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="flex flex-col items-center">
                    <span className="text-6xl mb-2 drop-shadow-sm">{selectedIcon}</span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Add Image</span>
                  </div>
                )}
              </div>
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                 <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
              </div>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*" 
                onChange={handleFileChange} 
              />
            </div>

            <div className="w-full space-y-6">
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-4">Choose an Icon</label>
                <div className="grid grid-cols-4 gap-3">
                  {ICONS.map(icon => (
                    <button
                      key={icon}
                      type="button"
                      onClick={() => setSelectedIcon(icon)}
                      className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all ${selectedIcon === icon ? 'bg-[#FF5B37] text-white scale-110 shadow-lg' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-4">Color Palette</label>
                <div className="flex flex-wrap gap-3">
                  {(Object.keys(COLORS) as Array<keyof typeof COLORS>).map(key => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setSelectedColorKey(key)}
                      title={key}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${COLORS[key].split(' ')[0]} ${selectedColorKey === key ? 'border-gray-900 scale-125 shadow-md' : 'border-transparent'}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Configuration Panel */}
        <div className="lg:col-span-7 space-y-8">
          <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
            <div>
              <label className={labelClass}>Companion Name</label>
              <input 
                type="text" 
                className={inputClass} 
                placeholder="e.g., Quantum Quinn"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Subject Category</label>
                <select 
                  className={inputClass}
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  required
                >
                  <option value="">Select Subject</option>
                  <option>Science</option>
                  <option>Maths</option>
                  <option>Language</option>
                  <option>Coding</option>
                  <option>History</option>
                  <option>Business</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Language</label>
                <select 
                  className={inputClass}
                  value={formData.language}
                  onChange={(e) => setFormData({...formData, language: e.target.value})}
                >
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>German</option>
                  <option>Chinese</option>
                </select>
              </div>
            </div>

            <div>
              <label className={labelClass}>Learning Topic</label>
              <input 
                type="text" 
                className={inputClass} 
                placeholder="e.g., The Laws of Thermodynamics"
                value={formData.topic}
                onChange={(e) => setFormData({...formData, topic: e.target.value})}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Voice Identity</label>
                <div className="flex gap-3">
                  {['Female', 'Male'].map(v => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setFormData({...formData, voiceType: v as any})}
                      className={`flex-1 py-3 rounded-xl border text-sm font-medium transition-all ${formData.voiceType === v ? 'bg-[#2D2D2D] text-white border-[#2D2D2D]' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'}`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className={labelClass}>Speaking Tone</label>
                <select 
                  className={inputClass}
                  value={formData.speakingStyle}
                  onChange={(e) => setFormData({...formData, speakingStyle: e.target.value as any})}
                >
                  <option>Formal</option>
                  <option>Casual</option>
                  <option>Cheerful</option>
                  <option>Socratic</option>
                </select>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className={`w-full bg-[#FF5B37] hover:bg-[#e64d2b] text-white font-bold py-5 rounded-2xl transition-all shadow-lg hover:shadow-orange-500/20 active:scale-[0.98] mt-4 flex items-center justify-center gap-3 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Building Companion...
                </>
              ) : 'Generate My Companion'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CompanionBuilder;
