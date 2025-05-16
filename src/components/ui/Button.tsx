import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  fullWidth?: boolean;
  type?: 'button' | 'submit' | 'reset'; 
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '',
  onClick,
  fullWidth = false
}) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 ease-in-out';
  
  const variants = {
    primary: 'bg-neon-green text-dark font-bold hover:bg-opacity-90 shadow-neon',
    secondary: 'bg-dark-lighter text-white hover:bg-dark-light border border-neon-green',
    outline: 'bg-transparent text-neon-green border border-neon-green hover:bg-neon-green hover:bg-opacity-10'
  };
  
  const sizes = {
    sm: 'text-sm px-4 py-2',
    md: 'text-base px-6 py-3',
    lg: 'text-lg px-8 py-4'
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  
  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;