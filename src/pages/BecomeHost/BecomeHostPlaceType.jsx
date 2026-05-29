import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateDraft } from '../../features/host/hostSlice';
import styles from './BecomeHostPlaceType.module.css';
import { 
  Home, DoorOpen, Users,
  ChevronLeft, ChevronRight
} from 'lucide-react';

const placeOptions = [
  { 
    id: 'entire', 
    label: 'An entire place', 
    subtitle: 'Guests have the whole place to themselves.',
    icon: <Home size={28} />,
    color: '#FF385C'
  },
  { 
    id: 'room', 
    label: 'A room', 
    subtitle: 'Guests have their own room in a home, plus access to shared spaces.',
    icon: <DoorOpen size={28} />,
    color: '#6C5CE7'
  },
  { 
    id: 'shared', 
    label: 'A shared room in a hostel', 
    subtitle: 'Guests sleep in a room or common area that may be shared with you or others.',
    icon: <Users size={28} />,
    color: '#00B894'
  }
];

const BecomeHostPlaceType = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const draft = useSelector(state => state.host?.draftListing || {});
  const [selectedPlace, setSelectedPlace] = useState(draft.placeType || null);

  const handleNext = () => {
    if (selectedPlace) {
      dispatch(updateDraft({ placeType: selectedPlace }));
      navigate('/become-a-host/location');
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

      {/* Back arrow */}
      <button className={`${styles.sideArrow} ${styles.leftArrow}`} onClick={() => navigate('/become-a-host/property-type')}>
        <ChevronLeft size={28} />
      </button>

      {/* Next arrow */}
      <button 
        className={`${styles.sideArrow} ${styles.rightArrow} ${!selectedPlace ? styles.arrowDisabled : ''}`} 
        onClick={handleNext}
        disabled={!selectedPlace}
      >
        <ChevronRight size={28} />
      </button>

      <main className={styles.mainContent}>
        <h1 className={styles.title}>What type of place will guests have?</h1>
        
        <div className={styles.optionsList}>
          {placeOptions.map((option, index) => (
            <div 
              key={option.id} 
              className={`${styles.optionCard} ${selectedPlace === option.id ? styles.selected : ''}`}
              onClick={() => setSelectedPlace(option.id)}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={styles.optionInfo}>
                <h3 className={styles.optionLabel}>{option.label}</h3>
                <p className={styles.optionSubtitle}>{option.subtitle}</p>
              </div>
              <div className={styles.optionIcon} style={{ color: option.color }}>
                {option.icon}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default BecomeHostPlaceType;
