import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'npm:@supabase/supabase-js';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { code, state } = await req.json();
    
    // Verify state parameter to prevent CSRF
    if (!state || state !== sessionStorage.getItem('instagram_oauth_state')) {
      throw new Error('Invalid state parameter');
    }

    // Exchange code for access token
    const tokenResponse = await fetch('https://api.instagram.com/oauth/access_token', {
      method: 'POST',
      body: new URLSearchParams({
        client_id: Deno.env.get('INSTAGRAM_CLIENT_ID') || '',
        client_secret: Deno.env.get('INSTAGRAM_CLIENT_SECRET') || '',
        grant_type: 'authorization_code',
        redirect_uri: `${req.headers.get('origin')}/auth/callback`,
        code,
      }),
    });

    const tokenData = await tokenResponse.json();

    // Get long-lived access token
    const longLivedTokenResponse = await fetch(
      `https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=${
        Deno.env.get('INSTAGRAM_CLIENT_SECRET')
      }&access_token=${tokenData.access_token}`
    );

    const longLivedToken = await longLivedTokenResponse.json();

    // Store token in database
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') || '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
    );

    await supabase.from('instagram_tokens').upsert({
      user_id: req.headers.get('x-user-id'),
      access_token: longLivedToken.access_token,
      expires_at: new Date(Date.now() + longLivedToken.expires_in * 1000).toISOString(),
    });

    return new Response(
      JSON.stringify({ token: longLivedToken.access_token }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});