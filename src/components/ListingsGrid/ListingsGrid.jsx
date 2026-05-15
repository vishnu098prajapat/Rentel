import React from 'react';
import { useSelector } from 'react-redux';
import CityGroupedSection from './CityGroupedSection';
import FilteredGrid from './FilteredGrid';
import styles from './ListingsGrid.module.css';

const ListingsGrid = () => {
  const listings = useSelector(state => state.listings.filteredListings);
  const selectedCategory = useSelector(state => state.listings.selectedCategory);

  return (
    <section className={`container ${styles.gridSection}`}>
      {selectedCategory === 'all' ? (
        <CityGroupedSection />
      ) : (
        <>
          <div className={styles.sectionHeader}>
            <div className={styles.titleGroup}>
              <h2 className={styles.title}>
                {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Stays
              </h2>
            </div>
          </div>
          <FilteredGrid listings={listings} />
        </>
      )}

      {listings.length === 0 && (
        <div className={styles.noResults}>
          <h3>No properties found</h3>
          <p>Try adjusting your filters or location</p>
        </div>
      )}
    </section>
  );
};

export default ListingsGrid;
