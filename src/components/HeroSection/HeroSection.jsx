import React, { useEffect, useState, useRef } from 'react';
import { Play, ArrowRight, Star, TrendingUp, Search, MapPin, Calendar, Users, CheckCircle, Crown } from 'lucide-react';
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
      <div className={styles.heroLeft}>
        <div className={styles.heroBadge}>
          <TrendingUp size={12} />
          <span>#1 PREMIUM RENTAL PLATFORM</span>
        </div>

        <h1 className={styles.heroTitle}>
          Find Your Perfect <br />
          <span className={styles.heroTitleGradient}>Dream Stay</span>
        </h1>

        <p className={styles.heroSubtitle}>
          Discover handpicked luxury villas, boutique hotels, and premium PGs 
          across India with verified hosts.
        </p>

        <div className={styles.heroSearch}>
          <div className={styles.heroSearchSection}>
            <MapPin className={styles.heroSearchIcon} />
            <div className={styles.heroSearchText}>
              <span className={styles.heroSearchLabel}>WHERE</span>
              <span className={styles.heroSearchPlaceholder}>Search destinations</span>
            </div>
          </div>
          <div className={styles.heroSearchDivider}></div>
          <div className={styles.heroSearchSection}>
            <Calendar className={styles.heroSearchIcon} />
            <div className={styles.heroSearchText}>
              <span className={styles.heroSearchLabel}>WHEN</span>
              <span className={styles.heroSearchPlaceholder}>Add dates</span>
            </div>
          </div>
          <div className={styles.heroSearchDivider}></div>
          <div className={styles.heroSearchSection}>
            <Users className={styles.heroSearchIcon} />
            <div className={styles.heroSearchText}>
              <span className={styles.heroSearchLabel}>GUESTS</span>
              <span className={styles.heroSearchPlaceholder}>Add guests</span>
            </div>
          </div>
          <button className={styles.heroSearchBtn}>
            <Search size={18} color="white" />
          </button>
        </div>

        <div className={styles.heroBtns}>
          <button className={styles.btnPrimary}>
            Start Exploring <ArrowRight size={16} />
          </button>
          <button className={styles.btnSecondary}>
            <div className={styles.playIcon}><Play size={12} fill="white" color="white" /></div>
            Watch Video
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

      <div className={styles.heroRight}>
        <div className={styles.sliderContainer}>
          {/* Top Floating Card */}
          <div className={styles.topFloatingCard}>
            <div className={styles.royalBadge}><Crown size={14} color="#FFB347" fill="#FFB347" /></div>
            <span>Royal Heritage Villa</span>
            <ArrowRight size={12} className={styles.arrow} />
          </div>

          <div className={styles.sliderTrack}>
            {sliderImages.map((img, idx) => (
              <img 
                key={idx} 
                src={img} 
                alt="Luxury Stay" 
                className={`${styles.sliderImage} ${activeSlide === idx ? styles.active : ''}`}
              />
            ))}
          </div>
          
          <div className={styles.sliderDots}>
            {sliderImages.map((_, idx) => (
              <button 
                key={idx} 
                className={`${styles.dot} ${activeSlide === idx ? styles.active : ''}`}
                onClick={() => setActiveSlide(idx)}
              />
            ))}
          </div>

          {/* Bottom Floating Badge */}
          <div className={styles.bottomFloatingBadge}>
            <div className={styles.verifiedIcon}><CheckCircle size={14} color="#4CAF50" fill="#E8F5E9" /></div>
            <span>10K+ Verified Stays</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
