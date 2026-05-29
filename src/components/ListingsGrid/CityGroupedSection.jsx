import React from 'react';
import { useSelector } from 'react-redux';
import CitySection from './CitySection';
import styles from './CityGroupedSection.module.css';

const CityGroupedSection = () => {
  const filteredListings = useSelector(state => state.listings.filteredListings);
  const activeCity = useSelector(state => state.filters.city);

  // Dynamically group listings by city reactively!
  const citiesList = ["Jaipur", "Goa", "Mumbai", "Bangalore", "Manali"];
  const grouped = {};
  citiesList.forEach(city => {
    grouped[city] = filteredListings.filter(l => l.city.toLowerCase() === city.toLowerCase());
  });

  // Only display city sections that have matching listings and match the searched city
  const activeCities = citiesList.filter(city => {
    const hasListings = grouped[city].length > 0;
    if (!activeCity) return hasListings;
    return city.toLowerCase().includes(activeCity.toLowerCase()) && hasListings;
  });

  return (
    <div className={styles.wrapper}>
      {activeCities.map(city => (
        <CitySection 
          key={city} 
          cityName={city} 
          listings={grouped[city]} 
        />
      ))}
    </div>
  );
};

export default CityGroupedSection;
