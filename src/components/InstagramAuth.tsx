import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Instagram, Loader2 } from 'lucide-react';
import { useInstagramAuth } from '../store/authStore';
import Button from './ui/Button';

const InstagramAuth: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const setSessionToken = useInstagramAuth((state) => state.setSessionToken);

  const handleInstagramAuth = async () => {
    setIsLoading(true);
    try {
      // Simulate Instagram OAuth flow
      // In production, this would redirect to Instagram's OAuth endpoint
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate receiving a session token
      // In production, this would come from your backend after OAuth callback
      const mockSessionToken = 'mock_instagram_session_' + Date.now();
      setSessionToken(mockSessionToken);
    } catch (error) {
      console.error('Instagram authentication failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 max-w-xl mx-auto text-center">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-dark-lighter/80 backdrop-blur-md p-8 rounded-xl border border-gray-800 w-full"
      >
        <div className="mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-6">
            <Instagram className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold mb-3">Connexion Instagram</h2>
          <p className="text-gray-400">
            Connectez votre compte Instagram pour commencer l'analyse de vos données
          </p>
        </div>

        <Button
          onClick={handleInstagramAuth}
          disabled={isLoading}
          fullWidth
          className="flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Connexion en cours...
            </>
          ) : (
            <>
              <Instagram className="w-5 h-5 mr-2" />
              Se connecter avec Instagram
            </>
          )}
        </Button>
      </motion.div>
    </div>
  );
};

export default InstagramAuth;