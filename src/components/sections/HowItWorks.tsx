import React from 'react';
import { Key, Bot, BarChart3 } from 'lucide-react';
import AnimatedElement from '../ui/AnimatedElement';

interface StepProps {
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: number;
}

const Step: React.FC<StepProps> = ({ number, title, description, icon, delay }) => {
  return (
    <AnimatedElement animation="fadeInUp" delay={delay} className="flex flex-col items-center">
      <div className="relative">
        <div className="w-16 h-16 bg-dark-lighter rounded-full flex items-center justify-center border border-neon-green mb-6">
          {icon}
        </div>
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-neon-green rounded-full flex items-center justify-center text-dark font-bold">
          {number}
        </div>
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-400 text-center max-w-xs">{description}</p>
    </AnimatedElement>
  );
};

const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="section-padding bg-dark-lighter">
      <div className="container mx-auto container-padding">
        <AnimatedElement animation="fadeInUp">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Comment ça <span className="text-neon-green">fonctionne</span>
          </h2>
        </AnimatedElement>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          <Step 
            number={1}
            title="Rentre ta session Instagram"
            description="Connecte ton compte Instagram en toute sécurité. Aucun mot de passe n'est requis."
            icon={<Key className="w-8 h-8 text-neon-green" />}
            delay={0.2}
          />
          
          <Step 
            number={2}
            title="Le bot ajoute tes abonnés"
            description="Notre algorithme intelligent ajoute progressivement tes abonnés à ta liste d'amis proches, jour après jour."
            icon={<Bot className="w-8 h-8 text-neon-green" />}
            delay={0.4}
          />
          
          <Step 
            number={3}
            title="Tes vues story explosent"
            description="Profite d'une augmentation significative de tes vues en story et d'un meilleur engagement de ton audience."
            icon={<BarChart3 className="w-8 h-8 text-neon-green" />}
            delay={0.6}
          />
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;