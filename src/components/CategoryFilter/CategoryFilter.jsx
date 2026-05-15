import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCategory } from '../../features/listings/listingsSlice';
import styles from './CategoryFilter.module.css';

const categories = [
  { id: 'all', label: 'All Stays', icon: '🏠' },
  { id: 'Beach Villa', label: 'Beach Villa', icon: '🏖️' },
  { id: 'Hill Station', label: 'Hill Station', icon: '🏔️' },
  { id: 'City PG', label: 'City PG', icon: '🌆' },
  { id: 'Luxury Hotel', label: 'Luxury Hotel', icon: '🏨' },
  { id: 'Farmhouse', label: 'Farmhouse', icon: '🌿' },
  { id: 'With Pool', label: 'With Pool', icon: '🏊' },
  { id: 'Pet Friendly', label: 'Pet Friendly', icon: '🐾' },
  { id: 'Family Stay', label: 'Family Stay', icon: '👨‍👩‍👧' },
];

const CategoryFilter = () => {
  const dispatch = useDispatch();
  const selectedCategory = useSelector(state => state.listings.selectedCategory);

  return (
    <div className={styles.filterBar}>
      {categories.map((cat) => (
        <button
          key={cat.id}
          className={`${styles.categoryItem} ${selectedCategory === cat.id ? styles.active : ''}`}
          onClick={() => dispatch(setCategory(cat.id))}
        >
          <span className={styles.categoryIcon}>{cat.icon}</span>
          <span className={styles.categoryLabel}>{cat.label}</span>
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
