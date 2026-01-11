'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/useAuthStore';
import { getFilteredNavItems } from '@/config/navbar-items';
import { Separator } from '@/components/ui/separator';
import { LogOut, User } from 'lucide-react';
import { useLogout } from '@/features/auth/hooks/useAuth';

/**
 * Sidebar Component
 * 
 * Características:
 * - Filtra items de navegación basándose en los roles del usuario
 * - Muestra el usuario actual
 * - Destaca la ruta activa
 * - Incluye botón de logout
 */
export function Sidebar() {
  const pathname = usePathname();
  const { user } = useAuthStore();
  const logoutMutation = useLogout();

  // Obtener items filtrados según los roles del usuario
  const filteredItems = getFilteredNavItems(user?.roles || []);

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r bg-background">
      <div className="flex h-full flex-col">
        {/* Header del Sidebar */}
        <div className="flex h-16 items-center border-b px-6">
          <h1 className="text-xl font-bold">ERP System</h1>
        </div>

        {/* Información del Usuario */}
        <div className="border-b p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <User className="h-5 w-5" />
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-medium">{user?.name}</p>
              <p className="truncate text-xs text-muted-foreground">
                {user?.email}
              </p>
            </div>
          </div>

          {/* Roles del usuario */}
          <div className="mt-2 flex flex-wrap gap-1">
            {user?.roles.map((role) => (
              <span
                key={role}
                className="rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground"
              >
                {role}
              </span>
            ))}
          </div>
        </div>

        {/* Navegación */}
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-1">
            {filteredItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground',
                      isActive
                        ? 'bg-accent text-accent-foreground'
                        : 'text-muted-foreground'
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer con Logout */}
        <div className="border-t p-4">
          <Separator className="mb-4" />
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-all hover:bg-destructive hover:text-destructive-foreground"
            disabled={logoutMutation.isPending}
          >
            <LogOut className="h-5 w-5" />
            <span>{logoutMutation.isPending ? 'Cerrando sesión...' : 'Cerrar sesión'}</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
