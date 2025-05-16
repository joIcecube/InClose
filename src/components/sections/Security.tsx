import React from 'react';
import { ShieldCheck, Lock, AlertCircle } from 'lucide-react';
import AnimatedElement from '../ui/AnimatedElement';

interface SecurityFeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const SecurityFeature: React.FC<SecurityFeatureProps> = ({ icon, title, description, delay }) => {
  return (
    <AnimatedElement animation="fadeInUp" delay={delay}>
      <div className="flex">
        <div className="mr-4 text-neon-green">
          {icon}
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-gray-400">{description}</p>
        </div>
      </div>
    </AnimatedElement>
  );
};

const Security: React.FC = () => {
  return (
    <section className="section-padding bg-dark-lighter">
      <div className="container mx-auto container-padding max-w-5xl">
        <AnimatedElement animation="fadeInUp">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
            Sécurité <span className="text-neon-green">garantie</span>
          </h2>
        </AnimatedElement>
        
        <AnimatedElement animation="fadeInUp" delay={0.2}>
          <p className="text-center text-gray-300 mb-16 max-w-3xl mx-auto text-lg">
            Nous ne demandons jamais votre mot de passe. Inclose fonctionne avec une session cryptée et sécurisée. 0 risque de ban, 0 stress.
          </p>
        </AnimatedElement>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          <SecurityFeature 
            icon={<ShieldCheck size={32} />}
            title="Connexion sécurisée"
            description="Nous utilisons uniquement votre token de session, jamais votre mot de passe. Vos informations restent confidentielles."
            delay={0.3}
          />
          
          <SecurityFeature 
            icon={<Lock size={32} />}
            title="Données chiffrées"
            description="Toutes vos données sont chiffrées avec les standards les plus élevés de l'industrie. Votre confidentialité est notre priorité."
            delay={0.4}
          />
          
          <SecurityFeature 
            icon={<AlertCircle size={32} />}
            title="Conforme aux règles"
            description="Notre système respecte les limites d'utilisation d'Instagram pour garantir la sécurité de votre compte."
            delay={0.5}
          />
        </div>
      </div>
    </section>
  );
};

export default Security;