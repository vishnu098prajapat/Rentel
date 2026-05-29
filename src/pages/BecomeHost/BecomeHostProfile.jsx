import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './BecomeHostProfile.module.css';
import { User, Calendar, Settings, CheckCircle, Home as HomeIcon } from 'lucide-react';

const BecomeHostProfile = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector(state => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login?redirect=/become-a-host/profile');
    }
  }, [isAuthenticated, navigate]);

  const [formData, setFormData] = useState({
    name: user?.firstName || '',
    dob: '',
    gender: 'Prefer not to say'
  });

  // Update name if user data loads slightly later
  useEffect(() => {
    if (user?.firstName && !formData.name) {
      setFormData(prev => ({ ...prev, name: user.firstName }));
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.dob) {
      navigate('/become-a-host/address');
    } else {
      alert("Please enter your Date of Birth");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftPanel}>
        <div className={styles.profileCard}>
          <div className={styles.header}>
            <div className={styles.logoIcon} onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
              <HomeIcon size={24} color="white" fill="white" />
            </div>
            <h2 style={{ margin: 0, whiteSpace: 'nowrap' }}>Welcome to StayVista</h2>
          </div>
          
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Full Name</label>
              <div className={styles.inputWrapper}>
                <User size={18} className={styles.inputIcon} />
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  className={styles.inputField} 
                  required 
                />
              </div>
            </div>
            
            <div className={styles.inputGroup}>
              <label className={styles.label}>Date of Birth</label>
              <div className={styles.inputWrapper}>
                <Calendar size={18} className={styles.inputIcon} />
                <input 
                  type="date" 
                  name="dob" 
                  value={formData.dob} 
                  onChange={handleChange} 
                  className={styles.inputField} 
                  required 
                />
              </div>
              <span className={styles.helperText}>You need to be at least 18.</span>
            </div>
            
            <div className={styles.inputGroup}>
              <label className={styles.label}>Gender</label>
              <div className={styles.inputWrapper}>
                <Settings size={18} className={styles.inputIcon} />
                <select name="gender" value={formData.gender} onChange={handleChange} className={styles.selectField}>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>
            </div>

            <button type="submit" className={styles.continueBtn}>Continue</button>
          </form>
        </div>
      </div>
      <div className={styles.rightPanel}>
        <div className={styles.imageWrapper}>
          <img 
            src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
            alt="Beautiful interior" 
            className={styles.sideImg} 
          />
        </div>
      </div>
    </div>
  );
};

export default BecomeHostProfile;
