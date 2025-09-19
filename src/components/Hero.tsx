import React, { useState } from 'react';
import { ChevronDown, Github, Linkedin, Mail, Download } from 'lucide-react';
import { PixelButton } from './PixelButton';
import { ImageModal } from './ImageModal';

export const Hero: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const openImageModal = () => {
    setIsModalOpen(true);
  };

  const closeImageModal = () => {
    setIsModalOpen(false);
  };

  const downloadResume = () => {
    const link = document.createElement('a');
    link.href = '/Tafsirul_Islam_Shafin_Resume.pdf';
    link.download = 'Tafsirul_Islam_Shafin_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 pt-20 relative">
      <div className="absolute inset-0 z-10">
        <div className="pixel-grid opacity-20 dark:opacity-20" ></div>
        <div className="floating-pixels opacity-80 dark:opacity-50">
          <div className="pixel pixel-1"></div>
          <div className="pixel pixel-2"></div>
          <div className="pixel pixel-3"></div>
          <div className="pixel pixel-4"></div>
          <div className="pixel pixel-5"></div>
          <div className="pixel pixel-6"></div>
          <div className="pixel pixel-7"></div>
          <div className="pixel pixel-8"></div>
        </div>
      </div>
      <div className="container mx-auto px-4 relative z-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Pixelated Avatar */}
          <div className="mb-8">
            <div 
              className="w-32 h-32 mx-auto bg-gradient-to-br from-green-400 to-green-600 dark:from-green-400 dark:to-green-500 border-4 border-gray-800 dark:border-gray-200 cursor-pointer hover:scale-105 transition-transform duration-300"
              style={{ 
                clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))',
                imageRendering: 'pixelated'
              }}
              onClick={openImageModal}
            >
              <div className="w-full h-full flex items-center justify-center">
                <img src='/image/photo.jpg' alt="Avatar" className="w-full h-full object-cover" />
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
              Click to view larger
            </p>
          </div>

          {/* Greeting */}
          <div className="mb-4">
            <span className="inline-block bg-green-500 dark:bg-green-400 text-black px-4 py-2 text-sm font-bold uppercase tracking-wider">
              Hello World!
            </span>
          </div>

          {/* Name and Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
            FULLSTACK
            <br />
            <span className="text-green-500 dark:text-green-400">DEVELOPER</span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Computer Science Engineering student crafting pixel-perfect web experiences 
            at <span className="text-green-500 dark:text-green-400 font-semibold">Ecomstal</span>. 
            Passionate about modern web technologies and creative solutions.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <PixelButton onClick={() => scrollToSection('about')}>
              Explore My Work
            </PixelButton>
            <PixelButton variant="secondary" onClick={() => scrollToSection('contact')}>
              Get In Touch
            </PixelButton>
            <PixelButton variant="secondary" onClick={downloadResume} className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Download Resume
            </PixelButton>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-6 mb-12">
            {[
              { Icon: Github, href: 'https://github.com/0SHAFIN', label: 'GitHub' },
              { Icon: Linkedin, href: 'https://www.linkedin.com/in/tafsirul-islam-shafin-98126a296/', label: 'LinkedIn' },
              { Icon: Mail, href: 'mailto:tafsirul.shafin44@gmail.com', label: 'Email' }
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                className="w-12 h-12 bg-gray-200 dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-400 flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{ clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))' }}
              >
                <Icon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </a>
            ))}
          </div>

          {/* Scroll Indicator */}
          <div className="animate-bounce">
            <button
              onClick={() => scrollToSection('about')}
              className="text-gray-500 dark:text-gray-400 hover:text-green-500 dark:hover:text-green-400 transition-colors duration-200"
            >
              <ChevronDown className="w-8 h-8 mx-auto" />
            </button>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      <ImageModal
        isOpen={isModalOpen}
        onClose={closeImageModal}
        imageSrc="/image/photo.jpg"
        imageAlt="Tafsirul Islam Shafin - Frontend Developer"
      />
    </section>
  );
};