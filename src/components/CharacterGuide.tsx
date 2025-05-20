import React from 'react';
import { ThemeType } from '../types';

interface CharacterGuideProps {
  theme: ThemeType | null;
}

const CharacterGuide: React.FC<CharacterGuideProps> = ({ theme }) => {
  const getCharacterImage = () => {
    // In a real app, these would be actual character images based on the theme
    // For now we'll use placeholder URL that follows a consistent pattern
    const themeToCharacter: Record<string, string> = {
      comedy: 'https://images.pexels.com/photos/7315288/pexels-photo-7315288.jpeg?auto=compress&cs=tinysrgb&w=300',
      adventure: 'https://images.pexels.com/photos/2566350/pexels-photo-2566350.jpeg?auto=compress&cs=tinysrgb&w=300',
      space: 'https://images.pexels.com/photos/586031/pexels-photo-586031.jpeg?auto=compress&cs=tinysrgb&w=300',
      ocean: 'https://images.pexels.com/photos/4126736/pexels-photo-4126736.jpeg?auto=compress&cs=tinysrgb&w=300',
      jungle: 'https://images.pexels.com/photos/6498304/pexels-photo-6498304.jpeg?auto=compress&cs=tinysrgb&w=300'
    };
    
    return themeToCharacter[theme || 'comedy'] || themeToCharacter.comedy;
  };

  const getThemeMessage = () => {
    switch (theme) {
      case 'comedy':
        return "Hi! I'm Giggles! Ready to laugh while we learn?";
      case 'adventure':
        return "Hi! I'm Explorer! Let's discover new things together!";
      case 'space':
        return "Hi! I'm Cosmo! Let's blast off into learning!";
      case 'ocean':
        return "Hi! I'm Bubbles! Let's dive into knowledge!";
      case 'jungle':
        return "Hi! I'm Leaf! Let's swing through fun lessons!";
      default:
        return "Hi! I'm your learning buddy! Let's have fun!";
    }
  };

  const getBubbleColor = () => {
    const colors: Record<string, string> = {
      comedy: 'bg-orange-500',
      adventure: 'bg-green-500',
      space: 'bg-purple-600',
      ocean: 'bg-blue-500',
      jungle: 'bg-emerald-600'
    };
    
    return colors[theme || 'comedy'] || colors.comedy;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 flex items-center">
      <div className="rounded-full h-16 w-16 overflow-hidden border-4 border-white shadow">
        <img 
          src={getCharacterImage()} 
          alt="Character Guide" 
          className="h-full w-full object-cover"
        />
      </div>
      
      <div className={`${getBubbleColor()} text-white ml-2 p-3 rounded-xl rounded-bl-none relative`}>
        <div className={`absolute -left-2 bottom-0 w-0 h-0 border-8 border-transparent ${getBubbleColor().replace('bg-', 'border-r-')}`}></div>
        <p className="text-sm font-medium">{getThemeMessage()}</p>
      </div>
    </div>
  );
};

export default CharacterGuide;