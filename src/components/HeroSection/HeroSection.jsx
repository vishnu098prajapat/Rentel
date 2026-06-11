import React, { useEffect, useState, useRef } from 'react';
import { Play, ArrowRight, Star, TrendingUp, Search, MapPin, Calendar, Users, CheckCircle, Crown } from 'lucide-react';
import SearchSection from './SearchSection';
import styles from './HeroSection.module.css';

const sliderImages = [
  "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200",
  "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1200",
  "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200",
  "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1200",
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200",
];

const HeroSection = () => {
  const statsRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [counts, setCounts] = useState({
    properties: 0,
    guests: 0,
    cities: 0,
    rating: 0
  });

  // Slider Logic
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % sliderImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const animateValue = (start, end, duration, callback, isDecimal = false) => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      let current = easedProgress * (end - start) + start;
      if (isDecimal) {
        current = parseFloat(current.toFixed(1));
      } else {
        current = Math.floor(current);
      }
      callback(current);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animateValue(0, 10, 2000, (v) => setCounts(prev => ({ ...prev, properties: v })));
          animateValue(0, 50, 2000, (v) => setCounts(prev => ({ ...prev, guests: v })));
          animateValue(0, 200, 2000, (v) => setCounts(prev => ({ ...prev, cities: v })));
          animateValue(0, 4.9, 2000, (v) => setCounts(prev => ({ ...prev, rating: v })), true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (statsRef.current) {
      observer.observe(statsRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.heroSection}>
      {/* Background Slider */}
      <div className={styles.heroBackground}>
        {sliderImages.map((img, idx) => (
          <img 
            key={idx} 
            src={img} 
            alt="Luxury Stay" 
            className={`${styles.sliderImage} ${activeSlide === idx ? styles.active : ''}`}
          />
        ))}
        <div className={styles.heroOverlay}></div>
      </div>

      {/* Centered Content */}
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>
          Find Your Perfect <span className={styles.heroTitleHighlight}>Stay</span>
        </h1>

        <p className={styles.heroSubtitle}>
          Explore India's finest rentals, from luxury villas to cozy PGs. No brokerage, 100% verified.
        </p>

        {/* Search Bar */}
        <div className={styles.searchContainer}>
          <SearchSection />
        </div>

        <div className={styles.heroBtns}>
          <button className={styles.btnPrimary} onClick={() => {
            window.scrollTo({
              top: window.innerHeight,
              behavior: 'smooth'
            });
          }}>
            Start Exploring <ArrowRight size={16} />
          </button>
        </div>

        <div className={styles.heroStats} ref={statsRef}>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>{counts.properties}K+</span>
            <span className={styles.statLabel}>Properties</span>
          </div>
          <div className={styles.statDivider}></div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>{counts.guests}K+</span>
            <span className={styles.statLabel}>Guests</span>
          </div>
          <div className={styles.statDivider}></div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>{counts.cities}+</span>
            <span className={styles.statLabel}>Cities</span>
          </div>
          <div className={styles.statDivider}></div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>{counts.rating} ★</span>
            <span className={styles.statLabel}>Rating</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
