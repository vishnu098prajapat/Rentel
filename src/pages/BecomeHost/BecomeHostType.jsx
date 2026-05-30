import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateDraft } from '../../features/host/hostSlice';
import styles from './BecomeHostType.module.css';
import { 
  Home, Building2, Coffee, Tent, 
  Hotel, TreePine, PenTool, Users, DoorOpen,
  ChevronLeft, ChevronRight, BedDouble, Bath
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
  { id: 'house', label: 'House', icon: <Home size={28} />, color: '#FF385C' },
  { id: 'flat', label: 'Flat / Apartment', icon: <Building2 size={28} />, color: '#6C5CE7' },
  { id: 'villa', label: 'Villa', icon: <Home size={28} />, color: '#00B894' },
  { id: 'pg', label: 'PG / Hostel', icon: <Users size={28} />, color: '#E17055' },
  { id: 'hotel', label: 'Hotel / Resort', icon: <Hotel size={28} />, color: '#0984E3' },
  { id: 'guest', label: 'Guest house', icon: <Coffee size={28} />, color: '#FDCB6E' },
  { id: 'farm', label: 'Farm / Farmhouse', icon: <TreePine size={28} />, color: '#2ECC71' },
  { id: 'office', label: 'Cafe / Office space', icon: <Building2 size={28} />, color: '#A29BFE' },
  { id: 'cabin', label: 'Cabin / Cottage', icon: <Home size={28} />, color: '#F39C12' },
  { id: 'tree', label: 'Tree house', icon: <TreePine size={28} />, color: '#27AE60' },
  { id: 'tent', label: 'Tent / Camp', icon: <Tent size={28} />, color: '#F1C40F' },
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

  const [guests, setGuests] = useState(draft.guests || 1);
  const [bedrooms, setBedrooms] = useState(draft.bedrooms || 1);
  const [beds, setBeds] = useState(draft.beds || 1);
  const [bathrooms, setBathrooms] = useState(draft.bathrooms || 1);
  const [listingPurpose, setListingPurpose] = useState(draft.listingPurpose || 'Rent');
  const [listingPrice, setListingPrice] = useState(draft.listingPrice || '');
  const [rentNegotiable, setRentNegotiable] = useState(draft.rentNegotiable || false);
  const [securityAmount, setSecurityAmount] = useState(draft.securityAmount || '');
  const [maintenanceCharges, setMaintenanceCharges] = useState(draft.maintenanceCharges || '');
  const [maintenancePeriod, setMaintenancePeriod] = useState(draft.maintenancePeriod || 'Monthly');

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

  const handleNext = () => {
    if (selectedType) {
      const finalType = selectedType === 'other' && customType.trim() !== '' ? customType : selectedType;
      dispatch(updateDraft({ 
        propertyType: finalType, 
        customPropertyType: customType, 
        type: finalType,
        guests, bedrooms, beds, bathrooms, dynamic, 
        listingPurpose, listingPrice, rentNegotiable, securityAmount, maintenanceCharges, maintenancePeriod
      }));
      navigate('/become-a-host/location');
    }
  };

  const renderDynamicFields = () => {
    if (!selectedType) return null;
    
    switch(selectedType) {
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
                  <button key={t} className={`${styles.toggleBtn} ${dynamic.furnished === t ? styles.activeToggle : ''}`} onClick={(e) => { e.stopPropagation(); handleDyn('furnished', t); }}>{t}</button>
                ))}
              </div>
            </div>
            <div className={styles.fieldRow}>
              <label className={styles.fieldLabel}>Floor Number (Optional)</label>
              <input type="text" className={styles.fieldInput} placeholder="e.g. 5th Floor" value={dynamic.floorNumber} onChange={e => handleDyn('floorNumber', e.target.value)} onClick={e => e.stopPropagation()} />
            </div>
          </div>
        );
      case 'house':
      case 'villa':
        return (
          <div className={styles.dynamicSection}>
            <div className={styles.fieldRow}>
              <label className={styles.fieldLabel}>BHK Type</label>
              <select className={styles.fieldSelect} value={dynamic.bhkType} onChange={e => handleBhkChange(e.target.value)} onClick={e => e.stopPropagation()}>
                <option>1 BHK</option><option>2 BHK</option><option>3 BHK</option><option>4+ BHK</option>
              </select>
            </div>
            <div className={styles.fieldRow}>
              <label className={styles.fieldLabel}>Plot Size (Optional)</label>
              <input type="text" className={styles.fieldInput} placeholder="e.g. 1500 sqft" value={dynamic.plotSize} onChange={e => handleDyn('plotSize', e.target.value)} onClick={e => e.stopPropagation()} />
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
              <select className={styles.fieldSelect} value={dynamic.pgRoomType} onChange={e => handleDyn('pgRoomType', e.target.value)} onClick={e => e.stopPropagation()}>
                <option>Single</option><option>Double</option><option>Triple</option><option>Dormitory</option>
              </select>
            </div>
            <div className={styles.fieldRow}>
              <label className={styles.fieldLabel}>For</label>
              <div className={styles.toggleGroup}>
                {['Boys', 'Girls', 'Unisex'].map(t => (
                  <button key={t} className={`${styles.toggleBtn} ${dynamic.pgGender === t ? styles.activeToggle : ''}`} onClick={(e) => { e.stopPropagation(); handleDyn('pgGender', t); }}>{t}</button>
                ))}
              </div>
            </div>
            <div className={styles.fieldRow}>
              <label className={styles.fieldLabel}>Bathrooms</label>
              <div className={styles.toggleGroup}>
                {['Attached', 'Common'].map(t => (
                  <button key={t} className={`${styles.toggleBtn} ${dynamic.pgBathrooms === t ? styles.activeToggle : ''}`} onClick={(e) => { e.stopPropagation(); handleDyn('pgBathrooms', t); }}>{t}</button>
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
              <select className={styles.fieldSelect} value={dynamic.hotelRoomType} onChange={e => handleDyn('hotelRoomType', e.target.value)} onClick={e => e.stopPropagation()}>
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
                  <button key={t} className={`${styles.toggleBtn} ${dynamic.mealsIncluded === t ? styles.activeToggle : ''}`} onClick={(e) => { e.stopPropagation(); handleDyn('mealsIncluded', t); }}>{t}</button>
                ))}
              </div>
            </div>
            <div className={styles.fieldRow} style={{ flexDirection: 'row', gap: '16px' }}>
              <div style={{ flex: 1 }}>
                <label className={styles.fieldLabel}>Check-in</label>
                <input type="time" className={styles.fieldInput} value={dynamic.checkInTime} onChange={e => handleDyn('checkInTime', e.target.value)} onClick={e => e.stopPropagation()} />
              </div>
              <div style={{ flex: 1 }}>
                <label className={styles.fieldLabel}>Check-out</label>
                <input type="time" className={styles.fieldInput} value={dynamic.checkOutTime} onChange={e => handleDyn('checkOutTime', e.target.value)} onClick={e => e.stopPropagation()} />
              </div>
            </div>
          </div>
        );
      case 'farm':
        return (
          <div className={styles.dynamicSection}>
            <div className={styles.fieldRow}>
              <label className={styles.fieldLabel}>Area (Acres/Bigha)</label>
              <input type="text" className={styles.fieldInput} placeholder="e.g. 5 Acres" value={dynamic.farmArea} onChange={e => handleDyn('farmArea', e.target.value)} onClick={e => e.stopPropagation()} />
            </div>
            <div className={styles.fieldRow}>
              <label className={styles.fieldLabel}>Outdoor Space</label>
              <select className={styles.fieldSelect} value={dynamic.outdoorSpace} onChange={e => handleDyn('outdoorSpace', e.target.value)} onClick={e => e.stopPropagation()}>
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
              <select className={styles.fieldSelect} value={dynamic.officeType} onChange={e => handleDyn('officeType', e.target.value)} onClick={e => e.stopPropagation()}>
                <option>Cafe</option><option>Co-working</option><option>Event space</option><option>Private office</option>
              </select>
            </div>
            <div className={styles.fieldRow}>
              <label className={styles.fieldLabel}>Hours Available</label>
              <div className={styles.toggleGroup}>
                {['Full day', 'Half day', 'Hourly'].map(t => (
                  <button key={t} className={`${styles.toggleBtn} ${dynamic.hoursAvailable === t ? styles.activeToggle : ''}`} onClick={(e) => { e.stopPropagation(); handleDyn('hoursAvailable', t); }}>{t}</button>
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
                <input type="number" min="1" className={styles.fieldInput} placeholder="Min" value={dynamic.sleepsMin} onChange={e => handleDyn('sleepsMin', e.target.value)} onClick={e => e.stopPropagation()} />
                <span style={{ fontWeight: 600 }}>to</span>
                <input type="number" min="1" className={styles.fieldInput} placeholder="Max" value={dynamic.sleepsMax} onChange={e => handleDyn('sleepsMax', e.target.value)} onClick={e => e.stopPropagation()} />
              </div>
            </div>
            <div className={styles.fieldRow}>
              <label className={styles.fieldLabel}>Bathroom Type</label>
              <div className={styles.toggleGroup}>
                {['Indoor', 'Outdoor'].map(t => (
                  <button key={t} className={`${styles.toggleBtn} ${dynamic.bathroomType === t ? styles.activeToggle : ''}`} onClick={(e) => { e.stopPropagation(); handleDyn('bathroomType', t); }}>{t}</button>
                ))}
              </div>
            </div>
          </div>
        );
      default:
        return null;
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

          {selectedType && (
            <div className={styles.expandedDetailsFormWrapper} ref={detailsRef}>
              <div className={styles.expandedDetailsForm}>
                <h2 className={styles.title} style={{ marginTop: '0', textAlign: 'left', fontSize: '22px' }}>Property Specific Details</h2>
                
                <div style={{ marginBottom: '32px', background: 'var(--bg-secondary, #FAFAFA)', padding: '24px', borderRadius: '16px', border: '1px solid var(--border)' }}>
                  <div className={styles.fieldRow}>
                    <label className={styles.fieldLabel} style={{ fontSize: '18px', marginBottom: '16px' }}>What is the purpose of this listing?</label>
                    <div className={styles.toggleGroup} style={{ marginBottom: '24px' }}>
                      {['Rent', 'Sell'].map(t => (
                        <button 
                          key={t} 
                          className={`${styles.toggleBtn} ${listingPurpose === t ? styles.activeToggle : ''}`} 
                          onClick={() => setListingPurpose(t)}
                          style={{ flex: 1, padding: '12px', fontSize: '16px' }}
                        >
                          {t === 'Rent' ? 'For Rent' : 'For Sale'}
                        </button>
                      ))}
                    </div>
                  </div>
                  {listingPurpose === 'Rent' ? (
                    <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid var(--border)' }}>
                      <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', color: 'var(--text-main)' }}>Rent/Lease Details</h3>
                      
                      <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
                        <div style={{ flex: 1 }}>
                          <label className={styles.fieldLabel} style={{ marginBottom: '8px' }}>Monthly Rent</label>
                          <div style={{ position: 'relative' }}>
                            <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', fontSize: '16px', fontWeight: 'bold', color: 'var(--text-main)' }}>₹</span>
                            <input type="number" className={styles.fieldInput} placeholder="Enter Total Rent" value={listingPrice} onChange={e => setListingPrice(e.target.value)} style={{ paddingLeft: '36px', background: 'var(--card-bg)' }} />
                          </div>
                          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '12px', fontSize: '14px', cursor: 'pointer', color: 'var(--text-main)' }}>
                            <input type="checkbox" checked={rentNegotiable} onChange={e => setRentNegotiable(e.target.checked)} style={{ width: '18px', height: '18px', accentColor: '#FF385C' }} />
                            Rent Negotiable
                          </label>
                        </div>

                        <div style={{ flex: 1 }}>
                          <label className={styles.fieldLabel} style={{ marginBottom: '8px' }}>Security Amount (Optional)</label>
                          <div style={{ position: 'relative' }}>
                            <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', fontSize: '16px', fontWeight: 'bold', color: 'var(--text-main)' }}>₹</span>
                            <input type="number" className={styles.fieldInput} placeholder="Security Amount" value={securityAmount} onChange={e => setSecurityAmount(e.target.value)} style={{ paddingLeft: '36px', background: 'var(--card-bg)' }} />
                          </div>
                        </div>
                      </div>

                      <div className={styles.fieldRow} style={{ marginBottom: 0 }}>
                        <label className={styles.fieldLabel} style={{ marginBottom: '8px' }}>Maintenance Charges (Optional)</label>
                        <div style={{ display: 'flex', gap: '12px' }}>
                          <div style={{ position: 'relative', flex: 2 }}>
                            <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', fontSize: '16px', fontWeight: 'bold', color: 'var(--text-main)' }}>₹</span>
                            <input type="number" className={styles.fieldInput} placeholder="Maintenance Amount" value={maintenanceCharges} onChange={e => setMaintenanceCharges(e.target.value)} style={{ paddingLeft: '36px', background: 'var(--card-bg)' }} />
                          </div>
                          <select className={styles.fieldSelect} value={maintenancePeriod} onChange={e => setMaintenancePeriod(e.target.value)} style={{ flex: 1, background: 'var(--card-bg)' }}>
                            <option>Monthly</option>
                            <option>Quarterly</option>
                            <option>Yearly</option>
                            <option>One-time</option>
                          </select>
                        </div>
                      </div>

                    </div>
                  ) : (
                    <div className={styles.fieldRow} style={{ marginBottom: 0 }}>
                      <label className={styles.fieldLabel} style={{ fontSize: '18px', marginBottom: '8px' }}>Set your Sale Price</label>
                      <div style={{ position: 'relative' }}>
                        <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', fontSize: '18px', fontWeight: 'bold', color: 'var(--text-main)' }}>₹</span>
                        <input type="number" className={styles.fieldInput} placeholder="e.g. 5000000" value={listingPrice} onChange={e => setListingPrice(e.target.value)} style={{ paddingLeft: '36px', fontSize: '18px', fontWeight: '600', background: 'var(--card-bg)' }} />
                      </div>
                    </div>
                  )}
                </div>

                <div className={styles.horizontalForm}>
                  <div className={styles.formCol}>
                    {renderDynamicFields()}
                  </div>
                  
                  <div className={styles.formCol}>
                    <label className={styles.fieldLabel} style={{ marginBottom: '8px' }}>Common Facilities</label>
                    <div style={{ border: '1px solid var(--border)', borderRadius: '12px', background: 'var(--card-bg)', padding: '16px' }}>
                      <Counter label="Guests" icon={<Users size={24} />} value={guests} onChange={setGuests} />
                      {(!['flat', 'pg', 'office', 'hotel', 'guest'].includes(selectedType)) && (
                        <Counter label="Bedrooms" icon={<DoorOpen size={24} />} value={bedrooms} onChange={setBedrooms} />
                      )}
                      <Counter label="Beds" icon={<BedDouble size={24} />} value={beds} onChange={setBeds} />
                      <Counter label="Bathrooms" icon={<Bath size={24} />} value={bathrooms} onChange={setBathrooms} />
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default BecomeHostType;
