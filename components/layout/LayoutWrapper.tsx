'use client';

import { useAuthStore } from '@/store/useAuthStore';
import { Sidebar } from '@/components/layout/Sidebar';
import { usePathname } from 'next/navigation';

interface LayoutWrapperProps {
  children: React.ReactNode;
}

/**
 * Layout Wrapper
 * 
 * Decide si mostrar el Sidebar basándose en:
 * - Si el usuario está autenticado
 * - Si no está en rutas públicas (como /login)
 */
export function LayoutWrapper({ children }: LayoutWrapperProps) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const pathname = usePathname();

  // Rutas donde NO queremos mostrar el Sidebar
  const publicRoutes = ['/login', '/register', '/forgot-password'];
  const isPublicRoute = publicRoutes.includes(pathname);

  // Mostrar Sidebar solo si está autenticado y NO está en ruta pública
  const showSidebar = isAuthenticated && !isPublicRoute;

  return (
    <>
      {showSidebar && <Sidebar />}
      <main
        className={showSidebar ? 'ml-64 min-h-screen' : 'min-h-screen'}
      >
        {children}
      </main>
    </>
  );
}
