'use client';

import { useEffect, useState } from 'react';

export function MSWProvider({ children }: { children: React.ReactNode }) {
  const [mswReady, setMswReady] = useState(false);

  useEffect(() => {
    async function initMSW() {
      // Solo activar MSW en desarrollo
      if (process.env.NODE_ENV === 'development') {
        // Importamos dinámicamente el worker para evitar incluirlo en producción
        const { worker } = await import('@/mocks/browser');
        
        await worker.start({
          onUnhandledRequest: 'bypass', // No avisar sobre peticiones no mockeadas
        });
        
        console.log('🚀 MSW (Mock Service Worker) activado - API simulada corriendo');
      }
      
      setMswReady(true);
    }

    initMSW();
  }, []);

  // Mostrar loading mientras MSW se inicializa solo en desarrollo
  if (!mswReady && process.env.NODE_ENV === 'development') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Iniciando API simulada...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
