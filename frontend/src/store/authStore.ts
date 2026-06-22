import { create } from 'zustand';

interface User {
  id: string;
  username: string;
  email: string;
  full_name: string;
  role: string;
  nip?: string;
  position?: string;
  department?: string;
}

interface AuthStore {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  login: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => {
  // Load from localStorage on init
  const savedToken = localStorage.getItem('token');
  const savedUser = localStorage.getItem('user');

  return {
    user: savedUser ? JSON.parse(savedUser) : null,
    token: savedToken || null,
    isAuthenticated: !!savedToken,
    setUser: (user) => {
      set({ user });
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        localStorage.removeItem('user');
      }
    },
    setToken: (token) => {
      set({ token });
      if (token) {
        localStorage.setItem('token', token);
      } else {
        localStorage.removeItem('token');
      }
    },
    login: (user, token) => {
      set({ user, token, isAuthenticated: true });
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
    },
    logout: () => {
      set({ user: null, token: null, isAuthenticated: false });
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
  };
});
