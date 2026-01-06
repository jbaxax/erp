'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

export function QueryProvider({ children }: { children: React.ReactNode }) {
  // Creamos el QueryClient en un useState para evitar recrearlo en cada render
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Configuración por defecto para queries
            staleTime: 60 * 1000, // 1 minuto - datos considerados "frescos"
            gcTime: 5 * 60 * 1000, // 5 minutos - tiempo en caché
            retry: 1, // Solo reintentar 1 vez
            refetchOnWindowFocus: false, // No recargar al cambiar de ventana
          },
          mutations: {
            // Configuración por defecto para mutations
            retry: 0, // No reintentar mutaciones automáticamente
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* DevTools solo se muestran en desarrollo */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
