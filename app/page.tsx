'use client';

import { useAuthStore } from '@/store/useAuthStore';

/**
 * Dashboard principal
 * Visible para todos los usuarios autenticados
 */
export default function DashboardPage() {
  const { user } = useAuthStore();

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Bienvenido al sistema ERP, {user?.name}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Card de bienvenida */}
        <div className="rounded-lg border bg-card p-6">
          <h3 className="mb-2 text-lg font-semibold">👋 Bienvenido</h3>
          <p className="text-sm text-muted-foreground">
            Este es tu dashboard principal. El sidebar muestra solo los módulos a los que tienes acceso.
          </p>
        </div>

        {/* Card de roles */}
        <div className="rounded-lg border bg-card p-6">
          <h3 className="mb-2 text-lg font-semibold">🎭 Tus Roles</h3>
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

        {/* Card de información */}
        <div className="rounded-lg border bg-card p-6">
          <h3 className="mb-2 text-lg font-semibold">📧 Tu Cuenta</h3>
          <p className="text-sm text-muted-foreground">{user?.email}</p>
          <p className="mt-1 text-xs text-muted-foreground">ID: {user?.id}</p>
        </div>
      </div>

      {/* Instrucciones */}
      <div className="mt-8 rounded-lg border bg-muted p-6">
        <h3 className="mb-3 text-lg font-semibold">🚀 Cómo funciona el Sidebar</h3>
        <ul className="space-y-2 text-sm">
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            <span>El sidebar se filtra automáticamente según tus roles</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            <span>Solo verás los módulos para los que tienes permiso</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            <span>La ruta activa se destaca visualmente</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            <span>Si refrescas la página, seguirás autenticado (gracias a Zustand persist)</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
