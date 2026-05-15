import React from 'react';
import ListingCard from '../ListingCard/ListingCard';
import styles from './FilteredGrid.module.css';

const FilteredGrid = ({ listings }) => {
  return (
    <div className={styles.grid}>
      {listings.map(listing => (
        <ListingCard key={listing.id} listing={listing} />
      ))}
    </div>
  );
};

export default FilteredGrid;
