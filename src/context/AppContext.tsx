import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ThemeType, LanguageType, LessonType, Lesson } from '../types';

interface AppContextType {
  theme: ThemeType | null;
  language: LanguageType | null;
  lessonType: LessonType | null;
  progress: number;
  completedLessons: string[];
  setTheme: (theme: ThemeType) => void;
  setLanguage: (language: LanguageType) => void;
  setLessonType: (lessonType: LessonType) => void;
  completeLesson: (lessonId: string) => void;
  isOnboardingComplete: boolean;
  setOnboardingComplete: (complete: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeType | null>(null);
  const [language, setLanguage] = useState<LanguageType | null>(null);
  const [lessonType, setLessonType] = useState<LessonType | null>(null);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [isOnboardingComplete, setOnboardingComplete] = useState(false);

  const progress = completedLessons.length;

  const completeLesson = (lessonId: string) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons([...completedLessons, lessonId]);
    }
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        language,
        lessonType,
        progress,
        completedLessons,
        setTheme,
        setLanguage,
        setLessonType,
        completeLesson,
        isOnboardingComplete,
        setOnboardingComplete
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};