import React from 'react';
import { Lesson } from '../types';
import { useAppContext } from '../context/AppContext';
import { BookOpenText, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface LessonCardProps {
  lesson: Lesson;
}

const LessonCard: React.FC<LessonCardProps> = ({ lesson }) => {
  const { completeLesson } = useAppContext();
  const navigate = useNavigate();

  const handleStartLesson = () => {
    navigate(`/lesson/${lesson.id}`);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'hard':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md">
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <div className="p-2 bg-indigo-100 rounded-lg">
            <BookOpenText className="h-5 w-5 text-indigo-600" />
          </div>
          <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${getDifficultyColor(lesson.difficulty)}`}>
            {lesson.difficulty.charAt(0).toUpperCase() + lesson.difficulty.slice(1)}
          </span>
        </div>
        
        <h3 className="text-lg font-bold text-gray-800 mb-1">{lesson.title}</h3>
        <p className="text-gray-600 text-sm mb-5">{lesson.description}</p>
        
        <div className="flex items-center justify-between">
          {lesson.completed ? (
            <div className="flex items-center text-green-600">
              <CheckCircle2 className="w-5 h-5 mr-1" />
              <span className="font-medium">Completed</span>
            </div>
          ) : (
            <span className="text-sm text-gray-500">~10 min</span>
          )}
          
          <button
            onClick={handleStartLesson}
            className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
              lesson.completed
                ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
            }`}
          >
            <span className="mr-1 font-medium">{lesson.completed ? 'Review' : 'Start'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LessonCard;