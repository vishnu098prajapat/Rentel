import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateDraft, publishListing } from '../../features/host/hostSlice';
import styles from './BecomeHostFinalDetails.module.css';
import { ChevronLeft, Building, User, MapPin } from 'lucide-react';

const BecomeHostFinalDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const draft = useSelector(state => state.host?.draftListing || {});
  
  const [hostInfo, setHostInfo] = useState({
    hostType: draft.hostInfo?.hostType || 'Individual',
    legalName: draft.hostInfo?.legalName || '',
    taxId: draft.hostInfo?.taxId || '', // GST/PAN
    flat: draft.hostInfo?.flat || '',
    street: draft.hostInfo?.street || '',
    city: draft.hostInfo?.city || '',
    state: draft.hostInfo?.state || '',
    pincode: draft.hostInfo?.pincode || ''
  });

  const [showCelebration, setShowCelebration] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHostInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleFinish = () => {
    dispatch(updateDraft({ hostInfo }));
    dispatch(publishListing());
    setShowCelebration(true);
    setTimeout(() => {
      navigate('/hosting');
    }, 3000);
  };

  const isFormValid = hostInfo.legalName.trim().length > 0 && hostInfo.city.trim().length > 0;

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
          <button 
            className={`${styles.navBtn} ${styles.navBtnNext} ${isFormValid ? styles.nextBtnActive : ''}`} 
            onClick={handleFinish} 
            disabled={!isFormValid}
          >
            <span>Publish Listing</span>
          </button>
        </div>
      </header>

      <div className={styles.content}>
        <div className={styles.mainArea}>
          
          <div className={styles.headerText}>
            <h1 className={styles.title}>Host & Billing Details</h1>
            <p className={styles.subtitle}>Provide your final details to activate your listing and receive payouts.</p>
          </div>

          <div className={styles.formCard}>
            <div className={styles.cardHeader}>
              <User size={24} className={styles.cardIcon} />
              <h2 className={styles.cardTitle}>Who is hosting?</h2>
            </div>
            
            <div className={styles.radioGroup}>
              <label className={`${styles.radioOption} ${hostInfo.hostType === 'Individual' ? styles.radioSelected : ''}`}>
                <input type="radio" name="hostType" value="Individual" checked={hostInfo.hostType === 'Individual'} onChange={handleChange} />
                <div className={styles.radioContent}>
                  <span className={styles.radioLabel}>Individual</span>
                  <span className={styles.radioDesc}>I am a private host or owner.</span>
                </div>
              </label>
              <label className={`${styles.radioOption} ${hostInfo.hostType === 'Business' ? styles.radioSelected : ''}`}>
                <input type="radio" name="hostType" value="Business" checked={hostInfo.hostType === 'Business'} onChange={handleChange} />
                <div className={styles.radioContent}>
                  <span className={styles.radioLabel}>Business</span>
                  <span className={styles.radioDesc}>I am a registered company or hotel.</span>
                </div>
              </label>
            </div>

            <div className={styles.grid2}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Legal Name / Company Name *</label>
                <input type="text" className={styles.input} name="legalName" value={hostInfo.legalName} onChange={handleChange} placeholder="e.g. Rahul Sharma or ABC Hotels Pvt Ltd" />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Tax ID / GSTIN (Optional)</label>
                <input type="text" className={styles.input} name="taxId" value={hostInfo.taxId} onChange={handleChange} placeholder="e.g. 22AAAAA0000A1Z5" />
              </div>
            </div>
          </div>

          <div className={styles.formCard}>
            <div className={styles.cardHeader}>
              <Building size={24} className={styles.cardIcon} />
              <h2 className={styles.cardTitle}>Billing Address</h2>
            </div>

            <div className={styles.grid2}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Flat / House No. / Building</label>
                <input type="text" className={styles.input} name="flat" value={hostInfo.flat} onChange={handleChange} placeholder="e.g. Flat 401, Tower B" />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Street / Area</label>
                <input type="text" className={styles.input} name="street" value={hostInfo.street} onChange={handleChange} placeholder="e.g. MG Road" />
              </div>
            </div>
            
            <div className={styles.grid3}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>City *</label>
                <input type="text" className={styles.input} name="city" value={hostInfo.city} onChange={handleChange} placeholder="City" />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>State / Province</label>
                <input type="text" className={styles.input} name="state" value={hostInfo.state} onChange={handleChange} placeholder="State" />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>PIN Code</label>
                <input type="text" className={styles.input} name="pincode" value={hostInfo.pincode} onChange={handleChange} placeholder="Pincode" />
              </div>
            </div>
          </div>
          
        </div>
      </div>

      {showCelebration && (
        <div className={styles.celebrationOverlay}>
          <div className={styles.celebrationCard}>
            <div className={styles.confetti}>🎉</div>
            <h2 className={styles.celebrationTitle}>Congratulations!</h2>
            <p className={styles.celebrationText}>Your property has been successfully listed on StayVista. Get ready to welcome guests!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BecomeHostFinalDetails;
