import React, { useEffect, useState } from 'react';
import { PixelCard } from './PixelCard';

const careerData = [
  {
    year: '2025',
    timeLine: '15 june 2025 - present',
    title: 'Frontend Developer',
    company: 'Ecomstal',
    description: 'Working as a Frontend Developer at Ecomstal, where I bring designs to life with code.',
    achievements: ['Learned SSR, CSR', 'Improved SEO scores', 'Enhanced user experience'],
    color: 'bg-blue-500',
  },
  {
    year: '2025',
    timeLine: '1 january 2025 - 15 june 2025',
    title: 'Full Stack Developer-Intern',
    company: 'Coder surge',
    description: 'Worked as a Full Stack Developer at Coder surge, where I bring designs to life with code.',
    achievements: ['Learned Next.js, Tailwind CSS, TypeScript', 'Learned Supabase', 'Learned Node.js, Express.js'],
    color: 'bg-blue-500',
  },

];

export const Career: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedItems, setAnimatedItems] = useState<number[]>([]);

  useEffect(() => {
    // Trigger entrance animation
    const timer = setTimeout(() => setIsVisible(true), 100);
    
    // Animate timeline items sequentially
    const interval = setInterval(() => {
      setAnimatedItems(prev => {
        if (prev.length < careerData.length) {
          return [...prev, prev.length];
        }
        return prev;
      });
    }, 300);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  return (
    <section id="career" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className={`text-center mb-16 transition-all duration-1000 ease-out transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 uppercase tracking-tight">
              My <span className="text-green-500 dark:text-green-400">Career</span>
            </h2>
            <div className={`w-24 h-1 bg-green-500 dark:bg-green-400 mx-auto mb-6 transition-all duration-1000 delay-300 ${
              isVisible ? 'scale-x-100' : 'scale-x-0'
            }`}></div>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              A journey of continuous growth, learning, and professional development in the ever-evolving tech landscape.
            </p>
          </div>

          {/* Career Timeline */}
          <div className="relative timeline-container">
            {/* Timeline Line */}
            <div className={`absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-green-500 to-gray-300 dark:from-green-400 dark:to-gray-600 transition-all duration-2000 delay-500 ${
              isVisible ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'
            }`}></div>
            
            {/* Career Items */}
            <div className="space-y-12">
              {careerData.map((career, index) => (
                <div key={career.year} className={`relative flex flex-col md:flex-row items-center transition-all duration-1000 ease-out ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } ${
                  animatedItems.includes(index) 
                    ? 'opacity-100 translate-x-0' 
                    : 'opacity-0 translate-x-8'
                }`}>
                  {/* Timeline Dot */}
                  <div className={`absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-green-500 dark:bg-green-400 rounded-full border-4 border-white dark:border-gray-900 z-10 transition-all duration-500 delay-${index * 200} ${
                    animatedItems.includes(index) 
                      ? 'scale-100 opacity-100' 
                      : 'scale-0 opacity-0'
                  }`}></div>
                  
                  {/* Content Card */}
                  <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'} transition-all duration-700 delay-${index * 100} mb-8 md:mb-0`}>
                    <PixelCard 
                      glowing={index % 2 === 0}
                      className={`h-full transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
                        animatedItems.includes(index) 
                          ? 'opacity-100 translate-y-0' 
                          : 'opacity-0 translate-y-8'
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-4 ">
                        <div className={`w-4 h-4 ${career.color} transition-all duration-300 hover:scale-125`}></div>
                        <div className="text-2xl font-bold text-green-500 dark:text-green-400">
                          {career.year}
                        </div>
                        <div className="text-xs text-gray-700 dark:text-gray-300 mt-2">
                          {career.timeLine}
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {career.title}
                      </h3>
                      
                      <div className="text-green-600 dark:text-green-400 font-semibold mb-3">
                        {career.company}
                      </div>
                      
                      <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                        {career.description}
                      </p>
                      
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wide">
                          Key Achievements:
                        </h4>
                        {career.achievements.map((achievement, achievementIndex) => (
                          <div key={achievementIndex} className={`flex items-center gap-2 transition-all duration-300 delay-${achievementIndex * 100} ${
                            animatedItems.includes(index) 
                              ? 'opacity-100 translate-x-0' 
                              : 'opacity-0 -translate-x-4'
                          }`}>
                            <div className="w-2 h-2 bg-green-500 dark:bg-green-400 transition-all duration-300 hover:scale-150"></div>
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                              {achievement}
                            </span>
                          </div>
                        ))}
                      </div>
                    </PixelCard>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Career Stats */}
          <div className={`mt-20 text-center transition-all duration-1000 delay-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <PixelCard className="inline-block hover:scale-105 transition-transform duration-300">
              <div className="grid grid-cols-2 md:flex md:items-center gap-6 md:gap-8">
                {[
                  { number: '1', label: 'Years Experience' },
                  { number: '4+', label: 'Projects Completed' },
                  { number: '1', label: 'Companies Worked' },
                  { number: '3+', label: 'Technologies Mastered' },
                ].map((stat, index) => (
                  <div key={index} className="text-center group">
                    <div className={`text-2xl md:text-3xl font-bold text-green-500 dark:text-green-400 transition-all duration-300 group-hover:scale-110 ${
                      isVisible ? 'opacity-100' : 'opacity-0'
                    }`}>
                      {stat.number}
                    </div>
                    <div className="text-xs md:text-sm text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </PixelCard>
          </div>
        </div>
      </div>
    </section>
  );
};
