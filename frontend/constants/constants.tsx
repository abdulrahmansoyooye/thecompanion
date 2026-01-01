import { Companion, Lesson } from "@/types/types";



export const COLORS = {
  Science: 'bg-purple-100 border-purple-200',
  Maths: 'bg-yellow-100 border-yellow-200',
  Language: 'bg-blue-100 border-blue-200',
  Coding: 'bg-pink-100 border-pink-200',
  History: 'bg-orange-100 border-orange-200',
  Business: 'bg-yellow-100 border-yellow-200',
  Economics: 'bg-green-100 border-green-200',
  Geography: 'bg-red-100 border-red-200',
  Finance: 'bg-teal-100 border-teal-200',
};

export const INITIAL_COMPANIONS: Companion[] = [
  { id: '1', name: 'Neura the Brainy Explorer', topic: 'Neural Networks of the Brain', subject: 'Science', duration: '45 mins', icon: '🧪', color: COLORS.Science },
  { id: '2', name: 'The Growth Expert', topic: 'Scaling Your Business Successfully', subject: 'Business', duration: '20 mins', icon: '💼', color: COLORS.Business },
  { id: '3', name: 'Verba the Vocabulary Builder', topic: 'English Literature', subject: 'Language', duration: '30 mins', icon: '💬', color: COLORS.Language },
  { id: '4', name: 'Memo, the Memory Keeper', topic: 'World Wars: Causes & Effects', subject: 'History', duration: '15 mins', icon: '📜', color: COLORS.History },
  { id: '5', name: 'Codey, the Logic Hacker', topic: 'Intro to If-Else Statements', subject: 'Coding', duration: '30 mins', icon: '⌨️', color: COLORS.Coding },
  { id: '6', name: 'The Market Maestro', topic: 'The Basics of Supply & Demand', subject: 'Economics', duration: '10 mins', icon: '📊', color: COLORS.Economics },
  { id: '7', name: 'GeoMax, the Map Master', topic: 'The Oceans of the World', subject: 'Geography', duration: '20 mins', icon: '🗺️', color: COLORS.Geography },
  { id: '8', name: 'The Investment Builder', topic: 'Understanding Mutual Funds', subject: 'Finance', duration: '25 mins', icon: '💰', color: COLORS.Finance },
  { id: '9', name: 'Countsy the Number Wizard', topic: 'Derivatives & Integrals', subject: 'Maths', duration: '30 mins', icon: '🔢', color: COLORS.Maths },
];

export const RECENT_LESSONS: Lesson[] = [
  { id: 'l1', companionId: '1', name: 'Neura the Brainy Explorer', topic: 'Neural Networks of the Brain', subject: 'Science', duration: '45 mins', date: '2024-05-20', icon: '🧪' },
  { id: 'l2', companionId: 'a1', name: 'Algebrina, the Eq Queen', topic: 'Solving Linear Equations', subject: 'Maths', duration: '20 mins', date: '2024-05-19', icon: '➗' },
  { id: 'l3', companionId: '3', name: 'Luna, Your Grammar Guide', topic: 'Mastering Tenses in English', subject: 'Language', duration: '32 mins', date: '2024-05-18', icon: '🗣️' },
  { id: 'l4', companionId: '5', name: 'Codey, the Logic Hacker', topic: 'Intro to If-Else Statements', subject: 'Coding', duration: '30 mins', date: '2024-05-17', icon: '⌨️' },
  { id: 'l5', companionId: '4', name: 'Memo, the Memory Keeper', topic: 'World Wars: Causes & Effects', subject: 'History', duration: '15 mins', date: '2024-05-16', icon: '📜' },
];
