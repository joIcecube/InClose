import React from 'react';
import { Star } from 'lucide-react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center">
      <div className="bg-dark rounded-full p-1 border-2 border-neon-green shadow-neon">
        <Star className="w-6 h-6 text-neon-green" fill="#00ff90" strokeWidth={1.5} />
      </div>
      <span className="ml-2 text-2xl font-space-grotesk font-bold text-neon-green">
        Inclose
      </span>
    </div>
  );
};

export default Logo;