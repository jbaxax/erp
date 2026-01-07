import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Tipos para el usuario
interface User {
  id: string;
  email: string;
  name: string;
  roles: string[];
}

// Tipos para el estado del store
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}

// Estado inicial
const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

/**
 * Store de autenticación con Zustand
 * 
 * Características:
 * - Maneja el estado de autenticación del usuario
 * - Persiste el estado en localStorage usando el middleware 'persist'
 * - No requiere Provider (a diferencia de Redux/Context API)
 */
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  login: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));