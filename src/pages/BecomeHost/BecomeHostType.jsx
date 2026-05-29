import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateDraft } from '../../features/host/hostSlice';
import styles from './BecomeHostType.module.css';
import { 
  Home, Building2, Coffee, Anchor, Tent, 
  Car, Mountain, Box, 
  Warehouse, Hotel, TreePine, Wind, Globe, Ship, Compass,
  ChevronLeft, ChevronRight
} from 'lucide-react';

const propertyOptions = [
  { id: 'house', label: 'House', icon: <Home size={22} />, color: '#FF385C' },
  { id: 'flat', label: 'Flat/apartment', icon: <Building2 size={22} />, color: '#6C5CE7' },
  { id: 'barn', label: 'Barn', icon: <Warehouse size={22} />, color: '#00B894' },
  { id: 'bnb', label: 'Bed & breakfast', icon: <Coffee size={22} />, color: '#E17055' },
  { id: 'boat', label: 'Boat', icon: <Ship size={22} />, color: '#0984E3' },
  { id: 'cabin', label: 'Cabin', icon: <Home size={22} />, color: '#FDCB6E' },
  { id: 'campervan', label: 'Campervan', icon: <Car size={22} />, color: '#E84393' },
  { id: 'casa', label: 'Casa particular', icon: <Home size={22} />, color: '#00CEC9' },
  { id: 'castle', label: 'Castle', icon: <Building2 size={22} />, color: '#A29BFE' },
  { id: 'cave', label: 'Cave', icon: <Mountain size={22} />, color: '#636E72' },
  { id: 'container', label: 'Container', icon: <Box size={22} />, color: '#D63031' },
  { id: 'cycladic', label: 'Cycladic home', icon: <Home size={22} />, color: '#74B9FF' },
  { id: 'dammuso', label: 'Dammuso', icon: <Home size={22} />, color: '#FF7675' },
  { id: 'dome', label: 'Dome', icon: <Globe size={22} />, color: '#55EFC4' },
  { id: 'earth', label: 'Earth home', icon: <Mountain size={22} />, color: '#00B894' },
  { id: 'farm', label: 'Farm', icon: <TreePine size={22} />, color: '#2ECC71' },
  { id: 'guest', label: 'Guest house', icon: <Home size={22} />, color: '#F39C12' },
  { id: 'hotel', label: 'Hotel', icon: <Hotel size={22} />, color: '#8E44AD' },
  { id: 'houseboat', label: 'Houseboat', icon: <Anchor size={22} />, color: '#2980B9' },
  { id: 'minsu', label: 'Minsu', icon: <Home size={22} />, color: '#1ABC9C' },
  { id: 'riad', label: 'Riad', icon: <Building2 size={22} />, color: '#E74C3C' },
  { id: 'ryokan', label: 'Ryokan', icon: <Building2 size={22} />, color: '#9B59B6' },
  { id: 'shepherd', label: "Shepherd's hut", icon: <Tent size={22} />, color: '#27AE60' },
  { id: 'tent', label: 'Tent', icon: <Tent size={22} />, color: '#F1C40F' },
  { id: 'tiny', label: 'Tiny home', icon: <Home size={22} />, color: '#E67E22' },
  { id: 'tower', label: 'Tower', icon: <Building2 size={22} />, color: '#3498DB' },
  { id: 'tree', label: 'Tree house', icon: <TreePine size={22} />, color: '#2ECC71' },
  { id: 'trullo', label: 'Trullo', icon: <Home size={22} />, color: '#1ABC9C' },
  { id: 'windmill', label: 'Windmill', icon: <Wind size={22} />, color: '#0984E3' },
  { id: 'yurt', label: 'Yurt', icon: <Compass size={22} />, color: '#D35400' }
];

const BecomeHostType = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const draft = useSelector(state => state.host?.draftListing || {});
  const [selectedType, setSelectedType] = useState(draft.propertyType || null);

  const handleNext = () => {
    if (selectedType) {
      dispatch(updateDraft({ propertyType: selectedType, type: selectedType }));
      navigate('/become-a-host/place-type');
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
      </header>

      {/* Back arrow on left side */}
      <button className={styles.sideArrow + ' ' + styles.leftArrow} onClick={() => navigate('/become-a-host/address')}>
        <ChevronLeft size={28} />
      </button>

      {/* Next arrow on right side */}
      <button 
        className={`${styles.sideArrow} ${styles.rightArrow} ${!selectedType ? styles.arrowDisabled : ''}`} 
        onClick={handleNext}
        disabled={!selectedType}
      >
        <ChevronRight size={28} />
      </button>

      <main className={styles.mainContent}>
        <h1 className={styles.title}>Which of these best describes your place?</h1>
        <p style={{ color: '#717171', fontSize: '15px', marginTop: '-20px', marginBottom: '24px' }}>
          Select one to continue →
        </p>
        
        <div className={styles.grid}>
          {propertyOptions.map((option, index) => (
            <div 
              key={option.id} 
              className={`${styles.card} ${selectedType === option.id ? styles.selected : ''}`}
              onClick={() => setSelectedType(option.id)}
              style={{ animationDelay: `${index * 30}ms` }}
            >
              <div className={styles.iconWrapper} style={{ color: option.color }}>
                {option.icon}
              </div>
              <span className={styles.label}>{option.label}</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default BecomeHostType;
