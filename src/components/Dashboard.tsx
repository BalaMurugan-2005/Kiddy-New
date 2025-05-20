import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Lesson } from '../types';
import { BookOpen, Award, BarChart, Zap } from 'lucide-react';
import LessonCard from './LessonCard';
import CharacterGuide from './CharacterGuide';

// Mock lesson data based on lesson type
const getLessons = (lessonType: string): Lesson[] => {
  if (lessonType === 'grammar') {
    return [
      {
        id: '1',
        title: 'Nouns & Pronouns',
        description: 'Learn about naming words and their substitutes',
        type: 'grammar',
        completed: false,
        difficulty: 'easy',
      },
      {
        id: '2',
        title: 'Verbs & Actions',
        description: 'Discover words that show action or state of being',
        type: 'grammar',
        completed: false,
        difficulty: 'easy',
      },
      {
        id: '3',
        title: 'Adjectives & Description',
        description: 'Explore words that describe nouns',
        type: 'grammar',
        completed: false,
        difficulty: 'medium',
      },
      {
        id: '4',
        title: 'Simple Sentences',
        description: 'Learn to form basic sentences with subjects and verbs',
        type: 'grammar',
        completed: false,
        difficulty: 'medium',
      },
      {
        id: '5',
        title: 'Questions & Answers',
        description: 'Master forming questions and providing answers',
        type: 'grammar',
        completed: false,
        difficulty: 'hard',
      }
    ];
  }
  // Add other lesson types here
  return [];
};

const Dashboard: React.FC = () => {
  const { theme, language, lessonType, progress, completedLessons } = useAppContext();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [streakCount, setStreakCount] = useState<number>(0);

  useEffect(() => {
    if (lessonType) {
      const fetchedLessons = getLessons(lessonType);
      // Mark any completed lessons
      const updatedLessons = fetchedLessons.map(lesson => ({
        ...lesson,
        completed: completedLessons.includes(lesson.id)
      }));
      setLessons(updatedLessons);
    }
  }, [lessonType, completedLessons]);

  useEffect(() => {
    // Simulate a streak count (would normally be stored/calculated)
    setStreakCount(Math.floor(Math.random() * 7) + 1);
  }, []);

  const getThemeColors = () => {
    switch (theme) {
      case 'comedy':
        return 'from-yellow-400 to-orange-500';
      case 'adventure':
        return 'from-green-400 to-emerald-600';
      case 'space':
        return 'from-indigo-500 to-purple-700';
      case 'ocean':
        return 'from-blue-400 to-cyan-600';
      case 'jungle':
        return 'from-green-500 to-lime-700';
      default:
        return 'from-indigo-500 to-purple-600';
    }
  };

  return (
    <div className={`min-h-screen bg-gray-50`}>
      {/* Header */}
      <div className={`bg-gradient-to-r ${getThemeColors()} text-white`}>
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">LearnLand</h1>
              <p className="text-white/80">
                {language?.charAt(0).toUpperCase() + language?.slice(1)} • {lessonType?.charAt(0).toUpperCase() + lessonType?.slice(1)}
              </p>
            </div>
            <div className="flex space-x-3">
              <div className="h-10 w-10 bg-white/20 rounded-full flex items-center justify-center">
                <Zap className="h-5 w-5" />
              </div>
              <div className="h-10 w-10 bg-white/20 rounded-full flex items-center justify-center">
                <BarChart className="h-5 w-5" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Character Guide */}
      <div className="container mx-auto px-4 -mt-6">
        <CharacterGuide theme={theme} />
      </div>

      {/* Progress Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Your Progress</h2>
            <span className="text-sm text-gray-500">Level 1</span>
          </div>
          
          <div className="flex items-center mb-2">
            <div className="flex-1 bg-gray-200 rounded-full h-3 mr-4">
              <div 
                className="bg-indigo-600 h-3 rounded-full transition-all duration-500" 
                style={{ width: `${Math.min((progress / lessons.length) * 100, 100)}%` }}
              ></div>
            </div>
            <span className="text-gray-700 font-medium">{Math.round((progress / lessons.length) * 100)}%</span>
          </div>
          
          <div className="flex mt-4 justify-between">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg mr-3">
                <Award className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Points</p>
                <p className="font-bold text-gray-800">{progress * 100}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg mr-3">
                <Zap className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Streak</p>
                <p className="font-bold text-gray-800">{streakCount} days</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="p-2 bg-indigo-100 rounded-lg mr-3">
                <BookOpen className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Lessons</p>
                <p className="font-bold text-gray-800">{progress}/{lessons.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Lessons Section */}
        <h2 className="text-xl font-bold text-gray-800 mb-4">Your Lessons</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {lessons.map((lesson) => (
            <LessonCard key={lesson.id} lesson={lesson} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;