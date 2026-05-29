import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ProfileSidebar from './ProfileSidebar';
import ProfileDetails from './ProfileDetails';
import styles from './UserProfile.module.css';

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const { isAuthenticated, user } = useSelector((state) => state.auth || { isAuthenticated: false });
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login?redirect=/profile');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null; 

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileDetails user={user} />;
      case 'trips':
        return (
          <div className={styles.contentArea}>
            <div className={styles.sectionCard}>
              <h3 className={styles.sectionTitle}>Upcoming Trips</h3>
              <div style={{ display: 'flex', gap: '20px', flexDirection: 'column' }}>
                <div style={{ display: 'flex', gap: '16px', border: '1px solid #EBEBEB', borderRadius: '12px', padding: '16px', alignItems: 'center' }}>
                  <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400" alt="Villa" style={{ width: '120px', height: '90px', borderRadius: '8px', objectFit: 'cover' }} />
                  <div style={{ flex: 1 }}>
                    <h4 style={{ margin: '0 0 4px 0', fontSize: '16px', color: '#222' }}>Luxury Heritage Villa</h4>
                    <p style={{ margin: '0 0 8px 0', fontSize: '13px', color: '#717171' }}>Jaipur, Rajasthan</p>
                    <span style={{ fontSize: '12px', background: '#F0F0F0', padding: '4px 8px', borderRadius: '4px', color: '#222', fontWeight: 600 }}>Oct 15 - Oct 18, 2026</span>
                  </div>
                  <button className={styles.btnSecondary}>View Details</button>
                </div>
              </div>
            </div>
            
            <div className={styles.sectionCard}>
              <h3 className={styles.sectionTitle}>Past Trips</h3>
              <p style={{ color: '#717171', fontSize: '14px' }}>You have no past trips.</p>
            </div>
          </div>
        );
      case 'wishlists':
        return (
          <div className={styles.contentArea}>
            <div className={styles.sectionCard}>
              <h3 className={styles.sectionTitle}>My Wishlists</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px' }}>
                {/* Dummy Wishlist Card 1 */}
                <div style={{ border: '1px solid #EBEBEB', borderRadius: '12px', overflow: 'hidden' }}>
                  <img src="https://images.unsplash.com/photo-1542314831-c6a4d14d8857?w=400" alt="Goa Stays" style={{ width: '100%', height: '160px', objectFit: 'cover' }} />
                  <div style={{ padding: '16px' }}>
                    <h4 style={{ margin: '0 0 4px 0', fontSize: '15px' }}>Goa Getaways</h4>
                    <p style={{ margin: 0, fontSize: '13px', color: '#717171' }}>3 saved properties</p>
                  </div>
                </div>
                {/* Dummy Wishlist Card 2 */}
                <div style={{ border: '1px solid #EBEBEB', borderRadius: '12px', overflow: 'hidden' }}>
                  <img src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400" alt="Beachfront" style={{ width: '100%', height: '160px', objectFit: 'cover' }} />
                  <div style={{ padding: '16px' }}>
                    <h4 style={{ margin: '0 0 4px 0', fontSize: '15px' }}>Beachfront Villas</h4>
                    <p style={{ margin: 0, fontSize: '13px', color: '#717171' }}>5 saved properties</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className={styles.contentArea}>
            <div className={styles.sectionCard}>
              <h3 className={styles.sectionTitle}>Notifications</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', color: '#222' }}>Email Notifications</h4>
                    <p style={{ margin: 0, fontSize: '12px', color: '#717171' }}>Receive updates about bookings and offers.</p>
                  </div>
                  <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px', cursor: 'pointer' }} />
                </div>
                <div style={{ height: '1px', background: '#EBEBEB' }}></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', color: '#222' }}>SMS Alerts</h4>
                    <p style={{ margin: 0, fontSize: '12px', color: '#717171' }}>Receive text messages for check-in info.</p>
                  </div>
                  <input type="checkbox" style={{ width: '18px', height: '18px', cursor: 'pointer' }} />
                </div>
              </div>
            </div>

            <div className={styles.sectionCard}>
              <h3 className={styles.sectionTitle} style={{ color: '#E31C5F' }}>Danger Zone</h3>
              <p style={{ fontSize: '13px', color: '#717171', marginBottom: '16px' }}>
                Once you delete your account, there is no going back. Please be certain.
              </p>
              <button style={{ padding: '8px 16px', background: 'transparent', border: '1px solid #E31C5F', color: '#E31C5F', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
                Delete Account
              </button>
            </div>
          </div>
        );
      default:
        return <ProfileDetails user={user} />;
    }
  };

  return (
    <div className={styles.profilePage}>
      <div className={styles.profileContainer}>
        <ProfileSidebar activeTab={activeTab} setActiveTab={setActiveTab} user={user} />
        {renderContent()}
      </div>
    </div>
  );
};

export default UserProfile;
