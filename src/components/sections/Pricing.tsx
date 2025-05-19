import React, { useState } from 'react';
import { Check } from 'lucide-react';
import Button from '../ui/Button';
import AnimatedElement from '../ui/AnimatedElement';

interface PlanProps {
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
  limit: string;
  popular?: boolean;
  delay: number;
  billing: 'monthly' | 'yearly';
  trial?: boolean;
}

const Plan: React.FC<PlanProps> = ({ 
  name, 
  monthlyPrice, 
  yearlyPrice, 
  features, 
  limit, 
  popular = false, 
  delay,
  billing,
  trial = false
}) => {
  const price = billing === 'monthly' ? monthlyPrice : yearlyPrice;
  const discount = billing === 'yearly' ? Math.round((1 - (yearlyPrice / 12) / monthlyPrice) * 100) : 0;
  
  return (
    <AnimatedElement 
      animation="fadeInUp" 
      delay={delay} 
      className={`${popular ? 'border-neon-green shadow-neon' : 'border-gray-800'} border rounded-xl overflow-hidden h-full flex flex-col relative`}
    >
      {popular && (
        <div className="absolute top-4 right-4">
          <div className="bg-neon-green text-dark text-xs font-bold uppercase py-1 px-3 rounded-full">
            Populaire
          </div>
        </div>
      )}
      
      {trial && (
        <div className="absolute top-4 left-4">
          <div className="bg-dark text-neon-green text-xs font-bold border border-neon-green py-1 px-3 rounded-full">
            3 jours gratuits
          </div>
        </div>
      )}
      
      <div className="p-6 md:p-8 flex-grow">
        <h3 className="text-2xl font-bold mb-2">{name}</h3>
        <p className="text-gray-400 mb-6">{limit}</p>
        
        <div className="mb-8">
          <span className="text-4xl font-bold">{price}€</span>
          <span className="text-gray-400">/{billing === 'monthly' ? 'mois' : 'an'}</span>
          
          {discount > 0 && (
            <div className="mt-2 text-neon-green text-sm">
              Économisez {discount}% avec l'abonnement annuel
            </div>
          )}
        </div>
        
        <ul className="space-y-3 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex">
              <Check className="w-5 h-5 text-neon-green mr-3 flex-shrink-0" />
              <span className="text-gray-300">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="p-6 md:p-8 border-t border-gray-800">
        <Button 
          variant={popular ? 'primary' : 'secondary'} 
          fullWidth
        >
          S'abonner
        </Button>
      </div>
    </AnimatedElement>
  );
};

const Pricing: React.FC = () => {
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly');
  
  return (
    <section id="pricing" className="section-padding bg-dark-lighter">
      <div className="container mx-auto container-padding">
        <AnimatedElement animation="fadeInUp">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
            Des <span className="text-neon-green">tarifs</span> adaptés à chaque besoin
          </h2>
        </AnimatedElement>
        
        <AnimatedElement animation="fadeInUp" delay={0.2} className="text-center">
          <p className="text-gray-300 mb-12 max-w-2xl mx-auto">
            Choisissez l'offre qui correspond à la taille de votre audience. Tous nos plans incluent un accès complet à nos fonctionnalités.
          </p>
        </AnimatedElement>
        
        <AnimatedElement animation="fadeInUp" delay={0.3} className="flex justify-center mb-12">
          <div className="bg-dark p-1 rounded-lg inline-flex">
            <button 
              className={`px-4 py-2 rounded ${billing === 'monthly' ? 'bg-dark-lighter text-white' : 'text-gray-400'}`}
              onClick={() => setBilling('monthly')}
            >
              Mensuel
            </button>
            <button 
              className={`px-4 py-2 rounded ${billing === 'yearly' ? 'bg-dark-lighter text-white' : 'text-gray-400'}`}
              onClick={() => setBilling('yearly')}
            >
              Annuel <span className="text-neon-green ml-1">-20%</span>
            </button>
          </div>
        </AnimatedElement>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Plan 
            name="Starter"
            monthlyPrice={49}
            yearlyPrice={468}
            features={[
              "Ajout automatique d'abonnés",
              "Jusqu'à 5 000 abonnés",
              "Assistance par email",
              "1 compte Instagram"
            ]}
            limit="Jusqu'à 5 000 abonnés"
            delay={0.4}
            billing={billing}
            trial={true}
          />
          
          <Plan 
            name="Pro"
            monthlyPrice={79}
            yearlyPrice={790}
            features={[
              "Ajout automatique d'abonnés",
              "Jusqu'à 25 000 abonnés",
              "Assistance prioritaire",
              "1 compte Instagram"
            ]}
            limit="Jusqu'à 25 000 abonnés"
            popular={true}
            delay={0.5}
            billing={billing}
          />
          
          <Plan 
            name="Scale"
            monthlyPrice={129}
            yearlyPrice={1290}
            features={[
              "Ajout automatique d'abonnés",
              "Jusqu'à 50 000 abonnés",
              "Assistance prioritaire",
              "1 compte Instagram"
            ]}
            limit="Jusqu'à 50 000 abonnés"
            delay={0.6}
            billing={billing}
          />
          
          <Plan 
            name="Ultimate"
            monthlyPrice={199}
            yearlyPrice={1990}
            features={[
              "Ajout automatique d'abonnés",
              "Jusqu'à 100 000 abonnés",
              "Assistance VIP",
              "2 comptes Instagram"
            ]}
            limit="Jusqu'à 100 000 abonnés"
            delay={0.7}
            billing={billing}
          />
        </div>
      </div>
    </section>
  );
};

export default Pricing;