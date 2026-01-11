import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import Cookies from 'js-cookie';

// Routes that do NOT require authentication
const PUBLIC_ROUTES = ['/', '/login', '/register', '/forgot-password'];

/**
 * Hook to protect routes and handle BFCache (Back/Forward Cache)
 */
export function useAuthGuard() {
    const { isAuthenticated } = useAuthStore();
    const router = useRouter();
    const pathname = usePathname();
    const [isClient, setIsClient] = useState(false);

    const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

    // 1. Hydration fix
    useEffect(() => {
        setIsClient(true);
    }, []);

    // 2. Auth Check & BFCache Handler
    useEffect(() => {
        if (!isClient) return;

        // Check 1: Standard Redirect (Unauthenticated -> Login)
        if (!isAuthenticated && !isPublicRoute) {
            router.replace('/login');
        }

        // Check 2: Inverse Redirect (Authenticated -> Dashboard)
        // If I am already logged in and try to go to /login, send me back to dashboard
        if (isAuthenticated && isPublicRoute && pathname !== '/') {
            if (pathname === '/login' || pathname === '/register') {
                router.replace('/dashboard');
            }
        }

        // Check 3: BFCache Invalidation
        const handlePageShow = (event: PageTransitionEvent) => {
            // Only reload if restoring from cache AND we might have a session
            if (event.persisted && (isAuthenticated || Cookies.get('auth-token'))) {
                window.location.reload();
            }
        };

        window.addEventListener('pageshow', handlePageShow);
        return () => window.removeEventListener('pageshow', handlePageShow);
    }, [isClient, isAuthenticated, isPublicRoute, router, pathname]);

    // Return "shouldRender"
    const showContent = isPublicRoute || isAuthenticated;

    // Don't render anything until client-side hydration is complete to avoid mismatches
    if (!isClient) return false;

    return showContent;
}
