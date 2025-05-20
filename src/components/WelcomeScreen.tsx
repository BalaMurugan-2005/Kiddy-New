import React, { useState } from 'react';
import { ThemeType, LanguageType, LessonType } from '../types';
import { useAppContext } from '../context/AppContext';
import { StarIcon, BookOpenText, GraduationCap, Globe } from 'lucide-react';

const themeOptions: { value: ThemeType; label: string; icon: JSX.Element }[] = [
  { value: 'comedy', label: 'Comedy', icon: <StarIcon className="w-8 h-8 text-orange-500" /> },
  { value: 'adventure', label: 'Adventure', icon: <StarIcon className="w-8 h-8 text-green-500" /> },
  { value: 'space', label: 'Space', icon: <StarIcon className="w-8 h-8 text-purple-500" /> },
  { value: 'ocean', label: 'Ocean', icon: <StarIcon className="w-8 h-8 text-blue-500" /> },
  { value: 'jungle', label: 'Jungle', icon: <StarIcon className="w-8 h-8 text-emerald-500" /> }
];

const languageOptions: { value: LanguageType; label: string }[] = [
  { value: 'english', label: 'English' },
  { value: 'spanish', label: 'Spanish' },
  { value: 'french', label: 'French' },
  { value: 'german', label: 'German' },
  { value: 'chinese', label: 'Chinese' }
];

const lessonOptions: { value: LessonType; label: string; icon: JSX.Element }[] = [
  { value: 'grammar', label: 'Grammar', icon: <BookOpenText className="w-6 h-6" /> },
  { value: 'vocabulary', label: 'Vocabulary', icon: <BookOpenText className="w-6 h-6" /> },
  { value: 'reading', label: 'Reading', icon: <BookOpenText className="w-6 h-6" /> },
  { value: 'writing', label: 'Writing', icon: <BookOpenText className="w-6 h-6" /> }
];

const WelcomeScreen: React.FC = () => {
  const { setTheme, setLanguage, setLessonType, setOnboardingComplete } = useAppContext();
  const [selectedTheme, setSelectedTheme] = useState<ThemeType | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageType | null>(null);
  const [selectedLessonType, setSelectedLessonType] = useState<LessonType | null>(null);
  const [step, setStep] = useState(1);

  const handleContinue = () => {
    if (step === 1 && selectedTheme) {
      setStep(2);
    } else if (step === 2 && selectedLanguage) {
      setStep(3);
    } else if (step === 3 && selectedLessonType) {
      setTheme(selectedTheme);
      setLanguage(selectedLanguage);
      setLessonType(selectedLessonType);
      setOnboardingComplete(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-100 to-purple-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8">
          <div className="flex items-center justify-center mb-6">
            <GraduationCap className="text-indigo-600 w-10 h-10" />
            <h1 className="text-3xl font-bold text-center ml-2 text-indigo-700">LearnLand</h1>
          </div>
          
          {step === 1 && (
            <div className="space-y-6 animate-fadeIn">
              <h2 className="text-2xl font-bold text-center text-gray-800">Choose Your Adventure!</h2>
              <p className="text-center text-gray-600 mb-6">What theme would you like for your learning journey?</p>
              
              <div className="grid grid-cols-2 gap-4">
                {themeOptions.map(option => (
                  <button
                    key={option.value}
                    onClick={() => setSelectedTheme(option.value)}
                    className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-200 ${
                      selectedTheme === option.value
                        ? 'bg-indigo-100 border-2 border-indigo-500 transform scale-105'
                        : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    <div className="mb-2">{option.icon}</div>
                    <span className="font-medium">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-fadeIn">
              <h2 className="text-2xl font-bold text-center text-gray-800">Pick Your Language</h2>
              <p className="text-center text-gray-600 mb-6">What language would you like to learn?</p>
              
              <div className="flex flex-col space-y-3">
                {languageOptions.map(option => (
                  <button
                    key={option.value}
                    onClick={() => setSelectedLanguage(option.value)}
                    className={`flex items-center justify-between p-4 rounded-xl transition-all duration-200 ${
                      selectedLanguage === option.value
                        ? 'bg-indigo-100 border-2 border-indigo-500'
                        : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center">
                      <Globe className="w-5 h-5 mr-3 text-indigo-600" />
                      <span className="font-medium">{option.label}</span>
                    </div>
                    {selectedLanguage === option.value && (
                      <div className="h-4 w-4 rounded-full bg-indigo-500"></div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-fadeIn">
              <h2 className="text-2xl font-bold text-center text-gray-800">What Would You Like to Learn?</h2>
              <p className="text-center text-gray-600 mb-6">Choose a subject to get started!</p>
              
              <div className="grid grid-cols-2 gap-4">
                {lessonOptions.map(option => (
                  <button
                    key={option.value}
                    onClick={() => setSelectedLessonType(option.value)}
                    className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-200 ${
                      selectedLessonType === option.value
                        ? 'bg-indigo-100 border-2 border-indigo-500 transform scale-105'
                        : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    <div className="mb-2 text-indigo-600">{option.icon}</div>
                    <span className="font-medium">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={handleContinue}
            disabled={
              (step === 1 && !selectedTheme) || 
              (step === 2 && !selectedLanguage) || 
              (step === 3 && !selectedLessonType)
            }
            className={`w-full mt-8 py-3 px-4 rounded-xl font-semibold text-white transition-all duration-200 ${
              ((step === 1 && selectedTheme) || 
              (step === 2 && selectedLanguage) || 
              (step === 3 && selectedLessonType))
                ? 'bg-indigo-600 hover:bg-indigo-700'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            {step === 3 ? 'Start Learning!' : 'Continue'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;