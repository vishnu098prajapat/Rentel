import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './HostTabs.module.css';

const dummyListings = [
  {
    id: 1,
    title: 'Royal Heritage Villa with Pool',
    location: 'Goa, India',
    price: '₹12,000',
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    title: 'Minimalist Studio near Beach',
    location: 'Mumbai, India',
    price: '₹4,500',
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 3,
    title: 'Himalayan Retreat Cabin',
    location: 'Manali, India',
    price: '₹6,000',
    status: 'Draft',
    image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800&q=80'
  }
];

const HostListings = () => {
  const navigate = useNavigate();
  const { myListings } = useSelector(state => state.host || { myListings: [] });
  
  // Combine user created listings with dummy ones for display if needed, or just show users
  const displayListings = [...myListings, ...dummyListings];

  return (
    <div>
      <div className={styles.tabHeader}>
        <div>
          <h1 className={styles.pageTitle}>My Listings</h1>
          <p className={styles.pageSubtitle}>Manage your active properties and drafts.</p>
        </div>
        <button className={styles.actionBtn} onClick={() => navigate('/become-a-host/profile')}>+ Create New Listing</button>
      </div>

      <div className={styles.listingsGrid}>
        {displayListings.map(listing => (
          <div 
            key={listing.id} 
            className={styles.listingCard} 
            onClick={() => navigate(`/property/${listing.id}`)}
            style={{ cursor: 'pointer' }}
          >
            <img src={listing.images && listing.images.length > 0 ? listing.images[0] : listing.image} alt={listing.title} className={styles.listingImage} />
            <div className={styles.listingInfo}>
              <h3 className={styles.listingTitle}>{listing.title}</h3>
              <p className={styles.listingLocation}>
                {listing.location || (listing.address ? `${listing.address.flat ? listing.address.flat + ', ' : ''}${listing.address.street ? listing.address.street + ', ' : ''}${listing.address.city ? listing.address.city + ', ' : ''}${listing.address.country || ''}`.replace(/,\s*$/, "") : 'Unknown Location')}
              </p>
              {listing.isBusiness !== undefined && (
                <p style={{ fontSize: '12px', color: '#717171', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  {listing.isBusiness ? '🏢 Business Host' : '👤 Individual Host'}
                </p>
              )}
              
              <div className={styles.listingFooter}>
                <span className={styles.listingPrice}>{listing.price ? `₹${listing.price}` : '₹0'} <span style={{fontWeight: 400, color: '#717171'}}>/ night</span></span>
                <span className={`${styles.statusBadge} ${listing.status === 'Draft' ? styles.statusDraft : styles.statusActive}`}>
                  {listing.status || 'Active'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HostListings;
