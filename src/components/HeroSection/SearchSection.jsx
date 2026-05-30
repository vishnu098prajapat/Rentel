import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Users, Search, Building, Home, IndianRupee, Plus, Minus, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { updateFilters } from '../../features/filters/filtersSlice';
import { filterBySearch } from '../../features/listings/listingsSlice';
import styles from './SearchSection.module.css';

// Helper to parse date strings into Date objects
const parseDateStr = (str) => {
  if (!str) return null;
  const [day, monthName, year] = str.split(' ');
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const mIdx = months.indexOf(monthName);
  return new Date(parseInt(year), mIdx, parseInt(day));
};

// Dynamically compute offset and days for any month
const getMonthDetails = (year, monthIndex) => {
  const date = new Date(year, monthIndex, 1);
  const startDay = date.getDay();
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const monthName = months[monthIndex % 12];
  
  const offset = Array(startDay).fill(null);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  
  return { monthName, offset, days, year: year + Math.floor(monthIndex / 12) };
};

const SearchSection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchRef = useRef(null);
  
  // Interactive state
  const [activePopup, setActivePopup] = useState(null); // 'location' | 'dates' | 'guests' | 'property' | 'budget' | 'pgType' | null
  const [location, setLocation] = useState('');
  
  // Search Mode
  const [searchMode, setSearchMode] = useState('holiday'); // 'holiday' | 'rent' | 'pg'
  
  // ======================
  // HOLIDAY STATES
  // ======================
  const [startMonthPage, setStartMonthPage] = useState(4); // May 2026
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [pets, setPets] = useState(0);

  // ======================
  // RENT STATES
  // ======================
  const [selectedRentProps, setSelectedRentProps] = useState([]);
  
  // ======================
  // PG STATES
  // ======================
  const [selectedPgGender, setSelectedPgGender] = useState('');
  const [selectedPgTypes, setSelectedPgTypes] = useState([]);

  // ======================
  // SHARED LONG-TERM STATES (Budget)
  // ======================
  const [budgetOption, setBudgetOption] = useState('Any');
  const [minBudget, setMinBudget] = useState('');
  const [maxBudget, setMaxBudget] = useState('');

  const month1 = getMonthDetails(2026, startMonthPage);
  const month2 = getMonthDetails(2026, startMonthPage + 1);

  // Close popups when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setActivePopup(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.stopPropagation();
    
    // Dispatch defaults
    dispatch(updateFilters({ city: location }));
    dispatch(filterBySearch({ city: location }));
    setActivePopup(null);

    // Build query params based on mode
    let params = new URLSearchParams();
    if (location) params.append('city', location);
    params.append('mode', searchMode);

    if (searchMode === 'holiday') {
      const guestCount = adults + children;
      if (checkIn) params.append('checkIn', checkIn);
      if (checkOut) params.append('checkOut', checkOut);
      if (guestCount > 0) params.append('guests', guestCount);
    } 
    else if (searchMode === 'rent') {
      if (selectedRentProps.length > 0) params.append('props', selectedRentProps.join(','));
      params.append('budget', budgetOption !== 'Custom' ? budgetOption : `${minBudget}-${maxBudget}`);
    } 
    else if (searchMode === 'pg') {
      params.append('gender', selectedPgGender);
      if (selectedPgTypes.length > 0) params.append('pgTypes', selectedPgTypes.join(','));
      params.append('budget', budgetOption !== 'Custom' ? budgetOption : `${minBudget}-${maxBudget}`);
    }

    navigate(`/search?${params.toString()}`);
  };

  const handleSelectDest = (destName) => {
    setLocation(destName);
    setActivePopup(null);
  };

  // Toggle helpers for Pills
  const toggleRentProp = (prop) => {
    setSelectedRentProps(prev => 
      prev.includes(prop) ? prev.filter(p => p !== prop) : [...prev, prop]
    );
  };

  const togglePgType = (type) => {
    setSelectedPgTypes(prev => 
      prev.includes(type) ? prev.filter(p => p !== type) : [...prev, type]
    );
  };

  const handleDayClick = (day, monthIndex, year) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const dateStr = `${day} ${months[monthIndex]} ${year}`;
    const clickedDate = new Date(year, monthIndex, day);
    
    if (!checkIn || (checkIn && checkOut)) {
      setCheckIn(dateStr);
      setCheckOut(null);
    } else {
      const checkInDate = parseDateStr(checkIn);
      if (clickedDate > checkInDate) {
        setCheckOut(dateStr);
      } else {
        setCheckIn(dateStr);
        setCheckOut(null);
      }
    }
  };

  const isDayInRange = (day, monthIndex, year) => {
    if (!checkIn || !checkOut) return false;
    const current = new Date(year, monthIndex, day);
    const start = parseDateStr(checkIn);
    const end = parseDateStr(checkOut);
    return current >= start && current <= end;
  };

  const isDateDisabled = (day, monthIndex, year) => {
    const current = new Date(year, monthIndex, day);
    const today = new Date(2026, 4, 19);
    return current < today;
  };

  // Formatters
  const getDatesLabel = () => {
    if (checkIn && checkOut) return `${checkIn.split(' ')[0]} ${checkIn.split(' ')[1]} - ${checkOut.split(' ')[0]} ${checkOut.split(' ')[1]}`;
    if (checkIn) return `${checkIn.split(' ')[0]} ${checkIn.split(' ')[1]}...`;
    return 'Add dates';
  };

  const getGuestsLabel = () => {
    const total = adults + children;
    if (total > 0) return `${total} guest${total > 1 ? 's' : ''}`;
    return 'Add guests';
  };

  const getRentPropsLabel = () => {
    if (selectedRentProps.length === 0) return 'Any';
    if (selectedRentProps.length === 1) return selectedRentProps[0];
    return `${selectedRentProps.length} selected`;
  };

  const getPgTypeLabel = () => {
    if (selectedPgTypes.length === 0 && !selectedPgGender) return 'PG';
    if (selectedPgTypes.length === 0) return selectedPgGender;
    return `${selectedPgGender ? selectedPgGender + ', ' : ''}${selectedPgTypes.length} type${selectedPgTypes.length > 1 ? 's' : ''}`;
  };

  const getBudgetLabel = () => {
    if (budgetOption === 'Custom') {
      if (minBudget && maxBudget) return `₹${minBudget} - ₹${maxBudget}`;
      if (minBudget) return `From ₹${minBudget}`;
      if (maxBudget) return `Up to ₹${maxBudget}`;
      return 'Any';
    }
    return budgetOption;
  };

  const allDestinations = [
    { name: 'Jaipur', sub: 'The Pink City, Rajasthan', colorClass: styles.nearbyIcon },
    { name: 'Goa', sub: 'Sun, sand & beaches', colorClass: styles.goaIcon },
    { name: 'Mumbai', sub: 'City of dreams, Maharashtra', colorClass: styles.noidaIcon },
    { name: 'Bangalore', sub: 'Silicon Valley, Karnataka', colorClass: styles.gurgaonIcon },
    { name: 'Manali', sub: 'Himalayan peaks, HP', colorClass: styles.dehradunIcon }
  ];

  const suggestedDestinations = allDestinations.filter(dest => dest.name.toLowerCase().includes(location.toLowerCase()));

  return (
    <div className={styles.searchWrapper} ref={searchRef}>
      
      {/* 3-TAB SWITCHER */}
      <div className={styles.searchTabs}>
        <button 
          className={`${styles.tabBtn} ${searchMode === 'holiday' ? styles.tabActive : ''}`}
          onClick={() => { setSearchMode('holiday'); setActivePopup(null); }}
        >
          Holiday
        </button>
        <button 
          className={`${styles.tabBtn} ${searchMode === 'rent' ? styles.tabActive : ''}`}
          onClick={() => { setSearchMode('rent'); setActivePopup(null); }}
        >
          Rent
        </button>
        <button 
          className={`${styles.tabBtn} ${searchMode === 'pg' ? styles.tabActive : ''}`}
          onClick={() => { setSearchMode('pg'); setActivePopup(null); }}
        >
          PG
        </button>
      </div>

      <div className={styles.searchCard}>
        
        {/* WHERE PANEL (Shared across all modes) */}
        <div 
          className={`${styles.searchSection} ${activePopup === 'location' ? styles.sectionActive : ''}`}
          onClick={() => setActivePopup('location')}
        >
          <MapPin className={styles.searchIcon} />
          <div className={styles.searchTextBlock}>
            <label className={styles.searchLabel}>Where</label>
            <input 
              type="text" 
              placeholder="Search destinations" 
              className={styles.searchPlaceholder}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onClick={(e) => { e.stopPropagation(); setActivePopup('location'); }}
              style={{ border: 'none', outline: 'none', background: 'transparent', padding: 0, width: '100%', fontWeight: location ? '600' : '400' }}
            />
          </div>

          {activePopup === 'location' && (
            <div className={styles.popupContainer} onClick={(e) => e.stopPropagation()}>
              <h4 className={styles.popupHeaderTitle}>Suggested destinations</h4>
              <div className={styles.destList}>
                {suggestedDestinations.length > 0 ? (
                  suggestedDestinations.map((dest, idx) => (
                    <div key={idx} className={styles.destItem} onClick={() => handleSelectDest(dest.name)}>
                      <div className={`${styles.destIconWrapper} ${dest.colorClass}`}>
                        <MapPin size={18} />
                      </div>
                      <div className={styles.destMeta}>
                         <span className={styles.destName}>{dest.name}</span>
                         <span className={styles.destSub}>{dest.sub}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className={styles.noResults}>No destinations found</div>
                )}
              </div>
            </div>
          )}
        </div>
        
        <div className={styles.searchDivider}></div>

        {/* ================= MIDDLE PANEL ================= */}
        {searchMode === 'holiday' && (
          <div 
            className={`${styles.searchSection} ${activePopup === 'dates' ? styles.sectionActive : ''}`}
            onClick={() => setActivePopup('dates')}
          >
            <Calendar className={styles.searchIcon} />
            <div className={styles.searchTextBlock}>
              <label className={styles.searchLabel}>When</label>
              <span className={styles.searchPlaceholder} style={{ fontWeight: checkIn ? '600' : '400' }}>
                {getDatesLabel()}
              </span>
            </div>

            {activePopup === 'dates' && (
              <div className={styles.calendarPopupContainer} onClick={(e) => e.stopPropagation()}>
                <div className={styles.sliderWrapper}>
                  {startMonthPage > 4 && (
                    <button className={`${styles.pageNavBtn} ${styles.navLeft}`} onClick={() => setStartMonthPage(Math.max(4, startMonthPage - 1))}>
                      <ChevronLeft size={16} />
                    </button>
                  )}
                  <div className={styles.monthsGrid}>
                    <div className={styles.monthCol}>
                      <h5 className={styles.monthTitle}>{month1.monthName} {month1.year}</h5>
                      <div className={styles.weekHeaders}>
                        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((h, i) => <span key={i}>{h}</span>)}
                      </div>
                      <div className={styles.daysGrid}>
                        {month1.offset.map((_, idx) => <span key={`offset1-${idx}`} className={styles.emptyDay}></span>)}
                        {month1.days.map((day) => {
                          const dateStr = `${day} ${month1.monthName} ${month1.year}`;
                          const isSelected = checkIn === dateStr || checkOut === dateStr;
                          const inRange = isDayInRange(day, startMonthPage, 2026);
                          const isDisabled = isDateDisabled(day, startMonthPage, 2026);
                          return (
                            <button 
                              key={`m1-${day}`} 
                              disabled={isDisabled}
                              className={`${styles.dayBtn} ${isSelected ? styles.daySelected : ''} ${inRange ? styles.dayInRange : ''} ${isDisabled ? styles.dayDisabled : ''}`}
                              onClick={() => handleDayClick(day, startMonthPage, 2026)}
                            >
                              {day}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                    <div className={styles.monthCol}>
                      <h5 className={styles.monthTitle}>{month2.monthName} {month2.year}</h5>
                      <div className={styles.weekHeaders}>
                        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((h, i) => <span key={i}>{h}</span>)}
                      </div>
                      <div className={styles.daysGrid}>
                        {month2.offset.map((_, idx) => <span key={`offset2-${idx}`} className={styles.emptyDay}></span>)}
                        {month2.days.map((day) => {
                          const dateStr = `${day} ${month2.monthName} ${month2.year}`;
                          const isSelected = checkIn === dateStr || checkOut === dateStr;
                          const inRange = isDayInRange(day, startMonthPage + 1, 2026);
                          const isDisabled = isDateDisabled(day, startMonthPage + 1, 2026);
                          return (
                            <button 
                              key={`m2-${day}`} 
                              disabled={isDisabled}
                              className={`${styles.dayBtn} ${isSelected ? styles.daySelected : ''} ${inRange ? styles.dayInRange : ''} ${isDisabled ? styles.dayDisabled : ''}`}
                              onClick={() => handleDayClick(day, startMonthPage + 1, 2026)}
                            >
                              {day}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  {startMonthPage < 11 && (
                    <button className={`${styles.pageNavBtn} ${styles.navRight}`} onClick={() => setStartMonthPage(startMonthPage + 1)}>
                      <ChevronRight size={16} />
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {searchMode === 'rent' && (
          <div 
            className={`${styles.searchSection} ${activePopup === 'property' ? styles.sectionActive : ''}`}
            onClick={() => setActivePopup('property')}
          >
            <Home className={styles.searchIcon} />
            <div className={styles.searchTextBlock}>
              <label className={styles.searchLabel}>Property</label>
              <span className={styles.searchPlaceholder} style={{ fontWeight: selectedRentProps.length > 0 ? '600' : '400' }}>
                {getRentPropsLabel()}
              </span>
            </div>
            
            {activePopup === 'property' && (
              <div className={`${styles.popupContainer} ${styles.largePopup}`} onClick={(e) => e.stopPropagation()}>
                
                <div className={styles.categoryBlock}>
                  <h5 className={styles.categoryTitle}>Residential</h5>
                  <div className={styles.pillGroup}>
                    {['Flat', 'House/Villa', '1 BHK', '2 BHK', '3 BHK', '4+ BHK'].map(item => (
                      <button 
                        key={item}
                        className={`${styles.pillBtn} ${selectedRentProps.includes(item) ? styles.pillActive : ''}`}
                        onClick={() => toggleRentProp(item)}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                <div className={styles.categoryBlock}>
                  <h5 className={styles.categoryTitle}>Commercial</h5>
                  <div className={styles.pillGroup}>
                    {['Office', 'Shop', 'Showroom'].map(item => (
                      <button 
                        key={item}
                        className={`${styles.pillBtn} ${selectedRentProps.includes(item) ? styles.pillActive : ''}`}
                        onClick={() => toggleRentProp(item)}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                <div className={styles.categoryBlock}>
                  <h5 className={styles.categoryTitle}>Other Property Types</h5>
                  <div className={styles.pillGroup}>
                    {['Agricultural Land', 'Farm House'].map(item => (
                      <button 
                        key={item}
                        className={`${styles.pillBtn} ${selectedRentProps.includes(item) ? styles.pillActive : ''}`}
                        onClick={() => toggleRentProp(item)}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            )}
          </div>
        )}

        {searchMode === 'pg' && (
          <div 
            className={`${styles.searchSection} ${activePopup === 'pgType' ? styles.sectionActive : ''}`}
            onClick={() => setActivePopup('pgType')}
          >
            <Building className={styles.searchIcon} />
            <div className={styles.searchTextBlock}>
              <label className={styles.searchLabel}>PG Type</label>
              <span className={styles.searchPlaceholder} style={{ fontWeight: (selectedPgTypes.length > 0 || selectedPgGender) ? '600' : '400' }}>
                {getPgTypeLabel()}
              </span>
            </div>
            
            {activePopup === 'pgType' && (
              <div className={`${styles.popupContainer} ${styles.largePopup}`} onClick={(e) => e.stopPropagation()}>
                
                <div className={styles.categoryBlock}>
                  <h5 className={styles.categoryTitle}>Gender</h5>
                  <div className={styles.pillGroup}>
                    {['Boys', 'Girls', 'Co-ed'].map(item => (
                      <button 
                        key={item}
                        className={`${styles.pillBtn} ${selectedPgGender === item ? styles.pillActive : ''}`}
                        onClick={() => setSelectedPgGender(item)}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                <div className={styles.categoryBlock}>
                  <h5 className={styles.categoryTitle}>Looking For</h5>
                  <div className={styles.pillGroup}>
                    {['PG', 'Shared-Flat', 'Single Room', 'Double Sharing', 'Triple Sharing'].map(item => (
                      <button 
                        key={item}
                        className={`${styles.pillBtn} ${selectedPgTypes.includes(item) ? styles.pillActive : ''}`}
                        onClick={() => togglePgType(item)}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            )}
          </div>
        )}

        <div className={styles.searchDivider}></div>

        {/* ================= RIGHT PANEL ================= */}
        {searchMode === 'holiday' && (
          <div 
            className={`${styles.searchSection} ${activePopup === 'guests' ? styles.sectionActive : ''}`}
            onClick={() => setActivePopup('guests')}
          >
            <Users className={styles.searchIcon} />
            <div className={styles.searchTextBlock}>
              <label className={styles.searchLabel}>Who</label>
              <span className={styles.searchPlaceholder} style={{ fontWeight: adults + children > 0 ? '600' : '400' }}>
                {getGuestsLabel()}
              </span>
            </div>

            {activePopup === 'guests' && (
              <div className={styles.guestsPopupContainer} onClick={(e) => e.stopPropagation()}>
                <div className={styles.guestRow}>
                  <div className={styles.guestMetaTextCol}>
                    <span className={styles.guestTitle}>Adults</span>
                    <span className={styles.guestSubtitle}>Ages 13 or above</span>
                  </div>
                  <div className={styles.guestControls}>
                    <button className={styles.controlBtn} disabled={adults === 0} onClick={() => setAdults(Math.max(0, adults - 1))}><Minus size={14} /></button>
                    <span className={styles.controlVal}>{adults}</span>
                    <button className={styles.controlBtn} onClick={() => setAdults(adults + 1)}><Plus size={14} /></button>
                  </div>
                </div>
                <div className={styles.guestRow}>
                  <div className={styles.guestMetaTextCol}>
                    <span className={styles.guestTitle}>Children</span>
                    <span className={styles.guestSubtitle}>Ages 2–12</span>
                  </div>
                  <div className={styles.guestControls}>
                    <button className={styles.controlBtn} disabled={children === 0} onClick={() => setChildren(Math.max(0, children - 1))}><Minus size={14} /></button>
                    <span className={styles.controlVal}>{children}</span>
                    <button className={styles.controlBtn} onClick={() => setChildren(children + 1)}><Plus size={14} /></button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {(searchMode === 'rent' || searchMode === 'pg') && (
          <div 
            className={`${styles.searchSection} ${activePopup === 'budget' ? styles.sectionActive : ''}`}
            onClick={() => setActivePopup('budget')}
          >
            <IndianRupee className={styles.searchIcon} />
            <div className={styles.searchTextBlock}>
              <label className={styles.searchLabel}>Budget</label>
              <span className={styles.searchPlaceholder} style={{ fontWeight: budgetOption !== 'Any' ? '600' : '400' }}>
                {getBudgetLabel()}
              </span>
            </div>
            
            {activePopup === 'budget' && (
              <div className={`${styles.popupContainer} ${styles.largePopup}`} onClick={(e) => e.stopPropagation()}>
                
                <div className={styles.categoryBlock}>
                  <h5 className={styles.categoryTitle}>Quick Select</h5>
                  <div className={styles.pillGroup}>
                    {(searchMode === 'rent' 
                      ? ['Any', 'Under ₹10k', 'Under ₹50k', 'Under ₹1 Lakh', 'Under ₹2 Lakhs']
                      : ['Any', 'Under ₹5,000', 'Under ₹10,000', '₹10k - ₹20k', '₹20k - ₹50k']
                    ).map(b => (
                      <button 
                        key={b}
                        className={`${styles.pillBtn} ${budgetOption === b ? styles.pillActive : ''}`}
                        onClick={() => { setBudgetOption(b); setMinBudget(''); setMaxBudget(''); setActivePopup(null); }}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                <div className={styles.categoryBlock}>
                  <h5 className={styles.categoryTitle}>Custom Budget</h5>
                  <div className={styles.customBudgetRow}>
                    <div className={styles.budgetInputWrapper}>
                      <span className={styles.rupeePrefix}>₹</span>
                      <input 
                        type="number" 
                        placeholder="Min" 
                        value={minBudget} 
                        onChange={(e) => { setMinBudget(e.target.value); setBudgetOption('Custom'); }}
                        className={styles.budgetInput}
                      />
                    </div>
                    <span className={styles.budgetDash}>-</span>
                    <div className={styles.budgetInputWrapper}>
                      <span className={styles.rupeePrefix}>₹</span>
                      <input 
                        type="number" 
                        placeholder="Max" 
                        value={maxBudget} 
                        onChange={(e) => { setMaxBudget(e.target.value); setBudgetOption('Custom'); }}
                        className={styles.budgetInput}
                      />
                    </div>
                    <button 
                      className={styles.applyBudgetBtn}
                      onClick={() => setActivePopup(null)}
                    >
                      <Check size={16} />
                    </button>
                  </div>
                </div>

              </div>
            )}
          </div>
        )}

        <button className={styles.searchBtn} onClick={handleSearch}>
          <Search className={styles.searchBtnIcon} />
        </button>
      </div>
    </div>
  );
};

export default SearchSection;
