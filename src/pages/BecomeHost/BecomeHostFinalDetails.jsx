import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateDraft, publishListing } from '../../features/host/hostSlice';
import styles from './BecomeHostFinalDetails.module.css';
import { ChevronLeft, Lock, Check } from 'lucide-react';

const BecomeHostFinalDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const draft = useSelector(state => state.host?.draftListing || {});
  
  const [address, setAddress] = useState({
    country: draft.address?.country || 'India',
    flat: draft.address?.flat || '',
    street: draft.address?.street || '',
    landmark: draft.address?.landmark || '',
    city: draft.address?.city || '',
    state: draft.address?.state || '',
    pincode: draft.address?.pincode || ''
  });

  const [isBusiness, setIsBusiness] = useState(draft.isBusiness ?? null);
  const [showCelebration, setShowCelebration] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress(prev => ({ ...prev, [name]: value }));
  };

  const handleFinish = () => {
    dispatch(updateDraft({ address, isBusiness }));
    dispatch(publishListing());
    setShowCelebration(true);
    // Wait for 3 seconds so user can see the celebration, then redirect to Dashboard
    setTimeout(() => {
      navigate('/hosting'); // Redirect to Host Dashboard
    }, 3000);
  };

  const isFormValid = address.city && isBusiness !== null;

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
      <button className={`${styles.sideArrow} ${styles.leftArrow}`} onClick={() => navigate('/become-a-host/safety')}>
        <ChevronLeft size={28} />
      </button>

      <div className={styles.content}>
        <div className={styles.mainArea}>
          
          <div className={styles.headerText}>
            <h1 className={styles.title}>Just a few final details</h1>
            <p className={styles.subtitle}>We need this to verify your identity and keep the community secure.</p>
          </div>

          {/* Address Section */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <div>
                <h3 className={styles.sectionTitle}>Your home address</h3>
                <p className={styles.sectionSubtitle}>Guests won't see this information.</p>
              </div>
              <Lock size={18} className={styles.lockIcon} />
            </div>

            <div className={styles.formGrid}>
              <div className={`${styles.inputGroup} ${styles.colSpan3}`}>
                <label>Country / Region</label>
                <select name="country" value={address.country} onChange={handleChange} className={styles.input}>
                  <option value="India">India</option>
                  <option value="US">United States</option>
                  <option value="UK">United Kingdom</option>
                </select>
              </div>

              <div className={`${styles.inputGroup} ${styles.colSpan3}`}>
                <label>Flat, house, or building</label>
                <input type="text" name="flat" value={address.flat} onChange={handleChange} className={styles.input} placeholder="e.g. Apt 4B" />
              </div>

              <div className={`${styles.inputGroup} ${styles.colSpan3}`}>
                <label>Street address</label>
                <input type="text" name="street" value={address.street} onChange={handleChange} className={styles.input} placeholder="Main Street" />
              </div>

              <div className={`${styles.inputGroup} ${styles.colSpan3}`}>
                <label>Nearby landmark (optional)</label>
                <input type="text" name="landmark" value={address.landmark} onChange={handleChange} className={styles.input} placeholder="Near City Mall" />
              </div>

              <div className={`${styles.inputGroup} ${styles.colSpan2}`}>
                <label>City</label>
                <input type="text" name="city" value={address.city} onChange={handleChange} className={styles.input} placeholder="Mumbai" />
              </div>

              <div className={`${styles.inputGroup} ${styles.colSpan2}`}>
                <label>State</label>
                <input type="text" name="state" value={address.state} onChange={handleChange} className={styles.input} placeholder="Maharashtra" />
              </div>

              <div className={`${styles.inputGroup} ${styles.colSpan2}`}>
                <label>PIN Code</label>
                <input type="text" name="pincode" value={address.pincode} onChange={handleChange} className={styles.input} placeholder="400001" />
              </div>
            </div>
          </div>

          <div className={styles.divider}></div>

          {/* Business Section */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <div>
                <h3 className={styles.sectionTitle}>Are you hosting as a business?</h3>
                <p className={styles.sectionSubtitle}>Select 'Yes' if you are a registered company or professional host.</p>
              </div>
            </div>

            <div className={styles.businessOptions}>
              <button 
                className={`${styles.businessBtn} ${isBusiness === true ? styles.businessBtnActive : ''}`}
                onClick={() => setIsBusiness(true)}
              >
                Yes, I'm a business
              </button>
              <button 
                className={`${styles.businessBtn} ${isBusiness === false ? styles.businessBtnActive : ''}`}
                onClick={() => setIsBusiness(false)}
              >
                No, I'm an individual
              </button>
            </div>
            
            <button 
              className={styles.finishBtn} 
              disabled={!isFormValid}
              onClick={handleFinish}
            >
              Finish Setup
            </button>
          </div>

        </div>
      </div>

      {showCelebration && (
        <div className={styles.celebrationOverlay}>
          <div className={styles.celebrationContent}>
            <div className={styles.successIconWrapper}>
              <Check size={40} color="white" strokeWidth={3} />
            </div>
            <h1 className={styles.celebrationTitle}>Congratulations!</h1>
            <p className={styles.celebrationSubtitle}>Your property is now successfully listed on StayVista.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BecomeHostFinalDetails;
