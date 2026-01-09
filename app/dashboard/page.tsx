'use client';

import { useAuthStore } from '@/store/useAuthStore';

/**
 * Main Dashboard Page
 * Visible to all authenticated users
 */
export default function DashboardPage() {
  const { user } = useAuthStore();

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to the ERP system, {user?.name}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Welcome Card */}
        <div className="rounded-lg border bg-card p-6">
          <h3 className="mb-2 text-lg font-semibold">👋 Welcome</h3>
          <p className="text-sm text-muted-foreground">
            This is your main dashboard. The sidebar shows only the modules you have access to.
          </p>
        </div>

        {/* Roles Card */}
        <div className="rounded-lg border bg-card p-6">
          <h3 className="mb-2 text-lg font-semibold">🎭 Your Roles</h3>
          <div className="flex flex-wrap gap-2">
            {user?.roles.map((role) => (
              <span
                key={role}
                className="rounded-md bg-primary px-3 py-1 text-sm font-medium text-primary-foreground"
              >
                {role}
              </span>
            ))}
          </div>
        </div>

        {/* Account Info Card */}
        <div className="rounded-lg border bg-card p-6">
          <h3 className="mb-2 text-lg font-semibold">📧 Your Account</h3>
          <p className="text-sm text-muted-foreground">{user?.email}</p>
          <p className="mt-1 text-xs text-muted-foreground">ID: {user?.id}</p>
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-8 rounded-lg border bg-muted p-6">
        <h3 className="mb-3 text-lg font-semibold">🚀 How the Sidebar Works</h3>
        <ul className="space-y-2 text-sm">
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            <span>The sidebar is automatically filtered based on your roles</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            <span>You'll only see the modules you have permission to access</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            <span>The active route is visually highlighted</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            <span>If you refresh the page, you'll remain authenticated (thanks to Zustand persist)</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
