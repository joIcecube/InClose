import { create } from 'zustand';

interface InstagramStats {
  followers: number;
  following: number;
  posts: number;
  closeFriends: number;
  storyReach: number;
  engagementRate: number;
  profilePicture: string;
  username: string;
}

interface InstagramState {
  stats: InstagramStats | null;
  isLoading: boolean;
  error: string | null;
  fetchStats: () => Promise<void>;
}

export const useInstagramStore = create<InstagramState>((set) => ({
  stats: null,
  isLoading: false,
  error: null,
  fetchStats: async () => {
    set({ isLoading: true });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock data - replace with real API call
      const mockStats: InstagramStats = {
        followers: 8234,
        following: 892,
        posts: 156,
        closeFriends: 243,
        storyReach: 1250,
        engagementRate: 4.8,
        profilePicture: "https://images.pexels.com/photos/3768911/pexels-photo-3768911.jpeg",
        username: "@inclose.ai"
      };
      
      set({ stats: mockStats, error: null });
    } catch (error) {
      set({ error: 'Failed to fetch Instagram stats' });
    } finally {
      set({ isLoading: false });
    }
  }
}));