import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import AnimatedElement from '../ui/AnimatedElement';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
  delay: number;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onClick, delay }) => {
  return (
    <AnimatedElement animation="fadeInUp" delay={delay}>
      <div 
        className={`border-b border-gray-800 last:border-b-0 ${isOpen ? 'pb-6' : 'pb-4'}`}
      >
        <button 
          className="py-4 w-full flex items-center justify-between text-left focus:outline-none"
          onClick={onClick}
        >
          <span className="text-lg font-medium">{question}</span>
          {isOpen ? (
            <ChevronUp className="w-5 h-5 text-neon-green" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </button>
        
        {isOpen && (
          <div className="text-gray-400 pr-8">
            {answer}
          </div>
        )}
      </div>
    </AnimatedElement>
  );
};

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  
  const faqItems = [
    {
      question: "Est-ce risqué pour mon compte Instagram ?",
      answer: "Non, Inclose est conçu pour être totalement sécurisé. Nous respectons strictement les limites d'utilisation d'Instagram et utilisons des méthodes qui imitent un comportement humain. Nous n'utilisons jamais votre mot de passe, seulement un token de session sécurisé."
    },
    {
      question: "Dois-je donner mon mot de passe Instagram ?",
      answer: "Absolument pas. Inclose fonctionne uniquement avec votre token de session, qui est une méthode sécurisée pour accéder à votre compte sans jamais connaître ou stocker votre mot de passe. Votre sécurité est notre priorité absolue."
    },
    {
      question: "Combien de temps avant de voir les résultats ?",
      answer: "La plupart de nos utilisateurs commencent à voir une augmentation significative des vues sur leurs stories dans les 7 à 14 jours après l'activation du service. Ce délai dépend de la taille de votre audience et du rythme d'ajout configuré."
    },
    {
      question: "Est-ce que ça fonctionne avec 50 000 abonnés ou plus ?",
      answer: "Oui, Inclose est conçu pour fonctionner avec des comptes de toutes tailles. Nous proposons des formules adaptées aux grandes audiences, avec des paramètres optimisés pour garantir les meilleurs résultats sans compromettre la sécurité de votre compte."
    },
    {
      question: "Comment fonctionne la facturation ?",
      answer: "Vous pouvez choisir entre un abonnement mensuel ou annuel. L'abonnement annuel vous permet d'économiser 20% par rapport au tarif mensuel. Tous les paiements sont sécurisés et vous pouvez annuler à tout moment."
    },
    {
      question: "Puis-je utiliser Inclose sur plusieurs comptes Instagram ?",
      answer: "Nos formules Starter, Pro et Scale sont conçues pour un seul compte Instagram. Si vous souhaitez utiliser Inclose sur plusieurs comptes, notre formule Ultimate vous permet de gérer jusqu'à 2 comptes. Pour plus de comptes, contactez notre service client pour une offre personnalisée."
    }
  ];
  
  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  
  return (
    <section id="faq" className="section-padding bg-dark-lighter">
      <div className="container mx-auto container-padding max-w-3xl">
        <AnimatedElement animation="fadeInUp">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Questions <span className="text-neon-green">fréquentes</span>
          </h2>
        </AnimatedElement>
        
        <div className="bg-dark rounded-xl p-6 md:p-8">
          {faqItems.map((item, index) => (
            <FAQItem 
              key={index}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === index}
              onClick={() => toggleFAQ(index)}
              delay={0.2 + index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;