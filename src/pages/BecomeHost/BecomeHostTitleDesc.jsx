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
  const [description, setDescription] = useState(draft.description || 'Enjoy a relaxing stay at this peaceful and centrally-located place. Whether you are traveling for business or leisure, you will find everything you need here. The space is fully equipped, family-friendly, and ready to welcome you!');
  
  const MAX_TITLE_CHARS = 50;
  const MAX_DESC_CHARS = 500;

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
        <div className={styles.headerNav}>
          <button className={styles.navBtn} onClick={() => navigate('/become-a-host/photos')}>
            <ChevronLeft size={20} />
            <span>Back</span>
          </button>
          <button className={`${styles.navBtn} ${styles.navBtnNext}`} onClick={() => {
            dispatch(updateDraft({ title, highlights: selectedHighlights, description }));
            navigate('/become-a-host/booking');
          }} disabled={title.trim().length === 0 || description.trim().length === 0}>
            <span>Next</span>
            <ChevronRight size={20} />
          </button>
        </div>
      </header>

      <div className={styles.content}>
        <div className={styles.headerText}>
          <h1 className={styles.title}>Describe your place</h1>
          <p className={styles.subtitle}>Give it a catchy title and write a short description to attract guests.</p>
        </div>

        <div className={styles.mainArea}>
          <div className={styles.splitLayout}>
            {/* LEFT COL */}
            <div className={styles.leftCol}>
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
                        style={isSelected ? { borderColor: hl.color, backgroundColor: `${hl.color}15`, color: hl.color } : {}}
                      >
                        <span className={styles.pillIcon} style={{ color: isSelected ? hl.color : 'var(--text-secondary)' }}>
                          {hl.icon}
                        </span>
                        <span className={styles.pillText} style={{ color: isSelected ? hl.color : 'var(--text-main)' }}>
                          {hl.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Your listing title</h2>
                <div className={styles.textareaWrapper}>
                  <textarea
                    className={styles.textarea}
                    placeholder="e.g. Stunning Lakeside Villa with Private Pool"
                    value={title}
                    onChange={(e) => {
                      if (e.target.value.length <= MAX_TITLE_CHARS) {
                        setTitle(e.target.value);
                      }
                    }}
                    rows={2}
                  />
                  <div className={`${styles.charCount} ${title.length === MAX_TITLE_CHARS ? styles.charCountMax : ''}`}>
                    {title.length}/{MAX_TITLE_CHARS}
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COL */}
            <div className={styles.rightCol}>
              <div className={styles.section} style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <h2 className={styles.sectionTitle}>Create your description</h2>
                <div className={styles.textareaWrapper} style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <textarea
                    className={styles.descTextarea}
                    placeholder="e.g. Unwind in this luxurious and peaceful space. Enjoy panoramic views, top-notch amenities, and a vibrant neighborhood..."
                    value={description}
                    onChange={(e) => {
                      if (e.target.value.length <= MAX_DESC_CHARS) {
                        setDescription(e.target.value);
                      }
                    }}
                  />
                  <div className={`${styles.charCount} ${description.length === MAX_DESC_CHARS ? styles.charCountMax : ''}`}>
                    {description.length}/{MAX_DESC_CHARS}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BecomeHostTitleDesc;
