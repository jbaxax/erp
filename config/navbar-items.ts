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
    label: 'Users',
    icon: Users,
    href: '/users',
    requiredRoles: ['admin', 'manager'], // Solo admin y manager
  },
  {
    label: 'Inventory',
    icon: Package,
    href: '/inventory',
    requiredRoles: ['admin', 'manager', 'warehouse'], // Admin, manager y warehouse
  },
  {
    label: 'Sales',
    icon: ShoppingCart,
    href: '/sales',
    requiredRoles: ['admin', 'sales', 'manager'], // Admin, sales y manager
  },
  {
    label: 'Reports',
    icon: BarChart3,
    href: '/reports',
    requiredRoles: ['admin', 'manager'], // Solo admin y manager
  },
  {
    label: 'Billing',
    icon: FileText,
    href: '/billing',
    requiredRoles: ['admin', 'accounting'], // Admin y accounting
  },
  {
    label: 'Accounting',
    icon: Wallet,
    href: '/accounting',
    requiredRoles: ['admin', 'accounting'], // Admin y accounting
  },
  {
    label: 'Configuration',
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
