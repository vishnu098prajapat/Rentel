import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateDraft } from '../../features/host/hostSlice';
import styles from './BecomeHostDetails.module.css';
import { 
  ChevronLeft, ChevronRight, Users, BedDouble, Bath, DoorOpen,
  Waves, TreePine, Wifi, UtensilsCrossed, Wind, Car, Tv,
  WashingMachine, Dumbbell, ShieldCheck, Flame, Snowflake,
  Coffee, Sun, Dog, Sparkles, Building2
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
  
  const propertyType = draft.propertyType || 'house';

  const [guests, setGuests] = useState(draft.guests || 1);
  const [bedrooms, setBedrooms] = useState(draft.bedrooms || 1);
  const [beds, setBeds] = useState(draft.beds || 1);
  const [bathrooms, setBathrooms] = useState(draft.bathrooms || 1);
  const [selectedAmenities, setSelectedAmenities] = useState(draft.amenities || []);

  const [dynamic, setDynamic] = useState(draft.dynamic || {
    bhkType: '1 BHK',
    furnished: 'Semi',
    floorNumber: '',
    plotSize: '',
    floorsCount: 1,
    pgRoomType: 'Double',
    pgGender: 'Unisex',
    pgBathrooms: 'Attached',
    hotelRoomType: 'Deluxe',
    hotelRoomsCount: 1,
    mealsIncluded: 'No',
    checkInTime: '',
    checkOutTime: '',
    farmArea: '',
    outdoorSpace: 'Both',
    capacity: 10,
    officeType: 'Co-working',
    hoursAvailable: 'Full day',
    sleepsMin: 1,
    sleepsMax: 2,
    bathroomType: 'Indoor'
  });

  const handleDyn = (key, val) => setDynamic(p => ({ ...p, [key]: val }));

  const handleBhkChange = (val) => {
    handleDyn('bhkType', val);
    if (val === '1 BHK') { setGuests(2); setBeds(1); setBathrooms(1); setBedrooms(1); }
    if (val === '2 BHK') { setGuests(4); setBeds(2); setBathrooms(2); setBedrooms(2); }
    if (val === '3 BHK') { setGuests(6); setBeds(3); setBathrooms(3); setBedrooms(3); }
    if (val === '4+ BHK') { setGuests(8); setBeds(4); setBathrooms(4); setBedrooms(4); }
  };

  const toggleAmenity = (id) => {
    setSelectedAmenities(prev => 
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  const renderDynamicFields = () => {
    switch(propertyType) {
      case 'flat':
        return (
          <div className={styles.dynamicSection}>
            <div className={styles.fieldRow}>
              <label className={styles.fieldLabel}>BHK Type</label>
              <select className={styles.fieldSelect} value={dynamic.bhkType} onChange={e => handleBhkChange(e.target.value)}>
                <option>1 BHK</option><option>2 BHK</option><option>3 BHK</option><option>4+ BHK</option>
              </select>
            </div>
            <div className={styles.fieldRow}>
              <label className={styles.fieldLabel}>Furnished Status</label>
              <div className={styles.toggleGroup}>
                {['Fully', 'Semi', 'Unfurnished'].map(t => (
                  <button key={t} className={`${styles.toggleBtn} ${dynamic.furnished === t ? styles.activeToggle : ''}`} onClick={() => handleDyn('furnished', t)}>{t}</button>
                ))}
              </div>
            </div>
            <div className={styles.fieldRow}>
              <label className={styles.fieldLabel}>Floor Number (Optional)</label>
              <input type="text" className={styles.fieldInput} placeholder="e.g. 5th Floor" value={dynamic.floorNumber} onChange={e => handleDyn('floorNumber', e.target.value)} />
            </div>
          </div>
        );
      case 'house':
      case 'villa':
        return (
          <div className={styles.dynamicSection}>
            <div className={styles.fieldRow}>
              <label className={styles.fieldLabel}>BHK Type</label>
              <select className={styles.fieldSelect} value={dynamic.bhkType} onChange={e => handleBhkChange(e.target.value)}>
                <option>1 BHK</option><option>2 BHK</option><option>3 BHK</option><option>4+ BHK</option>
              </select>
            </div>
            <div className={styles.fieldRow}>
              <label className={styles.fieldLabel}>Plot Size (Optional)</label>
              <input type="text" className={styles.fieldInput} placeholder="e.g. 1500 sqft" value={dynamic.plotSize} onChange={e => handleDyn('plotSize', e.target.value)} />
            </div>
            <div className={styles.fieldRow}>
              <Counter label="Floors Count" icon={<Building2 size={24} />} value={dynamic.floorsCount} onChange={v => handleDyn('floorsCount', v)} />
            </div>
          </div>
        );
      case 'pg':
        return (
          <div className={styles.dynamicSection}>
            <div className={styles.fieldRow}>
              <label className={styles.fieldLabel}>Room Type</label>
              <select className={styles.fieldSelect} value={dynamic.pgRoomType} onChange={e => handleDyn('pgRoomType', e.target.value)}>
                <option>Single</option><option>Double</option><option>Triple</option><option>Dormitory</option>
              </select>
            </div>
            <div className={styles.fieldRow}>
              <label className={styles.fieldLabel}>For</label>
              <div className={styles.toggleGroup}>
                {['Boys', 'Girls', 'Unisex'].map(t => (
                  <button key={t} className={`${styles.toggleBtn} ${dynamic.pgGender === t ? styles.activeToggle : ''}`} onClick={() => handleDyn('pgGender', t)}>{t}</button>
                ))}
              </div>
            </div>
            <div className={styles.fieldRow}>
              <label className={styles.fieldLabel}>Bathrooms</label>
              <div className={styles.toggleGroup}>
                {['Attached', 'Common'].map(t => (
                  <button key={t} className={`${styles.toggleBtn} ${dynamic.pgBathrooms === t ? styles.activeToggle : ''}`} onClick={() => handleDyn('pgBathrooms', t)}>{t}</button>
                ))}
              </div>
            </div>
          </div>
        );
      case 'hotel':
      case 'guest':
        return (
          <div className={styles.dynamicSection}>
            <div className={styles.fieldRow}>
              <label className={styles.fieldLabel}>Room Type</label>
              <select className={styles.fieldSelect} value={dynamic.hotelRoomType} onChange={e => handleDyn('hotelRoomType', e.target.value)}>
                <option>Standard</option><option>Deluxe</option><option>Suite</option>
              </select>
            </div>
            <div className={styles.fieldRow}>
              <Counter label="Total Rooms Available" icon={<DoorOpen size={24} />} value={dynamic.hotelRoomsCount} onChange={v => handleDyn('hotelRoomsCount', v)} />
            </div>
            <div className={styles.fieldRow}>
              <label className={styles.fieldLabel}>Meals Included</label>
              <div className={styles.toggleGroup}>
                {['Yes', 'No'].map(t => (
                  <button key={t} className={`${styles.toggleBtn} ${dynamic.mealsIncluded === t ? styles.activeToggle : ''}`} onClick={() => handleDyn('mealsIncluded', t)}>{t}</button>
                ))}
              </div>
            </div>
            <div className={styles.fieldRow} style={{ flexDirection: 'row', gap: '16px' }}>
              <div style={{ flex: 1 }}>
                <label className={styles.fieldLabel}>Check-in Time</label>
                <input type="time" className={styles.fieldInput} value={dynamic.checkInTime} onChange={e => handleDyn('checkInTime', e.target.value)} />
              </div>
              <div style={{ flex: 1 }}>
                <label className={styles.fieldLabel}>Check-out Time</label>
                <input type="time" className={styles.fieldInput} value={dynamic.checkOutTime} onChange={e => handleDyn('checkOutTime', e.target.value)} />
              </div>
            </div>
          </div>
        );
      case 'farm':
        return (
          <div className={styles.dynamicSection}>
            <div className={styles.fieldRow}>
              <label className={styles.fieldLabel}>Area (Acres/Bigha)</label>
              <input type="text" className={styles.fieldInput} placeholder="e.g. 5 Acres" value={dynamic.farmArea} onChange={e => handleDyn('farmArea', e.target.value)} />
            </div>
            <div className={styles.fieldRow}>
              <label className={styles.fieldLabel}>Outdoor Space</label>
              <select className={styles.fieldSelect} value={dynamic.outdoorSpace} onChange={e => handleDyn('outdoorSpace', e.target.value)}>
                <option>Garden</option><option>Pool</option><option>Both</option><option>None</option>
              </select>
            </div>
          </div>
        );
      case 'office':
        return (
          <div className={styles.dynamicSection}>
            <div className={styles.fieldRow}>
              <Counter label="Capacity (People)" icon={<Users size={24} />} value={dynamic.capacity} onChange={v => handleDyn('capacity', v)} />
            </div>
            <div className={styles.fieldRow}>
              <label className={styles.fieldLabel}>Type</label>
              <select className={styles.fieldSelect} value={dynamic.officeType} onChange={e => handleDyn('officeType', e.target.value)}>
                <option>Cafe</option><option>Co-working</option><option>Event space</option><option>Private office</option>
              </select>
            </div>
            <div className={styles.fieldRow}>
              <label className={styles.fieldLabel}>Hours Available</label>
              <div className={styles.toggleGroup}>
                {['Full day', 'Half day', 'Hourly'].map(t => (
                  <button key={t} className={`${styles.toggleBtn} ${dynamic.hoursAvailable === t ? styles.activeToggle : ''}`} onClick={() => handleDyn('hoursAvailable', t)}>{t}</button>
                ))}
              </div>
            </div>
          </div>
        );
      case 'cabin':
      case 'tree':
      case 'tent':
        return (
          <div className={styles.dynamicSection}>
            <div className={styles.fieldRow}>
              <label className={styles.fieldLabel}>Sleeps</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <input type="number" min="1" className={styles.fieldInput} placeholder="Min" value={dynamic.sleepsMin} onChange={e => handleDyn('sleepsMin', e.target.value)} />
                <span style={{ fontWeight: 600 }}>to</span>
                <input type="number" min="1" className={styles.fieldInput} placeholder="Max" value={dynamic.sleepsMax} onChange={e => handleDyn('sleepsMax', e.target.value)} />
              </div>
            </div>
            <div className={styles.fieldRow}>
              <label className={styles.fieldLabel}>Bathroom Type</label>
              <div className={styles.toggleGroup}>
                {['Indoor', 'Outdoor'].map(t => (
                  <button key={t} className={`${styles.toggleBtn} ${dynamic.bathroomType === t ? styles.activeToggle : ''}`} onClick={() => handleDyn('bathroomType', t)}>{t}</button>
                ))}
              </div>
            </div>
          </div>
        );
      default:
        return null; // Other types just show common fields
    }
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
          <button className={styles.navBtn} onClick={() => navigate('/become-a-host/location')}>
            <ChevronLeft size={20} />
            <span>Back</span>
          </button>
          <button className={`${styles.navBtn} ${styles.navBtnNext}`} onClick={() => {
            dispatch(updateDraft({ guests, bedrooms, beds, bathrooms, amenities: selectedAmenities, dynamic }));
            navigate('/become-a-host/photos');
          }}>
            <span>Next</span>
            <ChevronRight size={20} />
          </button>
        </div>
      </header>

      <div className={styles.content}>
        <div className={styles.headerText}>
          <h1 className={styles.title}>Share some basics about your {propertyType}</h1>
          <p className={styles.subtitle}>You'll add more details later, like photos and exact amenities.</p>
        </div>

        <div className={styles.mainArea}>
          {/* Left - Dynamic Fields & Counters */}
          <div className={styles.left}>
            <div className={styles.countersCard} style={{ padding: '24px' }}>
              {renderDynamicFields()}
              
              <div className={styles.fieldRow} style={{ marginTop: '16px' }}>
                <label className={styles.fieldLabel} style={{ marginBottom: '8px' }}>Common Facilities</label>
                <div style={{ border: '1px solid #EBEBEB', borderRadius: '12px' }}>
                  <Counter label="Guests" icon={<Users size={24} />} value={guests} onChange={setGuests} />
                  {(!['flat', 'pg', 'office', 'hotel', 'guest'].includes(propertyType)) && (
                    <Counter label="Bedrooms" icon={<DoorOpen size={24} />} value={bedrooms} onChange={setBedrooms} />
                  )}
                  <Counter label="Beds" icon={<BedDouble size={24} />} value={beds} onChange={setBeds} />
                  <Counter label="Bathrooms" icon={<Bath size={24} />} value={bathrooms} onChange={setBathrooms} />
                </div>
              </div>
            </div>
          </div>

          {/* Right - Amenities */}
          <div className={styles.right}>
            <h2 className={styles.fieldLabel} style={{ marginBottom: '16px', fontSize: '20px' }}>What amenities do you offer?</h2>
            <div className={styles.amenitiesGrid}>
              {amenitiesList.map((item, index) => (
                <div
                  key={item.id}
                  className={`${styles.amenityCard} ${selectedAmenities.includes(item.id) ? styles.amenitySelected : ''}`}
                  onClick={() => toggleAmenity(item.id)}
                  style={{ animationDelay: `${index * 30}ms` }}
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
