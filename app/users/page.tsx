'use client';

import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';


export default function UsersPage() {
  const { user, isAuthenticated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    // Redirigir si no está autenticado
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    // Verificar si tiene permisos
    const hasPermission = user?.roles.some((role) =>
      ['admin', 'manager'].includes(role)
    );

    if (!hasPermission) {
      router.push('/');
    }
  }, [isAuthenticated, user, router]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Gestión de Usuarios</h1>
        <p className="text-muted-foreground">
          Administra los usuarios del sistema
        </p>
      </div>

      <div className="rounded-lg border bg-card p-6">
        <p className="text-sm text-muted-foreground">
          Esta página solo es visible para usuarios con rol <strong>admin</strong> o <strong>manager</strong>.
        </p>
        
        <div className="mt-4">
          <p className="text-sm">
            <strong>Usuario actual:</strong> {user?.name}
          </p>
          <p className="text-sm">
            <strong>Roles:</strong> {user?.roles.join(', ')}
          </p>
        </div>
      </div>
    </div>
  );
}
