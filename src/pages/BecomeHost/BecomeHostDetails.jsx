import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateDraft } from '../../features/host/hostSlice';
import styles from './BecomeHostDetails.module.css';
import { 
  ChevronLeft, ChevronRight, Refrigerator, Tv, Snowflake, 
  Bed, Sofa, WashingMachine, Check, ChefHat, Flame,
  TrendingUp, Bath, ShieldCheck
} from 'lucide-react';

const SegmentedControl = ({ label, options, value, onChange }) => (
  <div className={styles.fieldGroup}>
    {label && <label className={styles.fieldLabel}>{label}</label>}
    <div className={styles.pillGroup}>
      {options.map(opt => (
        <button
          key={opt}
          type="button"
          className={`${styles.pillBtn} ${value === opt ? styles.pillBtnActive : ''}`}
          onClick={() => onChange(opt)}
        >
          {opt}
        </button>
      ))}
    </div>
  </div>
);

const AmenityCard = ({ icon, label, selected, onClick }) => (
  <div 
    className={`${styles.amenityCard} ${selected ? styles.amenityCardSelected : ''}`}
    onClick={onClick}
  >
    <div className={styles.amenityIcon}>{icon}</div>
    <span className={styles.amenityLabel}>{label}</span>
    {selected && <div className={styles.checkBadge}><Check size={12} strokeWidth={4} /></div>}
  </div>
);

const BecomeHostDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const draft = useSelector(state => state.host?.draftListing || {});
  
  const propertyType = draft.propertyType || 'flat';

  const getAllowedPurposes = (pt) => {
    switch (pt) {
      case 'hotel_stay': 
        return ['Short-term'];
      case 'pg':
      case 'office':
      case 'shop':
      case 'showroom':
      case 'agri_land':
        return ['Rent'];
      case 'flat':
      case 'house_villa':
      case 'farm_house':
      case 'other':
      default:
        return ['Rent', 'Short-term'];
    }
  };

  const allowedPurposes = getAllowedPurposes(propertyType);

  // Pricing & Purpose
  const [listingPurpose, setListingPurpose] = useState(() => {
    if (allowedPurposes.includes(draft.listingPurpose)) return draft.listingPurpose;
    return allowedPurposes[0];
  });

  useEffect(() => {
    if (!allowedPurposes.includes(listingPurpose)) {
      setListingPurpose(allowedPurposes[0]);
    }
  }, [propertyType, allowedPurposes, listingPurpose]);

  const [listingPrice, setListingPrice] = useState(draft.listingPrice || '');
  const [rentNegotiable, setRentNegotiable] = useState(draft.rentNegotiable || false);
  const [securityAmount, setSecurityAmount] = useState(draft.securityAmount || '');
  const [maintenanceCharges, setMaintenanceCharges] = useState(draft.maintenanceCharges || '');
  const [maintenancePeriod, setMaintenancePeriod] = useState(draft.maintenancePeriod || 'Monthly');
  
  // Short-term Pricing State
  const [weekendPct, setWeekendPct] = useState(draft.weekendPct || 5);
  const [selectedDiscounts, setSelectedDiscounts] = useState(draft.selectedDiscounts || ['early_bird']);
  const [discounts, setDiscounts] = useState(draft.customDiscounts || [
    { id: 'early_bird', percent: 15, title: 'Early Bird', desc: 'First 3 bookings' },
    { id: 'last_minute', percent: 5, title: 'Last-minute', desc: '7 days or less before arrival' },
    { id: 'weekly', percent: 12, title: 'Weekly', desc: '7 nights or more' },
    { id: 'monthly', percent: 25, title: 'Monthly', desc: '28 nights or more' }
  ]);

  // Dynamic property fields
  const [dynamic, setDynamic] = useState(draft.dynamic || {
    // Core features
    bedrooms: '1', bathrooms: '1', balconies: '0',
    floorNumber: 'Ground', totalFloors: '1',
    carpetArea: '', superArea: '', areaUnit: 'Sq-ft',
    furnishedStatus: 'Unfurnished', availableFrom: 'Immediately', availableDate: '', ageOfConstruction: 'New Build',
    
    // Extras
    acCount: '0', bedCount: '0', wardrobeCount: '0', tvCount: '0',
    fridge: false, sofa: false, washingMachine: false, diningTable: false, microwave: false, gasConnection: false,
    
    // PG specific
    pgRoomType: 'Double', pgGender: 'Unisex', pgBathrooms: 'Attached',
    
    // Hotel specific
    hotelRoomType: 'Deluxe', hotelRoomsCount: '1', mealsIncluded: 'No', checkInTime: '', checkOutTime: '',
    
    // Farm / Land specific
    farmArea: '', outdoorSpace: 'Both', waterSupply: 'Yes', fencing: 'Yes',
    
    // Commercial specific
    capacity: '10', officeType: 'Co-working', commercialWashroom: 'Private'
  });

  const handleDyn = (key, val) => setDynamic(p => ({ ...p, [key]: val }));
  const toggleAmenity = (key) => handleDyn(key, !dynamic[key]);

  const handlePriceChange = (e) => {
    const val = parseInt(e.target.value.replace(/[^0-9]/g, ''), 10);
    setListingPrice(isNaN(val) ? '' : val);
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

  const weekendPrice = listingPrice ? Math.round(Number(listingPrice) * (1 + (weekendPct / 100))) : 0;

  const handleNext = () => {
    dispatch(updateDraft({ 
      dynamic,
      listingPurpose, listingPrice, rentNegotiable, securityAmount, maintenanceCharges, maintenancePeriod,
      weekendPct, selectedDiscounts, customDiscounts: discounts
    }));
    navigate('/become-a-host/amenities');
  };

  const renderFurnishingExtras = () => {
    if (dynamic.furnishedStatus === 'Unfurnished') return null;
    return (
      <div className={styles.subSection}>
        <h4 className={styles.subSectionTitle}>Furnishing Details</h4>
        
        <div className={styles.twoColGrid}>
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel}>AC Units</label>
            <select className={styles.fieldSelect} value={dynamic.acCount} onChange={e => handleDyn('acCount', e.target.value)}>
              <option value="0">Select</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4+">4+</option>
            </select>
          </div>
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel}>Beds</label>
            <select className={styles.fieldSelect} value={dynamic.bedCount} onChange={e => handleDyn('bedCount', e.target.value)}>
              <option value="0">Select</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4+">4+</option>
            </select>
          </div>
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel}>Wardrobes</label>
            <select className={styles.fieldSelect} value={dynamic.wardrobeCount} onChange={e => handleDyn('wardrobeCount', e.target.value)}>
              <option value="0">Select</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4+">4+</option>
            </select>
          </div>
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel}>TVs</label>
            <select className={styles.fieldSelect} value={dynamic.tvCount} onChange={e => handleDyn('tvCount', e.target.value)}>
              <option value="0">Select</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4+">4+</option>
            </select>
          </div>
        </div>

        <label className={styles.fieldLabel} style={{ marginTop: '20px' }}>Appliances & Extras</label>
        <div className={styles.amenityGrid}>
          <AmenityCard icon={<Refrigerator size={24} />} label="Fridge" selected={dynamic.fridge} onClick={() => toggleAmenity('fridge')} />
          <AmenityCard icon={<Sofa size={24} />} label="Sofa" selected={dynamic.sofa} onClick={() => toggleAmenity('sofa')} />
          <AmenityCard icon={<WashingMachine size={24} />} label="Washing Machine" selected={dynamic.washingMachine} onClick={() => toggleAmenity('washingMachine')} />
          <AmenityCard icon={<ChefHat size={24} />} label="Dining Table" selected={dynamic.diningTable} onClick={() => toggleAmenity('diningTable')} />
          <AmenityCard icon={<Snowflake size={24} />} label="Microwave" selected={dynamic.microwave} onClick={() => toggleAmenity('microwave')} />
          <AmenityCard icon={<Flame size={24} />} label="Gas Connection" selected={dynamic.gasConnection} onClick={() => toggleAmenity('gasConnection')} />
        </div>
      </div>
    );
  };

  const renderCoreFeatures = (showBalconies = true, showFloorDetails = true) => (
    <>
      <SegmentedControl 
        label="Bedrooms" 
        options={['1', '2', '3', '4', '5+']} 
        value={dynamic.bedrooms} 
        onChange={v => handleDyn('bedrooms', v)} 
      />
      {showBalconies && (
        <SegmentedControl 
          label="Balconies" 
          options={['0', '1', '2', '3', '4+']} 
          value={dynamic.balconies} 
          onChange={v => handleDyn('balconies', v)} 
        />
      )}
      <SegmentedControl 
        label="Bathrooms" 
        options={['1', '2', '3', '4+']} 
        value={dynamic.bathrooms} 
        onChange={v => handleDyn('bathrooms', v)} 
      />

      {showFloorDetails && (
        <>
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel}>Floor No.</label>
            <div className={styles.scrollablePillGroupWrapper}>
              <div className={styles.pillGroup} style={{ flexWrap: 'nowrap' }}>
                {['Lower Basement', 'Upper Basement', 'Ground', '1', '2', '3', '4', '5', '6', '7', '8+'].map(opt => (
                  <button key={opt} type="button" className={`${styles.pillBtn} ${dynamic.floorNumber === opt ? styles.pillBtnActive : ''}`} onClick={() => handleDyn('floorNumber', opt)} style={{ flexShrink: 0, padding: '10px 16px' }}>{opt}</button>
                ))}
              </div>
            </div>
          </div>
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel}>Total Floors in Building</label>
            <div className={styles.scrollablePillGroupWrapper}>
              <div className={styles.pillGroup} style={{ flexWrap: 'nowrap' }}>
                {['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13+'].map(opt => (
                  <button key={opt} type="button" className={`${styles.pillBtn} ${dynamic.totalFloors === opt ? styles.pillBtnActive : ''}`} onClick={() => handleDyn('totalFloors', opt)} style={{ flexShrink: 0 }}>{opt}</button>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel}>Furnished Status</label>
        <div className={styles.toggleGroup}>
          {['Furnished', 'Unfurnished', 'Semi-Furnished'].map(t => (
            <button key={t} type="button" className={`${styles.toggleBtn} ${dynamic.furnishedStatus === t ? styles.activeToggle : ''}`} onClick={() => handleDyn('furnishedStatus', t)}>{t}</button>
          ))}
        </div>
      </div>
      
      {renderFurnishingExtras()}
    </>
  );

  const renderAreaFields = () => (
    <div className={styles.fieldGroup} style={{ marginTop: '24px' }}>
      <label className={styles.fieldLabel} style={{ fontSize: '16px', marginBottom: '16px' }}>Area Details</label>
      <div className={styles.twoColGrid}>
        <div>
          <label className={styles.fieldLabel} style={{ color: 'var(--text-secondary)' }}>Carpet Area</label>
          <div className={styles.inputWithSuffix}>
            <input type="number" className={styles.fieldInput} placeholder="e.g. 800" value={dynamic.carpetArea} onChange={e => handleDyn('carpetArea', e.target.value)} />
            <select className={styles.fieldSelectSuffix} value={dynamic.areaUnit} onChange={e => handleDyn('areaUnit', e.target.value)}>
              <option>Sq-ft</option><option>Sq-m</option><option>Sq-yrd</option><option>Acres</option>
            </select>
          </div>
        </div>
        <div>
          <label className={styles.fieldLabel} style={{ color: 'var(--text-secondary)' }}>Super Area</label>
          <div className={styles.inputWithSuffix}>
            <input type="number" className={styles.fieldInput} placeholder="e.g. 1000" value={dynamic.superArea} onChange={e => handleDyn('superArea', e.target.value)} />
            <select className={styles.fieldSelectSuffix} value={dynamic.areaUnit} onChange={e => handleDyn('areaUnit', e.target.value)}>
              <option>Sq-ft</option><option>Sq-m</option><option>Sq-yrd</option><option>Acres</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAvailabilityFields = () => (
    <div className={styles.fieldGroup} style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid var(--border-color)' }}>
      <h3 className={styles.sectionTitle}>Transaction Type & Availability</h3>
      <div className={styles.twoColGrid}>
        <div>
          <label className={styles.fieldLabel}>Available From</label>
          <div className={styles.toggleGroup}>
            {['Immediately', 'Select Date'].map(t => (
              <button key={t} type="button" className={`${styles.toggleBtn} ${dynamic.availableFrom === t ? styles.activeToggle : ''}`} onClick={() => handleDyn('availableFrom', t)}>{t}</button>
            ))}
          </div>
          {dynamic.availableFrom === 'Select Date' && (
            <input type="date" className={styles.fieldInput} style={{ marginTop: '12px' }} value={dynamic.availableDate} onChange={e => handleDyn('availableDate', e.target.value)} />
          )}
        </div>
        <div>
          <label className={styles.fieldLabel}>Age of Construction</label>
          <select className={styles.fieldSelect} value={dynamic.ageOfConstruction} onChange={e => handleDyn('ageOfConstruction', e.target.value)}>
            <option>New Build</option><option>1-5 years</option><option>5-10 years</option><option>10+ years</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderDynamicFields = () => {
    switch(propertyType) {
      case 'flat':
        return (
          <>
            {renderCoreFeatures(true, true)}
            {renderAreaFields()}
            {renderAvailabilityFields()}
          </>
        );
      case 'house_villa':
        return (
          <>
            {renderCoreFeatures(true, false)}
            <SegmentedControl 
              label="Total Floors" 
              options={['1', '2', '3', '4+']} 
              value={dynamic.totalFloors} 
              onChange={v => handleDyn('totalFloors', v)} 
            />
            {renderAreaFields()}
            {renderAvailabilityFields()}
          </>
        );
      case 'pg':
        return (
          <>
            <div className={styles.twoColGrid}>
              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>Room Type</label>
                <select className={styles.fieldSelect} value={dynamic.pgRoomType} onChange={e => handleDyn('pgRoomType', e.target.value)}>
                  <option>Single</option><option>Double</option><option>Triple</option><option>Dormitory</option>
                </select>
              </div>
              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>For</label>
                <div className={styles.toggleGroup}>
                  {['Boys', 'Girls', 'Unisex'].map(t => (
                    <button key={t} type="button" className={`${styles.toggleBtn} ${dynamic.pgGender === t ? styles.activeToggle : ''}`} onClick={() => handleDyn('pgGender', t)}>{t}</button>
                  ))}
                </div>
              </div>
            </div>
            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel}>Bathrooms</label>
              <div className={styles.toggleGroup}>
                {['Attached', 'Common'].map(t => (
                  <button key={t} type="button" className={`${styles.toggleBtn} ${dynamic.pgBathrooms === t ? styles.activeToggle : ''}`} onClick={() => handleDyn('pgBathrooms', t)}>{t}</button>
                ))}
              </div>
            </div>
            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel}>Furnished Status</label>
              <div className={styles.toggleGroup}>
                {['Furnished', 'Unfurnished', 'Semi-Furnished'].map(t => (
                  <button key={t} type="button" className={`${styles.toggleBtn} ${dynamic.furnishedStatus === t ? styles.activeToggle : ''}`} onClick={() => handleDyn('furnishedStatus', t)}>{t}</button>
                ))}
              </div>
            </div>
            {renderFurnishingExtras()}
            {renderAvailabilityFields()}
          </>
        );
      case 'hotel_stay':
        return (
          <>
            <div className={styles.twoColGrid}>
              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>Room Type</label>
                <select className={styles.fieldSelect} value={dynamic.hotelRoomType} onChange={e => handleDyn('hotelRoomType', e.target.value)}>
                  <option>Standard</option><option>Deluxe</option><option>Suite</option>
                </select>
              </div>
              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>Total Rooms</label>
                <input type="number" className={styles.fieldInput} value={dynamic.hotelRoomsCount} onChange={e => handleDyn('hotelRoomsCount', e.target.value)} />
              </div>
            </div>
            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel}>Meals Included</label>
              <div className={styles.toggleGroup}>
                {['Yes', 'No'].map(t => (
                  <button key={t} type="button" className={`${styles.toggleBtn} ${dynamic.mealsIncluded === t ? styles.activeToggle : ''}`} onClick={() => handleDyn('mealsIncluded', t)}>{t}</button>
                ))}
              </div>
            </div>
            <div className={styles.twoColGrid}>
              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>Check-in Time</label>
                <input type="time" className={styles.fieldInput} value={dynamic.checkInTime} onChange={e => handleDyn('checkInTime', e.target.value)} />
              </div>
              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>Check-out Time</label>
                <input type="time" className={styles.fieldInput} value={dynamic.checkOutTime} onChange={e => handleDyn('checkOutTime', e.target.value)} />
              </div>
            </div>
          </>
        );
      case 'farm_house':
        return (
          <>
            <SegmentedControl 
              label="Bedrooms" 
              options={['1', '2', '3', '4', '5+']} 
              value={dynamic.bedrooms} 
              onChange={v => handleDyn('bedrooms', v)} 
            />
            <SegmentedControl 
              label="Bathrooms" 
              options={['1', '2', '3', '4+']} 
              value={dynamic.bathrooms} 
              onChange={v => handleDyn('bathrooms', v)} 
            />
            <div className={styles.twoColGrid} style={{ marginTop: '20px' }}>
              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>Total Area</label>
                <div className={styles.inputWithSuffix}>
                  <input type="number" className={styles.fieldInput} placeholder="e.g. 5" value={dynamic.farmArea} onChange={e => handleDyn('farmArea', e.target.value)} />
                  <select className={styles.fieldSelectSuffix} value={dynamic.areaUnit} onChange={e => handleDyn('areaUnit', e.target.value)}>
                    <option>Acres</option><option>Bigha</option><option>Hectares</option><option>Sq-ft</option>
                  </select>
                </div>
              </div>
              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>Outdoor Space</label>
                <select className={styles.fieldSelect} value={dynamic.outdoorSpace} onChange={e => handleDyn('outdoorSpace', e.target.value)}>
                  <option>Garden</option><option>Pool</option><option>Both</option><option>None</option>
                </select>
              </div>
            </div>
            {renderAvailabilityFields()}
          </>
        );
      case 'agri_land':
        return (
          <>
            <div className={styles.twoColGrid}>
              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>Total Area</label>
                <div className={styles.inputWithSuffix}>
                  <input type="number" className={styles.fieldInput} placeholder="e.g. 5" value={dynamic.farmArea} onChange={e => handleDyn('farmArea', e.target.value)} />
                  <select className={styles.fieldSelectSuffix} value={dynamic.areaUnit} onChange={e => handleDyn('areaUnit', e.target.value)}>
                    <option>Acres</option><option>Bigha</option><option>Hectares</option><option>Sq-ft</option>
                  </select>
                </div>
              </div>
            </div>
            <div className={styles.twoColGrid}>
              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>Water Supply Available</label>
                <div className={styles.toggleGroup}>
                  {['Yes', 'No'].map(t => (
                    <button key={t} type="button" className={`${styles.toggleBtn} ${dynamic.waterSupply === t ? styles.activeToggle : ''}`} onClick={() => handleDyn('waterSupply', t)}>{t}</button>
                  ))}
                </div>
              </div>
              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>Fencing</label>
                <div className={styles.toggleGroup}>
                  {['Yes', 'No'].map(t => (
                    <button key={t} type="button" className={`${styles.toggleBtn} ${dynamic.fencing === t ? styles.activeToggle : ''}`} onClick={() => handleDyn('fencing', t)}>{t}</button>
                  ))}
                </div>
              </div>
            </div>
          </>
        );
      case 'office':
      case 'shop':
      case 'showroom':
        return (
          <>
            {propertyType === 'office' && (
              <div className={styles.twoColGrid}>
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>Capacity (Seats)</label>
                  <input type="number" className={styles.fieldInput} placeholder="e.g. 20" value={dynamic.capacity} onChange={e => handleDyn('capacity', e.target.value)} />
                </div>
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>Space Type</label>
                  <select className={styles.fieldSelect} value={dynamic.officeType} onChange={e => handleDyn('officeType', e.target.value)}>
                    <option>Co-working</option><option>Private Office</option><option>Meeting Room</option><option>Event Space</option>
                  </select>
                </div>
              </div>
            )}
            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel}>Furnished Status</label>
              <div className={styles.toggleGroup}>
                {['Furnished', 'Unfurnished', 'Semi-Furnished'].map(t => (
                  <button key={t} type="button" className={`${styles.toggleBtn} ${dynamic.furnishedStatus === t ? styles.activeToggle : ''}`} onClick={() => handleDyn('furnishedStatus', t)}>{t}</button>
                ))}
              </div>
            </div>
            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel}>Washroom</label>
              <div className={styles.toggleGroup}>
                {['Private', 'Common', 'None'].map(t => (
                  <button key={t} type="button" className={`${styles.toggleBtn} ${dynamic.commercialWashroom === t ? styles.activeToggle : ''}`} onClick={() => handleDyn('commercialWashroom', t)}>{t}</button>
                ))}
              </div>
            </div>
            {renderAreaFields()}
            {renderAvailabilityFields()}
          </>
        );
      default:
        return (
          <>
            {renderCoreFeatures(false, false)}
            {renderAreaFields()}
          </>
        );
    }
  };

  const getPurposeLabel = (pt) => {
    if (pt === 'hotel_stay') return 'Pricing (Nightly)';
    if (allowedPurposes.length === 1) return 'Monthly Rent';
    return 'Purpose & Price';
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
          <button type="button" className={styles.navBtn} onClick={() => navigate('/become-a-host/property-type')}>
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
            <h1 className={styles.title}>Details for your {propertyType.replace('_', ' ')}</h1>
            <p className={styles.subtitle}>Help guests understand exactly what your space offers.</p>
          </div>

          <div className={styles.card}>
            <h2 className={styles.sectionTitle}>{getPurposeLabel(propertyType)}</h2>
            
            {allowedPurposes.length > 1 && (
              <div className={styles.fieldGroup}>
                <div className={styles.toggleGroup}>
                  {allowedPurposes.map(t => (
                    <button 
                      key={t} 
                      type="button"
                      className={`${styles.toggleBtn} ${listingPurpose === t ? styles.activeToggle : ''}`} 
                      onClick={() => setListingPurpose(t)}
                    >
                      {t === 'Short-term' ? 'Booking (Short-term)' : `For ${t}`}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {listingPurpose === 'Rent' && (
              <div className={styles.subForm}>
                <div className={styles.twoColGrid}>
                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel}>Monthly Rent</label>
                    <div className={styles.inputPrefix}>
                      <span>₹</span>
                      <input type="number" className={styles.fieldInput} placeholder="Amount" value={listingPrice} onChange={e => setListingPrice(e.target.value)} />
                    </div>
                    <label className={styles.checkboxLabel}>
                      <input type="checkbox" checked={rentNegotiable} onChange={e => setRentNegotiable(e.target.checked)} />
                      Rent Negotiable
                    </label>
                  </div>
                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel}>Security Deposit</label>
                    <div className={styles.inputPrefix}>
                      <span>₹</span>
                      <input type="number" className={styles.fieldInput} placeholder="Optional" value={securityAmount} onChange={e => setSecurityAmount(e.target.value)} />
                    </div>
                  </div>
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>Maintenance Charges (Optional)</label>
                  <div className={styles.twoColGrid} style={{ gap: '12px' }}>
                    <div className={styles.inputPrefix}>
                      <span>₹</span>
                      <input type="number" className={styles.fieldInput} placeholder="Amount" value={maintenanceCharges} onChange={e => setMaintenanceCharges(e.target.value)} />
                    </div>
                    <select className={styles.fieldSelect} value={maintenancePeriod} onChange={e => setMaintenancePeriod(e.target.value)}>
                      <option>Monthly</option>
                      <option>Quarterly</option>
                      <option>Yearly</option>
                      <option>One-time</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
            
            {listingPurpose === 'Short-term' && (
              <div className={styles.subForm} style={{ marginTop: allowedPurposes.length > 1 ? '24px' : '0' }}>
                <div className={styles.premiumFormCard}>
                  <h2 className={styles.sectionTitle} style={{ marginTop: 0 }}>Nightly Price</h2>
                  <p className={styles.subtitle} style={{ marginBottom: '24px', fontSize: '14px' }}>Set your base price for guests per night.</p>
                  
                  <div className={styles.priceContainer}>
                    <div className={styles.priceRow}>
                      <div className={styles.priceInfo}>
                        <h3 className={styles.cardTitle} style={{ fontSize: '16px' }}>Base Price</h3>
                        <p className={styles.cardDesc} style={{ fontSize: '13px', margin: 0, color: 'var(--text-secondary)' }}>Per night</p>
                      </div>
                      <div className={styles.inputWrapper}>
                        <span className={styles.prefix}>₹</span>
                        <input type="text" className={styles.priceInput} value={listingPrice === 0 ? '' : listingPrice} onChange={handlePriceChange} placeholder="0" />
                      </div>
                    </div>
                    
                    <div className={styles.priceRow}>
                      <div className={styles.priceInfo}>
                        <h3 className={styles.cardTitle} style={{ fontSize: '16px' }}>Weekend adjustment</h3>
                        <p className={styles.cardDesc} style={{ fontSize: '13px', margin: 0, color: 'var(--text-secondary)' }}>Fridays & Saturdays</p>
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

                <div style={{ marginTop: '32px' }}>
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
                            <h3 className={styles.cardTitle} style={{ fontSize: '15px', margin: '8px 0 4px 0' }}>{discount.title}</h3>
                            <p className={styles.cardDesc} style={{ fontSize: '13px', margin: 0, color: 'var(--text-secondary)' }}>{discount.desc}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className={styles.card}>
            <h2 className={styles.sectionTitle}>Property Features</h2>
            <div className={styles.featuresLayout}>
              {renderDynamicFields()}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BecomeHostDetails;

