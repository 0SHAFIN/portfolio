import React from 'react';

interface PixelButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export const PixelButton: React.FC<PixelButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  className = '',
  disabled = false,
  type = 'button',
}) => {
  const baseClasses = `
    px-6 py-3 font-bold text-sm tracking-wide uppercase
    transition-all duration-200 border-2 relative overflow-hidden
    ${disabled 
    ? 'cursor-not-allowed opacity-50' 
    : 'cursor-pointer hover:scale-105 active:scale-95'
}
  `;

  const variantClasses = variant === 'primary' 
    ? `
      bg-green-500 text-black border-green-400
      hover:bg-green-400 hover:shadow-lg hover:shadow-green-500/50
      dark:bg-green-400 dark:text-black dark:border-green-300
      dark:hover:bg-green-300
    `
    : `
      bg-transparent text-green-500 border-green-500
      hover:bg-green-500 hover:text-black
      dark:text-green-400 dark:border-green-400
      dark:hover:bg-green-400 dark:hover:text-black
    `;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses} ${className}`}
      style={{ 
        clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
        imageRendering: 'pixelated',
      }}
    >
      {children}
    </button>
  );
};