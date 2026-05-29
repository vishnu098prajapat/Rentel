import React, { useEffect } from 'react';
import HeroSection from '../../components/HeroSection/HeroSection';
import CategoryFilter from '../../components/CategoryFilter/CategoryFilter';
import ListingsGrid from '../../components/ListingsGrid/ListingsGrid';
import styles from './Home.module.css';

const Home = () => {
  useEffect(() => {
    // Intersection Observer for fade-in-up animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));
    
    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.home}>
      <HeroSection />
      <CategoryFilter />
      <ListingsGrid />
    </div>
  );
};

export default Home;
