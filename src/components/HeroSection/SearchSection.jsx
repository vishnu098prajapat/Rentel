import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Users, Search, Navigation, Building, Trees, Palmtree, Mountain, Plus, Minus, ChevronLeft, ChevronRight } from 'lucide-react';
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
  const [activePopup, setActivePopup] = useState(null); // 'location' | 'dates' | 'guests' | null
  const [location, setLocation] = useState('');
  
  // Tab toggle at the top of the date picker: 'dates' | 'flexible'
  const [activeTab, setActiveTab] = useState('dates');
  
  // Month page slider starting index: 4 corresponds to May 2026
  const [startMonthPage, setStartMonthPage] = useState(4);
  
  // Calendar checkin-checkout selection
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  
  // Guest counts
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [pets, setPets] = useState(0);

  // Compute month details dynamically at render time!
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
    const guestCount = adults + children;
    
    dispatch(updateFilters({ city: location, propertyType: 'all' }));
    dispatch(filterBySearch({ city: location, propertyType: 'all' }));
    setActivePopup(null);

    // Redirect to the new premium Search Results split screen!
    navigate(`/search?city=${encodeURIComponent(location)}&checkIn=${encodeURIComponent(checkIn || '')}&checkOut=${encodeURIComponent(checkOut || '')}&guests=${guestCount}`);
  };

  // Select Suggested Destination
  const handleSelectDest = (destName) => {
    setLocation(destName);
    setActivePopup(null); // Close the dropdown on selection
  };



  // Handle Calendar Day click dynamically
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

  // Check if calendar day falls in active range
  const isDayInRange = (day, monthIndex, year) => {
    if (!checkIn || !checkOut) return false;
    const current = new Date(year, monthIndex, day);
    const start = parseDateStr(checkIn);
    const end = parseDateStr(checkOut);
    return current >= start && current <= end;
  };

  // Check if date is in the past (Today is 19 May 2026)
  const isDateDisabled = (day, monthIndex, year) => {
    const current = new Date(year, monthIndex, day);
    const today = new Date(2026, 4, 19);
    return current < today;
  };

  // Formatted date string to display
  const getDatesLabel = () => {
    if (checkIn && checkOut) {
      return `${checkIn.split(' ')[0]} ${checkIn.split(' ')[1]} - ${checkOut.split(' ')[0]} ${checkOut.split(' ')[1]}`;
    }
    if (checkIn) {
      return `${checkIn.split(' ')[0]} ${checkIn.split(' ')[1]}...`;
    }
    return 'Add dates';
  };

  // Formatted guest string to display
  const getGuestsLabel = () => {
    const total = adults + children;
    if (total > 0) {
      let label = `${total} guest${total > 1 ? 's' : ''}`;
      if (infants > 0) label += `, ${infants} infant${infants > 1 ? 's' : ''}`;
      if (pets > 0) label += `, ${pets} pet${pets > 1 ? 's' : ''}`;
      return label;
    }
    return 'Add guests';
  };

  // Suggested destinations matching mock listing cities!
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
      <div className={styles.searchCard}>
        
        {/* WHERE PANEL */}
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
              onClick={(e) => {
                e.stopPropagation();
                setActivePopup('location');
              }}
              style={{ border: 'none', outline: 'none', background: 'transparent', padding: 0, width: '100%', fontWeight: location ? '600' : '400' }}
            />
          </div>

          {/* Location Popup Overlay */}
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

        {/* WHEN PANEL */}
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

          {/* Calendar Popup Overlay — Dynamic side-by-side month slider (May to December 2026 & beyond) */}
          {activePopup === 'dates' && (
            <div className={styles.calendarPopupContainer} onClick={(e) => e.stopPropagation()}>
              
              <div className={styles.sliderWrapper}>
                {startMonthPage > 4 && (
                  <button 
                    className={`${styles.pageNavBtn} ${styles.navLeft}`}
                    onClick={() => setStartMonthPage(Math.max(4, startMonthPage - 1))}
                  >
                    <ChevronLeft size={16} />
                  </button>
                )}

                <div className={styles.monthsGrid}>
                  
                  {/* Month 1 */}
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

                  {/* Month 2 */}
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
                  <button 
                    className={`${styles.pageNavBtn} ${styles.navRight}`}
                    onClick={() => setStartMonthPage(startMonthPage + 1)}
                  >
                    <ChevronRight size={16} />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        <div className={styles.searchDivider}></div>

        {/* WHO PANEL */}
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

          {/* Guests Popup Overlay */}
          {activePopup === 'guests' && (
            <div className={styles.guestsPopupContainer} onClick={(e) => e.stopPropagation()}>
              {/* Adults Counter */}
              <div className={styles.guestRow}>
                <div className={styles.guestMetaTextCol}>
                  <span className={styles.guestTitle}>Adults</span>
                  <span className={styles.guestSubtitle}>Ages 13 or above</span>
                </div>
                <div className={styles.guestControls}>
                  <button 
                    className={styles.controlBtn} 
                    disabled={adults === 0}
                    onClick={() => setAdults(Math.max(0, adults - 1))}
                  >
                    <Minus size={14} />
                  </button>
                  <span className={styles.controlVal}>{adults}</span>
                  <button 
                    className={styles.controlBtn}
                    onClick={() => setAdults(adults + 1)}
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              {/* Children Counter */}
              <div className={styles.guestRow}>
                <div className={styles.guestMetaTextCol}>
                  <span className={styles.guestTitle}>Children</span>
                  <span className={styles.guestSubtitle}>Ages 2–12</span>
                </div>
                <div className={styles.guestControls}>
                  <button 
                    className={styles.controlBtn} 
                    disabled={children === 0}
                    onClick={() => setChildren(Math.max(0, children - 1))}
                  >
                    <Minus size={14} />
                  </button>
                  <span className={styles.controlVal}>{children}</span>
                  <button 
                    className={styles.controlBtn}
                    onClick={() => setChildren(children + 1)}
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              {/* Infants Counter */}
              <div className={styles.guestRow}>
                <div className={styles.guestMetaTextCol}>
                  <span className={styles.guestTitle}>Infants</span>
                  <span className={styles.guestSubtitle}>Under 2</span>
                </div>
                <div className={styles.guestControls}>
                  <button 
                    className={styles.controlBtn} 
                    disabled={infants === 0}
                    onClick={() => setInfants(Math.max(0, infants - 1))}
                  >
                    <Minus size={14} />
                  </button>
                  <span className={styles.controlVal}>{infants}</span>
                  <button 
                    className={styles.controlBtn}
                    onClick={() => setInfants(infants + 1)}
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              {/* Pets Counter */}
              <div className={styles.guestRow}>
                <div className={styles.guestMetaTextCol}>
                  <span className={styles.guestTitle}>Pets</span>
                  <span className={styles.guestSubtitle}>Bringing a service animal?</span>
                </div>
                <div className={styles.guestControls}>
                  <button 
                    className={styles.controlBtn} 
                    disabled={pets === 0}
                    onClick={() => setPets(Math.max(0, pets - 1))}
                  >
                    <Minus size={14} />
                  </button>
                  <span className={styles.controlVal}>{pets}</span>
                  <button 
                    className={styles.controlBtn}
                    onClick={() => setPets(pets + 1)}
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <button className={styles.searchBtn} onClick={handleSearch}>
          <Search className={styles.searchBtnIcon} />
        </button>
      </div>
    </div>
  );
};

export default SearchSection;
