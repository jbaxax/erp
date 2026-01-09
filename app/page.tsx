'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

/**
 * Landing Page
 * Public page showcasing the ERP system for recruiters
 */
export default function LandingPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();

  // Auto-redirect authenticated users to dashboard
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  // Don't show landing page content if user is authenticated
  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-4xl w-full text-center space-y-8">
          {/* Logo/Badge */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <svg
              className="w-8 h-8 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </div>

          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Enterprise Resource Planning
              <span className="block text-primary mt-2">Made Simple</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A modern, role-based ERP system built with Next.js, React Query, and Zustand.
              Featuring authentication, state management, and API simulation.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link href="/login">
              <Button size="lg" className="min-w-[200px]">
                Access Dashboard
              </Button>
            </Link>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" variant="outline" className="min-w-[200px]">
                View on GitHub
              </Button>
            </a>
          </div>

          {/* Tech Stack */}
          <div className="pt-12 border-t">
            <p className="text-sm text-muted-foreground mb-4">Built with modern technologies</p>
            <div className="flex flex-wrap gap-3 justify-center items-center">
              {[
                'Next.js 14',
                'React 19',
                'TypeScript',
                'TanStack Query',
                'Zustand',
                'MSW',
                'Tailwind CSS',
                'Radix UI'
              ].map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 rounded-full bg-muted text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 pt-12">
            <div className="p-6 rounded-lg border bg-card">
              <div className="text-3xl mb-3">🔐</div>
              <h3 className="font-semibold mb-2">Role-Based Access</h3>
              <p className="text-sm text-muted-foreground">
                Secure authentication with role-based permissions and route protection
              </p>
            </div>
            <div className="p-6 rounded-lg border bg-card">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="font-semibold mb-2">State Management</h3>
              <p className="text-sm text-muted-foreground">
                Optimized with Zustand for auth and React Query for server state
              </p>
            </div>
            <div className="p-6 rounded-lg border bg-card">
              <div className="text-3xl mb-3">🎨</div>
              <h3 className="font-semibold mb-2">Modern UI</h3>
              <p className="text-sm text-muted-foreground">
                Beautiful, responsive interface built with Tailwind CSS and Radix UI
              </p>
            </div>
          </div>

          {/* Demo Credentials */}
          <div className="pt-8">
            <div className="inline-block bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-6 text-left">
              <p className="font-semibold text-sm mb-3 text-blue-900 dark:text-blue-100">
                Demo Credentials
              </p>
              <div className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
                <p>
                  <strong>Admin:</strong> admin@erp.com / admin
                </p>
                <p>
                  <strong>Sales:</strong> vendedor@erp.com / sales
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t py-6 px-4">
        <div className="max-w-4xl mx-auto text-center text-sm text-muted-foreground">
          <p>Built as a portfolio project showcasing modern React patterns and best practices</p>
        </div>
      </footer>
    </div>
  );
}
