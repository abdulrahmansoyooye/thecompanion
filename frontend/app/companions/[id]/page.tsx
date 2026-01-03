"use client"
import React, { useState, useEffect, useRef } from 'react';

import { useParams } from 'next/navigation';
import { INITIAL_COMPANIONS } from '@/constants/constants';

const LessonRoom: React.FC = () => {
  const params = useParams();
  // Ensure id is a string (useParams can return string or string[])
  const id = typeof params?.id === 'string' ? params.id : Array.isArray(params?.id) ? params.id[0] : '';

  const companion = INITIAL_COMPANIONS.find(c => c.id === id) || INITIAL_COMPANIONS[0];

  const [isMicOn, setIsMicOn] = useState(true);
  const [transcription, setTranscription] = useState('Neural networks of the brain are made up of billions of neurons');
  const [subTranscription, setSubTranscription] = useState('(nerve cells) that communicate through electrical and chemical signals');
  const [isConnecting, setIsConnecting] = useState(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const outputCtxRef = useRef<AudioContext | null>(null);
  const sessionRef = useRef<any>(null);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const nextStartTimeRef = useRef<number>(0);

  useEffect(() => {
    // Automatically start session for demo or wait for user?
    // Based on the screenshot, it looks like an active session.
    return () => {
      stopSession();
    };
  }, []);

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

  const toggleMic = () => {
    setIsMicOn(!isMicOn);
    // Logic to mute/unmute stream would go here
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col min-h-[calc(100vh-80px)]">

      {/* Top Header Card */}
      <div className="bg-white border border-gray-300 rounded-3xl px-6 py-4 flex items-center justify-between mb-8 shadow-sm">
        <div className="flex items-center gap-4">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl ${companion.color} border-none`}>
            {companion.icon}
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold text-gray-900">{companion.name}</h2>
              <span className="bg-[#1A1A1A] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {companion.subject}
              </span>
            </div>
            <p className="text-sm text-gray-600">Topic: {companion.topic}</p>
          </div>
        </div>
        <div className="text-gray-900 font-bold text-lg">
          {companion.duration}
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="flex-1 grid grid-cols-12 gap-6 mb-8">

        {/* Center Companion Focus Area */}
        <div className="col-span-9 bg-white  rounded-2xl flex flex-col items-center justify-center relative overflow-hidden">
          {/* Inner Border Overlay for the specific look */}
          <div className="absolute inset-1 border-2 border-[#FF5B37] rounded-xl pointer-events-none opacity-40"></div>

          <div className="flex flex-col items-center gap-6">
            <div className={`w-32 h-32 ${companion.color} rounded-2xl flex items-center justify-center text-6xl shadow-sm border-2 border-blue-400 border-dashed`}>
              {companion.icon}
            </div>
            <div className="px-4 py-1">
              <h3 className="text-2xl font-black text-gray-900">{companion.name}</h3>
            </div>
          </div>
        </div>

        {/* Sidebar Controls */}
        <div className="col-span-3 flex flex-col gap-4">
          {/* User Video/Identity Area */}
          <div className="flex-1 bg-white border-2 border-gray-900 rounded-2xl flex items-center justify-center">
            <span className="text-xl font-black text-gray-900">Adrian</span>
          </div>

          {/* Action Buttons Grid */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={toggleMic}
              className="bg-white border-2 border-gray-900 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
            >
              <div className="text-2xl">
                {isMicOn ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="1" y1="1" x2="23" y2="23" /><path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6" /><path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23" /><line x1="12" y1="19" x2="12" y2="23" /><line x1="8" y1="23" x2="16" y2="23" /></svg>
                )}
              </div>
              <span className="text-xs font-bold text-gray-900">{isMicOn ? 'Turn off mic' : 'Turn on mic'}</span>
            </button>

            <button className="bg-white border-2 border-gray-900 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
              <div className="text-2xl">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10" /><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" /></svg>
              </div>
              <span className="text-xs font-bold text-gray-900">Repeat</span>
            </button>
          </div>

          {/* End Lesson Button */}
          <button
            onClick={() => console.log('End Lesson')}
            className="w-full bg-[#FF5B37] hover:bg-[#e64d2b] text-white font-bold py-5 rounded-2xl transition-all shadow-md active:scale-[0.98]"
          >
            End Lesson
          </button>
        </div>
      </div>

      {/* Footer Transcription Area */}
      <div className="flex flex-col items-center justify-center text-center px-12">
        <p className="text-xl font-bold text-gray-900 mb-1 max-w-3xl">
          {transcription}
        </p>
        <p className="text-lg font-medium text-gray-400 max-w-3xl">
          {subTranscription}
        </p>
      </div>

    </div>
  );
};

export default LessonRoom;
