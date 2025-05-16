import React from 'react';
import Button from '../ui/Button';
import AnimatedElement from '../ui/AnimatedElement';

const CallToAction: React.FC = () => {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-neon-green rounded-full filter blur-[150px] opacity-20"></div>
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-neon-green rounded-full filter blur-[150px] opacity-20"></div>
      </div>
      
      <div className="container mx-auto container-padding relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <AnimatedElement animation="fadeInUp">
            <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">
              Prêt à faire <span className="text-neon-green neon-glow">exploser</span> tes vues en story ?
            </h2>
          </AnimatedElement>
          
          <AnimatedElement animation="fadeInUp" delay={0.2}>
            <p className="text-xl text-gray-300 mb-10">
              Rejoins des milliers de créateurs qui ont déjà multiplié leur visibilité grâce à Inclose.
            </p>
          </AnimatedElement>
          
          <AnimatedElement animation="fadeInUp" delay={0.4}>
            <Button size="lg">
              Je teste Inclose maintenant
            </Button>
          </AnimatedElement>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;