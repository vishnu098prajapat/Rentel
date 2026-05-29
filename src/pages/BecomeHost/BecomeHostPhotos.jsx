import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateDraft } from '../../features/host/hostSlice';
import styles from './BecomeHostPhotos.module.css';
import { ChevronLeft, ChevronRight, ImagePlus, X } from 'lucide-react';

const BecomeHostPhotos = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const draft = useSelector(state => state.host?.draftListing || {});
  const [photos, setPhotos] = useState(draft.photos || []);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    addPhotos(files);
  };

  const addPhotos = async (files) => {
    const validFiles = files.filter(file => file.type.startsWith('image/'));
    const newPhotosCount = Math.min(validFiles.length, 5 - photos.length);
    
    if (newPhotosCount > 0) {
      const filesToProcess = validFiles.slice(0, newPhotosCount);
      
      const promises = filesToProcess.map(file => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(file);
        });
      });

      const base64Images = await Promise.all(promises);
      setPhotos(prev => [...prev, ...base64Images]);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      addPhotos(Array.from(e.dataTransfer.files));
      e.dataTransfer.clearData();
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const removePhoto = (index) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
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
          <button className={styles.navBtn} onClick={() => navigate('/become-a-host/details')}>
            <ChevronLeft size={20} />
            <span>Back</span>
          </button>
          <button className={`${styles.navBtn} ${styles.navBtnNext}`} onClick={() => {
            dispatch(updateDraft({ photos }));
            navigate('/become-a-host/title-desc');
          }} disabled={photos.length < 5}>
            <span>Next</span>
            <ChevronRight size={20} />
          </button>
        </div>
      </header>

      <div className={styles.content}>
        <div className={styles.headerText}>
          <h1 className={styles.title}>Add some photos of your place</h1>
          <p className={styles.subtitle}>You'll need exactly 5 photos to get started. You can add more or make changes later.</p>
        </div>

        <div className={styles.mainArea}>
          {photos.length === 0 ? (
            <div 
              className={styles.uploadArea} 
              onDrop={handleDrop} 
              onDragOver={handleDragOver}
              onClick={() => fileInputRef.current.click()}
            >
              <div className={styles.uploadContent}>
                <ImagePlus size={64} className={styles.uploadIcon} />
                <h3 className={styles.uploadTitle}>Drag your photos here</h3>
                <p className={styles.uploadDesc}>Choose exactly 5 photos</p>
                <div className={styles.uploadBtn}>Upload from your device</div>
              </div>
            </div>
          ) : (
            <div className={styles.photoGrid}>
              {/* Cover Photo */}
              <div className={`${styles.photoItem} ${styles.photoCover}`}>
                <img src={photos[0]} alt="Cover" className={styles.photoImg} />
                <button className={styles.deleteBtn} onClick={(e) => { e.stopPropagation(); removePhoto(0); }}>
                  <X size={16} />
                </button>
                <div className={styles.coverLabel}>Cover Photo</div>
              </div>

              {/* Other 4 Photos */}
              <div className={styles.smallPhotosGrid}>
                {[1, 2, 3, 4].map((index) => (
                  <div key={index} className={styles.photoItem}>
                    {photos[index] ? (
                      <>
                        <img src={photos[index]} alt={`Photo ${index}`} className={styles.photoImg} />
                        <button className={styles.deleteBtn} onClick={(e) => { e.stopPropagation(); removePhoto(index); }}>
                          <X size={16} />
                        </button>
                      </>
                    ) : (
                      <div 
                        className={styles.emptyPhoto}
                        onClick={() => fileInputRef.current.click()}
                      >
                        <ImagePlus size={24} className={styles.emptyIcon} />
                        <span>Add Photo</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <input 
          type="file" 
          multiple 
          accept="image/*" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          style={{ display: 'none' }} 
        />
      </div>
    </div>
  );
};

export default BecomeHostPhotos;
