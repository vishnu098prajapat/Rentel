import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './BecomeHostDescription.module.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const BecomeHostDescription = () => {
  const navigate = useNavigate();
  const [description, setDescription] = useState('Enjoy a relaxing stay at this peaceful and centrally-located place. Whether you are traveling for business or leisure, you will find everything you need here. The space is fully equipped, family-friendly, and ready to welcome you!');
  const MAX_CHARS = 500;

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
      <button className={`${styles.sideArrow} ${styles.leftArrow}`} onClick={() => navigate('/become-a-host/title-desc')}>
        <ChevronLeft size={28} />
      </button>

      {/* Next arrow */}
      <button 
        className={`${styles.sideArrow} ${styles.rightArrow}`} 
        onClick={() => navigate('/become-a-host/booking')} 
        disabled={description.trim().length === 0}
      >
        <ChevronRight size={28} />
      </button>

      <div className={styles.content}>
        <div className={styles.mainArea}>
          <div className={styles.headerText}>
            <h1 className={styles.title}>Create your description</h1>
          </div>

          <div className={styles.textareaWrapper}>
            <textarea
              className={styles.textarea}
              placeholder="e.g. Relax with the whole family at this peaceful place to stay. Enjoy the beautiful garden and close proximity to the beach..."
              value={description}
              onChange={(e) => {
                if (e.target.value.length <= MAX_CHARS) {
                  setDescription(e.target.value);
                }
              }}
              rows={8}
            />
            <div className={`${styles.charCount} ${description.length === MAX_CHARS ? styles.charCountMax : ''}`}>
              {description.length}/{MAX_CHARS}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BecomeHostDescription;
