
export type Subject = 'Science' | 'Maths' | 'Language' | 'Coding' | 'History' | 'Business' | 'Economics' | 'Geography' | 'Finance';

export interface Companion {
  id: string;
  name: string;
  topic: string;
  subject: Subject;
  duration: string;
  icon: string;
  imageUrl?: string; // Support for uploaded images
  color: string;
  voiceType?: 'Male' | 'Female';
  speakingStyle?: 'Formal' | 'Casual' | 'Cheerful';
  language?: string;
}

export interface Lesson {
  id: string;
  companionId: string;
  name: string;
  topic: string;
  subject: Subject;
  duration: string;
  date: string;
  icon: string;
}

export interface UserStats {
  lessonsCompleted: number;
  companionsCreated: number;
}
