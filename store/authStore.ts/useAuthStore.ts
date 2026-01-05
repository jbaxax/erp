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
  token: string | null;
  isAuthenticated: boolean;
  login: (user: User, token: string) => void;
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
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      ...initialState,

      /**
       * Acción de login
       * Guarda el usuario, token y marca como autenticado
       */
      login: (user: User, token: string) => {
        set({
          user,
          token,
          isAuthenticated: true,
        });
      },

      /**
       * Acción de logout
       * Limpia todo el estado de autenticación
       */
      logout: () => {
        set(initialState);
      },
    }),
    {
      name: 'auth-storage', // Nombre de la key en localStorage
    }
  )
);
