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
  const [volume, setVolume] = useState(0);
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [messages, setMessages] = useState<SavedMessage[]>([]);
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll transcription
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
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
      toast.success("Session connected");
    };

    const onCallEnd = () => {
      setCallStatus(CallStatus.FINISHED);
      setTimeout(() => setCallStatus(CallStatus.INACTIVE), 2000);
      setIsSpeaking(false);
      setVolume(0);
      toast.info("Session ended");
    };

    const onError = (error: any) => {
      console.error("Vapi Error Details:", error);

      // Determine if this is a permission/WebRTC suppression error
      const errorMessage = error.message || error.error?.message || "";
      const isSuppressed = errorMessage.includes("WebRTC") || errorMessage.includes("suppressed") || errorMessage.includes("permission");

      if (isSuppressed) {
        toast.error("Microphone Access Blocked", {
          description: "Please enable microphone permissions in your browser and ensure you are on a secure (HTTPS) connection.",
          duration: 5000,
        });
      } else {
        toast.error("Connection Issue", {
          description: "We encountered a problem starting the session. Please refresh and try again.",
        });
      }

      setCallStatus(CallStatus.INACTIVE);
      setIsSpeaking(false);
      setVolume(0);
    };

    const handleTranscript = (message: any) => {
      if (message.type === "transcript" && message.transcriptType === "final" && message.transcript && message.role) {
        const newMessage: SavedMessage = { role: message.role, content: message.transcript };
        setMessages((prev) => [...prev, newMessage]);
      }
    };

    // Subscriptions
    vapi.on("call-start", onCallStart);
    vapi.on("message", handleTranscript);
    vapi.on("speech-start", () => setIsSpeaking(true));
    vapi.on("speech-end", () => setIsSpeaking(false));
    vapi.on("volume-level", (level: number) => setVolume(level));
    vapi.on("error", onError);
    vapi.on("call-end", onCallEnd);

    return () => {
      vapi.stop();
      // Explicitly remove listeners to prevent duplicates on re-mount
      vapi.off("call-start", onCallStart);
      vapi.off("message", handleTranscript);
      vapi.off("speech-start", () => setIsSpeaking(true));
      vapi.off("speech-end", () => setIsSpeaking(false));
      vapi.off("volume-level", (level: number) => setVolume(level));
      vapi.off("error", onError);
      vapi.off("call-end", onCallEnd);
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

    // 1. Basic compatibility check
    if (typeof window !== 'undefined') {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        toast.error("Unsupported Browser", {
          description: "Your browser doesn't support WebRTC voice calls. Please try Chrome, Firefox, or Safari."
        });
        return;
      }

      if (!window.isSecureContext && window.location.hostname !== 'localhost') {
        toast.error("Security Restriction", {
          description: "Voice sessions require HTTPS. Please use a secure connection."
        });
        return;
      }
    }

    setCallStatus(CallStatus.CONNECTING);
    try {
      // Ensure clean state before starting
      await vapi.stop();

      const { getAssistantConfig } = await import('@/config/vapi');
      const assistantConfig = getAssistantConfig(companion, session?.user);
      await vapi.start(assistantConfig);
    } catch (err: any) {
      console.error("Vapi start execution error:", err);
      onError(err);
    }
  };

  const handleStop = async () => {
    try {
      await vapi.stop();
      if (companion) {
        await addToHistory(companion.id);
      }
    } catch (e) {
      console.error("Cleanup error:", e);
    } finally {
      setCallStatus(CallStatus.INACTIVE);
      setIsSpeaking(false);
      setVolume(0);
    }
  };

  const toggleMic = () => {
    const newMicState = !isMicOn;
    setIsMicOn(newMicState);
    vapi.setMuted(!newMicState);
  };

  if (loading || !companion) return <LessonSkeleton />;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col overflow-hidden">
      {/* Header */}
      <nav className="w-full bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4 flex items-center justify-between z-50">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-slate-100 text-slate-500 hover:text-slate-900 rounded-full transition-all duration-300"
          >
            <ArrowLeft size={18} />
          </button>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 ${companion.iconColor} rounded-full flex items-center justify-center text-xl shadow-inner`}>
              {companion.icon}
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 tracking-tight">{companion.name}</h2>
              <p className="text-[11px] font-medium text-slate-500">{companion.subject} • {companion.topic}</p>
            </div>
          </div>
        </div>

        <div className={`px-4 py-1.5 rounded-full border transition-all duration-500 flex items-center gap-2 ${callStatus === CallStatus.ACTIVE ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-slate-50 border-slate-100 text-slate-400'
          }`}>
          <div className={`w-1.5 h-1.5 rounded-full ${callStatus === CallStatus.ACTIVE ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`} />
          <span className="text-[10px] font-bold uppercase tracking-wider">
            {callStatus === CallStatus.ACTIVE ? 'Live Session' : callStatus === CallStatus.CONNECTING ? 'Connecting...' : 'Standby'}
          </span>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 relative flex flex-col items-center justify-center p-6 sm:p-12 overflow-hidden">
        {/* Animated Background Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: callStatus === CallStatus.ACTIVE ? [0.05, 0.1, 0.05] : 0
            }}
            transition={{ duration: 8, repeat: Infinity }}
            className={`absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px] ${companion.iconColor.split(' ')[0]}`}
          />
        </div>

        {/* Companion Avatar */}
        <div className="relative z-10 mb-8 mt-[-10vh]">
          {/* Pulsing rings when talking */}
          <AnimatePresence>
            {(isSpeaking || volume > 0.05) && (
              <>
                <motion.div
                  initial={{ scale: 1, opacity: 0.5 }}
                  animate={{ scale: 1.5 + (volume * 2), opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                  className={`absolute inset-0 rounded-full border-2 ${companion.iconColor.split(' ')[0]} opacity-20`}
                />
                <motion.div
                  initial={{ scale: 1, opacity: 0.3 }}
                  animate={{ scale: 1.3 + (volume * 1.5), opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
                  className={`absolute inset-0 rounded-full border border-slate-300`}
                />
              </>
            )}
          </AnimatePresence>

          <motion.div
            animate={{
              scale: isSpeaking ? 1.05 : 1,
              y: [0, -4, 0]
            }}
            transition={{
              scale: { duration: 0.2 },
              y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
            className={`w-48 h-48 md:w-64 md:h-64 rounded-full p-2 bg-white shadow-2xl relative z-10 flex items-center justify-center`}
          >
            <div className={`w-full h-full rounded-full ${companion.iconColor} flex items-center justify-center border-4 border-white overflow-hidden shadow-inner`}>
              <span className="text-8xl md:text-9xl select-none">{companion.icon}</span>
            </div>

            {callStatus === CallStatus.ACTIVE && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute bottom-2 right-2 bg-emerald-500 text-white p-3 rounded-full shadow-lg border-2 border-white"
              >
                <Activity size={20} className={isSpeaking ? "animate-pulse" : ""} />
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Transcription Display */}
        <div className="w-full max-w-xl z-20 flex flex-col items-center">
          <div
            ref={scrollRef}
            className="w-full h-32 overflow-y-auto px-4 mask-gradient-v2 no-scrollbar flex flex-col gap-4 mb-12"
          >
            <AnimatePresence mode="popLayout">
              {messages.length > 0 ? (
                messages.slice(-3).map((msg, i) => (
                  <motion.div
                    key={`${i}-${msg.content.slice(0, 10)}`}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm font-medium shadow-sm border ${msg.role === 'user'
                      ? 'bg-slate-100 border-slate-200 text-slate-600 rounded-tr-none'
                      : 'bg-white border-slate-100 text-slate-900 rounded-tl-none'
                      }`}>
                      {msg.content}
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="h-full flex flex-col items-center justify-center opacity-20">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                    {callStatus === CallStatus.ACTIVE ? 'Listening for your voice...' : 'Ready when you are'}
                  </p>
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Action Center - Modern Circular Controls */}
          <div className="flex items-center gap-8 px-8 py-6 bg-white/40 backdrop-blur-xl rounded-[3rem] border border-white/40 shadow-xl">
            {/* Microhpone Toggle */}
            <button
              onClick={toggleMic}
              disabled={callStatus !== CallStatus.ACTIVE}
              className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${!isMicOn ? 'bg-rose-500 text-white shadow-rose-200' : 'bg-slate-100 text-slate-400 hover:text-slate-900'
                } ${callStatus !== CallStatus.ACTIVE ? 'opacity-20 translate-y-2' : 'hover:scale-110 active:scale-90 shadow-md border-2 border-white'}`}
            >
              {isMicOn ? <Mic size={22} /> : <MicOff size={22} />}
            </button>

            {/* Main Call Button - Large Circle */}
            <div className="relative h-28 w-28">
              <AnimatePresence>
                {callStatus === CallStatus.CONNECTING && (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 1.2, opacity: 0 }}
                    className="absolute inset-[-10px] border-4 border-slate-200 border-t-orange-500 rounded-full animate-spin"
                  />
                )}
              </AnimatePresence>

              <button
                onClick={toggleCall}
                className={`w-full h-full rounded-full flex items-center justify-center transition-all duration-500 shadow-2xl relative z-10 border-4 border-white ${callStatus === CallStatus.ACTIVE
                  ? 'bg-slate-900 hover:bg-slate-800'
                  : 'bg-gradient-to-br from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600'
                  } hover:scale-105 active:scale-95 group overflow-hidden`}
              >
                <AnimatePresence mode="wait">
                  {callStatus === CallStatus.CONNECTING ? (
                    <motion.div key="loader" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                      <Loader2 className="animate-spin text-white" size={32} />
                    </motion.div>
                  ) : callStatus === CallStatus.ACTIVE ? (
                    <motion.div key="end" initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0 }}>
                      <PhoneOff className="text-white" size={32} />
                    </motion.div>
                  ) : (
                    <motion.div key="start" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex flex-col items-center">
                      <Phone fill="white" className="text-white" size={32} />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Glass highlight effect */}
                <div className="absolute top-0 left-0 w-full h-1/2 bg-white/10 rounded-t-full pointer-events-none" />
              </button>
            </div>

            {/* Reset Session */}
            <button
              onClick={() => setMessages([])}
              className="w-14 h-14 bg-slate-100 text-slate-400 hover:text-slate-900 rounded-full flex items-center justify-center hover:scale-110 active:scale-90 transition-all duration-300 border-2 border-white shadow-md"
            >
              <RotateCcw size={22} />
            </button>
          </div>

          <p className="mt-8 text-[11px] font-black uppercase tracking-[0.3em] text-slate-400/60 select-none">
            {callStatus === CallStatus.ACTIVE ? 'Connected via Secure Voice' : 'Tap to initialize session'}
          </p>
        </div>
      </main>

      <style jsx global>{`
        .mask-gradient-v2 {
          mask-image: linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%);
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
