import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAppContext } from './context/AppContext';
import WelcomeScreen from './components/WelcomeScreen';
import Dashboard from './components/Dashboard';
import LessonView from './components/LessonView';
import './index.css';

function App() {
  const { isOnboardingComplete } = useAppContext();

  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
        <Route path="/" element={isOnboardingComplete ? <Dashboard /> : <WelcomeScreen />} />
        <Route path="/lesson/:lessonId" element={<LessonView />} />
      </Routes>
    </div>
  );
}

export default App;