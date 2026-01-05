import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  BarChart3,
  Settings,
  FileText,
  Wallet,
  type LucideIcon,
} from 'lucide-react';

/**
 * Tipo para un item de navegación
 */
export interface NavItem {
  label: string;
  icon: LucideIcon;
  href: string;
  requiredRoles: string[];
}

/**
 * Configuración de items del Sidebar
 * 
 * Cada item define:
 * - label: Texto visible del menú
 * - icon: Ícono de lucide-react
 * - href: Ruta de Next.js
 * - requiredRoles: Array de roles que pueden ver este item
 * 
 * Si requiredRoles está vacío [], todos los usuarios autenticados pueden verlo
 */
export const navbarItems: NavItem[] = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    href: '/',
    requiredRoles: [], // Todos los usuarios autenticados
  },
  {
    label: 'Usuarios',
    icon: Users,
    href: '/usuarios',
    requiredRoles: ['admin', 'manager'], // Solo admin y manager
  },
  {
    label: 'Inventario',
    icon: Package,
    href: '/inventario',
    requiredRoles: ['admin', 'manager', 'warehouse'], // Admin, manager y warehouse
  },
  {
    label: 'Ventas',
    icon: ShoppingCart,
    href: '/ventas',
    requiredRoles: ['admin', 'sales', 'manager'], // Admin, sales y manager
  },
  {
    label: 'Reportes',
    icon: BarChart3,
    href: '/reportes',
    requiredRoles: ['admin', 'manager'], // Solo admin y manager
  },
  {
    label: 'Facturación',
    icon: FileText,
    href: '/facturacion',
    requiredRoles: ['admin', 'accounting'], // Admin y accounting
  },
  {
    label: 'Contabilidad',
    icon: Wallet,
    href: '/contabilidad',
    requiredRoles: ['admin', 'accounting'], // Admin y accounting
  },
  {
    label: 'Configuración',
    icon: Settings,
    href: '/configuracion',
    requiredRoles: ['admin'], // Solo admin
  },
];

/**
 * Función helper para filtrar items según los roles del usuario
 * 
 * @param userRoles - Array de roles del usuario actual
 * @returns Array de items que el usuario puede ver
 */
export function getFilteredNavItems(userRoles: string[]): NavItem[] {
  return navbarItems.filter((item) => {
    // Si no requiere roles específicos, todos pueden verlo
    if (item.requiredRoles.length === 0) {
      return true;
    }
    
    // Verificar si el usuario tiene al menos uno de los roles requeridos
    return item.requiredRoles.some((requiredRole) =>
      userRoles.includes(requiredRole)
    );
  });
}
