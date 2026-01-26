"use client";
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { vapi } from '@/lib/vapi';
import { Loader2, Mic, MicOff, Phone, PhoneOff, RotateCcw } from 'lucide-react';

import { toast } from 'sonner';
import { addToHistory, getCompanionByID } from '@/services/companion.services';
import { Companion } from '@/types/types';
import { LessonSkeleton } from '@/components/ui/LessonSkeleton';

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}
import { useRouter } from 'next/navigation';
import { getAssistantConfig } from '@/config/vapi';
import { useSession } from 'next-auth/react';

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


const {data:session} = useSession()
  const [isMicOn, setIsMicOn] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [messages, setMessages] = useState<SavedMessage[]>([]);
  const router = useRouter()
  useEffect(() => {
    const fetchCompanions = async () => {
      try {
        setLoading(true);
        const response = await getCompanionByID(id);
        setCompanion(response.data)

      } catch (error) {
        console.error('Error fetching companions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanions();

    const onCallStart = () => {
      setCallStatus(CallStatus.ACTIVE);
      setIsMicOn(true); // Default to mic on when call starts
    };

    const onCallEnd = async () => {
      console.log("lesson ended")
      if (companion) {
        const res = await addToHistory(companion.id)
        console.log(res)
        if (res.ok) {
          toast.success("Conversation saved successfully")
          router.push("/")
        }
      }
      toast.error("Conversation not saved")
      setCallStatus(CallStatus.INACTIVE)

    };
    const onSpeechStart = () => setIsSpeaking(true);
    const onSpeechEnd = () => setIsSpeaking(false);
    
    const onError = (error: Error) => {
      console.error("Vapi Error:", error);
      toast.error("Vapi Error", {
        description: error.message || "An error occurred during the call."
      });
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
    };
  }, []);

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
      // Check for microphone permissions first
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        stream.getTracks().forEach(track => track.stop()); // Stop the test stream
      } catch (permErr) {
        throw new Error("Microphone access denied. Please enable microphone permissions in your browser settings.");
      }

      const assistantConfig = getAssistantConfig(companion, session?.user);
      await vapi.start(assistantConfig);
    } catch (err: any) {
      console.error("Vapi start unexpected error:", err);
      toast.error("Failed to start session", {
        description: err.message || "Please check your microphone permissions and try again."
      });
      setCallStatus(CallStatus.INACTIVE);
    }
  };

  const handleStop = async () => {
     console.log("lesson ended")
      if (companion) {
        const res = await addToHistory(companion.id)
        console.log(res)
        if (res.success) {
          toast.success("Conversation saved successfully")
          router.push("/")
        }
      }
    
    setCallStatus(CallStatus.FINISHED); // Temporarily 'finished' before actual end event
    vapi.stop();
  };

  const toggleMic = () => {
    const newMicState = !isMicOn;
    setIsMicOn(newMicState);
    vapi.setMuted(!newMicState);
  };

  const currentTranscript = messages.length > 0 ? messages[0].content : "Ready to start the lesson...";

  if (loading || !companion) {
    return <LessonSkeleton />;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col min-h-[calc(100vh-80px)]">
      {/* Top Header Card */}
      <div className="bg-white border border-gray-300 rounded-2xl sm:rounded-3xl px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 sm:mb-8 shadow-sm">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center text-2xl sm:text-3xl ${companion.iconColor} border-none shrink-0`}>
            {companion.icon}
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 truncate">{companion.name}</h2>
              <span className="bg-[#1A1A1A] text-white text-[8px] sm:text-[10px] font-bold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full uppercase tracking-wider shrink-0">
                {companion.subject}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 truncate">Topic: {companion.topic}</p>
          </div>
        </div>
        <div className="text-gray-900 font-bold text-base sm:text-lg w-full sm:w-auto flex justify-end">
          {companion.duration} mins
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="flex-1 flex flex-col lg:grid lg:grid-cols-12 gap-6 mb-8">
        {/* Center Companion Focus Area */}
        <div className="lg:col-span-9 bg-white rounded-2xl flex flex-col items-center justify-center relative overflow-hidden transition-all duration-300 min-h-[300px] lg:min-h-0 py-10 lg:py-0">
          {/* Active State Border/Glow */}
          {callStatus === CallStatus.ACTIVE && (
            <div className="absolute inset-1 border-2 border-[#FF5B37] rounded-xl pointer-events-none opacity-40 animate-pulse"></div>
          )}

          <div className="flex flex-col items-center gap-6">
            <div className={`w-24 h-24 sm:w-32 sm:h-32 ${companion.iconColor} rounded-2xl flex items-center justify-center text-5xl sm:text-6xl shadow-sm border-2 ${isSpeaking ? 'border-[#FF5B37] scale-110' : 'border-gray-200 border-dashed'} transition-all duration-300`}>
              {companion.icon}
            </div>
            <div className="px-4 py-1 flex flex-col items-center gap-2">
              <h3 className="text-xl sm:text-2xl font-black text-gray-900 text-center">{companion.name}</h3>
              {callStatus === CallStatus.CONNECTING && (
                <span className="text-sm text-gray-500 flex items-center gap-2">
                  <Loader2 className="animate-spin w-4 h-4" /> Connecting...
                </span>
              )}
              {callStatus === CallStatus.ACTIVE && isSpeaking && (
                <span className="text-sm text-[#FF5B37] font-bold animate-bounce">Speaking...</span>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar Controls */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          {/* User Identity Area */}
          <div className="hidden lg:flex flex-1 bg-white border-2 border-gray-900 rounded-2xl items-center justify-center">
            <span className="text-xl font-black text-gray-900">You</span>
          </div>

          {/* Action Buttons Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-2 gap-4">
            <button
              onClick={toggleMic}
              disabled={callStatus !== CallStatus.ACTIVE}
              className={`bg-white border-2 border-gray-900 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 transition-colors ${callStatus !== CallStatus.ACTIVE ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'}`}
            >
              <div className="text-xl sm:text-2xl">
                {isMicOn ? <Mic size={20} /> : <MicOff size={20} className="text-red-500" />}
              </div>
              <span className="text-xs font-bold text-gray-900">{isMicOn ? 'Mute' : 'Unmute'}</span>
            </button>

            <button className="bg-white border-2 border-gray-900 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
              <div className="text-xl sm:text-2xl">
                <RotateCcw size={20} />
              </div>
              <span className="text-xs font-bold text-gray-900">Repeat</span>
            </button>
          </div>

          {/* Start/End Lesson Button */}
          <button
            onClick={toggleCall}
            className={`w-full font-bold py-4 sm:py-5 rounded-2xl transition-all shadow-md active:scale-[0.98] flex items-center justify-center gap-2 ${callStatus === CallStatus.ACTIVE || callStatus === CallStatus.CONNECTING
              ? 'bg-red-500 hover:bg-red-600 text-white'
              : 'bg-[#FF5B37] hover:bg-[#e64d2b] text-white'
              }`}
          >
            {callStatus === CallStatus.ACTIVE || callStatus === CallStatus.CONNECTING ? (
              <>
                <PhoneOff size={20} /> <span className="text-sm sm:text-base">End Lesson</span>
              </>
            ) : (
              <>
                <Phone size={20} /> <span className="text-sm sm:text-base">Start Lesson</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Footer Transcription Area */}
      <div className="flex flex-col items-center justify-center text-center px-4 sm:px-12 min-h-[100px] mb-6">
        <p className="text-lg sm:text-xl font-bold text-gray-900 mb-2 max-w-3xl transition-all duration-300 line-clamp-3">
          {currentTranscript}
        </p>
        {messages.length > 1 && (
          <p className="text-base sm:text-lg font-medium text-gray-400 max-w-3xl line-clamp-1">
            {messages[1].content}
          </p>
        )}
      </div>
    </div>
  );
};

export default LessonRoom;
