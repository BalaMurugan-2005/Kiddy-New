import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Lesson } from '../types';
import { ChevronLeft, Award, CheckCircle } from 'lucide-react';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

// Mock data - would come from a real API
const getMockLessonContent = (lessonId: string) => {
  const grammarLessons: Record<string, { content: string, quiz: QuizQuestion[] }> = {
    '1': {
      content: `
        <h1>Nouns & Pronouns</h1>
        <p>A <strong>noun</strong> is a word that names a person, place, thing, or idea.</p>
        <h2>Examples:</h2>
        <ul>
          <li>Person: teacher, doctor, friend</li>
          <li>Place: school, park, home</li>
          <li>Thing: book, ball, computer</li>
          <li>Idea: love, peace, happiness</li>
        </ul>
        <p>A <strong>pronoun</strong> is a word that takes the place of a noun.</p>
        <h2>Examples:</h2>
        <ul>
          <li>I, you, he, she, it, we, they</li>
          <li>me, him, her, us, them</li>
          <li>my, your, his, her, its, our, their</li>
        </ul>
      `,
      quiz: [
        {
          id: 1,
          question: "Which of these is a noun?",
          options: ["Quickly", "Happy", "Tree", "Jump"],
          correctAnswer: "Tree"
        },
        {
          id: 2,
          question: "What can replace the noun 'Sarah' in a sentence?",
          options: ["He", "She", "It", "They"],
          correctAnswer: "She"
        },
        {
          id: 3,
          question: "Which group contains only nouns?",
          options: [
            "Run, jump, swim, fly",
            "Beautiful, ugly, pretty, handsome",
            "Book, cat, school, happiness",
            "Quickly, slowly, carefully, loudly"
          ],
          correctAnswer: "Book, cat, school, happiness"
        }
      ]
    },
    // Add more lessons with their content and quizzes
  };

  return grammarLessons[lessonId] || { content: "Lesson not found", quiz: [] };
};

const LessonView: React.FC = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const { theme, completeLesson } = useAppContext();
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [lessonContent, setLessonContent] = useState("");
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [showingQuiz, setShowingQuiz] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    // In a real app, this would fetch from an API
    if (lessonId) {
      // Mock fetching a lesson
      const mockLesson: Lesson = {
        id: lessonId,
        title: "Nouns & Pronouns",
        description: "Learn about naming words and their substitutes",
        type: "grammar",
        completed: false,
        difficulty: "easy"
      };
      
      setCurrentLesson(mockLesson);
      
      // Get content and quiz for this lesson
      const { content, quiz } = getMockLessonContent(lessonId);
      setLessonContent(content);
      setQuizQuestions(quiz);
    }
  }, [lessonId]);

  const getThemeAccentColor = () => {
    switch (theme) {
      case 'comedy': return 'bg-orange-500 hover:bg-orange-600';
      case 'adventure': return 'bg-green-500 hover:bg-green-600';
      case 'space': return 'bg-purple-600 hover:bg-purple-700';
      case 'ocean': return 'bg-blue-500 hover:bg-blue-600';
      case 'jungle': return 'bg-emerald-600 hover:bg-emerald-700';
      default: return 'bg-indigo-600 hover:bg-indigo-700';
    }
  };

  const startQuiz = () => {
    setShowingQuiz(true);
  };

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const checkAnswer = () => {
    if (!selectedAnswer) return;
    
    setHasAnswered(true);
    const currentQuestion = quizQuestions[currentQuestionIndex];
    
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setCorrectAnswers(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setHasAnswered(false);
    } else {
      setQuizCompleted(true);
      if (lessonId) {
        completeLesson(lessonId);
      }
    }
  };

  const returnToDashboard = () => {
    navigate('/');
  };

  const currentQuestion = quizQuestions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <button 
            onClick={returnToDashboard}
            className="flex items-center text-gray-700 hover:text-gray-900"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            <span>Back to Dashboard</span>
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {!showingQuiz && !quizCompleted ? (
          <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
            <div dangerouslySetInnerHTML={{ __html: lessonContent }} className="prose max-w-none mb-8" />
            
            <button
              onClick={startQuiz}
              className={`px-6 py-3 rounded-lg text-white font-medium ${getThemeAccentColor()} transition-colors`}
            >
              Start Quiz
            </button>
          </div>
        ) : quizCompleted ? (
          <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
              <Award className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Quiz Completed!</h2>
            <p className="text-lg text-gray-600 mb-2">
              You got <span className="font-bold text-green-600">{correctAnswers}</span> out of <span className="font-bold">{quizQuestions.length}</span> questions correct.
            </p>
            <p className="text-gray-500 mb-8">
              {correctAnswers === quizQuestions.length 
                ? "Perfect score! You're amazing!" 
                : correctAnswers >= quizQuestions.length / 2 
                  ? "Great job! Keep practicing." 
                  : "Keep practicing to improve your score."}
            </p>
            <button
              onClick={returnToDashboard}
              className={`px-6 py-3 rounded-lg text-white font-medium ${getThemeAccentColor()} transition-colors`}
            >
              Return to Dashboard
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-500">Question {currentQuestionIndex + 1} of {quizQuestions.length}</span>
                <span className="text-sm font-medium text-green-600">{correctAnswers} correct</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${((currentQuestionIndex) / quizQuestions.length) * 100}%` }}></div>
              </div>
            </div>
            
            <h2 className="text-xl font-bold text-gray-800 mb-6">{currentQuestion.question}</h2>
            
            <div className="space-y-3 mb-8">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => !hasAnswered && handleAnswerSelect(option)}
                  disabled={hasAnswered}
                  className={`w-full text-left p-4 rounded-lg border transition-all ${
                    hasAnswered && option === currentQuestion.correctAnswer
                      ? 'bg-green-100 border-green-500 text-green-800'
                      : hasAnswered && option === selectedAnswer
                        ? 'bg-red-100 border-red-500 text-red-800'
                        : selectedAnswer === option
                          ? 'bg-indigo-100 border-indigo-500'
                          : 'bg-white border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center">
                    <span className="mr-3">{String.fromCharCode(65 + index)}.</span>
                    <span>{option}</span>
                    {hasAnswered && option === currentQuestion.correctAnswer && (
                      <CheckCircle className="ml-auto w-5 h-5 text-green-600" />
                    )}
                  </div>
                </button>
              ))}
            </div>
            
            {!hasAnswered ? (
              <button
                onClick={checkAnswer}
                disabled={!selectedAnswer}
                className={`px-6 py-3 rounded-lg text-white font-medium transition-colors ${
                  selectedAnswer ? getThemeAccentColor() : 'bg-gray-300 cursor-not-allowed'
                }`}
              >
                Check Answer
              </button>
            ) : (
              <button
                onClick={nextQuestion}
                className={`px-6 py-3 rounded-lg text-white font-medium ${getThemeAccentColor()} transition-colors`}
              >
                {currentQuestionIndex < quizQuestions.length - 1 ? 'Next Question' : 'See Results'}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LessonView;