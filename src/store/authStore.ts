import { create } from 'zustand';

interface InstagramAuthState {
  isAuthenticated: boolean;
  sessionToken: string | null;
  setSessionToken: (token: string) => void;
  clearSessionToken: () => void;
}

export const useInstagramAuth = create<InstagramAuthState>((set) => ({
  isAuthenticated: false,
  sessionToken: null,
  setSessionToken: (token: string) => 
    set({ sessionToken: token, isAuthenticated: true }),
  clearSessionToken: () => 
    set({ sessionToken: null, isAuthenticated: false }),
}));