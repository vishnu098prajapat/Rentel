import React from 'react';
import { useSelector } from 'react-redux';
import CitySection from './CitySection';
import styles from './CityGroupedSection.module.css';

const CityGroupedSection = () => {
  const groupedListings = useSelector(state => state.listings.groupedByCity);
  const cities = Object.keys(groupedListings);

  return (
    <div className={styles.wrapper}>
      {cities.map(city => (
        <CitySection 
          key={city} 
          cityName={city} 
          listings={groupedListings[city]} 
        />
      ))}
    </div>
  );
};

export default CityGroupedSection;
