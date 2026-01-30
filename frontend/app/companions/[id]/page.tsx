"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { vapi } from '@/lib/vapi';
import {
  Loader2,
  Mic,
  MicOff,
  Phone,
  PhoneOff,
  RotateCcw,
  ArrowLeft,
  Volume2,
  Brain,
  MessageSquare,
  Activity
} from 'lucide-react';
import { toast } from 'sonner';
import { addToHistory, getCompanionByID } from '@/services/companion.services';
import { Companion } from '@/types/types';
import { LessonSkeleton } from '@/components/ui/LessonSkeleton';
import { useSession } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

interface SavedMessage {
  role: string;
  content: string;
}

interface Message {
  type: string;
  transcriptType?: string;
  role?: string;
  transcript?: string;
  [key: string]: any;
}

const LessonRoom: React.FC = () => {
  const params = useParams();
  const id = typeof params?.id === 'string' ? params.id : Array.isArray(params?.id) ? params.id[0] : '';
  const [companion, setCompanion] = useState<Companion | null>(null);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const [isMicOn, setIsMicOn] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [messages, setMessages] = useState<SavedMessage[]>([]);
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [messages]);

  useEffect(() => {
    const fetchCompanion = async () => {
      try {
        setLoading(true);
        const response = await getCompanionByID(id);
        if (response.data) {
          setCompanion(response.data);
        } else {
          toast.error("Companion not found");
          router.push('/');
        }
      } catch (error) {
        console.error('Error fetching companion:', error);
        toast.error("Failed to load mentor");
      } finally {
        setLoading(false);
      }
    };

    fetchCompanion();

    const onCallStart = () => {
      setCallStatus(CallStatus.ACTIVE);
      setIsMicOn(true);
      toast.success("Session started");
    };

    const onCallEnd = async () => {
      setCallStatus(CallStatus.INACTIVE);
      toast.info("Session ended");
    };

    const onSpeechStart = () => setIsSpeaking(true);
    const onSpeechEnd = () => setIsSpeaking(false);

    const onError = (error: Error) => {
      console.error("Vapi Error:", error);
      toast.error("Connection Error", {
        description: error.message || "An error occurred during the session."
      });
      setCallStatus(CallStatus.INACTIVE);
    };

    const onMessage = (message: Message) => {
      if (message.type === "transcript" && message.transcriptType === "final" && message.transcript && message.role) {
        const newMessage: SavedMessage = { role: message.role, content: message.transcript };
        setMessages((prev) => [newMessage, ...prev]);
      }
    };

    vapi.on("call-start", onCallStart);
    vapi.on("message", onMessage);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);
    vapi.on("error", onError);
    vapi.on("call-end", onCallEnd);

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("message", onMessage);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
      vapi.off("error", onError);
      vapi.off("call-end", onCallEnd);
      vapi.stop();
    };
  }, [id]);

  const toggleCall = async () => {
    if (callStatus === CallStatus.ACTIVE || callStatus === CallStatus.CONNECTING) {
      handleStop();
    } else {
      handleStart();
    }
  };

  const handleStart = async () => {
    if (!companion) return;

    setCallStatus(CallStatus.CONNECTING);
    try {
      const { getAssistantConfig } = await import('@/config/vapi');
      const assistantConfig = getAssistantConfig(companion, session?.user);
      await vapi.start(assistantConfig);
    } catch (err: any) {
      console.error("Vapi start error:", err);
      toast.error("Initialization Failed");
      setCallStatus(CallStatus.INACTIVE);
    }
  };

  const handleStop = async () => {
    vapi.stop();
    if (companion) {
      try {
        await addToHistory(companion.id);
        toast.success("Progress saved");
      } catch (e) {
        console.error("Progress save failed");
      }
    }
    setCallStatus(CallStatus.INACTIVE);
  };

  const toggleMic = () => {
    const newMicState = !isMicOn;
    setIsMicOn(newMicState);
    vapi.setMuted(!newMicState);
  };

  if (loading || !companion) return <LessonSkeleton />;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <nav className="w-full bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-50 text-gray-400 hover:text-gray-900 rounded-lg transition-colors"
          >
            <ArrowLeft size={18} />
          </button>
          <div className="h-4 w-px bg-gray-100" />
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 ${companion.iconColor} rounded-lg flex items-center justify-center text-sm`}>
              {companion.icon}
            </div>
            <div>
              <h2 className="text-xs font-black text-gray-900 uppercase tracking-tight leading-none mb-1">{companion.name}</h2>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">{companion.subject}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-100">
            <div className={`w-1.5 h-1.5 rounded-full ${callStatus === CallStatus.ACTIVE ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`} />
            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{callStatus === CallStatus.ACTIVE ? 'Live session' : 'Standby'}</span>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-6 flex flex-col items-center justify-center gap-10">
        <div className="relative">
          {/* Subtle Speaker Aura */}
          <AnimatePresence>
            {isSpeaking && (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1.2, opacity: 0.1 }}
                exit={{ scale: 1.3, opacity: 0 }}
                transition={{ repeat: Infinity, duration: 1, ease: "easeOut" }}
                className={`absolute inset-0 ${companion.iconColor.split(' ')[0]} rounded-3xl`}
              />
            )}
          </AnimatePresence>

          <motion.div
            animate={isSpeaking ? { scale: [1, 1.02, 1] } : {}}
            transition={{ repeat: Infinity, duration: 2 }}
            className={`relative w-40 h-40 md:w-56 md:h-56 ${companion.iconColor} rounded-[2.5rem] p-1 shadow-lg flex items-center justify-center`}
          >
            <div className="w-full h-full rounded-[2.2rem] bg-white/50 backdrop-blur-sm flex items-center justify-center border border-white/20">
              <span className="text-7xl md:text-8xl">{companion.icon}</span>
            </div>

            {callStatus === CallStatus.ACTIVE && isSpeaking && (
              <div className="absolute -top-3 -right-3 bg-white p-2.5 rounded-xl shadow-md border border-gray-50">
                <Activity size={16} className="text-[#FF5B37] animate-bounce" />
              </div>
            )}
          </motion.div>
        </div>

        <div className="text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-1">{companion.name}</h3>
          <p className="text-gray-400 text-sm font-medium">Learning about <span className="text-gray-900">{companion.topic}</span></p>
        </div>

        {/* Console Container */}
        <div className="w-full max-w-2xl bg-white rounded-3xl p-6 shadow-xl border border-gray-100 flex flex-col gap-6">
          {/* Transcripts */}
          <div
            ref={scrollRef}
            className="h-40 overflow-y-auto flex flex-col gap-4 no-scrollbar mask-gradient"
          >
            <AnimatePresence mode="popLayout">
              {messages.length > 0 ? (
                messages.slice(0, 3).map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1 - (i * 0.3), y: 0 }}
                    className="flex items-start gap-3"
                  >
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-gray-100 text-gray-400' : 'bg-orange-50 text-[#FF5B37]'}`}>
                      {msg.role === 'user' ? <MessageSquare size={12} /> : <Brain size={12} />}
                    </div>
                    <p className={`text-sm md:text-base font-bold leading-relaxed ${msg.role === 'user' ? 'text-gray-400' : 'text-gray-900'}`}>
                      {msg.content}
                    </p>
                  </motion.div>
                ))
              ) : (
                <div className="h-full flex items-center justify-center flex-col gap-3 opacity-30">
                  <Activity size={32} className="text-gray-300" />
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Waiting for interaction...</p>
                </div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-4 border-t border-gray-50 pt-6">
            <div className="flex items-center gap-2">
              <button
                onClick={toggleMic}
                disabled={callStatus !== CallStatus.ACTIVE}
                className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${isMicOn
                  ? 'bg-gray-50 text-gray-400 hover:text-gray-900'
                  : 'bg-red-50 text-red-500'
                  } ${callStatus !== CallStatus.ACTIVE ? 'opacity-30 cursor-not-allowed' : 'hover:scale-105 active:scale-95 border border-transparent hover:border-gray-200'}`}
              >
                {isMicOn ? <Mic size={20} /> : <MicOff size={20} />}
              </button>
              <button
                className="w-12 h-12 bg-gray-50 text-gray-400 hover:text-gray-900 rounded-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all border border-transparent hover:border-gray-200"
              >
                <RotateCcw size={20} />
              </button>
            </div>

            <button
              onClick={toggleCall}
              className={`flex-1 py-3.5 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition-all duration-300 shadow-md active:scale-[0.98] ${callStatus === CallStatus.ACTIVE || callStatus === CallStatus.CONNECTING
                ? 'bg-gray-900 text-white'
                : 'bg-[#FF5B37] text-white'
                }`}
            >
              {callStatus === CallStatus.CONNECTING ? (
                <>
                  <Loader2 className="animate-spin w-4 h-4" />
                  <span>Preparing...</span>
                </>
              ) : callStatus === CallStatus.ACTIVE ? (
                <>
                  <PhoneOff size={16} />
                  <span>End Session</span>
                </>
              ) : (
                <>
                  <Phone size={16} fill="white" />
                  <span>Start Session</span>
                </>
              )}
            </button>
          </div>
        </div>
      </main>

      <style jsx global>{`
        .mask-gradient {
          mask-image: linear-gradient(to bottom, transparent, black 15%, black 85%, transparent);
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default LessonRoom;
