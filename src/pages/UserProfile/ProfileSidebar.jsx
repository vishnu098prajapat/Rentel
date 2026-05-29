import React from 'react';
import { User, Map, Heart, Settings } from 'lucide-react';
import styles from './UserProfile.module.css';

const ProfileSidebar = ({ activeTab, setActiveTab, user }) => {
  const tabs = [
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'trips', label: 'My Trips', icon: Map },
    { id: 'wishlists', label: 'Wishlists', icon: Heart },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const getInitial = () => {
    if (user && user.firstName) return user.firstName.charAt(0);
    if (user && user.email) return user.email.charAt(0).toUpperCase();
    return 'U';
  };

  const getFullName = () => {
    if (user && user.firstName && user.lastName) return `${user.firstName} ${user.lastName}`;
    if (user && user.firstName) return user.firstName;
    return 'User Account';
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <div className={styles.avatar}>
          {getInitial()}
        </div>
        <div>
          <h2 className={styles.userName}>{getFullName()}</h2>
          <p className={styles.userEmail}>{user?.email || 'user@example.com'}</p>
        </div>
      </div>
      
      <div className={styles.navMenu}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`${styles.navItem} ${activeTab === tab.id ? styles.activeNavItem : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <tab.icon size={16} />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProfileSidebar;
