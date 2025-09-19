import React from 'react';
import { PixelCard } from './PixelCard';

const skills = [
  {
    category: 'Frontend',
    color: 'bg-blue-500',
    items: ['React', 'Next.js', 'React Native', 'Tailwind CSS', 'TypeScript']
  },
  {
    category: 'Backend',
    color: 'bg-green-500',
    items: ['Node.js', 'Nest.js', 'Express', 'REST APIs', 'PostgreSQL']
  },
  {
    category: 'Mobile',
    color: 'bg-purple-500',
    items: ['Flutter', 'React Native', 'Firebase', 'Native APIs', 'App Store']
  },
  {
    category: 'Programming',
    color: 'bg-orange-500',
    items: ['C++', 'JavaScript', 'TypeScript', 'Dart', 'Python']
  },
  {
    category: 'Design & Tools',
    color: 'bg-pink-500',
    items: ['Illustrator', 'Figma', 'Postman', 'Git', 'VS Code']
  },
  {
    category: 'Hardware',
    color: 'bg-red-500',
    items: ['Arduino', 'IoT', 'Sensors', 'Microcontrollers', 'Electronics']
  }
];

export const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 uppercase tracking-tight">
              My <span className="text-green-500 dark:text-green-400">Skills</span>
            </h2>
            <div className="w-24 h-1 bg-green-500 dark:bg-green-400 mx-auto mb-6"></div>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              A comprehensive toolkit built through academic learning, professional experience, 
              and countless hours of passionate experimentation.
            </p>
          </div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skillGroup, index) => (
              <PixelCard 
                key={skillGroup.category} 
                glowing={index % 2 === 0}
                className="h-full"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-4 h-4 ${skillGroup.color}`}></div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white uppercase tracking-wide">
                    {skillGroup.category}
                  </h3>
                </div>
                
                <div className="space-y-3">
                  {skillGroup.items.map((skill, skillIndex) => (
                    <div key={skill} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 dark:bg-green-400"></div>
                      <span className="text-gray-700 dark:text-gray-300 font-medium">
                        {skill}
                      </span>
                    </div>
                  ))}
                </div>
              </PixelCard>
            ))}
          </div>

          {/* Experience Level Indicator */}
          <div className="mt-16 text-center">
            <PixelCard className="inline-block">
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-500 dark:text-green-400">4+</div>
                  <div className="text-sm text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                    Years Coding
                  </div>
                </div>
                <div className="w-1 h-12 bg-gray-300 dark:bg-gray-600"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-500 dark:text-green-400">10+</div>
                  <div className="text-sm text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                    Projects Built
                  </div>
                </div>
                <div className="w-1 h-12 bg-gray-300 dark:bg-gray-600"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-500 dark:text-green-400">1</div>
                  <div className="text-sm text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                    Current Role
                  </div>
                </div>
              </div>
            </PixelCard>
          </div>
        </div>
      </div>
    </section>
  );
};