import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Package, 
  Users, 
  BarChart3, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  ShoppingCart,
  Tag,
  MessageSquare
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface SidebarItem {
  icon: React.ElementType;
  label: string;
  path: string;
  badge?: number;
}

const menuItems: SidebarItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
  { icon: BarChart3, label: 'Analytics', path: '/admin/analytics' },
  { icon: ShoppingBag, label: 'Orders', path: '/admin/orders', badge: 12 },
  { icon: Package, label: 'Products', path: '/admin/products' },
  { icon: Users, label: 'Customers', path: '/admin/customers' },
  { icon: Tag, label: 'Coupons', path: '/admin/coupons' },
  { icon: MessageSquare, label: 'Reviews', path: '/admin/reviews', badge: 5 },
  { icon: Settings, label: 'Settings', path: '/admin/settings' },
];

export const AdminSidebar = ({ isCollapsed, toggleSidebar }: { isCollapsed: boolean, toggleSidebar: () => void }) => {
  return (
    <aside className={cn(
      "h-screen bg-white border-r border-slate-200 transition-all duration-300 flex flex-col",
      isCollapsed ? "w-20" : "w-64"
    )}>
      <div className="p-6 flex items-center justify-between">
        {!isCollapsed && <span className="font-bold text-xl text-espresso tracking-tighter">LuxeBeauty Admin</span>}
        <button onClick={toggleSidebar} className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors">
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) => cn(
              "flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group",
              isActive ? "bg-champagne text-white shadow-md" : "text-slate-600 hover:bg-slate-50"
            )}
          >
            <item.icon size={22} />
            {!isCollapsed && (
              <>
                <span className="flex-1 font-medium">{item.label}</span>
                {item.badge && (
                  <span className="bg-espresso text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};
