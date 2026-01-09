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
 * Navigation Item Configuration
 * 
 * Each item defines:
 * - label: Visible menu text
 * - icon: Lucide icon
 * - href: Next.js route
 * - requiredRoles: Array of roles that can see this item
 * 
 * If requiredRoles is empty [], all authenticated users can see it
 */

export interface NavItem {
  label: string;
  icon: LucideIcon;
  href: string;
  requiredRoles: string[];
}

export const navbarItems: NavItem[] = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    href: '/dashboard',
    requiredRoles: [], // All authenticated users
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
    href: '/settings',
    requiredRoles: ['admin'], // Only admin
  },
];

/**
 * Helper function to filter items based on user roles
 * 
 * @param userRoles - Array of roles for the current user
 * @returns Array of items the user can see
 */
export function getFilteredNavItems(userRoles: string[]): NavItem[] {
  return navbarItems.filter((item) => {
    // If no specific roles required, everyone can see it
    if (item.requiredRoles.length === 0) {
      return true;
    }

    // Check if user has at least one of the required roles
    return item.requiredRoles.some((requiredRole) =>
      userRoles.includes(requiredRole)
    );
  });
}
