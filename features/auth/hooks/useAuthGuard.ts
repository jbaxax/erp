import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';

// Routes that do NOT require authentication
const PUBLIC_ROUTES = ['/', '/login', '/register', '/forgot-password'];

/**
 * Hook to protect routes and handle BFCache (Back/Forward Cache)
 * 
 * This hook acts as a client-side gatekeeper:
 * 1. Checks if the user is authenticated for protected routes.
 * 2. Handles the browser's "Back" button cache to prevent showing stale protected pages.
 * 3. Returns a loading state while checking to avoid layout flashes.
 */
export function useAuthGuard() {
    const { isAuthenticated } = useAuthStore();
    const router = useRouter();
    const pathname = usePathname();
    const [isClient, setIsClient] = useState(false);

    const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

    // 1. Hydration fix (ensure we are on client)
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
            // Note: we exclude '/' if it's the landing page, but usually '/' redirects to dashboard too if auth.
            // Assuming '/' is public landing. If '/' should also redirect, remove the pathname check.
            // Given the user flow, if they go back to '/login', they should go to '/dashboard'.
            if (pathname === '/login' || pathname === '/register') {
                router.replace('/dashboard');
            }
        }

        // Check 3: BFCache Invalidation (The "Back Button" Fix)
        // We listen on ALL routes. If I am on /login and I come back from a protected route, 
        // I want to reload so the Middleware kicks me back to Dashboard if I have a cookie.
        const handlePageShow = (event: PageTransitionEvent) => {
            // If the page is being restored from the BFCache (e.g. Back button)
            if (event.persisted) {
                window.location.reload();
            }
        };

        window.addEventListener('pageshow', handlePageShow);
        return () => window.removeEventListener('pageshow', handlePageShow);
    }, [isClient, isAuthenticated, isPublicRoute, router]);

    // Return "shouldRender" - true if safe to show content
    // We show content if:
    // 1. It's a public route
    // 2. OR user is authenticated
    const shouldRender = isPublicRoute || isAuthenticated;

    // Don't render anything until client-side hydration is complete to avoid mismatches
    if (!isClient) return false;

    return shouldRender;
}
