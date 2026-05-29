import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './BecomeHostDiscounts.module.css';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';

const BecomeHostDiscounts = () => {
  const navigate = useNavigate();
  const [selectedDiscounts, setSelectedDiscounts] = useState(['early_bird']);
  const [discounts, setDiscounts] = useState([
    {
      id: 'early_bird',
      percent: 15,
      title: 'Early Bird Promotion',
      desc: 'Offer a discount for your first 3 bookings to get started fast.'
    },
    {
      id: 'last_minute',
      percent: 5,
      title: 'Last-minute deal',
      desc: 'For stays booked 7 days or less before arrival.'
    },
    {
      id: 'weekly',
      percent: 12,
      title: 'Weekly discount',
      desc: 'For stays of 7 nights or more.'
    },
    {
      id: 'monthly',
      percent: 25,
      title: 'Monthly discount',
      desc: 'For stays of 28 nights or more.'
    }
  ]);

  const toggleDiscount = (id) => {
    setSelectedDiscounts(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handlePercentChange = (id, newPercent) => {
    let val = parseInt(newPercent.replace(/[^0-9]/g, ''), 10);
    if (isNaN(val)) val = 0;
    if (val > 99) val = 99; // cap at 99%
    
    setDiscounts(prev => 
      prev.map(d => d.id === id ? { ...d, percent: val } : d)
    );
  };

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
      <button className={`${styles.sideArrow} ${styles.leftArrow}`} onClick={() => navigate('/become-a-host/price')}>
        <ChevronLeft size={28} />
      </button>

      {/* Next arrow */}
      <button 
        className={`${styles.sideArrow} ${styles.rightArrow}`} 
        onClick={() => navigate('/become-a-host/safety')} 
      >
        <ChevronRight size={28} />
      </button>

      <div className={styles.content}>
        <div className={styles.mainArea}>
          <div className={styles.headerText}>
            <h1 className={styles.title}>Offer special discounts</h1>
            <p className={styles.subtitle}>Help your place stand out and attract more guests.</p>
          </div>

          <div className={styles.discountsContainer}>
            {discounts.map((discount) => {
              const isSelected = selectedDiscounts.includes(discount.id);
              
              return (
                <div 
                  key={discount.id}
                  className={`${styles.discountCard} ${isSelected ? styles.selectedCard : ''}`}
                  onClick={() => toggleDiscount(discount.id)}
                >
                  <div className={styles.percentBoxWrapper} onClick={(e) => e.stopPropagation()}>
                    <input 
                      type="text" 
                      className={styles.percentInput} 
                      value={discount.percent === 0 ? '' : discount.percent}
                      onChange={(e) => handlePercentChange(discount.id, e.target.value)}
                    />
                    <span className={styles.percentSymbol}>%</span>
                  </div>
                  
                  <div className={styles.cardContent}>
                    <h3 className={styles.cardTitle}>{discount.title}</h3>
                    <p className={styles.cardDesc}>{discount.desc}</p>
                  </div>

                  <div className={`${styles.checkbox} ${isSelected ? styles.checkboxChecked : ''}`}>
                    {isSelected && <Check size={16} strokeWidth={3} color="white" />}
                  </div>
                </div>
              );
            })}
          </div>

          <p className={styles.footerNote}>Only one discount will be applied per stay. Guests get the best deal available.</p>
        </div>
      </div>
    </div>
  );
};

export default BecomeHostDiscounts;
