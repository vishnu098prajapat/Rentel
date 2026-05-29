import React, { useState, useEffect } from 'react';
import { LayoutDashboard, List, CalendarCheck, TrendingUp, MessageSquare, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import styles from './HostDashboard.module.css';

const HostSidebar = ({ activeTab, setActiveTab }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 900);
      if (window.innerWidth <= 900) setIsCollapsed(false);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const navItems = [
    { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'listings', label: 'My Listings', icon: List },
    { id: 'bookings', label: 'Bookings', icon: CalendarCheck },
    { id: 'inbox', label: 'Inbox', icon: MessageSquare }
  ];

  return (
    <div className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ''}`}>
      <div className={styles.sidebarHeader}>
        {(!isCollapsed || isMobile) && <span className={styles.sidebarTitle}>Host Center</span>}
        {!isMobile && (
          <button 
            className={styles.collapseToggle} 
            onClick={() => setIsCollapsed(!isCollapsed)}
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? <PanelLeftOpen size={20} /> : <PanelLeftClose size={20} />}
          </button>
        )}
      </div>
      
      <div className={styles.navMenu}>
        {navItems.map(item => (
          <button
            key={item.id}
            className={`${styles.navItem} ${activeTab === item.id ? styles.activeNavItem : ''} ${isCollapsed ? styles.navItemCollapsed : ''}`}
            onClick={() => setActiveTab(item.id)}
            title={isCollapsed ? item.label : ""}
          >
            <item.icon size={18} />
            {(!isCollapsed || isMobile) && <span>{item.label}</span>}
          </button>
        ))}
      </div>
    </div>
  );
};

export default HostSidebar;
