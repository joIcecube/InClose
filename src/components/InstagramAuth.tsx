import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Instagram, Loader2 } from 'lucide-react';
import Button from './ui/Button';

const InstagramAuth: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleInstagramAuth = () => {
    setIsLoading(true);
    
    // Instagram OAuth configuration
    const clientId = import.meta.env.VITE_INSTAGRAM_CLIENT_ID;
    const redirectUri = encodeURIComponent(`${window.location.origin}/auth/callback`);
    const scope = 'user_profile,user_media';
    
    // Generate and store state for CSRF protection
    const state = Math.random().toString(36).substring(7);
    sessionStorage.setItem('instagram_oauth_state', state);
    
    // Construct OAuth URL
    const authUrl = `https://api.instagram.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code&state=${state}`;
    
    // Redirect to Instagram
    window.location.href = authUrl;
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