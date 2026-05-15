import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { MapPin, Calendar, Users, Search } from 'lucide-react';
import { updateFilters } from '../../features/filters/filtersSlice';
import { filterBySearch } from '../../features/listings/listingsSlice';
import styles from './SearchSection.module.css';

const SearchSection = () => {
  const dispatch = useDispatch();
  const [location, setLocation] = useState('');
  const [dates, setDates] = useState('');
  const [guests, setGuests] = useState('');

  const handleSearch = () => {
    dispatch(updateFilters({ city: location, propertyType: 'all' }));
    dispatch(filterBySearch({ city: location, propertyType: 'all' }));
  };

  return (
    <div className={styles.searchWrapper}>
      <div className={styles.searchCard}>
        <div className={styles.searchSection}>
          <MapPin className={styles.searchIcon} />
          <div className={styles.searchTextBlock}>
            <label className={styles.searchLabel}>WHERE</label>
            <input 
              type="text" 
              placeholder="Search destinations..." 
              className={styles.searchPlaceholder}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              style={{ border: 'none', outline: 'none', background: 'transparent', padding: 0, width: '100%' }}
            />
          </div>
        </div>
        
        <div className={styles.searchDivider}></div>

        <div className={styles.searchSection}>
          <Calendar className={styles.searchIcon} />
          <div className={styles.searchTextBlock}>
            <label className={styles.searchLabel}>CHECK-IN — CHECK-OUT</label>
            <input 
              type="text" 
              placeholder="Add dates" 
              className={styles.searchPlaceholder}
              value={dates}
              onChange={(e) => setDates(e.target.value)}
              style={{ border: 'none', outline: 'none', background: 'transparent', padding: 0, width: '100%' }}
            />
          </div>
        </div>

        <div className={styles.searchDivider}></div>

        <div className={styles.searchSection}>
          <Users className={styles.searchIcon} />
          <div className={styles.searchTextBlock}>
            <label className={styles.searchLabel}>GUESTS</label>
            <input 
              type="text" 
              placeholder="Add guests" 
              className={styles.searchPlaceholder}
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              style={{ border: 'none', outline: 'none', background: 'transparent', padding: 0, width: '100%' }}
            />
          </div>
        </div>

        <button className={styles.searchBtn} onClick={handleSearch}>
          <Search className={styles.searchBtnIcon} />
        </button>
      </div>
    </div>
  );
};

export default SearchSection;
