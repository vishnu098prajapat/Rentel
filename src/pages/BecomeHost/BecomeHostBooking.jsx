import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './BecomeHostBooking.module.css';
import { ChevronLeft, ChevronRight, ShieldCheck, Rocket } from 'lucide-react';

const BecomeHostBooking = () => {
  const navigate = useNavigate();
  const [bookingType, setBookingType] = useState('review');

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerLeft} onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <div className={styles.logoIcon}>
            <svg width="20" height="20" viewBox="0 0 32 32" fill="none"><path d="M16 2L2 12V30H12V20H20V30H30V12L16 2Z" fill="white"/></svg>
          </div>
          <span className={styles.logoText}>StayVista</span>
        </div>
      </header>

      {/* Back arrow */}
      <button className={`${styles.sideArrow} ${styles.leftArrow}`} onClick={() => navigate('/become-a-host/description')}>
        <ChevronLeft size={28} />
      </button>

      {/* Next arrow */}
      <button 
        className={`${styles.sideArrow} ${styles.rightArrow}`} 
        onClick={() => navigate('/become-a-host/price')} 
        disabled={!bookingType}
      >
        <ChevronRight size={28} />
      </button>

      <div className={styles.content}>
        <div className={styles.mainArea}>
          <div className={styles.headerText}>
            <h1 className={styles.title}>How do you want guests to book?</h1>
            <p className={styles.subtitle}>You can change this setting anytime.</p>
          </div>

          <div className={styles.optionsContainer}>
            {/* Option 1: Review First */}
            <div 
              className={`${styles.optionCard} ${bookingType === 'review' ? styles.selectedCard : ''}`}
              onClick={() => setBookingType('review')}
            >
              <div className={`${styles.cardIconWrapper} ${styles.blueIcon}`}>
                <ShieldCheck size={28} color="white" />
              </div>
              <div className={styles.cardContent}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.cardTitle}>Review every request</h3>
                  <span className={styles.recommendedBadge}>Recommended for beginners</span>
                </div>
                <p className={styles.cardDesc}>
                  You'll read the guest's message and check their profile before accepting their stay. Good for getting comfortable.
                </p>
              </div>
            </div>

            {/* Option 2: Instant */}
            <div 
              className={`${styles.optionCard} ${bookingType === 'instant' ? styles.selectedCard : ''}`}
              onClick={() => setBookingType('instant')}
            >
              <div className={`${styles.cardIconWrapper} ${styles.orangeIcon}`}>
                <Rocket size={28} color="white" />
              </div>
              <div className={styles.cardContent}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.cardTitle}>Instant Booking</h3>
                </div>
                <p className={styles.cardDesc}>
                  Guests can book immediately without waiting for your approval. This usually gets you more bookings, faster.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default BecomeHostBooking;
