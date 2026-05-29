import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateDraft } from '../../features/host/hostSlice';
import styles from './BecomeHostDetails.module.css';
import { 
  ChevronLeft, ChevronRight, Users, BedDouble, Bath, DoorOpen,
  Waves, TreePine, Wifi, UtensilsCrossed, Wind, Car, Tv,
  WashingMachine, Dumbbell, ShieldCheck, Flame, Snowflake,
  Coffee, Sun, Dog, Sparkles
} from 'lucide-react';

const amenitiesList = [
  { id: 'wifi', label: 'WiFi', icon: <Wifi size={18} />, color: '#6C5CE7' },
  { id: 'tv', label: 'TV', icon: <Tv size={18} />, color: '#A29BFE' },
  { id: 'kitchen', label: 'Kitchen', icon: <UtensilsCrossed size={18} />, color: '#E17055' },
  { id: 'ac', label: 'AC', icon: <Snowflake size={18} />, color: '#74B9FF' },
  { id: 'parking', label: 'Parking', icon: <Car size={18} />, color: '#636E72' },
  { id: 'pool', label: 'Pool', icon: <Waves size={18} />, color: '#0984E3' },
  { id: 'washer', label: 'Washer', icon: <WashingMachine size={18} />, color: '#00CEC9' },
  { id: 'heating', label: 'Heating', icon: <Flame size={18} />, color: '#E84393' },
  { id: 'coffee', label: 'Coffee', icon: <Coffee size={18} />, color: '#FDCB6E' },
  { id: 'gym', label: 'Gym', icon: <Dumbbell size={18} />, color: '#D63031' },
  { id: 'balcony', label: 'Balcony', icon: <Sun size={18} />, color: '#F39C12' },
  { id: 'pets', label: 'Pets OK', icon: <Dog size={18} />, color: '#E67E22' },
  { id: 'security', label: 'Security', icon: <ShieldCheck size={18} />, color: '#2D3436' },
  { id: 'hotwater', label: 'Hot water', icon: <Wind size={18} />, color: '#FF7675' },
  { id: 'garden', label: 'Garden', icon: <TreePine size={18} />, color: '#00B894' },
];

const Counter = ({ label, icon, value, onChange }) => (
  <div className={styles.counterRow}>
    <div className={styles.counterLabel}>
      <div className={styles.counterIcon}>{icon}</div>
      <span>{label}</span>
    </div>
    <div className={styles.counterControls}>
      <button className={styles.counterBtn} onClick={() => onChange(Math.max(0, value - 1))} disabled={value === 0}>−</button>
      <span className={styles.counterValue}>{value}</span>
      <button className={styles.counterBtn} onClick={() => onChange(value + 1)}>+</button>
    </div>
  </div>
);

const BecomeHostDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const draft = useSelector(state => state.host?.draftListing || {});

  const [guests, setGuests] = useState(draft.guests || 1);
  const [bedrooms, setBedrooms] = useState(draft.bedrooms || 1);
  const [beds, setBeds] = useState(draft.beds || 1);
  const [bathrooms, setBathrooms] = useState(draft.bathrooms || 1);
  const [selectedAmenities, setSelectedAmenities] = useState(draft.amenities || []);

  const toggleAmenity = (id) => {
    setSelectedAmenities(prev => 
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
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
        <div className={styles.headerNav}>
          <button className={styles.navBtn} onClick={() => navigate('/become-a-host/map-visibility')}>
            <ChevronLeft size={20} />
            <span>Back</span>
          </button>
          <button className={`${styles.navBtn} ${styles.navBtnNext}`} onClick={() => {
            dispatch(updateDraft({ guests, bedrooms, beds, bathrooms, amenities: selectedAmenities }));
            navigate('/become-a-host/photos');
          }}>
            <span>Next</span>
            <ChevronRight size={20} />
          </button>
        </div>
      </header>

      <div className={styles.content}>
        <div className={styles.headerText}>
          <h1 className={styles.title}>Share some basics about your place</h1>
          <p className={styles.subtitle}>You'll add more details later, like bed types and exact amenities.</p>
        </div>

        <div className={styles.mainArea}>
          {/* Left - Counters */}
          <div className={styles.left}>
            <div className={styles.countersCard}>
              <Counter label="Guests" icon={<Users size={24} />} value={guests} onChange={setGuests} />
              <Counter label="Bedrooms" icon={<DoorOpen size={24} />} value={bedrooms} onChange={setBedrooms} />
              <Counter label="Beds" icon={<BedDouble size={24} />} value={beds} onChange={setBeds} />
              <Counter label="Bathrooms" icon={<Bath size={24} />} value={bathrooms} onChange={setBathrooms} />
            </div>
          </div>

          {/* Right - Amenities */}
          <div className={styles.right}>
            <div className={styles.amenitiesGrid}>
              {amenitiesList.map((item, index) => (
                <div
                  key={item.id}
                  className={`${styles.amenityCard} ${selectedAmenities.includes(item.id) ? styles.amenitySelected : ''}`}
                  onClick={() => toggleAmenity(item.id)}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className={styles.amenityIcon} style={{ color: item.color }}>
                    {item.icon}
                  </div>
                  <span className={styles.amenityLabel}>{item.label}</span>
                  <div className={`${styles.checkbox} ${selectedAmenities.includes(item.id) ? styles.checkboxActive : ''}`}>
                    {selectedAmenities.includes(item.id) && (
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BecomeHostDetails;
