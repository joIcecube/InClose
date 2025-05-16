import React from 'react';
import { Check, X } from 'lucide-react';
import AnimatedElement from '../ui/AnimatedElement';

interface ComparisonItemProps {
  withInclose: boolean;
  feature: string;
  delay: number;
}

const ComparisonItem: React.FC<ComparisonItemProps> = ({ withInclose, feature, delay }) => {
  return (
    <AnimatedElement 
      animation="fadeInUp" 
      delay={delay} 
      className={`flex items-center p-4 rounded-lg ${withInclose ? 'bg-dark-lighter border-l-4 border-neon-green' : 'bg-dark border-l-4 border-gray-700'}`}
    >
      <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 ${withInclose ? 'bg-neon-green text-dark' : 'bg-gray-700 text-white'}`}>
        {withInclose ? <Check size={18} /> : <X size={18} />}
      </div>
      <span className="text-lg">{feature}</span>
    </AnimatedElement>
  );
};

const Comparison: React.FC = () => {
  return (
    <section className="section-padding">
      <div className="container mx-auto container-padding">
        <AnimatedElement animation="fadeInUp">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Avant / Après <span className="text-neon-green">Inclose</span>
          </h2>
        </AnimatedElement>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <div className="space-y-4">
            <AnimatedElement animation="fadeInUp" delay={0.1}>
              <h3 className="text-2xl font-bold mb-6 text-gray-400">
                ❌ Sans Inclose
              </h3>
            </AnimatedElement>
            
            <ComparisonItem 
              withInclose={false} 
              feature="Faible portée de vos stories" 
              delay={0.2}
            />
            <ComparisonItem 
              withInclose={false} 
              feature="Pas de contrôle sur ton audience" 
              delay={0.3}
            />
            <ComparisonItem 
              withInclose={false} 
              feature="Aucune automatisation" 
              delay={0.4}
            />
            <ComparisonItem 
              withInclose={false} 
              feature="Stories ignorées" 
              delay={0.5}
            />
          </div>

          <div className="space-y-4">
            <AnimatedElement animation="fadeInUp" delay={0.1}>
              <h3 className="text-2xl font-bold mb-6 text-neon-green">
                ✅ Avec Inclose
              </h3>
            </AnimatedElement>
            
            <ComparisonItem 
              withInclose={true} 
              feature="Vues multipliées par 5" 
              delay={0.2}
            />
            <ComparisonItem 
              withInclose={true} 
              feature="Ton reach reboosté" 
              delay={0.3}
            />
            <ComparisonItem 
              withInclose={true} 
              feature="Processus 100% automatisé" 
              delay={0.4}
            />
            <ComparisonItem 
              withInclose={true} 
              feature="Ton audience te voit enfin" 
              delay={0.5}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Comparison;