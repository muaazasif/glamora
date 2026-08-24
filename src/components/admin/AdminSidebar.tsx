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
  Tag,
  MessageSquare
} from 'lucide-react';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../../lib/supabase';
import styles from '../../styles/components/AdminSidebar.module.css';

interface SidebarItem {
  icon: React.ElementType;
  label: string;
  path: string;
  badge?: number;
}

export const AdminSidebar = ({ isCollapsed, toggleSidebar }: { isCollapsed: boolean, toggleSidebar: () => void }) => {
  const { data: orders } = useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const { data } = await supabase.from('orders').select('status');
      return data || [];
    }
  });

  const pendingOrders = orders?.filter(o => o.status === 'Pending').length || 0;

  const menuItems: SidebarItem[] = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
    { icon: BarChart3, label: 'Analytics', path: '/admin/analytics' },
    { icon: ShoppingBag, label: 'Orders', path: '/admin/orders', badge: pendingOrders },
    { icon: Package, label: 'Products', path: '/admin/products' },
    { icon: Users, label: 'Customers', path: '/admin/customers' },
    { icon: Tag, label: 'Coupons', path: '/admin/coupons' },
    { icon: MessageSquare, label: 'Reviews', path: '/admin/reviews', badge: 5 },
    { icon: Settings, label: 'Settings', path: '/admin/settings' },
  ];

  return (
    <>
      <aside className={`${styles.sidebar} ${isCollapsed ? styles.sidebarCollapsed : styles.sidebarExpanded}`}>
        <div className={styles.header}>
          {!isCollapsed && <span className={styles.brandName}>LuxeBeauty Admin</span>}
          <button onClick={toggleSidebar} className={styles.toggleButton}>
            {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        <nav className={styles.nav}>
          {menuItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) => 
                `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
              }
            >
              <item.icon size={22} />
              {!isCollapsed && (
                <>
                  <span style={{flex: 1, fontWeight: 500}}>{item.label}</span>
                  {item.badge && item.badge > 0 && (
                    <span className={styles.badge}>
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </aside>
      
      {!isCollapsed && (
        <div className={styles.mobileOverlay} onClick={toggleSidebar}></div>
      )}
    </>
  );
};
