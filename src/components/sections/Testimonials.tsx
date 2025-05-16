import React from 'react';
import { Star } from 'lucide-react';
import AnimatedElement from '../ui/AnimatedElement';

interface TestimonialProps {
  name: string;
  role: string;
  content: string;
  rating: number;
  imageUrl: string;
  delay: number;
}

const Testimonial: React.FC<TestimonialProps> = ({ name, role, content, rating, imageUrl, delay }) => {
  return (
    <AnimatedElement animation="fadeInUp" delay={delay}>
      <div className="bg-dark-lighter p-6 rounded-lg border border-gray-800 hover:border-neon-green transition-colors duration-300 h-full flex flex-col">
        <div className="flex items-center mb-4">
          <img 
            src={imageUrl} 
            alt={name} 
            className="w-12 h-12 rounded-full object-cover mr-4"
          />
          <div>
            <h3 className="font-bold text-lg">{name}</h3>
            <p className="text-gray-400 text-sm">{role}</p>
          </div>
        </div>
        
        <div className="flex mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star 
              key={i} 
              size={16} 
              className={i < rating ? "text-neon-green fill-neon-green" : "text-gray-500"} 
            />
          ))}
        </div>
        
        <p className="text-gray-300 italic flex-grow">{content}</p>
      </div>
    </AnimatedElement>
  );
};

const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="section-padding">
      <div className="container mx-auto container-padding">
        <AnimatedElement animation="fadeInUp">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Ils ont <span className="text-neon-green">multiplié</span> leurs vues
          </h2>
        </AnimatedElement>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Testimonial 
            name="Camille"
            role="Coach Instagram"
            content="Depuis que j'utilise Inclose, mes vues en stories ont explosé ! Je peux enfin toucher l'ensemble de ma communauté et l'engagement a suivi. Un outil indispensable pour tous les créateurs de contenu."
            rating={5}
            imageUrl="https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            delay={0.2}
          />
          
          <Testimonial 
            name="Lucas"
            role="Agence SMMA"
            content="Nous utilisons Inclose pour tous nos clients et les résultats sont impressionnants. La facilité d'utilisation et l'efficacité du service en font un outil que je recommande à tous les professionnels du marketing digital."
            rating={5}
            imageUrl="https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            delay={0.3}
          />
          
          <Testimonial 
            name="Soraya"
            role="Formatrice Beauté"
            content="Après avoir essayé plusieurs outils, Inclose est le seul qui m'a vraiment aidée à augmenter significativement ma visibilité. Mes ventes ont augmenté de 40% en seulement 2 mois grâce à une meilleure portée de mes stories."
            rating={5}
            imageUrl="https://images.pexels.com/photos/3768911/pexels-photo-3768911.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            delay={0.4}
          />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;