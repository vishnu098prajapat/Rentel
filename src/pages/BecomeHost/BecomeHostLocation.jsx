import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateDraft } from '../../features/host/hostSlice';
import styles from './BecomeHostLocation.module.css';
import { MapPin, Navigation, LocateFixed, ChevronLeft, ChevronRight } from 'lucide-react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
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

const DraggableMarker = ({ position, setPosition, onDragEnd }) => {
  const markerRef = useRef(null);
  const eventHandlers = useMemo(() => ({
    dragend() {
      const marker = markerRef.current;
      if (marker != null) {
        const newPos = marker.getLatLng();
        setPosition(newPos);
        onDragEnd(newPos.lat, newPos.lng);
      }
    },
  }), [setPosition, onDragEnd]);

  return <Marker draggable={true} eventHandlers={eventHandlers} position={position} ref={markerRef} />;
};

const FlyToLocation = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    if (position) map.flyTo(position, 16, { duration: 1.5 });
  }, [position, map]);
  return null;
};

const BecomeHostLocation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [address, setAddress] = useState(localStorage.getItem('hostAddress') || '');
  const [position, setPosition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isRelocating, setIsRelocating] = useState(false);

  const fetchAddressFromCoords = async (lat, lng) => {
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`);
      const data = await res.json();
      setAddress(data.display_name);
      localStorage.setItem('hostAddress', data.display_name);
      localStorage.setItem('hostLat', lat);
      localStorage.setItem('hostLng', lng);
    } catch (e) { console.error(e); }
  };

  const handleUseCurrentLocation = () => {
    setIsRelocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition({ lat: latitude, lng: longitude });
        await fetchAddressFromCoords(latitude, longitude);
        setIsRelocating(false);
      }, () => { alert("Unable to fetch location."); setIsRelocating(false); });
    }
  };

  useEffect(() => {
    const lat = localStorage.getItem('hostLat');
    const lng = localStorage.getItem('hostLng');
    if (lat && lng) {
      setPosition({ lat: parseFloat(lat), lng: parseFloat(lng) });
      setLoading(false);
    } else if (address) {
      fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`)
        .then(r => r.json())
        .then(data => {
          if (data?.length > 0) {
            const p = { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
            setPosition(p);
            localStorage.setItem('hostLat', p.lat);
            localStorage.setItem('hostLng', p.lng);
          } else setPosition({ lat: 20.59, lng: 78.96 });
          setLoading(false);
        }).catch(() => { setPosition({ lat: 20.59, lng: 78.96 }); setLoading(false); });
    } else { setPosition({ lat: 20.59, lng: 78.96 }); setLoading(false); }
  }, []);

  return (
    <div className={styles.page}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerLeft} onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <div className={styles.logoIcon}>
            <svg width="20" height="20" viewBox="0 0 32 32" fill="none"><path d="M16 2L2 12V30H12V20H20V30H30V12L16 2Z" fill="white"/></svg>
          </div>
          <span className={styles.logoText}>StayVista</span>
        </div>
        <div className={styles.headerNav}>
          <button className={styles.navBtn} onClick={() => navigate('/become-a-host/place-type')}>
            <ChevronLeft size={20} />
            <span>Back</span>
          </button>
          <button className={`${styles.navBtn} ${styles.navBtnNext}`} onClick={() => {
            dispatch(updateDraft({ address, lat: position?.lat, lng: position?.lng }));
            navigate('/become-a-host/map-visibility');
          }}>
            <span>Next</span>
            <ChevronRight size={20} />
          </button>
        </div>
      </header>

      {/* Content */}
      <div className={styles.content}>
        {/* Left Panel */}
        <div className={styles.left}>
          <h1 className={styles.title}>Confirm your location</h1>
          <p className={styles.subtitle}>Your address is only shared with guests after they've made a reservation.</p>

          <div className={styles.addressCard}>
            <div className={styles.pinBadge}><MapPin size={18} /></div>
            <div className={styles.addressInfo}>
              <span className={styles.addressLabel}>Current Address</span>
              <span className={styles.addressText}>{address || 'No address set'}</span>
            </div>
          </div>

          <button className={styles.relocateBtn} onClick={handleUseCurrentLocation} disabled={isRelocating}>
            <LocateFixed size={18} />
            {isRelocating ? 'Locating...' : 'Use my current location'}
          </button>

          <div className={styles.tip}>
            <Navigation size={14} />
            <span>Drag the pin on the map to adjust</span>
          </div>
        </div>

        {/* Right - Map */}
        <div className={styles.right}>
          <div className={styles.mapBox}>
            {!loading && position ? (
              <MapContainer center={position} zoom={16} style={{ height: '100%', width: '100%', borderRadius: '16px' }} zoomControl={false}>
                <TileLayer url="https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}" />
                <DraggableMarker position={position} setPosition={setPosition} onDragEnd={fetchAddressFromCoords} />
                <FlyToLocation position={position} />
              </MapContainer>
            ) : (
              <div className={styles.loadingMap}><div className={styles.spinner}></div><p>Loading map...</p></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BecomeHostLocation;
