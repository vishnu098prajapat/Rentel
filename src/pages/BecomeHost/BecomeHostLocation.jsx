import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateDraft } from '../../features/host/hostSlice';
import styles from './BecomeHostLocation.module.css';
import { MapPin, Navigation, LocateFixed, ChevronLeft, ChevronRight, Shield, Eye } from 'lucide-react';
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
    if (position) map.flyTo(position, 15, { duration: 1.5 });
  }, [position, map]);
  return null;
};

const BecomeHostLocation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const draft = useSelector(state => state.host?.draftListing || {});
  
  const [address, setAddress] = useState(draft.address || localStorage.getItem('hostAddress') || '');
  const [position, setPosition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isRelocating, setIsRelocating] = useState(false);
  const [visibility, setVisibility] = useState(draft.visibility || 'exact'); // exact or general

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
  }

  useEffect(() => {
    const lat = draft.lat || localStorage.getItem('hostLat');
    const lng = draft.lng || localStorage.getItem('hostLng');
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
      <header className={styles.header}>
        <div className={styles.headerLeft} onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <div className={styles.logoIcon}>
            <svg width="20" height="20" viewBox="0 0 32 32" fill="none"><path d="M16 2L2 12V30H12V20H20V30H30V12L16 2Z" fill="white"/></svg>
          </div>
          <span className={styles.logoText}>StayVista</span>
        </div>
        <div className={styles.headerNav}>
          <button className={styles.navBtn} onClick={() => navigate('/become-a-host/property-type')}>
            <ChevronLeft size={20} />
            <span>Back</span>
          </button>
          <button className={`${styles.navBtn} ${styles.navBtnNext}`} onClick={() => {
            dispatch(updateDraft({ address, lat: position?.lat, lng: position?.lng, visibility }));
            navigate('/become-a-host/details'); // Skip map-visibility page
          }}>
            <span>Next</span>
            <ChevronRight size={20} />
          </button>
        </div>
      </header>

      <div className={styles.content}>
        <div className={styles.left}>
          <h1 className={styles.title}>Confirm your location</h1>
          <p className={styles.subtitle}>Guests will only get your exact address once they've booked.</p>

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
            <span>Drag the pin on the map to adjust exactly</span>
          </div>

          <div style={{ marginTop: '16px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-main)', marginBottom: '8px' }}>How guests see your location</h3>
            <div className={styles.optionsList}>
              <div className={`${styles.optionCard} ${visibility === 'general' ? styles.selected : ''}`} onClick={() => setVisibility('general')}>
                <div className={styles.optionIcon}><Shield size={18} /></div>
                <div className={styles.optionInfo}>
                  <h3 className={styles.optionTitle}>General</h3>
                </div>
                <div className={`${styles.radio} ${visibility === 'general' ? styles.radioActive : ''}`}>
                  {visibility === 'general' && <div className={styles.radioDot}></div>}
                </div>
              </div>
              
              <div className={`${styles.optionCard} ${visibility === 'exact' ? styles.selected : ''}`} onClick={() => setVisibility('exact')}>
                <div className={styles.optionIcon}><Eye size={18} /></div>
                <div className={styles.optionInfo}>
                  <h3 className={styles.optionTitle}>Exact</h3>
                </div>
                <div className={`${styles.radio} ${visibility === 'exact' ? styles.radioActive : ''}`}>
                  {visibility === 'exact' && <div className={styles.radioDot}></div>}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.mapBox}>
            {!loading && position ? (
              <MapContainer center={position} zoom={15} style={{ height: '100%', width: '100%', borderRadius: '20px' }} zoomControl={false}>
                <TileLayer url="https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}" />
                <DraggableMarker position={position} setPosition={setPosition} onDragEnd={fetchAddressFromCoords} />
                <FlyToLocation position={position} />
                {visibility === 'general' && (
                  <Circle
                    center={position}
                    radius={500}
                    pathOptions={{
                      color: '#FF385C',
                      fillColor: '#FF385C',
                      fillOpacity: 0.15,
                      weight: 2,
                      dashArray: '5, 5'
                    }}
                  />
                )}
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
