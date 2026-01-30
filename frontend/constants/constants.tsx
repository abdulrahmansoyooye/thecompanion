import { Companion, Lesson } from "@/types/types";



export const COLORS = {
  Science: 'bg-purple-50 border-purple-100 text-purple-600',
  Maths: 'bg-amber-50 border-amber-100 text-amber-600',
  Language: 'bg-blue-50 border-blue-100 text-blue-600',
  Coding: 'bg-pink-50 border-pink-100 text-pink-600',
  History: 'bg-orange-50 border-orange-100 text-orange-600',
  Business: 'bg-indigo-50 border-indigo-100 text-indigo-600',
  Economics: 'bg-emerald-50 border-emerald-100 text-emerald-600',
  Geography: 'bg-red-50 border-red-100 text-red-600',
  Finance: 'bg-teal-50 border-teal-100 text-teal-600',
};

export const INITIAL_COMPANIONS: Companion[] = [
  { id: '1', name: 'Neura the Brainy Explorer', topic: 'Neural Networks of the Brain', subject: 'Science', duration: '45 mins', icon: '🧪', color: COLORS.Science, iconColor: COLORS.Science },
  { id: '2', name: 'The Growth Expert', topic: 'Scaling Your Business Successfully', subject: 'Business', duration: '20 mins', icon: '💼', color: COLORS.Business, iconColor: COLORS.Business },
  { id: '3', name: 'Verba the Vocabulary Builder', topic: 'English Literature', subject: 'Language', duration: '30 mins', icon: '💬', color: COLORS.Language, iconColor: COLORS.Language },
  { id: '4', name: 'Memo, the Memory Keeper', topic: 'World Wars: Causes & Effects', subject: 'History', duration: '15 mins', icon: '📜', color: COLORS.History, iconColor: COLORS.History },
  { id: '5', name: 'Codey, the Logic Hacker', topic: 'Intro to If-Else Statements', subject: 'Coding', duration: '30 mins', icon: '⌨️', color: COLORS.Coding, iconColor: COLORS.Coding },
  { id: '6', name: 'The Market Maestro', topic: 'The Basics of Supply & Demand', subject: 'Economics', duration: '10 mins', icon: '📊', color: COLORS.Economics, iconColor: COLORS.Economics },
  { id: '7', name: 'GeoMax, the Map Master', topic: 'The Oceans of the World', subject: 'Geography', duration: '20 mins', icon: '🗺️', color: COLORS.Geography, iconColor: COLORS.Geography },
  { id: '8', name: 'The Investment Builder', topic: 'Understanding Mutual Funds', subject: 'Finance', duration: '25 mins', icon: '💰', color: COLORS.Finance, iconColor: COLORS.Finance },
  { id: '9', name: 'Countsy the Number Wizard', topic: 'Derivatives & Integrals', subject: 'Maths', duration: '30 mins', icon: '🔢', color: COLORS.Maths, iconColor: COLORS.Maths },
];

export const RECENT_LESSONS: Lesson[] = [
  { id: 'l1', companionId: '1', name: 'Neura the Brainy Explorer', topic: 'Neural Networks of the Brain', subject: 'Science', duration: '45 mins', date: '2024-05-20', icon: '🧪' },
  { id: 'l2', companionId: 'a1', name: 'Algebrina, the Eq Queen', topic: 'Solving Linear Equations', subject: 'Maths', duration: '20 mins', date: '2024-05-19', icon: '➗' },
  { id: 'l3', companionId: '3', name: 'Luna, Your Grammar Guide', topic: 'Mastering Tenses in English', subject: 'Language', duration: '32 mins', date: '2024-05-18', icon: '🗣️' },
  { id: 'l4', companionId: '5', name: 'Codey, the Logic Hacker', topic: 'Intro to If-Else Statements', subject: 'Coding', duration: '30 mins', date: '2024-05-17', icon: '⌨️' },
  { id: 'l5', companionId: '4', name: 'Memo, the Memory Keeper', topic: 'World Wars: Causes & Effects', subject: 'History', duration: '15 mins', date: '2024-05-16', icon: '📜' },
];
