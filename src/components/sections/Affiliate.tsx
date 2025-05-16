import React from 'react';
import { Users, DollarSign, Percent } from 'lucide-react';
import Button from '../ui/Button';
import AnimatedElement from '../ui/AnimatedElement';

const Affiliate: React.FC = () => {
  return (
    <section id="affiliate" className="section-padding">
      <div className="container mx-auto container-padding max-w-5xl">
        <div className="bg-dark-lighter border border-gray-800 rounded-xl p-8 md:p-12 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-neon-green rounded-full filter blur-[120px] opacity-20"></div>
          
          <div className="relative z-10">
            <AnimatedElement animation="fadeInUp">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-dark p-3 rounded-full">
                  <Percent className="w-8 h-8 text-neon-green" />
                </div>
              </div>
            </AnimatedElement>
            
            <AnimatedElement animation="fadeInUp" delay={0.2}>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
                Affiliation <span className="text-neon-green">30% à vie</span>
              </h2>
            </AnimatedElement>
            
            <AnimatedElement animation="fadeInUp" delay={0.3}>
              <p className="text-center text-gray-300 mb-10 max-w-2xl mx-auto">
                Recommandez Inclose et gagnez 30% de commission chaque mois par client. Plus vous partagez, plus vous gagnez !
              </p>
            </AnimatedElement>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
              <AnimatedElement animation="fadeInUp" delay={0.4}>
                <div className="bg-dark p-6 rounded-lg text-center">
                  <div className="w-12 h-12 bg-dark-lighter rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-6 h-6 text-neon-green" />
                  </div>
                  <h3 className="font-bold mb-2">Partagez</h3>
                  <p className="text-gray-400 text-sm">Partagez votre lien d'affiliation avec votre audience</p>
                </div>
              </AnimatedElement>
              
              <AnimatedElement animation="fadeInUp" delay={0.5}>
                <div className="bg-dark p-6 rounded-lg text-center">
                  <div className="w-12 h-12 bg-dark-lighter rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-6 h-6 text-neon-green" />
                  </div>
                  <h3 className="font-bold mb-2">Convertissez</h3>
                  <p className="text-gray-400 text-sm">Vos prospects s'abonnent à Inclose via votre lien</p>
                </div>
              </AnimatedElement>
              
              <AnimatedElement animation="fadeInUp" delay={0.6}>
                <div className="bg-dark p-6 rounded-lg text-center">
                  <div className="w-12 h-12 bg-dark-lighter rounded-full flex items-center justify-center mx-auto mb-4">
                    <DollarSign className="w-6 h-6 text-neon-green" />
                  </div>
                  <h3 className="font-bold mb-2">Gagnez</h3>
                  <p className="text-gray-400 text-sm">Recevez 30% de commission récurrente à vie</p>
                </div>
              </AnimatedElement>
            </div>
            
            <AnimatedElement animation="fadeInUp" delay={0.7} className="text-center">
              <Button size="lg">
                Rejoindre le programme partenaire
              </Button>
            </AnimatedElement>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Affiliate;