import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateDraft } from '../../features/host/hostSlice';
import styles from './BecomeHostTitleDesc.module.css';
import { ChevronLeft, ChevronRight, Flower2, Sparkles, Baby, Palette, MapPin, Expand } from 'lucide-react';

const highlightsList = [
  { id: 'peaceful', label: 'Peaceful', icon: <Flower2 size={18} />, color: '#00B894' },
  { id: 'unique', label: 'Unique', icon: <Sparkles size={18} />, color: '#6C5CE7' },
  { id: 'family', label: 'Family-friendly', icon: <Baby size={18} />, color: '#FF9F43' },
  { id: 'stylish', label: 'Stylish', icon: <Palette size={18} />, color: '#E84393' },
  { id: 'central', label: 'Central', icon: <MapPin size={18} />, color: '#0984E3' },
  { id: 'spacious', label: 'Spacious', icon: <Expand size={18} />, color: '#00CEC9' },
];

const BecomeHostTitleDesc = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const draft = useSelector(state => state.host?.draftListing || {});
  
  const [title, setTitle] = useState(draft.title || '');
  const [selectedHighlights, setSelectedHighlights] = useState(draft.highlights || []);
  const MAX_CHARS = 50;

  const toggleHighlight = (id) => {
    setSelectedHighlights(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      } else {
        if (prev.length >= 2) return prev; // Max 2 allowed
        return [...prev, id];
      }
    });
  };

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
      <button className={`${styles.sideArrow} ${styles.leftArrow}`} onClick={() => navigate('/become-a-host/photos')}>
        <ChevronLeft size={28} />
      </button>

      {/* Next arrow */}
      <button 
        className={`${styles.sideArrow} ${styles.rightArrow}`} 
        onClick={() => {
          dispatch(updateDraft({ title, highlights: selectedHighlights }));
          navigate('/become-a-host/description');
        }} 
        disabled={title.trim().length === 0}
      >
        <ChevronRight size={28} />
      </button>

      <div className={styles.content}>
        <div className={styles.headerText}>
          <h1 className={styles.title}>Let's give your place a title</h1>
          <p className={styles.subtitle}>Short titles work best. Choose some highlights and write a catchy name.</p>
        </div>

        <div className={styles.mainArea}>
          
          {/* Highlights Section */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Choose up to 2 highlights</h2>
            <div className={styles.highlightsContainer}>
              {highlightsList.map((hl) => {
                const isSelected = selectedHighlights.includes(hl.id);
                const isDisabled = !isSelected && selectedHighlights.length >= 2;
                return (
                  <button
                    key={hl.id}
                    className={`${styles.highlightPill} ${isSelected ? styles.selectedPill : ''} ${isDisabled ? styles.disabledPill : ''}`}
                    onClick={() => toggleHighlight(hl.id)}
                    style={isSelected ? { borderColor: hl.color, backgroundColor: `${hl.color}10` } : {}}
                  >
                    <span className={styles.pillIcon} style={{ color: isSelected ? hl.color : '#717171' }}>
                      {hl.icon}
                    </span>
                    <span className={styles.pillText} style={{ color: isSelected ? hl.color : '#222' }}>
                      {hl.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Title Textarea Section */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Your listing title</h2>
            <div className={styles.textareaWrapper}>
              <textarea
                className={styles.textarea}
                placeholder="e.g. Beautiful apartment with a view"
                value={title}
                onChange={(e) => {
                  if (e.target.value.length <= MAX_CHARS) {
                    setTitle(e.target.value);
                  }
                }}
                rows={2}
              />
              <div className={`${styles.charCount} ${title.length === MAX_CHARS ? styles.charCountMax : ''}`}>
                {title.length}/{MAX_CHARS}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BecomeHostTitleDesc;
