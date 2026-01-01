
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { INITIAL_COMPANIONS } from '../constants';
import { createLiveSession, createPcmBlob, decodeAudio, decodeAudioData } from '../services/gemini';

const LessonRoom: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const companion = INITIAL_COMPANIONS.find(c => c.id === id) || INITIAL_COMPANIONS[0];
  
  const [isMicOn, setIsMicOn] = useState(false);
  const [transcription, setTranscription] = useState('Welcome! I am ready to study with you. Upload any materials you want me to look at.');
  const [isConnecting, setIsConnecting] = useState(false);
  const [studyImages, setStudyImages] = useState<string[]>([]);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const studyFileInputRef = useRef<HTMLInputElement>(null);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const outputCtxRef = useRef<AudioContext | null>(null);
  const sessionRef = useRef<any>(null);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const nextStartTimeRef = useRef<number>(0);

  useEffect(() => {
    return () => {
      stopSession();
    };
  }, []);

  const handleStudyImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setStudyImages(prev => [...prev, url]);
      setActiveImageIdx(studyImages.length);
      setTranscription(`Excellent material! I'm analyzing this now. It seems to be related to ${companion.topic}. What specific part should we discuss?`);
    }
  };

  const stopSession = () => {
    if (sessionRef.current) {
      sessionRef.current.then((session: any) => session.close());
    }
    if (audioCtxRef.current) audioCtxRef.current.close();
    if (outputCtxRef.current) outputCtxRef.current.close();
    sourcesRef.current.forEach(s => s.stop());
    sourcesRef.current.clear();
    setIsMicOn(false);
  };

  const startSession = async () => {
    if (isMicOn) {
      stopSession();
      return;
    }

    try {
      setIsConnecting(true);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      const inputCtx = new AudioContext({ sampleRate: 16000 });
      const outputCtx = new AudioContext({ sampleRate: 24000 });
      audioCtxRef.current = inputCtx;
      outputCtxRef.current = outputCtx;

      const systemInstruction = `You are ${companion.name}, an expert AI tutor for ${companion.subject}. The current topic is ${companion.topic}. 
      You are viewing study materials uploaded by the student. 
      Act like a personal mentor: encourage them, ask guiding questions, and explain complex parts of the image they've shared. 
      Keep your responses concise and spoken.`;

      const sessionPromise = createLiveSession(systemInstruction, {
        onopen: () => {
          const source = inputCtx.createMediaStreamSource(stream);
          const processor = inputCtx.createScriptProcessor(4096, 1, 1);
          processor.onaudioprocess = (e) => {
            const inputData = e.inputBuffer.getChannelData(0);
            const blob = createPcmBlob(inputData);
            sessionPromise.then(session => session.sendRealtimeInput({ media: blob }));
          };
          source.connect(processor);
          processor.connect(inputCtx.destination);
          setIsMicOn(true);
          setIsConnecting(false);
        },
        onmessage: async (msg) => {
          const audioBase64 = msg.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
          if (audioBase64) {
            const outCtx = outputCtxRef.current!;
            nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outCtx.currentTime);
            const buffer = await decodeAudioData(decodeAudio(audioBase64), outCtx, 24000, 1);
            const source = outCtx.createBufferSource();
            source.buffer = buffer;
            source.connect(outCtx.destination);
            source.onended = () => sourcesRef.current.delete(source);
            source.start(nextStartTimeRef.current);
            nextStartTimeRef.current += buffer.duration;
            sourcesRef.current.add(source);
          }
        },
        onerror: (err) => {
          console.error(err);
          setIsConnecting(false);
        }
      });
      sessionRef.current = sessionPromise;
    } catch (err) {
      setIsConnecting(false);
    }
  };

  const hasImages = studyImages.length > 0;

  return (
    <div className="max-w-7xl mx-auto px-8 py-6 h-[calc(100vh-80px)] flex flex-col gap-6">
      {/* Header */}
      <div className="bg-white border border-gray-100 px-8 py-5 rounded-[2.5rem] flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-5">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl ${companion.color}`}>
            {companion.icon}
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-gray-900">{companion.name}</h2>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{companion.topic}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-full">
             <div className={`w-2 h-2 rounded-full ${isMicOn ? 'bg-green-500 animate-ping' : 'bg-gray-300'}`}></div>
             <span className="text-[10px] font-bold text-gray-500 tracking-wider">LIVE STATUS</span>
          </div>
          <button 
            onClick={() => navigate('/')}
            className="text-gray-400 hover:text-red-500 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="flex-1 flex gap-8 min-h-0">
        <div className="flex-1 bg-white border border-gray-100 rounded-[3rem] shadow-sm relative overflow-hidden flex flex-col">
          {hasImages ? (
            <div className="relative flex-1 flex flex-col">
              {/* Image Viewer */}
              <div className="flex-1 relative group bg-black/5 flex items-center justify-center overflow-hidden">
                <img 
                  src={studyImages[activeImageIdx]} 
                  alt="Study Material" 
                  className="max-w-full max-h-full object-contain"
                />
                
                {/* Floating Companion Badge - Integrated Alignment */}
                <div className="absolute top-6 left-6 z-20 animate-in fade-in slide-in-from-top-4 duration-700">
                  <div className={`flex items-center gap-3 bg-white/90 backdrop-blur shadow-2xl p-2 pr-5 rounded-3xl border border-white/50`}>
                    <div className={`w-12 h-12 ${companion.color} rounded-2xl flex items-center justify-center text-2xl shadow-sm`}>
                      {companion.icon}
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-[#FF5B37] leading-none mb-1">ANALYZING...</div>
                      <div className="text-sm font-extrabold text-gray-800">{companion.name}</div>
                    </div>
                  </div>
                </div>

                {/* AI Scanning Effect */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-[#FF5B37]/40 to-transparent absolute top-0 animate-[scan_3s_ease-in-out_infinite]"></div>
                </div>
              </div>

              {/* Thumbnails strip */}
              {studyImages.length > 1 && (
                <div className="h-24 border-t border-gray-100 flex items-center gap-3 px-6 overflow-x-auto">
                  {studyImages.map((img, idx) => (
                    <button 
                      key={idx}
                      onClick={() => setActiveImageIdx(idx)}
                      className={`w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all ${activeImageIdx === idx ? 'border-[#FF5B37] scale-105 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'}`}
                    >
                      <img src={img} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
              <div className={`w-40 h-40 ${companion.color} rounded-[3rem] flex items-center justify-center text-7xl mb-8 shadow-inner`}>
                {companion.icon}
              </div>
              <h1 className="text-3xl font-extrabold text-gray-900 mb-4">Start your session with {companion.name}</h1>
              <p className="text-gray-500 max-w-md leading-relaxed">
                Upload a photo of your textbook, notes, or assignment. {companion.name} will analyze it and help you learn.
              </p>
            </div>
          )}
        </div>

        {/* Sidebar Controls */}
        <div className="w-80 flex flex-col gap-5">
           {/* Voice Visualization */}
           <div className={`h-48 rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col items-center justify-center p-6 transition-colors ${isMicOn ? 'bg-[#FF5B37]' : 'bg-white'}`}>
             {isMicOn ? (
               <div className="flex gap-1 items-end h-16">
                 {[...Array(8)].map((_, i) => (
                   <div 
                    key={i} 
                    className="w-1.5 bg-white rounded-full animate-bounce" 
                    style={{ height: `${20 + Math.random() * 80}%`, animationDelay: `${i * 0.15}s` }}
                   ></div>
                 ))}
               </div>
             ) : (
               <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-300">
                 <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/></svg>
               </div>
             )}
             <p className={`mt-4 font-bold text-sm ${isMicOn ? 'text-white' : 'text-gray-400'}`}>
               {isMicOn ? 'I\'m Listening...' : 'Mic is Off'}
             </p>
           </div>

           {/* Actions */}
           <div className="flex-1 flex flex-col gap-4">
              <button 
                onClick={startSession}
                disabled={isConnecting}
                className={`w-full py-6 rounded-[2rem] border-2 font-bold flex items-center justify-center gap-3 transition-all ${isMicOn ? 'bg-red-50 border-red-100 text-red-500 hover:bg-red-100' : 'bg-[#2D2D2D] border-[#2D2D2D] text-white hover:bg-black'}`}
              >
                {isConnecting ? 'Connecting...' : isMicOn ? 'Stop Session' : 'Start Talking'}
              </button>

              <button 
                onClick={() => studyFileInputRef.current?.click()}
                className="w-full py-6 rounded-[2rem] bg-white border-2 border-dashed border-gray-200 hover:border-[#FF5B37] hover:bg-orange-50/30 transition-all group flex flex-col items-center gap-2"
              >
                <div className="p-3 bg-gray-50 rounded-2xl text-gray-400 group-hover:text-[#FF5B37] transition-colors">
                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                </div>
                <span className="text-sm font-bold text-gray-600 group-hover:text-[#FF5B37]">Share Material</span>
                <input type="file" ref={studyFileInputRef} className="hidden" accept="image/*" onChange={handleStudyImageUpload} />
              </button>
           </div>

           <button 
            onClick={() => navigate('/journey')}
            className="w-full bg-[#FF5B37] text-white font-bold py-5 rounded-[2rem] shadow-xl shadow-orange-500/10 hover:bg-[#e64d2b] transition-all"
           >
             Finish Lesson
           </button>
        </div>
      </div>

      {/* Live Transcription Bar */}
      <div className="bg-white border border-gray-100 p-6 rounded-[2.5rem] shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1.5 h-full bg-[#FF5B37]"></div>
        <p className="text-lg font-medium text-gray-700 italic px-4 leading-relaxed">
          "{transcription}"
        </p>
      </div>

      <style>{`
        @keyframes scan {
          0%, 100% { top: 0%; opacity: 0; }
          5% { opacity: 1; }
          95% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default LessonRoom;
