import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateDraft } from '../../features/host/hostSlice';
import styles from './BecomeHostType.module.css';
import { 
  Home, Building2, Coffee, Tent, 
  Hotel, TreePine, PenTool, Users,
  ChevronLeft, ChevronRight
} from 'lucide-react';

const Counter = ({ label, icon, value, onChange }) => (
  <div className={styles.counterRow}>
    <div className={styles.counterLabel}>
      <div className={styles.counterIcon}>{icon}</div>
      <span>{label}</span>
    </div>
    <div className={styles.counterControls}>
      <button className={styles.counterBtn} onClick={(e) => { e.stopPropagation(); onChange(Math.max(0, value - 1)); }} disabled={value === 0}>−</button>
      <span className={styles.counterValue}>{value}</span>
      <button className={styles.counterBtn} onClick={(e) => { e.stopPropagation(); onChange(value + 1); }}>+</button>
    </div>
  </div>
);

const propertyOptions = [
  { id: 'flat', label: 'Flat', icon: <Building2 size={28} />, color: '#6C5CE7' },
  { id: 'house_villa', label: 'House / Villa', icon: <Home size={28} />, color: '#FF385C' },
  { id: 'hotel_stay', label: 'Hotel / Stay', icon: <Hotel size={28} />, color: '#0984E3' },
  { id: 'pg', label: 'PG / Hostel', icon: <Users size={28} />, color: '#E17055' },
  { id: 'office', label: 'Office', icon: <Building2 size={28} />, color: '#A29BFE' },
  { id: 'shop', label: 'Shop', icon: <Coffee size={28} />, color: '#FDCB6E' },
  { id: 'showroom', label: 'Showroom', icon: <Home size={28} />, color: '#00B894' },
  { id: 'agri_land', label: 'Agricultural Land', icon: <TreePine size={28} />, color: '#27AE60' },
  { id: 'farm_house', label: 'Farm House', icon: <TreePine size={28} />, color: '#2ECC71' },
  { id: 'other', label: 'Other', icon: <PenTool size={28} />, color: '#636E72' }
];

const BecomeHostType = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const draft = useSelector(state => state.host?.draftListing || {});
  
  const detailsRef = useRef(null);
  
  const [selectedType, setSelectedType] = useState(draft.propertyType || null);
  const [customType, setCustomType] = useState(draft.customPropertyType || '');

  const handleSelectType = (id) => {
    setSelectedType(id);
  };

  const handleNext = () => {
    if (selectedType) {
      const finalType = selectedType === 'other' && customType.trim() !== '' ? customType : selectedType;
      dispatch(updateDraft({ 
        propertyType: finalType, 
        customPropertyType: customType, 
        type: finalType 
      }));
      navigate('/become-a-host/details');
    }
  };

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <div className={styles.headerLeft} onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <div className={styles.logoIcon}>
            <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 2L2 12V30H12V20H20V30H30V12L16 2Z" fill="white"/>
            </svg>
          </div>
          <span className={styles.logoText}>StayVista</span>
        </div>
        <div className={styles.headerNav}>
          <button className={styles.navBtn} onClick={() => navigate('/become-a-host/profile')}>
            <ChevronLeft size={20} />
            <span>Back</span>
          </button>
          <button className={`${styles.navBtn} ${styles.navBtnNext}`} onClick={handleNext} disabled={!selectedType}>
            <span>Next</span>
            <ChevronRight size={20} />
          </button>
        </div>
      </header>

      <main className={styles.mainContent}>
        <div style={{ textAlign: selectedType ? 'left' : 'center', marginBottom: '24px', transition: 'all 0.3s' }}>
          <h1 className={styles.title} style={{ marginBottom: '8px', textAlign: 'inherit' }}>Which of these best describes your place?</h1>
          <p style={{ color: '#717171', fontSize: '15px', margin: 0 }}>
            Select property type to continue →
          </p>
        </div>
        
        <div className={styles.fullWidthCol}>
            <div className={styles.grid6}>
              {propertyOptions.map((option, index) => (
                <div 
                  key={option.id} 
                  className={`${styles.card} ${selectedType === option.id ? styles.selected : ''}`}
                  onClick={() => handleSelectType(option.id)}
                  style={{ animationDelay: `${index * 30}ms` }}
                >
                  <div className={styles.iconWrapper} style={{ color: option.color }}>
                    {option.icon}
                  </div>
                  <span className={styles.label}>{option.label}</span>
                  {selectedType === 'other' && option.id === 'other' && (
                    <input 
                      type="text" 
                      value={customType} 
                      onChange={(e) => {
                        e.stopPropagation();
                        setCustomType(e.target.value);
                      }}
                      onClick={(e) => e.stopPropagation()}
                      placeholder="Type here..." 
                      className={styles.customInput} 
                      autoFocus
                    />
                  )}
                </div>
              ))}
            </div>
        </div>
      </main>
    </div>
  );
};

export default BecomeHostType;
