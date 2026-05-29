import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './BecomeHostSafety.module.css';
import { ChevronLeft, ChevronRight, ShieldAlert } from 'lucide-react';

const BecomeHostSafety = () => {
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState([]);

  const toggleItem = (id) => {
    setSelectedItems(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const safetyItems = [
    {
      id: 'weapons',
      title: 'Weapons on the premises',
      desc: 'Let guests know if there are any secured weapons on the property.'
    },
    {
      id: 'cameras',
      title: 'Exterior security cameras',
      desc: 'Cameras are only allowed outside and must be disclosed.'
    },
    {
      id: 'noise',
      title: 'Noise monitoring devices',
      desc: 'Devices that measure sound levels without recording audio.'
    }
  ];

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerLeft} onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <div className={styles.logoIcon}>
            <svg width="20" height="20" viewBox="0 0 32 32" fill="none"><path d="M16 2L2 12V30H12V20H20V30H30V12L16 2Z" fill="white"/></svg>
          </div>
          <span className={styles.logoText}>StayVista</span>
        </div>
      </header>

      {/* Back arrow */}
      <button className={`${styles.sideArrow} ${styles.leftArrow}`} onClick={() => navigate('/become-a-host/discounts')}>
        <ChevronLeft size={28} />
      </button>

      {/* Next arrow */}
      <button 
        className={`${styles.sideArrow} ${styles.rightArrow}`} 
        onClick={() => navigate('/become-a-host/final-details')} 
      >
        <ChevronRight size={28} />
      </button>

      <div className={styles.content}>
        <div className={styles.mainArea}>
          <div className={styles.headerText}>
            <h1 className={styles.title}>Safety & property details</h1>
            <p className={styles.subtitle}>Does your property have any of the following?</p>
          </div>

          <div className={styles.optionsContainer}>
            {safetyItems.map((item) => {
              const isSelected = selectedItems.includes(item.id);
              
              return (
                <div 
                  key={item.id}
                  className={`${styles.safetyCard} ${isSelected ? styles.selectedCard : ''}`}
                  onClick={() => toggleItem(item.id)}
                >
                  <div className={styles.cardContent}>
                    <h3 className={styles.cardTitle}>{item.title}</h3>
                    <p className={styles.cardDesc}>{item.desc}</p>
                  </div>

                  {/* Custom Toggle Switch */}
                  <div className={`${styles.toggleSwitch} ${isSelected ? styles.toggleOn : ''}`}>
                    <div className={styles.toggleKnob}></div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className={styles.infoBox}>
            <div className={styles.infoIconWrapper}>
              <ShieldAlert size={20} color="#E31C5F" />
            </div>
            <div className={styles.infoTextWrapper}>
              <h4 className={styles.infoTitle}>Important guidelines</h4>
              <p className={styles.infoDesc}>
                Indoor cameras are strictly prohibited. Make sure to comply with local laws and our safety policies.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BecomeHostSafety;
