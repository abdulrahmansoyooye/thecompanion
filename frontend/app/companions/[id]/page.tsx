"use client";
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { INITIAL_COMPANIONS } from '@/constants/constants';
import { vapi } from '@/lib/vapi';
import { Loader2, Mic, MicOff, Phone, PhoneOff, RotateCcw } from 'lucide-react';
import { CreateAssistantDTO } from '@vapi-ai/web/dist/api';

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}
const getAssistantConfig = (companion: any): CreateAssistantDTO => ({
  name: companion.name,
  firstMessage: `Hello, I'm ${companion.name}. Let's discuss ${companion.topic}.`,
  transcriber: {
    provider: "deepgram",
    model: "nova-2",
    language: "en-US",
  },
  voice: {
    provider: "11labs",
    voiceId: "21m00Tcm4TlvDq8ikWAM", // Standard 'Rachel' voice, highly reliable
  },
  model: {
    provider: "openai",
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `You are a tutor.
                  Topic: ${companion.topic}
                  Subject: ${companion.subject}
                  Keep responses short and conversational.`,
      },
    ],
  },
});
interface SavedMessage {
  role: string;
  content: string;
}

// Minimal type definition for Vapi Message to avoid errors
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
  const companion = INITIAL_COMPANIONS.find(c => c.id === id) || INITIAL_COMPANIONS[0];

  const [isMicOn, setIsMicOn] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [messages, setMessages] = useState<SavedMessage[]>([]);

  useEffect(() => {
    const onCallStart = () => {
      setCallStatus(CallStatus.ACTIVE);
      setIsMicOn(true); // Default to mic on when call starts
    };
    const onCallEnd = () => setCallStatus(CallStatus.INACTIVE);
    const onSpeechStart = () => setIsSpeaking(true);
    const onSpeechEnd = () => setIsSpeaking(false);
    const onError = (error: Error) => console.error("Vapi Error:", error);

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
    setCallStatus(CallStatus.CONNECTING);
    try {
      console.log("Starting Vapi session...");
      const assistantConfig = getAssistantConfig(companion);
      await vapi.start(assistantConfig);
    } catch (err: any) {
      console.error("Failed to start call catch block:", err);
      setCallStatus(CallStatus.INACTIVE);
    }
  };

  const handleStop = () => {
    setCallStatus(CallStatus.FINISHED); // Temporarily 'finished' before actual end event
    vapi.stop();
  };

  const toggleMic = () => {
    const newMicState = !isMicOn;
    setIsMicOn(newMicState);
    vapi.setMuted(!newMicState);
  };

  const currentTranscript = messages.length > 0 ? messages[0].content : "Ready to start the lesson...";

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
        <div className="col-span-9 bg-white rounded-2xl flex flex-col items-center justify-center relative overflow-hidden transition-all duration-300">
          {/* Active State Border/Glow */}
          {callStatus === CallStatus.ACTIVE && (
            <div className="absolute inset-1 border-2 border-[#FF5B37] rounded-xl pointer-events-none opacity-40 animate-pulse"></div>
          )}

          <div className="flex flex-col items-center gap-6">
            <div className={`w-32 h-32 ${companion.color} rounded-2xl flex items-center justify-center text-6xl shadow-sm border-2 ${isSpeaking ? 'border-[#FF5B37] scale-110' : 'border-blue-400 border-dashed'} transition-all duration-300`}>
              {companion.icon}
            </div>
            <div className="px-4 py-1 flex flex-col items-center gap-2">
              <h3 className="text-2xl font-black text-gray-900">{companion.name}</h3>
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
        <div className="col-span-3 flex flex-col gap-4">
          {/* User Identity Area */}
          <div className="flex-1 bg-white border-2 border-gray-900 rounded-2xl flex items-center justify-center">
            <span className="text-xl font-black text-gray-900">You</span>
          </div>

          {/* Action Buttons Grid */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={toggleMic}
              disabled={callStatus !== CallStatus.ACTIVE}
              className={`bg-white border-2 border-gray-900 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 transition-colors ${callStatus !== CallStatus.ACTIVE ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'}`}
            >
              <div className="text-2xl">
                {isMicOn ? <Mic /> : <MicOff className="text-red-500" />}
              </div>
              <span className="text-xs font-bold text-gray-900">{isMicOn ? 'Mute' : 'Unmute'}</span>
            </button>

            <button className="bg-white border-2 border-gray-900 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
              <div className="text-2xl">
                <RotateCcw />
              </div>
              <span className="text-xs font-bold text-gray-900">Repeat</span>
            </button>
          </div>

          {/* Start/End Lesson Button */}
          <button
            onClick={toggleCall}
            className={`w-full font-bold py-5 rounded-2xl transition-all shadow-md active:scale-[0.98] flex items-center justify-center gap-2 ${callStatus === CallStatus.ACTIVE || callStatus === CallStatus.CONNECTING
              ? 'bg-red-500 hover:bg-red-600 text-white'
              : 'bg-[#FF5B37] hover:bg-[#e64d2b] text-white'
              }`}
          >
            {callStatus === CallStatus.ACTIVE || callStatus === CallStatus.CONNECTING ? (
              <>
                <PhoneOff size={20} /> End Lesson
              </>
            ) : (
              <>
                <Phone size={20} /> Start Lesson
              </>
            )}
          </button>
        </div>
      </div>

      {/* Footer Transcription Area */}
      <div className="flex flex-col items-center justify-center text-center px-12 min-h-[100px]">
        <p className="text-xl font-bold text-gray-900 mb-2 max-w-3xl transition-all duration-300">
          {currentTranscript}
        </p>
        {messages.length > 1 && (
          <p className="text-lg font-medium text-gray-400 max-w-3xl line-clamp-1">
            {messages[1].content}
          </p>
        )}
      </div>
    </div>
  );
};

export default LessonRoom;
