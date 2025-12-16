import { ReactNode } from 'react';

export enum SlideType {
  TITLE,
  HOOK,
  SPLIT,
  STANDARD,
  TIMER,
  REVEAL_LIST,
  INPUT_EXERCISE,
  DRILL,
  QUIZ,
  CHECKLIST,
  FEEDBACK,
  HOMEWORK
}

export interface QuizOption {
  question: string;
  options: string[];
  correct: string;
}

export interface SlideData {
  id: number;
  type: SlideType;
  title: string;
  subtitle?: string;
  content?: ReactNode;
  speakerNotes: string[];
  visualNotes?: string;
  image?: string;
  // Specific data props
  splitLeft?: ReactNode;
  splitRight?: ReactNode;
  durationSeconds?: number;
  quizData?: QuizOption[];
  drillPairs?: { term: string; partner: string }[];
  inputPrompts?: string[];
  checklistItems?: string[];
}