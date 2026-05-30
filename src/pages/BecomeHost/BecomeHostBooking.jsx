import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateDraft } from '../../features/host/hostSlice';
import styles from './BecomeHostBooking.module.css';
import { ChevronLeft, ChevronRight, ShieldCheck, Rocket, Check, TrendingUp, CalendarDays } from 'lucide-react';

const BecomeHostBooking = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const draft = useSelector(state => state.host?.draftListing || {});

  const [bookingType, setBookingType] = useState(draft.bookingType || 'review');
  const [basePrice, setBasePrice] = useState(draft.price || 1800);
  const [weekendPct, setWeekendPct] = useState(draft.weekendPct || 5);
  const [selectedDiscounts, setSelectedDiscounts] = useState(draft.selectedDiscounts || ['early_bird']);
  const [discounts, setDiscounts] = useState(draft.customDiscounts || [
    { id: 'early_bird', percent: 15, title: 'Early Bird', desc: 'First 3 bookings' },
    { id: 'last_minute', percent: 5, title: 'Last-minute', desc: '7 days or less before arrival' },
    { id: 'weekly', percent: 12, title: 'Weekly', desc: '7 nights or more' },
    { id: 'monthly', percent: 25, title: 'Monthly', desc: '28 nights or more' }
  ]);

  const handlePriceChange = (e) => {
    const val = parseInt(e.target.value.replace(/[^0-9]/g, ''), 10);
    setBasePrice(isNaN(val) ? 0 : val);
  };

  const handlePctChange = (e) => {
    let val = parseInt(e.target.value.replace(/[^0-9-]/g, ''), 10);
    if (isNaN(val)) val = 0;
    setWeekendPct(val);
  };

  const toggleDiscount = (id) => {
    setSelectedDiscounts(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handlePercentChange = (id, newPercent) => {
    let val = parseInt(newPercent.replace(/[^0-9]/g, ''), 10);
    if (isNaN(val)) val = 0;
    if (val > 99) val = 99;
    setDiscounts(prev => prev.map(d => d.id === id ? { ...d, percent: val } : d));
  };

  const weekendPrice = Math.round(basePrice * (1 + (weekendPct / 100)));

  const handleNext = () => {
    dispatch(updateDraft({ bookingType, price: basePrice, weekendPct, selectedDiscounts, customDiscounts: discounts }));
    navigate('/become-a-host/final-details');
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
        <div className={styles.headerNav}>
          <button className={styles.navBtn} onClick={() => navigate('/become-a-host/title-desc')}>
            <ChevronLeft size={20} />
            <span>Back</span>
          </button>
          <button className={`${styles.navBtn} ${styles.navBtnNext}`} onClick={handleNext} disabled={basePrice <= 0}>
            <span>Next</span>
            <ChevronRight size={20} />
          </button>
        </div>
      </header>

      <div className={styles.content}>
        <div className={styles.headerText}>
          <h1 className={styles.title}>Pricing & Booking Settings</h1>
          <p className={styles.subtitle}>Set how guests book your place, your base price, and any special discounts.</p>
        </div>

        <div className={styles.mainArea}>
          <div className={styles.splitLayout}>
            
            <div className={styles.leftCol}>


              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Special Discounts</h2>
                <div className={styles.discountsList}>
                  {discounts.map(discount => {
                    const isSelected = selectedDiscounts.includes(discount.id);
                    return (
                      <div key={discount.id} className={`${styles.discountCard} ${isSelected ? styles.selectedCard : ''}`} onClick={() => toggleDiscount(discount.id)}>
                        <div className={styles.cardTopRow}>
                          <div className={styles.pctBox} onClick={e => e.stopPropagation()}>
                            <input type="text" className={styles.pctInputSmall} value={discount.percent === 0 ? '' : discount.percent} onChange={e => handlePercentChange(discount.id, e.target.value)} />
                            <span>%</span>
                          </div>
                          <div className={`${styles.checkbox} ${isSelected ? styles.checkboxActive : ''}`}>
                            {isSelected && <Check size={14} color="white" strokeWidth={3} />}
                          </div>
                        </div>
                        <div className={styles.discountInfo}>
                          <h3 className={styles.cardTitle}>{discount.title}</h3>
                          <p className={styles.cardDesc}>{discount.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className={styles.rightCol}>
              <div className={styles.premiumFormCard}>
                <h2 className={styles.sectionTitle} style={{ marginTop: 0 }}>Pricing Details</h2>
                <p className={styles.cardDesc} style={{ marginBottom: '24px' }}>Set your base price for your listing.</p>
                
                <div className={styles.priceContainer}>
                  <div className={styles.priceRow}>
                    <div className={styles.priceInfo}>
                      <h3 className={styles.cardTitle}>Base Price</h3>
                      <p className={styles.cardDesc}>Per night</p>
                    </div>
                    <div className={styles.inputWrapper}>
                      <span className={styles.prefix}>₹</span>
                      <input type="text" className={styles.priceInput} value={basePrice === 0 ? '' : basePrice} onChange={handlePriceChange} placeholder="0" />
                    </div>
                  </div>
                  
                  <div className={styles.priceRow}>
                    <div className={styles.priceInfo}>
                      <h3 className={styles.cardTitle}>Weekend adjustment</h3>
                      <p className={styles.cardDesc}>Fridays & Saturdays</p>
                    </div>
                    <div className={styles.inputWrapper}>
                      <input type="text" className={styles.pctInput} value={`${weekendPct > 0 ? '+' : ''}${weekendPct}`} onChange={handlePctChange} />
                      <span className={styles.suffix}>%</span>
                    </div>
                  </div>

                  <div className={styles.weekendResult}>
                    <div className={styles.resultIconWrapper}>
                      <TrendingUp size={18} color="white" />
                    </div>
                    <span>Guests pay <strong>₹{weekendPrice}</strong> on weekends</span>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default BecomeHostBooking;
