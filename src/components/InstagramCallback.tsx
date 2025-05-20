import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInstagramAuth } from '../store/authStore';
import { Loader2 } from 'lucide-react';
import Cookies from 'js-cookie';

const InstagramCallback: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const setSessionToken = useInstagramAuth((state) => state.setSessionToken);

  useEffect(() => {
    const handleCallback = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get('code');
      const state = params.get('state');
      const savedState = sessionStorage.getItem('instagram_oauth_state');
      
      if (!code) {
        setError('No authorization code received');
        return;
      }

      if (state !== savedState) {
        setError('Invalid state parameter');
        return;
      }

      try {
        const response = await fetch('/api/instagram-auth', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code, state }),
        });

        if (!response.ok) throw new Error('Failed to exchange code for token');

        const data = await response.json();
        
        // Store token in cookie and auth store
        Cookies.set('instagram_token', data.token, { secure: true });
        setSessionToken(data.token);
        
        // Clean up state
        sessionStorage.removeItem('instagram_oauth_state');
        
        // Navigate back to dashboard
        navigate('/dashboard', { replace: true });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Authentication failed');
      }
    };

    handleCallback();
  }, [navigate, setSessionToken]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark">
        <div className="bg-dark-lighter p-6 rounded-lg border border-red-500 text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button 
            onClick={() => navigate('/dashboard')}
            className="text-neon-green hover:underline"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark">
      <div className="bg-dark-lighter p-8 rounded-lg border border-gray-800">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="w-8 h-8 text-neon-green animate-spin" />
          <span className="text-gray-300">Finalizing your Instagram connection...</span>
        </div>
      </div>
    </div>
  );
};

export default InstagramCallback;