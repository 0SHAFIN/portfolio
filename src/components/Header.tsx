import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import Lottie from 'lottie-react';
import animationData from '../../public/animations/Programing.json';

export const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 w-full z-50 px-20 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b-2 border-gray-300 dark:border-gray-700">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div />
          <div className="w-16 h-16 absolute top-0 left-20">
            <Lottie animationData={animationData} loop={true} />
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            {['about', 'skills', 'career', 'experience', 'contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="text-gray-700 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400 font-medium uppercase tracking-wide transition-colors duration-200"
              >
                {item}
              </button>
            ))}
          </nav>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            {theme === 'light' ? (
              <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            ) : (
              <Sun className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};