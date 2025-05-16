import React, { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  animationDelay: number;
}

const BackgroundEffects: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  
  useEffect(() => {
    const generateParticles = () => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const particleCount = Math.min(Math.floor(windowWidth * windowHeight / 15000), 30);
      
      const newParticles: Particle[] = [];
      
      for (let i = 0; i < particleCount; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * windowWidth,
          y: Math.random() * windowHeight * 3, // Extra height for scrolling
          size: Math.random() * 5 + 2,
          speed: Math.random() * 2 + 1,
          animationDelay: Math.random() * 5
        });
      }
      
      setParticles(newParticles);
    };
    
    generateParticles();
    
    const handleResize = () => {
      generateParticles();
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Radial glow effect behind hero section */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl aspect-square bg-glow-radial opacity-60"></div>
      
      {/* Floating particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="particle animate-float-slow"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDelay: `${particle.animationDelay}s`,
            animationDuration: `${6 + particle.speed}s`
          }}
        />
      ))}
      
      {/* Glowing grid lines */}
      <div className="absolute inset-0 opacity-10" 
           style={{
             backgroundImage: 'linear-gradient(to right, #00ff90 1px, transparent 1px), linear-gradient(to bottom, #00ff90 1px, transparent 1px)',
             backgroundSize: '80px 80px'
           }}>
      </div>
    </div>
  );
};

export default BackgroundEffects;