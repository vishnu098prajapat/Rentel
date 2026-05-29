import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateDraft } from '../../features/host/hostSlice';
import styles from './BecomeHostPrice.module.css';
import { ChevronLeft, ChevronRight, TrendingUp, CalendarDays } from 'lucide-react';

const BecomeHostPrice = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const draft = useSelector(state => state.host?.draftListing || {});
  
  const [basePrice, setBasePrice] = useState(draft.price || 1800);
  const [weekendPct, setWeekendPct] = useState(draft.weekendPct || 5);
  
  // Handlers for inputs
  const handlePriceChange = (e) => {
    const val = parseInt(e.target.value.replace(/[^0-9]/g, ''), 10);
    setBasePrice(isNaN(val) ? 0 : val);
  };

  const handlePctChange = (e) => {
    let val = parseInt(e.target.value.replace(/[^0-9-]/g, ''), 10);
    if (isNaN(val)) val = 0;
    setWeekendPct(val);
  };

  const weekendPrice = Math.round(basePrice * (1 + (weekendPct / 100)));

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
      <button className={`${styles.sideArrow} ${styles.leftArrow}`} onClick={() => navigate('/become-a-host/booking')}>
        <ChevronLeft size={28} />
      </button>

      {/* Next arrow */}
      <button 
        className={`${styles.sideArrow} ${styles.rightArrow}`} 
        onClick={() => {
          dispatch(updateDraft({ price: basePrice, weekendPct }));
          navigate('/become-a-host/discounts');
        }} 
        disabled={basePrice <= 0}
      >
        <ChevronRight size={28} />
      </button>

      <div className={styles.content}>
        <div className={styles.mainArea}>
          <div className={styles.headerText}>
            <h1 className={styles.title}>Now, set your price</h1>
            <p className={styles.subtitle}>You can change it anytime.</p>
          </div>

          <div className={styles.pricingContainer}>
            
            {/* Base Price Card */}
            <div className={styles.basePriceCard}>
              <p className={styles.cardLabel}>Base price (per night)</p>
              <div className={styles.priceInputWrapper}>
                <span className={styles.currencySymbol}>₹</span>
                <input
                  type="text"
                  className={styles.priceInput}
                  value={basePrice === 0 ? '' : basePrice}
                  onChange={handlePriceChange}
                  placeholder="00"
                />
              </div>
            </div>

            {/* Weekend Adjustment Card */}
            <div className={styles.weekendCard}>
              <div className={styles.weekendHeader}>
                <div className={styles.weekendTitleGroup}>
                  <TrendingUp size={24} className={styles.trendIcon} />
                  <div>
                    <h3 className={styles.weekendTitle}>Weekend adjustment</h3>
                    <p className={styles.weekendSubtitle}>Fridays, Saturdays, and Sundays</p>
                  </div>
                </div>
                
                <div className={styles.pctInputWrapper}>
                  <input
                    type="text"
                    className={styles.pctInput}
                    value={`${weekendPct > 0 ? '+' : ''}${weekendPct}`}
                    onChange={handlePctChange}
                  />
                  <span className={styles.pctSymbol}>%</span>
                </div>
              </div>

              <div className={styles.weekendResult}>
                <CalendarDays size={18} className={styles.calIcon} />
                <span className={styles.resultText}>
                  Guests will pay <strong>₹{weekendPrice}</strong> per night on weekends.
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default BecomeHostPrice;
