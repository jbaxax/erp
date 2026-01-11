'use client';

import { useAuthStore } from '@/store/useAuthStore';
import { Sidebar } from '@/components/layout/Sidebar';
import { usePathname } from 'next/navigation';
import { useAuthGuard } from '@/features/auth/hooks/useAuthGuard';

interface LayoutWrapperProps {
  children: React.ReactNode;
}

/**
 * Layout Wrapper & Auth Guard
 * 
 * - Handles Sidebar visibility.
 * - PROTECTS routes using useAuthGuard.
 */
export function LayoutWrapper({ children }: LayoutWrapperProps) {
  const { isAuthenticated } = useAuthStore();
  const pathname = usePathname();

  // Use the Custom Hook for protection
  const canRender = useAuthGuard();

  // Routes where we DON'T want to show the Sidebar
  const publicRoutes = ['/', '/login', '/register', '/forgot-password'];
  const isPublicRoute = publicRoutes.includes(pathname);

  // Show Sidebar only if authenticated and NOT on a public route
  const showSidebar = isAuthenticated && !isPublicRoute;

  // Prevent flash of protected content if guard says no
  if (!canRender) {
    return null;
  }

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
