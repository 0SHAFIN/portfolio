import React from 'react';

interface PixelCardProps {
  children: React.ReactNode;
  className?: string;
  glowing?: boolean;
}

export const PixelCard: React.FC<PixelCardProps> = ({ 
  children, 
  className = '',
  glowing = false
}) => {
  return (
    <div
      className={`
        bg-gray-100 dark:bg-gray-800 
        border-2 border-gray-300 dark:border-gray-600
        p-6 transition-all duration-300
        hover:border-green-500 dark:hover:border-green-400
        ${glowing ? 'shadow-lg shadow-green-500/20 dark:shadow-green-400/20' : ''}
        ${className}
      `}
      style={{ 
        clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))',
        imageRendering: 'pixelated'
      }}
    >
      {children}
    </div>
  );
};