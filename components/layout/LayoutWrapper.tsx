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
 * Decides whether to show the Sidebar based on:
 * - If the user is authenticated
 * - If not on public routes (like /login or landing page)
 */
export function LayoutWrapper({ children }: LayoutWrapperProps) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const pathname = usePathname();

  // Routes where we DON'T want to show the Sidebar
  const publicRoutes = ['/', '/login', '/register', '/forgot-password'];
  const isPublicRoute = publicRoutes.includes(pathname);

  // Show Sidebar only if authenticated and NOT on a public route
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
