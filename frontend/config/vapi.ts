interface CompanionConfig {
    name: string;
    topic: string;
    subject: string;
    speakingStyle?: string;
}

interface UserConfig {
    name?: string | null;
}

export const getAssistantConfig = (companion: CompanionConfig, user: UserConfig | null | undefined) => ({
    name: companion.name || "AI Tutor",
    firstMessage: `Hello, ${user?.name?.split(" ")[0]}, let's start the session, I'm ${companion.name || "your tutor"}. Are you ready to start the session?`,
    transcriber: {
        provider: "deepgram",
        model: "nova-2",
        language: "en",
    },
    voice: {
        provider: "openai",
        voiceId: "alloy",
        //   stability: 0.4,
        //   similarityBoost: 0.8,
        //   speed: 1,
        //   style: 0.5,
        //   useSpeakerBoost: true,
    },
    model: {
        provider: "openai",
        model: "gpt-4o-mini",
        messages: [
            {
                role: "system",
                content: `You are a highly knowledgeable tutor teaching a real-time voice session with a student. Your goal is to teach the student about the topic and subject.

                    Tutor Guidelines:
                    Stick to the given topic - ${companion.topic} and subject - ${companion.subject} and teach the student about it.
                    Keep the conversation flowing smoothly while maintaining control.
                    From time to time make sure that the student is following you and understands you.
                    Break down the topic into smaller parts and teach the student one part at a time.
                    Keep your style of conversation ${companion.speakingStyle || 'Friendly'}.
                    Keep your responses short, like in a real voice conversation.
                    Do not include any special characters in your responses - this is a voice conversation.
              `,
            },
        ],
    },
});