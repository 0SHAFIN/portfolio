import React from 'react';
import animationData from "../../public/animations/Programing.json";
import Lottie from "lottie-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 border-t-2 border-gray-800 dark:border-gray-700 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div className="flex  gap-4">
              <div className="mb-4">
                <div className="w-24 h-24">
                  <Lottie animationData={animationData} loop={true} />
                </div>
            </div>
              <p className="text-gray-400 leading-relaxed">
                Crafting digital experiences with passion, precision, and a touch of pixel-perfect magic.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-bold mb-4 uppercase tracking-wide">
                Quick Links
              </h3>
              <div className="space-y-2">
                {['About', 'Skills', 'Career', 'Experience', 'Contact'].map((link) => (
                  <button
                    key={link}
                    onClick={() => {
                      const element = document.getElementById(link.toLowerCase());
                      element?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="block text-gray-400 hover:text-green-400 transition-colors duration-200"
                  >
                    {link}
                  </button>
                ))}
              </div>
            </div>

            {/* Current Status */}
            <div>
              <h3 className="text-white font-bold mb-4 uppercase tracking-wide">
                Current Status
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-gray-400">Available for work</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-400"></div>
                  <span className="text-gray-400">Learning new technologies</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-400"></div>
                  <span className="text-gray-400">Building side projects</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-800 pt-8">
            <div className="text-gray-400 text-sm text-center">
                © {new Date().getFullYear()} Tafsirul Islam Shafin. All rights reserved.
              </div>
          </div>

          {/* Pixel Art Decoration */}
          <div className="mt-8 flex justify-center">
            <div className="flex gap-1">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 ${
                    i % 4 === 0 ? 'bg-green-400' : 
                    i % 3 === 0 ? 'bg-blue-400' : 
                    i % 2 === 0 ? 'bg-purple-400' : 
                    'bg-gray-600'
                  }`}
                  style={{ 
                    animationDelay: `${i * 0.1}s`,
                    animation: 'pulse 2s infinite'
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};