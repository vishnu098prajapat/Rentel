import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Star, Heart, MapPin, Calendar, Users, SlidersHorizontal, ChevronLeft, ChevronRight, Plus, Minus, Sparkles, ShieldCheck, Award } from 'lucide-react';
import { listingsData } from '../../features/listings/listingsData';
import styles from './SearchResults.module.css';

// City GPS center points
const cityCenters = {
  jaipur: [26.9124, 75.7873],
  goa: [15.5204, 73.7634],
  mumbai: [19.0760, 72.8777],
  bangalore: [12.9716, 77.5946],
  manali: [32.2396, 77.1887]
};

// Distinct coordinate offsets around centers so stays show up in real spots
const getListingCoords = (listing) => {
  const city = listing.city.toLowerCase();
  const base = cityCenters[city] || [26.9124, 75.7873];
  
  const offsets = {
    1: [0.012, 0.018],    // Amer Rd
    13: [-0.003, 0.005],  // C-Scheme
    14: [0.015, 0.009],   // Nahargarh
    23: [0.008, 0.021],   // Hawa Mahal
    24: [-0.009, -0.007], // Civil Lines
    
    // Goa
    2: [-0.004, 0.003],   // Candolim
    15: [0.045, -0.015],  // Vagator
  };
  
  const offset = offsets[listing.id] || [
    ((listing.id * 13) % 40 - 20) * 0.0009,
    ((listing.id * 19) % 40 - 20) * 0.0009
  ];
  
  return [base[0] + offset[0], base[1] + offset[1]];
};

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const queryCity = searchParams.get('city') || 'Jaipur';
  const queryCheckIn = searchParams.get('checkIn') || '';
  const queryCheckOut = searchParams.get('checkOut') || '';
  const queryGuests = searchParams.get('guests') || '1';

  const [favorites, setFavorites] = useState({});
  const [activeListingId, setActiveListingId] = useState(null);
  const [activeImageIndexes, setActiveImageIndexes] = useState({});
  
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef({});

  // Filter listings based on the search query
  const filteredListings = listingsData.filter(listing => {
    return listing.city.toLowerCase() === queryCity.toLowerCase();
  });

  const toggleFavorite = (id, e) => {
    e.stopPropagation();
    setFavorites(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCardClick = (id) => {
    navigate(`/property/${id}`);
  };

  const handleNextImage = (id, imagesCount, e) => {
    e.stopPropagation();
    setActiveImageIndexes(prev => {
      const current = prev[id] || 0;
      return { ...prev, [id]: (current + 1) % imagesCount };
    });
  };

  const handlePrevImage = (id, imagesCount, e) => {
    e.stopPropagation();
    setActiveImageIndexes(prev => {
      const current = prev[id] || 0;
      return { ...prev, [id]: (current - 1 + imagesCount) % imagesCount };
    });
  };

  // Initialize and Update Leaflet Map dynamically
  useEffect(() => {
    if (!mapRef.current || !window.L) return;

    const cityKey = queryCity.toLowerCase();
    const center = cityCenters[cityKey] || cityCenters.jaipur;

    // Clean up previous map instance if it exists
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    // Create Leaflet Map Instance with premium, clean light settings
    const map = window.L.map(mapRef.current, {
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: true
    }).setView(center, 13);

    mapInstanceRef.current = map;

    // Google Maps Tile Layer for premium accurate look
    window.L.tileLayer('http://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}', {
      maxZoom: 19
    }).addTo(map);

    // Keep reference of added markers
    const markers = {};

    filteredListings.forEach(listing => {
      const coords = getListingCoords(listing);

      // Render custom price tag HTML marker
      const customIcon = window.L.divIcon({
        className: styles.priceMarkerContainer,
        html: `<div id="map-pin-${listing.id}" class="${styles.mapPriceTag}">₹${listing.price}</div>`,
        iconSize: [60, 30],
        iconAnchor: [30, 15]
      });

      const marker = window.L.marker(coords, { icon: customIcon }).addTo(map);

      // Create a gorgeous mini preview card popup HTML
      const popupHtml = `
        <div class="${styles.mapPopupCard}">
          <div class="${styles.mapPopupImgWrapper}">
            <img src="${listing.images[0]}" alt="${listing.title}" class="${styles.mapPopupImg}" />
            <div class="${styles.mapPopupRating}">★ ${listing.rating}</div>
          </div>
          <div class="${styles.mapPopupInfo}">
            <div class="${styles.mapPopupType}">${listing.type}</div>
            <h4 class="${styles.mapPopupTitle}">${listing.title}</h4>
            <div class="${styles.mapPopupPrice}"><strong>₹${listing.price}</strong> / night</div>
          </div>
        </div>
      `;

      // Bind the tooltip to the marker (Tooltip automatically repositions to stay on screen without panning)
      marker.bindTooltip(popupHtml, {
        className: styles.customLeafletTooltip, 
        direction: 'auto',
        offset: [0, -15],
        opacity: 1
      });

      // Event Listeners for Marker Interaction
      marker.on('mouseover', function (e) {
        setActiveListingId(listing.id);
      });
      marker.on('mouseout', function (e) {
        setActiveListingId(null);
      });
      marker.on('click', () => {
        handleCardClick(listing.id);
      });

      markers[listing.id] = marker;
    });

    markersRef.current = markers;

    // Fit map bounds if there are listings to show them all perfectly
    if (filteredListings.length > 0) {
      const group = new window.L.featureGroup(Object.values(markers));
      map.fitBounds(group.getBounds().pad(0.15));
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [queryCity]);

  // Synchronize dynamic hover changes from Listing Card to Map Markers!
  useEffect(() => {
    filteredListings.forEach(listing => {
      const pinElement = document.getElementById(`map-pin-${listing.id}`);
      if (pinElement) {
        if (activeListingId === listing.id) {
          pinElement.classList.add(styles.tagSelectedHighlight);
        } else {
          pinElement.classList.remove(styles.tagSelectedHighlight);
        }
      }
    });
  }, [activeListingId, filteredListings]);

  // Zoom Helpers
  const zoomIn = () => {
    if (mapInstanceRef.current) mapInstanceRef.current.zoomIn();
  };

  const zoomOut = () => {
    if (mapInstanceRef.current) mapInstanceRef.current.zoomOut();
  };

  return (
    <div className={styles.searchPageWrapper}>
      <div className={styles.topInfoBar}>
        <div className={styles.listingsHeaderRow}>
          <h1 className={styles.mainTitle}>
            Stays in {queryCity}
          </h1>
          <span className={styles.resultsCount}>
            {filteredListings.length} accommodation{filteredListings.length !== 1 ? 's' : ''} found
          </span>
        </div>

        <div className={styles.searchPillsRow}>
          <div className={styles.infoPill}>
            <MapPin size={14} className={styles.pillIcon} />
            <span>Location: <strong>{queryCity}</strong></span>
          </div>
          <div className={styles.infoPill}>
            <Calendar size={14} className={styles.pillIcon} />
            <span>
              Dates: <strong>
              {queryCheckIn && queryCheckOut 
                ? `${queryCheckIn.split(' ')[0]} ${queryCheckIn.split(' ')[1]} – ${queryCheckOut.split(' ')[0]} ${queryCheckOut.split(' ')[1]}`
                : 'Any week'}
              </strong>
            </span>
          </div>
          <div className={styles.infoPill}>
            <Users size={14} className={styles.pillIcon} />
            <span>Guests: <strong>{queryGuests}</strong></span>
          </div>
          <button className={styles.filterPill}>
            <SlidersHorizontal size={14} />
            <span>Filters</span>
          </button>
        </div>
      </div>

      <div className={styles.splitContentContainer}>
        {/* Left Column: Compact Listings Grid */}
        <div className={styles.listingsColumn}>

          {filteredListings.length === 0 ? (
            <div className={styles.emptyContainer}>
              <h5>No listings found in "{queryCity}"</h5>
              <p>Try searching Jaipur, Goa, Mumbai, Bangalore or Manali to explore mock listings!</p>
            </div>
          ) : (
            <div className={styles.listingsGrid}>
              {filteredListings.map((listing) => {
                const imgIdx = activeImageIndexes[listing.id] || 0;
                const carouselImgs = [
                  listing.images[0] || 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800',
                  'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
                  'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800'
                ];
                
                const isHovered = activeListingId === listing.id;

                return (
                  <div 
                    key={listing.id} 
                    className={`${styles.listingCard} ${isHovered ? styles.cardActiveHighlight : ''}`}
                    onClick={() => handleCardClick(listing.id)}
                    onMouseEnter={() => setActiveListingId(listing.id)}
                    onMouseLeave={() => setActiveListingId(null)}
                  >
                    {/* Carousel Area */}
                    <div className={styles.cardImageContainer}>
                      <img 
                        src={carouselImgs[imgIdx]} 
                        alt={listing.title} 
                        className={styles.cardImage} 
                      />
                      
                      {/* Heart Toggle */}
                      <button 
                        className={styles.heartBtn} 
                        onClick={(e) => toggleFavorite(listing.id, e)}
                      >
                        <Heart 
                          size={16} 
                          fill={favorites[listing.id] ? '#FF385C' : 'rgba(0,0,0,0.3)'}
                          stroke={favorites[listing.id] ? '#FF385C' : '#ffffff'}
                          strokeWidth={2.5}
                          className={styles.heartIcon}
                        />
                      </button>

                      {/* Badges */}
                      {listing.badge && (
                        <span className={styles.badgeTag}>
                          {listing.badge.toLowerCase().includes('favourite') && <Sparkles size={12} className={styles.badgeIcon} />}
                          {listing.badge.toLowerCase().includes('superhost') && <ShieldCheck size={12} className={styles.badgeIcon} />}
                          {listing.badge.toLowerCase().includes('rated') && <Award size={12} className={styles.badgeIcon} />}
                          {!listing.badge.toLowerCase().includes('favourite') && !listing.badge.toLowerCase().includes('superhost') && !listing.badge.toLowerCase().includes('rated') && <Star size={12} className={styles.badgeIcon} />}
                          {listing.badge}
                        </span>
                      )}

                      {/* Navigation Chevrons inside Carousel */}
                      <button 
                        className={`${styles.carouselNav} ${styles.carouselLeft}`}
                        onClick={(e) => handlePrevImage(listing.id, carouselImgs.length, e)}
                      >
                        <ChevronLeft size={14} />
                      </button>
                      <button 
                        className={`${styles.carouselNav} ${styles.carouselRight}`}
                        onClick={(e) => handleNextImage(listing.id, carouselImgs.length, e)}
                      >
                        <ChevronRight size={14} />
                      </button>

                      {/* Carousel Indicator Dots */}
                      <div className={styles.dotIndicators}>
                        {carouselImgs.map((_, dotIdx) => (
                          <span 
                            key={dotIdx} 
                            className={`${styles.dot} ${imgIdx === dotIdx ? styles.dotActive : ''}`}
                          ></span>
                        ))}
                      </div>
                    </div>

                    {/* Meta Information */}
                    <div className={styles.cardMetaBlock}>
                      <div className={styles.metaRow}>
                        <span className={styles.metaLocation}>{listing.type} in {listing.city}</span>
                        <div className={styles.ratingCol}>
                          <Star size={12} fill="#FF385C" stroke="#FF385C" />
                          <span className={styles.starText}>{listing.rating}</span>
                          <span className={styles.reviewsCount}>({listing.reviews})</span>
                        </div>
                      </div>

                      <h3 className={styles.propertyTitle}>{listing.title}</h3>
                      <span className={styles.propertyRoomInfo}>2 guests · 1 bedroom · 1 bed · 1 bathroom</span>
                      
                      <div className={styles.priceContainer}>
                        <span className={styles.originalPrice}>₹{Math.round(listing.price * 1.2)}</span>
                        <span className={styles.activePrice}>₹{listing.price}</span>
                        <span className={styles.priceUnit}> / night</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Column: Sticky Real Leaflet Map */}
        <div className={styles.mapColumn}>
          <div className={styles.mapOuterCard}>
            
            {/* Real Map Container */}
            <div ref={mapRef} className={styles.mapFrameBody}>
              
              {/* Zoom Controls */}
              <div className={styles.mapZoomControls}>
                <button onClick={zoomIn}>
                  <Plus size={16} />
                </button>
                <button onClick={zoomOut}>
                  <Minus size={16} />
                </button>
              </div>

              {/* Map Floating Location Card Tag */}
              <div className={styles.floatingMapBadge}>
                <span>Map Centered in {queryCity}</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
