import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import HostSidebar from './HostSidebar';
import DashboardOverview from './DashboardOverview';
import styles from './HostDashboard.module.css';

import HostListings from './HostListings';
import HostBookings from './HostBookings';
import HostEarnings from './HostEarnings';
import HostInbox from './HostInbox';

const HostDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { isAuthenticated } = useSelector((state) => state.auth || { isAuthenticated: false });
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login?redirect=/hosting');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className={styles.contentArea}>
            <DashboardOverview />
          </div>
        );
      case 'listings':
        return (
          <div className={styles.contentArea}>
            <HostListings />
          </div>
        );
      case 'bookings':
        return (
          <div className={styles.contentArea}>
            <HostBookings />
          </div>
        );
      case 'earnings':
        return (
          <div className={styles.contentArea}>
            <HostEarnings />
          </div>
        );
      case 'inbox':
        return (
          <div className={styles.contentArea}>
            <HostInbox />
          </div>
        );
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className={styles.hostDashboard}>
      <div className={styles.dashboardContainer}>
        <HostSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        {renderContent()}
      </div>
    </div>
  );
};

export default HostDashboard;
