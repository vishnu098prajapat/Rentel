import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateProfile } from '../../features/auth/authSlice';
import styles from './UserProfile.module.css';

const ProfileDetails = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();
  
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '+91 9876543210',
    location: user?.location || 'Mumbai, India',
    bio: user?.bio || 'Love to travel and explore new places.',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    dispatch(updateProfile(formData));
    setIsEditing(false);
  };

  return (
    <div className={styles.contentArea}>
      <div className={styles.sectionCard}>
        <h3 className={styles.sectionTitle}>Personal Information</h3>
        
        <div className={styles.infoGrid}>
          <div className={styles.infoGroup}>
            <span className={styles.infoLabel}>First Name</span>
            {isEditing ? (
              <input 
                type="text" 
                name="firstName" 
                className={styles.editInput} 
                value={formData.firstName} 
                onChange={handleChange} 
              />
            ) : (
              <div className={styles.infoValue}>{formData.firstName || 'Not provided'}</div>
            )}
          </div>
          
          <div className={styles.infoGroup}>
            <span className={styles.infoLabel}>Last Name</span>
            {isEditing ? (
              <input 
                type="text" 
                name="lastName" 
                className={styles.editInput} 
                value={formData.lastName} 
                onChange={handleChange} 
              />
            ) : (
              <div className={styles.infoValue}>{formData.lastName || 'Not provided'}</div>
            )}
          </div>

          <div className={styles.infoGroup}>
            <span className={styles.infoLabel}>Email Address</span>
            {isEditing ? (
              <input 
                type="email" 
                name="email" 
                className={styles.editInput} 
                value={formData.email} 
                onChange={handleChange} 
                disabled
                title="Email cannot be changed"
              />
            ) : (
              <div className={styles.infoValue}>{formData.email || 'Not provided'}</div>
            )}
          </div>

          <div className={styles.infoGroup}>
            <span className={styles.infoLabel}>Phone Number</span>
            {isEditing ? (
              <input 
                type="text" 
                name="phone" 
                className={styles.editInput} 
                value={formData.phone} 
                onChange={handleChange} 
              />
            ) : (
              <div className={styles.infoValue}>{formData.phone || 'Not provided'}</div>
            )}
          </div>

          <div className={styles.infoGroup}>
            <span className={styles.infoLabel}>Location</span>
            {isEditing ? (
              <input 
                type="text" 
                name="location" 
                className={styles.editInput} 
                value={formData.location} 
                onChange={handleChange} 
              />
            ) : (
              <div className={styles.infoValue}>{formData.location || 'Not provided'}</div>
            )}
          </div>

          <div className={`${styles.infoGroup} ${styles.bioGroup}`}>
            <span className={styles.infoLabel}>About Me</span>
            {isEditing ? (
              <textarea 
                name="bio" 
                className={`${styles.editInput} ${styles.bioInput}`} 
                value={formData.bio} 
                onChange={handleChange} 
              />
            ) : (
              <div className={styles.infoValue}>{formData.bio || 'Not provided'}</div>
            )}
          </div>
        </div>

        <div className={styles.actionRow}>
          {isEditing ? (
            <>
              <button className={styles.btnSecondary} onClick={() => setIsEditing(false)}>Cancel</button>
              <button className={styles.btnPrimary} onClick={handleSave}>Save Changes</button>
            </>
          ) : (
            <button className={styles.btnPrimary} onClick={() => setIsEditing(true)}>Edit Profile</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
