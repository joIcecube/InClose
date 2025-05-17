import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'npm:@supabase/supabase-js';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') || '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
    );

    // Get user's Instagram token
    const { data: tokenData } = await supabase
      .from('instagram_tokens')
      .select('access_token')
      .eq('user_id', req.headers.get('x-user-id'))
      .single();

    if (!tokenData?.access_token) {
      throw new Error('No Instagram token found');
    }

    // Fetch user profile
    const profileResponse = await fetch(
      `https://graph.instagram.com/me?fields=id,username,media_count&access_token=${tokenData.access_token}`
    );
    const profile = await profileResponse.json();

    // Fetch media insights
    const mediaResponse = await fetch(
      `https://graph.instagram.com/me/media?fields=id,timestamp,insights.metric(engagement,impressions)&access_token=${tokenData.access_token}`
    );
    const media = await mediaResponse.json();

    // Calculate engagement rate
    const engagementRate = media.data.reduce((acc: number, post: any) => {
      return acc + (post.insights?.data?.[0]?.values?.[0]?.value || 0);
    }, 0) / media.data.length;

    const stats = {
      username: profile.username,
      posts: profile.media_count,
      followers: profile.followers_count,
      following: profile.following_count,
      engagementRate: Number((engagementRate * 100).toFixed(2)),
      mediaInsights: media.data.map((post: any) => ({
        date: post.timestamp,
        engagement: post.insights?.data?.[0]?.values?.[0]?.value || 0,
        impressions: post.insights?.data?.[1]?.values?.[0]?.value || 0,
      })),
    };

    return new Response(
      JSON.stringify(stats),
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