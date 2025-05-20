export type ThemeType = 'comedy' | 'adventure' | 'space' | 'ocean' | 'jungle';
export type LanguageType = 'english' | 'spanish' | 'french' | 'german' | 'chinese';
export type LessonType = 'grammar' | 'vocabulary' | 'reading' | 'writing';

export interface Lesson {
  id: string;
  title: string;
  description: string;
  type: LessonType;
  completed: boolean;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface Character {
  name: string;
  image: string;
  expressions: {
    happy: string;
    sad: string;
    excited: string;
    confused: string;
  };
}