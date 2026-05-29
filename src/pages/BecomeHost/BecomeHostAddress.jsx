import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './BecomeHostAddress.module.css';
import { Search, Navigation } from 'lucide-react';

const BecomeHostAddress = () => {
  const navigate = useNavigate();
  const [address, setAddress] = useState('');
  const [isLocating, setIsLocating] = useState(false);

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
        setAddress(addressText);
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

  const handleContinue = () => {
    if (address.trim() === '') {
      alert("Please enter your address or use current location.");
      return;
    }
    localStorage.setItem('hostAddress', address);
    navigate('/become-a-host/property-type');
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftPanel}>
        <div className={styles.content}>
          <div className={styles.headerRow} style={{ marginBottom: '8px' }}>
            <div className={styles.logoIcon} onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 2L2 12V30H12V20H20V30H30V12L16 2Z" fill="white"/>
              </svg>
            </div>
            <h1 className={styles.title} style={{ margin: 0, whiteSpace: 'nowrap' }}>Set up your</h1>
          </div>
          <h1 className={styles.title} style={{ margin: 0, marginBottom: '24px' }}>StayVista listing</h1>
          <p className={styles.subtitle}>It's easy to create a great listing – let's start with your address.</p>
          
          <div className={styles.searchBox}>
            <Search size={20} className={styles.searchIcon} />
            <input 
              type="text" 
              placeholder="Enter your address" 
              className={styles.searchInput} 
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          
          <div className={styles.actionButtons}>
            <button className={styles.actionBtn} onClick={handleCurrentLocation} disabled={isLocating}>
              <Navigation size={18} className={styles.actionIcon} />
              {isLocating ? 'Locating...' : 'Use current location'}
            </button>
          </div>
          
          <div style={{ marginTop: '24px' }}>
             <button className={styles.continueBtn} onClick={handleContinue}>Continue</button>
          </div>
        </div>
      </div>
      
      <div className={styles.rightPanel}>
        <div className={styles.imageWrapper}>
          <img 
            src="/become_host_house.png" 
            alt="Beautiful premium house" 
            className={styles.houseImg} 
          />
        </div>
      </div>

    </div>
  );
};

export default BecomeHostAddress;
