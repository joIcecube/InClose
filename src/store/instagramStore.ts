import { create } from 'zustand';
import axios from 'axios';
import Cookies from 'js-cookie';

interface InstagramStats {
  followers: number;
  following: number;
  posts: number;
  closeFriends: number;
  storyReach: number;
  engagementRate: number;
  profilePicture: string;
  username: string;
  mediaInsights: {
    date: string;
    views: number;
    engagement: number;
  }[];
}

interface InstagramState {
  stats: InstagramStats | null;
  isLoading: boolean;
  error: string | null;
  fetchStats: () => Promise<void>;
  checkTokenExpiry: () => Promise<boolean>;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const useInstagramStore = create<InstagramState>((set) => ({
  stats: null,
  isLoading: false,
  error: null,
  
  checkTokenExpiry: async () => {
    const token = Cookies.get('instagram_token');
    if (!token) return false;
    
    try {
      const response = await axios.get(`${API_URL}/api/instagram/verify-token`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data.valid;
    } catch (error) {
      Cookies.remove('instagram_token');
      return false;
    }
  },
  
  fetchStats: async () => {
    set({ isLoading: true });
    const token = Cookies.get('instagram_token');
    
    if (!token) {
      set({ error: 'No authentication token found', isLoading: false });
      return;
    }
    
    try {
      const response = await axios.get(`${API_URL}/api/instagram/stats`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      set({ stats: response.data, error: null });
    } catch (error: any) {
      if (error.response?.status === 401) {
        Cookies.remove('instagram_token');
        set({ error: 'Authentication expired. Please login again.' });
      } else {
        set({ error: 'Failed to fetch Instagram stats' });
      }
    } finally {
      set({ isLoading: false });
    }
  }
}));