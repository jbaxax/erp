import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import * as authService from '../services/auth.service';

// ============================================
// QUERY KEYS - Centralización para mejor control de caché
// ============================================
export const authKeys = {
  all: ['auth'] as const,
  me: () => [...authKeys.all, 'me'] as const,
};

// ============================================
// Hook: useLogin - Mutation para login
// ============================================
export function useLogin() {
  const { login: loginStore } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    // Ahora usa el LoginPayload del servicio refactorizado
    mutationFn: (payload: { email: string; password: string }) =>
      authService.login(payload),

    onSuccess: (data) => {
      // data ya viene desestructurado del service (data.user, data.token)
      loginStore(data.user);

      // Invalidar queries relacionadas para que se recarguen
      queryClient.invalidateQueries({ queryKey: authKeys.me() });
    },

    onError: (error: Error) => {
      console.error('Error en login:', error.message);
    },
  });
}

// ============================================
// Hook: useLogout - Mutation para logout
// ============================================
export function useLogout() {
  const { logout: logoutStore } = useAuthStore();
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: () => authService.logout(),

    onSuccess: () => {
      // Limpiar el store
      logoutStore();

      // Limpiar TODA la caché de React Query
      queryClient.clear();

      // Redirigir al login
      router.push('/login');
    },
  });
}

// ============================================
// Hook: useMe - Query para obtener usuario actual
// ============================================
export function useMe() {
  const { isAuthenticated } = useAuthStore();

  return useQuery({
    queryKey: authKeys.me(),
    queryFn: () => authService.me(),

    // Solo ejecutar si el usuario está autenticado
    enabled: isAuthenticated,

    // Configuración específica para este query
    staleTime: 5 * 60 * 1000, // 5 minutos
    retry: false, // No reintentar si falla (probablemente token inválido)
  });
}
