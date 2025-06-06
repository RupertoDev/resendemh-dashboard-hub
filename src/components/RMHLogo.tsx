
import React from 'react';

interface RMHLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

const RMHLogo: React.FC<RMHLogoProps> = ({ 
  size = 'md', 
  showText = true, 
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'h-6 w-auto',
    md: 'h-8 w-auto',
    lg: 'h-12 w-auto'
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl'
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {/* Logo SVG baseado na imagem fornecida */}
      <div className={`${sizeClasses[size]} text-rmh-primary`}>
        <svg
          viewBox="0 0 120 60"
          className="w-full h-full"
          fill="currentColor"
        >
          {/* R */}
          <path d="M5 10 L5 50 M5 10 L25 10 Q35 10 35 20 Q35 30 25 30 L5 30 M25 30 L35 50" 
                strokeWidth="3" 
                stroke="currentColor" 
                fill="none" 
                strokeLinecap="round" 
                strokeLinejoin="round" />
          
          {/* M */}
          <path d="M45 50 L45 10 L55 35 L65 10 L65 50" 
                strokeWidth="3" 
                stroke="currentColor" 
                fill="none" 
                strokeLinecap="round" 
                strokeLinejoin="round" />
          
          {/* H */}
          <path d="M75 10 L75 50 M75 30 L95 30 M95 10 L95 50" 
                strokeWidth="3" 
                stroke="currentColor" 
                fill="none" 
                strokeLinecap="round" 
                strokeLinejoin="round" />
        </svg>
      </div>
      
      {showText && (
        <div className="flex flex-col">
          <span className={`font-heading font-bold text-rmh-primary ${textSizeClasses[size]}`}>
            RESENDE MORI HUTCHISON
          </span>
          <span className={`font-body tracking-widest text-rmh-gray uppercase ${size === 'lg' ? 'text-xs' : 'text-xs'}`}>
            ADVOCACIA
          </span>
        </div>
      )}
    </div>
  );
};

export default RMHLogo;
