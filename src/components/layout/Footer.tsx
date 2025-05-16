import React from 'react';
import { Instagram } from 'lucide-react';
import Logo from './Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-lighter py-12">
      <div className="container mx-auto container-padding">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Logo />
            <p className="mt-4 text-gray-400 max-w-md">
              Inclose aide les coachs, infopreneurs et agences à multiplier par 5 leurs vues en story Instagram, en ajoutant automatiquement tous leurs abonnés à leur liste "Amis proches".
            </p>
            <a 
              href="https://instagram.com/inclose.ai" 
              className="flex items-center mt-4 text-gray-400 hover:text-neon-green transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="w-5 h-5 mr-2" />
              @inclose.ai
            </a>
          </div>
          
          <div>
            <h3 className="text-white font-medium text-lg mb-4">Liens rapides</h3>
            <ul className="space-y-2">
              <li><a href="#how-it-works" className="text-gray-400 hover:text-neon-green transition-colors">Comment ça marche</a></li>
              <li><a href="#pricing" className="text-gray-400 hover:text-neon-green transition-colors">Tarifs</a></li>
              <li><a href="#affiliate" className="text-gray-400 hover:text-neon-green transition-colors">Affiliation</a></li>
              <li><a href="#faq" className="text-gray-400 hover:text-neon-green transition-colors">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-medium text-lg mb-4">Légal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-neon-green transition-colors">Mentions légales</a></li>
              <li><a href="#" className="text-gray-400 hover:text-neon-green transition-colors">Politique de confidentialité</a></li>
              <li><a href="#" className="text-gray-400 hover:text-neon-green transition-colors">Conditions d'utilisation</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Inclose. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;