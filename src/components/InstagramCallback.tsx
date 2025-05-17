import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInstagramAuth } from '../store/authStore';
import { Loader2 } from 'lucide-react';

const InstagramCallback: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const setSessionToken = useInstagramAuth((state) => state.setSessionToken);

  useEffect(() => {
    const handleCallback = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get('code');
      const state = params.get('state');
      
      if (!code) {
        setError('No authorization code received');
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
        setSessionToken(data.token);
        navigate('/dashboard');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Authentication failed');
      }
    };

    handleCallback();
  }, [navigate, setSessionToken]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-dark-lighter p-6 rounded-lg border border-red-500">
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex items-center space-x-3">
        <Loader2 className="w-6 h-6 text-neon-green animate-spin" />
        <span>Finalizing authentication...</span>
      </div>
    </div>
  );
};

export default InstagramCallback;