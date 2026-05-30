import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateDraft, publishListing } from '../../features/host/hostSlice';
import styles from './BecomeHostFinalDetails.module.css';
import { ChevronLeft, Lock, Check, ShieldAlert } from 'lucide-react';

const BecomeHostFinalDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const draft = useSelector(state => state.host?.draftListing || {});
  
  const [address, setAddress] = useState({
    role: draft.address?.role || 'Owner',
    country: draft.address?.country || 'India',
    flat: draft.address?.flat || '',
    street: draft.address?.street || '',
    landmark: draft.address?.landmark || '',
    city: draft.address?.city || '',
    state: draft.address?.state || '',
    pincode: draft.address?.pincode || ''
  });

  const [showCelebration, setShowCelebration] = useState(false);
  
  const [selectedSafetyItems, setSelectedSafetyItems] = useState(draft.safetyItems || []);

  const toggleSafetyItem = (id) => {
    setSelectedSafetyItems(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

  const safetyItems = [
    { id: 'weapons', title: 'Weapons on the premises', desc: 'Secure weapons.' },
    { id: 'cameras', title: 'Exterior security cameras', desc: 'Only allowed outside.' },
    { id: 'noise', title: 'Noise monitoring devices', desc: 'Without recording audio.' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress(prev => ({ ...prev, [name]: value }));
  };

  const handleFinish = () => {
    dispatch(updateDraft({ address, safetyItems: selectedSafetyItems }));
    dispatch(publishListing());
    setShowCelebration(true);
    setTimeout(() => {
      navigate('/hosting');
    }, 3000);
  };

  const isFormValid = address.city.trim().length > 0;

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
          <button className={styles.navBtn} onClick={() => navigate('/become-a-host/booking')}>
            <ChevronLeft size={20} />
            <span>Back</span>
          </button>
        </div>
      </header>

      <div className={styles.content}>
        <div className={styles.mainArea}>
          
          <div className={styles.headerText}>
            <h1 className={styles.title}>Just a few final details</h1>
            <p className={styles.subtitle}>Complete safety settings, confirm your address, and verify your identity.</p>
          </div>

          <div className={styles.fullWidthLayout}>
            {/* TOP ROW: Safety */}
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <div>
                  <h3 className={styles.sectionTitle}>Safety & property details</h3>
                  <p className={styles.sectionSubtitle}>Does your property have any of the following?</p>
                </div>
              </div>

              <div className={styles.horizontalOptionsContainer}>
                {safetyItems.map((item) => {
                  const isSelected = selectedSafetyItems.includes(item.id);
                  return (
                    <div key={item.id} className={`${styles.safetyCard} ${isSelected ? styles.selectedCard : ''}`} onClick={() => toggleSafetyItem(item.id)}>
                      <div className={styles.cardContent}>
                        <h3 className={styles.cardTitle}>{item.title}</h3>
                        <p className={styles.cardDesc}>{item.desc}</p>
                      </div>
                      <div className={`${styles.toggleSwitch} ${isSelected ? styles.toggleOn : ''}`}>
                        <div className={styles.toggleKnob}></div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className={styles.infoBox}>
                <ShieldAlert size={24} color="#E31C5F" />
                <span><strong>Important:</strong> Indoor cameras are strictly prohibited. Comply with local laws and safety policies.</span>
              </div>
            </div>

            {/* BOTTOM ROW: Address */}
            <div className={`${styles.section} ${styles.premiumCard}`}>
              <div className={styles.sectionHeader}>
                <div>
                  <h3 className={styles.sectionTitle}>Your home address</h3>
                  <p className={styles.sectionSubtitle}>Guests won't see this information.</p>
                </div>
                  <Lock size={18} className={styles.lockIcon} />
                </div>

                <div className={styles.formGrid}>
                  <div className={`${styles.inputGroup} ${styles.colSpan3}`}>
                    <label>Your Role</label>
                    <select name="role" value={address.role} onChange={handleChange} className={styles.input}>
                      <option value="Owner">Owner</option>
                      <option value="Property Manager">Property Manager / Someone else</option>
                    </select>
                  </div>
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
                  <div className={`${styles.inputGroup} ${styles.colSpan3}`}>
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
                  <div className={`${styles.inputGroup} ${styles.colSpan2}`}>
                    <label>&nbsp;</label>
                    <button className={styles.finishBtnGrid} disabled={!isFormValid} onClick={handleFinish}>
                      Finish Setup
                    </button>
                  </div>
                </div>
              </div>
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
