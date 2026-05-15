import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import ListingCard from '../ListingCard/ListingCard';
import styles from './CitySection.module.css';

const CitySection = ({ cityName, listings }) => {
  const scrollRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeft(scrollLeft > 0);
      setShowRight(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [listings]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? -clientWidth : clientWidth;
      scrollRef.current.scrollBy({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const getTitle = (city) => {
    const titles = {
      "Jaipur": "Popular homes in Jaipur",
      "Goa": "Places to stay in Goa",
      "Mumbai": "Homes in Mumbai",
      "Bangalore": "Stay in Bangalore",
      "Manali": "Explore Manali"
    };
    return titles[city] || `Stay in ${city}`;
  };

  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>{getTitle(cityName)}</h2>
        <button className={styles.titleBtn}>
          <ArrowRight size={18} />
        </button>
      </div>

      <div className={styles.cityRowWrapper}>
        {showLeft && (
          <button className={`${styles.navBtn} ${styles.leftBtn}`} onClick={() => scroll('left')}>
            <ChevronLeft size={20} />
          </button>
        )}
        
        <div className={styles.cityRow} ref={scrollRef} onScroll={checkScroll}>
          {listings.map(listing => (
            <div key={listing.id} className={styles.cardWrapper}>
              <ListingCard listing={listing} />
            </div>
          ))}
        </div>

        {showRight && (
          <button className={`${styles.navBtn} ${styles.rightBtn}`} onClick={() => scroll('right')}>
            <ChevronRight size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

export default CitySection;
