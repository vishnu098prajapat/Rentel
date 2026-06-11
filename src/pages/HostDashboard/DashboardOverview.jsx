import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, CalendarCheck, IndianRupee, MessageCircle, ArrowRight, User, Bell, PlusCircle } from 'lucide-react';
import styles from './HostDashboard.module.css';

const DashboardOverview = () => {
  const navigate = useNavigate();

  const upcomingGuests = [
    { id: 1, name: 'Rahul Sharma', property: 'Sunset Villa', dates: 'Today · 3 Nights', status: 'Arriving Soon' },
    { id: 2, name: 'Priya Patel', property: 'Cozy PG (Single Room)', dates: 'Tomorrow · 1 Month', status: 'Confirmed' },
    { id: 3, name: 'Aman Singh', property: 'Downtown Studio', dates: 'Oct 24 - Oct 26', status: 'Confirmed' },
  ];

  const pendingTasks = [
    { id: 1, title: 'New booking request', desc: 'Neha Gupta requested Downtown Studio for Oct 28.', time: '2 hours ago' },
    { id: 2, title: 'Review guest', desc: 'Leave a review for Vikram from your previous booking.', time: '1 day ago' },
  ];

  return (
    <div className={styles.overviewContainer}>
      <div className={styles.headerRow}>
        <h1 className={styles.pageTitle}>Welcome back, Host!</h1>
        <button className={styles.createBtn} onClick={() => navigate('/become-a-host/profile')}>
          <PlusCircle size={16} />
          <span>Create Listing</span>
        </button>
      </div>

      {/* KPI Stats Grid */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIconWrapper} style={{ backgroundColor: '#FFE4E6', color: '#FF385C' }}>
            <Home size={24} />
          </div>
          <div className={styles.statInfo}>
            <p className={styles.statLabel}>Active Properties</p>
            <h3 className={styles.statValue}>4</h3>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIconWrapper} style={{ backgroundColor: '#E0E7FF', color: '#4F46E5' }}>
            <CalendarCheck size={24} />
          </div>
          <div className={styles.statInfo}>
            <p className={styles.statLabel}>Upcoming Bookings</p>
            <h3 className={styles.statValue}>12</h3>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIconWrapper} style={{ backgroundColor: '#DCFCE7', color: '#16A34A' }}>
            <IndianRupee size={24} />
          </div>
          <div className={styles.statInfo}>
            <p className={styles.statLabel}>Monthly Earnings</p>
            <h3 className={styles.statValue}>₹45,200</h3>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIconWrapper} style={{ backgroundColor: '#FEF9C3', color: '#CA8A04' }}>
            <MessageCircle size={24} />
          </div>
          <div className={styles.statInfo}>
            <p className={styles.statLabel}>Unread Messages</p>
            <h3 className={styles.statValue}>3</h3>
          </div>
        </div>
      </div>

      <div className={styles.dashboardGrid}>
        {/* Upcoming Arrivals */}
        <div className={styles.panelCard}>
          <div className={styles.panelHeader}>
            <h3 className={styles.panelTitle}>Upcoming Arrivals</h3>
            <button className={styles.viewAllBtn}>View Calendar</button>
          </div>
          <div className={styles.guestList}>
            {upcomingGuests.map(guest => (
              <div key={guest.id} className={styles.guestItem}>
                <div className={styles.guestAvatar}>
                  <User size={20} />
                </div>
                <div className={styles.guestDetails}>
                  <h4 className={styles.guestName}>{guest.name}</h4>
                  <p className={styles.guestProperty}>{guest.property}</p>
                </div>
                <div className={styles.guestMeta}>
                  <span className={styles.guestDates}>{guest.dates}</span>
                  <span className={`${styles.guestStatus} ${guest.status === 'Arriving Soon' ? styles.statusHighlight : ''}`}>
                    {guest.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Tasks */}
        <div className={styles.panelCard}>
          <div className={styles.panelHeader}>
            <h3 className={styles.panelTitle}>Pending Tasks</h3>
          </div>
          <div className={styles.taskList}>
            {pendingTasks.map(task => (
              <div key={task.id} className={styles.taskItem}>
                <div className={styles.taskIcon}>
                  <Bell size={18} />
                </div>
                <div className={styles.taskDetails}>
                  <h4 className={styles.taskTitle}>{task.title}</h4>
                  <p className={styles.taskDesc}>{task.desc}</p>
                  <span className={styles.taskTime}>{task.time}</span>
                </div>
                <button className={styles.taskActionBtn}>
                  <ArrowRight size={16} />
                </button>
              </div>
            ))}
            {pendingTasks.length === 0 && (
              <div className={styles.emptyState}>
                <p>You're all caught up!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
