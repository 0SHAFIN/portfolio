import React from 'react';
import { X } from 'lucide-react';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  imageAlt: string;
}

export const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onClose, imageSrc, imageAlt }) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="relative max-w-4xl max-h-[90vh] mx-4">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 p-2 text-white hover:text-gray-300 transition-colors duration-200 z-10"
        >
          <X className="w-6 h-6" />
        </button>
        
        {/* Image */}
        <img
          src={imageSrc}
          alt={imageAlt}
          className="w-full h-full object-contain rounded-lg shadow-2xl"
        />
        
        {/* Image Info */}
        <div className="absolute -bottom-12 left-0 text-white text-center w-full">
          <p className="text-sm text-gray-300">{imageAlt}</p>
        </div>
      </div>
    </div>
  );
};
