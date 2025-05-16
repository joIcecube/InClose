import React from 'react';
import { ChevronDown } from 'lucide-react';
import Button from '../ui/Button';
import AnimatedElement from '../ui/AnimatedElement';

const Hero: React.FC = () => {
  return (
    <section className="pt-28 pb-20 md:pt-36 md:pb-32 relative overflow-hidden">
      <div className="container mx-auto container-padding">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedElement animation="fadeInUp" delay={0.2}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Multipliez <span className="text-neon-green neon-glow">x5</span> vos vues en story Instagram
            </h1>
          </AnimatedElement>
          
          <AnimatedElement animation="fadeInUp" delay={0.4}>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              Ajoutez automatiquement tous vos abonnés à vos Amis proches.
            </p>
          </AnimatedElement>
          
          <AnimatedElement animation="fadeInUp" delay={0.6}>
            <Button size="lg" className="min-w-40">
              Démarrer maintenant
            </Button>
          </AnimatedElement>

          <AnimatedElement animation="fadeIn" delay={1.2}>
            <div className="mt-16 animate-bounce">
              <a 
                href="#how-it-works" 
                className="inline-flex items-center text-neon-green hover:text-white transition-colors"
              >
                <span className="mr-2">Découvrir</span>
                <ChevronDown size={20} />
              </a>
            </div>
          </AnimatedElement>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute -bottom-10 -left-10 w-96 h-96 bg-neon-green rounded-full filter blur-[150px] opacity-20"></div>
      <div className="absolute top-20 -right-20 w-72 h-72 bg-neon-green rounded-full filter blur-[150px] opacity-10"></div>
    </section>
  );
};

export default Hero;