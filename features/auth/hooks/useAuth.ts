import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
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
      loginStore(data.user, data.token);

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

  return useMutation({
    mutationFn: () => authService.logout(),
    
    onSuccess: () => {
      // Limpiar el store
      logoutStore();
      
      // Limpiar TODA la caché de React Query
      queryClient.clear();
    },
  });
}

// ============================================
// Hook: useMe - Query para obtener usuario actual
// ============================================
export function useMe() {
  const { isAuthenticated, token } = useAuthStore();

  return useQuery({
    queryKey: authKeys.me(),
    queryFn: () => authService.me(),
    
    // Solo ejecutar si el usuario está autenticado
    enabled: isAuthenticated && !!token,
    
    // Configuración específica para este query
    staleTime: 5 * 60 * 1000, // 5 minutos
    retry: false, // No reintentar si falla (probablemente token inválido)
  });
}

// ============================================
// EJEMPLO DE USO EN COMPONENTES
// ============================================

/*
// En tu componente de Login:
export function LoginForm() {
  const loginMutation = useLogin();
  
  const handleSubmit = (email: string, password: string) => {
    loginMutation.mutate(
      { email, password },
      {
        onSuccess: () => {
          router.push('/dashboard');
        },
        onError: (error) => {
          toast.error(error.message);
        }
      }
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      {loginMutation.isPending && <Loading />}
      {loginMutation.isError && <Error message={loginMutation.error.message} />}
      // ... resto del formulario
    </form>
  );
}

// En tu componente de Profile:
export function UserProfile() {
  const { data: user, isLoading, isError } = useMe();

  if (isLoading) return <Loading />;
  if (isError) return <Error />;
  
  return <div>Bienvenido {user.name}</div>;
}

// Para hacer logout:
export function LogoutButton() {
  const logoutMutation = useLogout();
  
  return (
    <button 
      onClick={() => logoutMutation.mutate()}
      disabled={logoutMutation.isPending}
    >
      {logoutMutation.isPending ? 'Cerrando sesión...' : 'Cerrar sesión'}
    </button>
  );
}
*/
