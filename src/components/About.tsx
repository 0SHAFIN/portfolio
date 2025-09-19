import React from 'react';
import { PixelCard } from './PixelCard';
import { Code, Palette, Zap } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 uppercase tracking-tight">
              About <span className="text-green-500 dark:text-green-400">Me</span>
            </h2>
            <div className="w-24 h-1 bg-green-500 dark:bg-green-400 mx-auto"></div>
          </div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text */}
            <div>
              <div className="space-y-6">
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  I'm a passionate Computer Science Engineering student with a love for creating 
                  beautiful, functional web experiences. Currently working as a Frontend Developer 
                  at <span className="text-green-500 dark:text-green-400 font-semibold">Ecomstal</span>, 
                  where I bring designs to life with code.
                </p>
                
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  My journey in tech started with curiosity about how websites work, and it has 
                  evolved into expertise across multiple platforms - from web applications to 
                  mobile apps, and even IoT projects with Arduino.
                </p>

                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  When I'm not coding, you'll find me exploring new technologies, or experimenting with pixel art and digital design.
                </p>
              </div>
            </div>

            {/* Right Column - Cards */}
            <div className="space-y-6">
              <PixelCard glowing>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-500 dark:bg-green-400 flex items-center justify-center">
                    <Code className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      Full-Stack Vision
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      From React frontends to NestJS backends, I build complete digital experiences.
                    </p>
                  </div>
                </div>
              </PixelCard>

              <PixelCard>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-500 flex items-center justify-center">
                    <Palette className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      Design-First Approach
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Combining technical skills with Illustrator expertise for pixel-perfect UIs.
                    </p>
                  </div>
                </div>
              </PixelCard>

              <PixelCard>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-500 flex items-center justify-center">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      Innovation Focused
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      From mobile apps to IoT projects, always exploring new tech frontiers.
                    </p>
                  </div>
                </div>
              </PixelCard>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};