import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './BecomeHostMapVisibility.module.css';
import { ChevronLeft, ChevronRight, Eye, Shield } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Circle, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const SetView = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    if (center) map.setView(center, 14);
  }, [center, map]);
  return null;
};

const BecomeHostMapVisibility = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState('general');
  const [position, setPosition] = useState(null);

  useEffect(() => {
    const lat = localStorage.getItem('hostLat');
    const lng = localStorage.getItem('hostLng');
    if (lat && lng) {
      setPosition({ lat: parseFloat(lat), lng: parseFloat(lng) });
    } else {
      setPosition({ lat: 20.59, lng: 78.96 });
    }
  }, []);

  const options = [
    {
      id: 'general',
      icon: <Shield size={24} />,
      title: 'General area',
      desc: 'Only your general area is shown to guests. Your exact address is shared after they book.',
      color: '#6C5CE7'
    },
    {
      id: 'exact',
      icon: <Eye size={24} />,
      title: 'Exact location',
      desc: 'Your precise location is shown on the map so guests know exactly where your place is.',
      color: '#FF385C'
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
        <div className={styles.headerNav}>
          <button className={styles.navBtn} onClick={() => navigate('/become-a-host/location')}>
            <ChevronLeft size={20} />
            <span>Back</span>
          </button>
          <button className={`${styles.navBtn} ${styles.navBtnNext}`} onClick={() => navigate('/become-a-host/details')}>
            <span>Next</span>
            <ChevronRight size={20} />
          </button>
        </div>
      </header>

      <div className={styles.content}>
        {/* Left - Options */}
        <div className={styles.left}>
          <h1 className={styles.title}>Choose how guests see your location</h1>
          <p className={styles.subtitle}>This controls what guests see on the map before they book your place.</p>

          <div className={styles.optionsList}>
            {options.map((opt) => (
              <div
                key={opt.id}
                className={`${styles.optionCard} ${selected === opt.id ? styles.selected : ''}`}
                onClick={() => setSelected(opt.id)}
              >
                <div className={styles.optionIcon} style={{ color: opt.color, background: `${opt.color}12` }}>
                  {opt.icon}
                </div>
                <div className={styles.optionInfo}>
                  <h3 className={styles.optionTitle}>{opt.title}</h3>
                  <p className={styles.optionDesc}>{opt.desc}</p>
                </div>
                <div className={`${styles.radio} ${selected === opt.id ? styles.radioActive : ''}`}>
                  {selected === opt.id && <div className={styles.radioDot}></div>}
                </div>
              </div>
            ))}
          </div>

          <div className={styles.previewLabel}>
            <Eye size={14} />
            <span>Preview: How guests will see your location</span>
          </div>
        </div>

        {/* Right - Map Preview */}
        <div className={styles.right}>
          <div className={styles.mapBox}>
            {position && (
              <MapContainer center={position} zoom={14} style={{ height: '100%', width: '100%', borderRadius: '16px' }} zoomControl={false}>
                <TileLayer url="https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}" />
                <SetView center={position} />
                
                {selected === 'general' ? (
                  <Circle
                    center={position}
                    radius={800}
                    pathOptions={{
                      color: '#FF385C',
                      fillColor: '#FF385C',
                      fillOpacity: 0.12,
                      weight: 2,
                      dashArray: '8, 6'
                    }}
                  />
                ) : (
                  <Marker position={position} />
                )}
              </MapContainer>
            )}
          </div>
          <div className={styles.mapLabel}>
            {selected === 'general' 
              ? 'Guests will see a shaded circle around your general area' 
              : 'Guests will see your exact pin on the map'
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default BecomeHostMapVisibility;
