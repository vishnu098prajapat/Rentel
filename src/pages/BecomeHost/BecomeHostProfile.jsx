import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './BecomeHostProfile.module.css';
import { User, Phone, Navigation, Search, Home as HomeIcon } from 'lucide-react';

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
    mobile: '',
    address: ''
  });
  const [isLocating, setIsLocating] = useState(false);

  // Update name if user data loads slightly later
  useEffect(() => {
    if (user?.firstName && !formData.name) {
      setFormData(prev => ({ ...prev, name: user.firstName }));
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fetchAddressFromCoords = async (lat, lon) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
      const data = await response.json();
      return data.display_name;
    } catch (error) {
      console.error("Error fetching address:", error);
      return "Address not found";
    }
  };

  const handleCurrentLocation = () => {
    setIsLocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const addressText = await fetchAddressFromCoords(latitude, longitude);
        setFormData(prev => ({ ...prev, address: addressText }));
        localStorage.setItem('hostLat', latitude);
        localStorage.setItem('hostLng', longitude);
        setIsLocating(false);
      }, (error) => {
        alert("Unable to fetch location.");
        setIsLocating(false);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
      setIsLocating(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.address.trim() === '') {
      alert("Please enter your property address or use current location.");
      return;
    }
    localStorage.setItem('hostAddress', formData.address);
    localStorage.setItem('hostMobile', formData.mobile);
    localStorage.setItem('hostName', formData.name);
    navigate('/become-a-host/property-type');
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
              <label className={styles.label}>Property Address</label>
              <div style={{ display: 'flex', gap: '10px' }}>
                <div className={styles.inputWrapper} style={{ flex: 1, margin: 0 }}>
                  <Search size={18} className={styles.inputIcon} />
                  <input 
                    type="text" 
                    name="address" 
                    value={formData.address} 
                    onChange={handleChange} 
                    className={styles.inputField}
                    placeholder="Enter property address"
                    required 
                  />
                </div>
                <button 
                  type="button" 
                  onClick={handleCurrentLocation} 
                  disabled={isLocating}
                  style={{ 
                    display: 'flex', alignItems: 'center', gap: '6px', 
                    padding: '0 16px', borderRadius: '8px', 
                    background: '#e00b41', color: 'white', border: 'none', 
                    cursor: 'pointer', fontWeight: '500', whiteSpace: 'nowrap' 
                  }}
                >
                  <Navigation size={18} />
                  {isLocating ? 'Locating...' : 'Fetch'}
                </button>
              </div>
            </div>
            
            <div className={styles.inputGroup}>
              <label className={styles.label}>Mobile Number</label>
              <div className={styles.inputWrapper}>
                <Phone size={18} className={styles.inputIcon} />
                <input 
                  type="tel" 
                  name="mobile" 
                  value={formData.mobile} 
                  onChange={handleChange} 
                  className={styles.inputField}
                  placeholder="Enter your mobile number"
                  required 
                />
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
