import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateDraft } from '../../features/host/hostSlice';
import styles from './BecomeHostAmenities.module.css';
import { 
  ChevronLeft, ChevronRight, Wifi, Tv, Wind, Car, 
  Waves, Dumbbell, Coffee, FireExtinguisher, BriefcaseMedical, 
  Flame, Trees, Utensils, MonitorPlay, ShieldAlert,
  Snowflake, Umbrella
} from 'lucide-react';

const amenityGroups = [
  {
    title: "Guest Favorites",
    items: [
      { id: 'wifi', label: 'Wifi', icon: <Wifi size={32} /> },
      { id: 'tv', label: 'TV', icon: <Tv size={32} /> },
      { id: 'kitchen', label: 'Kitchen', icon: <Utensils size={32} /> },
      { id: 'washer', label: 'Washer', icon: <Wind size={32} /> },
      { id: 'parking', label: 'Free parking', icon: <Car size={32} /> },
      { id: 'ac', label: 'Air conditioning', icon: <Snowflake size={32} /> },
      { id: 'workspace', label: 'Dedicated workspace', icon: <MonitorPlay size={32} /> }
    ]
  },
  {
    title: "Standout Amenities",
    items: [
      { id: 'pool', label: 'Pool', icon: <Waves size={32} /> },
      { id: 'hottub', label: 'Hot tub', icon: <Waves size={32} /> },
      { id: 'patio', label: 'Patio', icon: <Umbrella size={32} /> },
      { id: 'bbq', label: 'BBQ grill', icon: <Flame size={32} /> },
      { id: 'firepit', label: 'Fire pit', icon: <Flame size={32} /> },
      { id: 'gym', label: 'Gym', icon: <Dumbbell size={32} /> },
      { id: 'breakfast', label: 'Breakfast', icon: <Coffee size={32} /> },
      { id: 'garden', label: 'Garden', icon: <Trees size={32} /> }
    ]
  },
  {
    title: "Safety Items",
    items: [
      { id: 'smoke_alarm', label: 'Smoke alarm', icon: <ShieldAlert size={32} /> },
      { id: 'first_aid', label: 'First aid kit', icon: <BriefcaseMedical size={32} /> },
      { id: 'fire_extinguisher', label: 'Fire extinguisher', icon: <FireExtinguisher size={32} /> }
    ]
  },
  {
    title: "Property Security",
    items: [
      { id: 'cameras', label: 'Security cameras', icon: <ShieldAlert size={32} /> },
      { id: 'weapons', label: 'Weapons on premises', icon: <ShieldAlert size={32} /> },
      { id: 'noise_monitor', label: 'Noise monitors', icon: <ShieldAlert size={32} /> }
    ]
  }
];

const BecomeHostAmenities = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const draft = useSelector(state => state.host?.draftListing || {});
  
  const [selectedAmenities, setSelectedAmenities] = useState(draft.amenities || []);

  const toggleAmenity = (id) => {
    setSelectedAmenities(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleNext = () => {
    dispatch(updateDraft({ amenities: selectedAmenities }));
    navigate('/become-a-host/location');
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerLeft} onClick={() => navigate('/')}>
          <div className={styles.logoIcon}>
            <svg width="20" height="20" viewBox="0 0 32 32" fill="none"><path d="M16 2L2 12V30H12V20H20V30H30V12L16 2Z" fill="white"/></svg>
          </div>
          <span className={styles.logoText}>StayVista</span>
        </div>
        <div className={styles.headerNav}>
          <button type="button" className={styles.navBtn} onClick={() => navigate('/become-a-host/details')}>
            <ChevronLeft size={20} />
            <span>Back</span>
          </button>
          <button type="button" className={`${styles.navBtn} ${styles.navBtnNext}`} onClick={handleNext}>
            <span>Next</span>
            <ChevronRight size={20} />
          </button>
        </div>
      </header>

      <div className={styles.content}>
        <div className={styles.formContainer}>
          
          <div className={styles.headerText}>
            <h1 className={styles.title}>Tell guests what your place has to offer</h1>
            <p className={styles.subtitle}>You can add more amenities after you publish your listing.</p>
          </div>

          <div className={styles.amenitiesLayout}>
            {amenityGroups.map((group, groupIndex) => (
              <div key={groupIndex} className={styles.amenityGroup}>
                <h2 className={styles.groupTitle}>{group.title}</h2>
                <div className={styles.grid}>
                  {group.items.map((item) => {
                    const isSelected = selectedAmenities.includes(item.id);
                    return (
                      <div 
                        key={item.id}
                        className={`${styles.amenityCard} ${isSelected ? styles.selectedCard : ''}`}
                        onClick={() => toggleAmenity(item.id)}
                      >
                        <div className={styles.cardIcon}>{item.icon}</div>
                        <span className={styles.cardLabel}>{item.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default BecomeHostAmenities;
