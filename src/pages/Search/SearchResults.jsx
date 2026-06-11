import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Star, Heart, MapPin, Calendar, Users, SlidersHorizontal, ChevronLeft, ChevronRight, Plus, Minus, Sparkles, ShieldCheck, Award, X, SearchX } from 'lucide-react';
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
  const city = (listing.city || '').toLowerCase();
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
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const queryCity = searchParams.get('city') || 'Jaipur';
  const queryCheckIn = searchParams.get('checkIn') || '';
  const queryCheckOut = searchParams.get('checkOut') || '';
  const queryGuests = searchParams.get('guests') || '1';

  const queryMode = searchParams.get('mode') || 'holiday';
  const queryGender = searchParams.get('gender') || '';
  const queryProps = searchParams.get('props') ? searchParams.get('props').split(',') : [];
  const queryPgTypes = searchParams.get('pgTypes') ? searchParams.get('pgTypes').split(',') : [];
  const queryBudget = searchParams.get('budget') || 'Any';

  // Modal State
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Parse initial min/max from budget
  let initialMin = '', initialMax = '';
  if (queryBudget !== 'Any' && queryBudget.includes('-') && !queryBudget.includes('Under')) {
     const parts = queryBudget.split('-');
     if (parts[0]) initialMin = parts[0];
     if (parts[1]) initialMax = parts[1];
  }
  const [modalMinBudget, setModalMinBudget] = useState(initialMin);
  const [modalMaxBudget, setModalMaxBudget] = useState(initialMax);

  // Sync budget when opening
  useEffect(() => {
    if (isFilterOpen) {
      let min = '', max = '';
      if (queryBudget !== 'Any' && queryBudget.includes('-') && !queryBudget.includes('Under')) {
         const parts = queryBudget.split('-');
         if (parts[0]) min = parts[0];
         if (parts[1]) max = parts[1];
      }
      setModalMinBudget(min);
      setModalMaxBudget(max);
    }
  }, [isFilterOpen, queryBudget]);

  // Live filtering effect for Budget
  useEffect(() => {
    if (!isFilterOpen) return;
    const timer = setTimeout(() => {
      let params = new URLSearchParams(window.location.search);
      const currentBudget = params.get('budget');
      let newBudget = '';
      if (modalMinBudget || modalMaxBudget) {
        newBudget = `${modalMinBudget}-${modalMaxBudget}`;
      }
      if (newBudget) {
        if (currentBudget !== newBudget) {
          params.set('budget', newBudget);
          setSearchParams(params);
        }
      } else {
        if (currentBudget && currentBudget.includes('-')) {
          params.delete('budget');
          setSearchParams(params);
        }
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [modalMinBudget, modalMaxBudget, isFilterOpen, setSearchParams]);

  const handleGenderToggle = (g) => {
    let params = new URLSearchParams(searchParams);
    params.set('gender', g);
    setSearchParams(params);
  };

  const handlePropToggle = (pt) => {
    let params = new URLSearchParams(searchParams);
    let current = params.get('props') ? params.get('props').split(',') : [];
    if (current.includes(pt)) current = current.filter(x => x !== pt);
    else current.push(pt);
    if (current.length > 0) params.set('props', current.join(','));
    else params.delete('props');
    setSearchParams(params);
  };

  const handlePgTypeToggle = (pt) => {
    let params = new URLSearchParams(searchParams);
    let current = params.get('pgTypes') ? params.get('pgTypes').split(',') : [];
    if (current.includes(pt)) current = current.filter(x => x !== pt);
    else current.push(pt);
    if (current.length > 0) params.set('pgTypes', current.join(','));
    else params.delete('pgTypes');
    setSearchParams(params);
  };

  const handleApplyFilters = () => {
    setIsFilterOpen(false);
  };

  const handleClearFilters = () => {
    let params = new URLSearchParams(searchParams);
    params.delete('gender');
    params.delete('props');
    params.delete('pgTypes');
    params.delete('budget');
    setSearchParams(params);
    setIsFilterOpen(false);
  };

  // Filter listings based on the search query
  const filteredListings = listingsData.filter(listing => {
    const matchCity = listing.city && listing.city.toLowerCase() === queryCity.toLowerCase();
    if (!matchCity) return false;

    if (listing.rentMode !== queryMode) return false;

    if (queryBudget !== 'Any') {
      let min = 0, max = Infinity;
      if (queryBudget === 'Under ₹5,000') max = 5000;
      else if (queryBudget === 'Under ₹10,000') max = 10000;
      else if (queryBudget === 'Under ₹10k') max = 10000;
      else if (queryBudget === 'Under ₹50k') max = 50000;
      else if (queryBudget === 'Under ₹1 Lakh') max = 100000;
      else if (queryBudget === 'Under ₹2 Lakhs') max = 200000;
      else if (queryBudget === '₹10k - ₹20k') { min = 10000; max = 20000; }
      else if (queryBudget === '₹10k - ₹30k') { min = 10000; max = 30000; }
      else if (queryBudget === '₹20k - ₹50k') { min = 20000; max = 50000; }
      else if (queryBudget === '₹30k - ₹50k') { min = 30000; max = 50000; }
      else if (queryBudget === '₹50k+') min = 50000;
      else if (queryBudget.includes('-')) {
        const parts = queryBudget.split('-');
        if (parts[0]) min = parseInt(parts[0], 10);
        if (parts[1]) max = parseInt(parts[1], 10);
      }
      if (listing.price < min || listing.price > max) return false;
    }

    if (queryMode === 'pg') {
      if (queryGender && listing.pgGender !== queryGender) return false;
      if (queryPgTypes.length > 0 && !queryPgTypes.includes(listing.pgType)) return false;
    }

    if (queryMode === 'rent') {
      if (queryProps.length > 0 && !queryProps.includes(listing.propertyType)) return false;
    }

    return true;
  });

  const [favorites, setFavorites] = useState({});
  const [activeListingId, setActiveListingId] = useState(null);
  const [activeImageIndexes, setActiveImageIndexes] = useState({});
  
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef({});


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
  const listingIds = filteredListings.map(l => l.id).join(',');

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
            <div class="${styles.mapPopupPrice}"><strong>₹${listing.price}</strong> ${listing.rentMode === 'holiday' ? '/ night' : '/ month'}</div>
          </div>
        </div>
      `;

      // Bind popup to the marker so it opens on click and closes others automatically (prevents overlap)
      marker.bindPopup(popupHtml, {
        className: styles.customLeafletPopup, 
        offset: [0, -10],
        closeButton: false,
        minWidth: 200
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
  }, [queryCity, listingIds]);

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
              {queryMode === 'holiday' ? (
                <>Dates: <strong>{queryCheckIn && queryCheckOut ? `${queryCheckIn.split(' ')[0]} ${queryCheckIn.split(' ')[1]} – ${queryCheckOut.split(' ')[0]} ${queryCheckOut.split(' ')[1]}` : 'Any week'}</strong></>
              ) : queryMode === 'rent' ? (
                <>Type: <strong>{queryProps.length > 0 ? queryProps.join(', ') : 'Any'}</strong></>
              ) : (
                <>PG: <strong>{queryGender || 'Any'} {queryPgTypes.length > 0 ? `+ ${queryPgTypes.length}` : ''}</strong></>
              )}
            </span>
          </div>
          <div className={styles.infoPill}>
            <Users size={14} className={styles.pillIcon} />
            <span>{queryMode === 'holiday' ? `Guests: ` : `Budget: `}<strong>{queryMode === 'holiday' ? queryGuests : queryBudget}</strong></span>
          </div>
          <button className={styles.filterPill} onClick={() => setIsFilterOpen(true)}>
            <SlidersHorizontal size={14} />
            <span>Filters</span>
          </button>
        </div>
      </div>

      <div className={styles.splitContentContainer}>
        {/* Left Column: Compact Listings Grid */}
        <div className={styles.listingsColumn}>

          {filteredListings.length === 0 ? (
            <div className={styles.premiumEmptyState}>
              <div className={styles.emptyIconWrapper}>
                <SearchX size={32} className={styles.emptyIcon} />
              </div>
              <h2 className={styles.emptyTitle}>No exact matches</h2>
              <p className={styles.emptySubtitle}>
                We couldn't find any {queryMode === 'holiday' ? 'stays' : queryMode === 'rent' ? 'properties' : 'PGs'} that exactly match your filters. Try tweaking your price or property type.
              </p>
              <div className={styles.emptyActions}>
                <button className={styles.clearFiltersBtn} onClick={handleClearFilters}>Clear all filters</button>
                <button className={styles.changeFiltersBtn} onClick={() => setIsFilterOpen(true)}>Change filters</button>
              </div>
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
                          {String(listing.badge).toLowerCase().includes('favourite') && <Sparkles size={12} className={styles.badgeIcon} />}
                          {String(listing.badge).toLowerCase().includes('superhost') && <ShieldCheck size={12} className={styles.badgeIcon} />}
                          {String(listing.badge).toLowerCase().includes('rated') && <Award size={12} className={styles.badgeIcon} />}
                          {!String(listing.badge).toLowerCase().includes('favourite') && !String(listing.badge).toLowerCase().includes('superhost') && !String(listing.badge).toLowerCase().includes('rated') && <Star size={12} className={styles.badgeIcon} />}
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
                        <span className={styles.priceUnit}>{listing.rentMode === 'holiday' ? ' / night' : ' / month'}</span>
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

      {/* FILTER DRAWER */}
      {isFilterOpen && (
        <>
          <div className={styles.drawerOverlay} onClick={() => setIsFilterOpen(false)}></div>
          <div className={`${styles.filterDrawer} ${styles.drawerOpen}`}>
            <div className={styles.drawerHeader}>
              <h3>Filters</h3>
              <button className={styles.closeDrawerBtn} onClick={() => setIsFilterOpen(false)}>
                <X size={20} />
              </button>
            </div>
            <div className={styles.drawerBody}>
              
              {(queryMode === 'rent' || queryMode === 'pg') && (
                <div className={styles.filterSection}>
                  <h4 className={styles.filterSectionTitle}>Price Range (Monthly)</h4>
                  <div className={styles.modalBudgetRow}>
                    <div className={styles.modalBudgetInputWrapper}>
                      <span className={styles.rupeePrefix}>₹</span>
                      <input 
                        type="number" 
                        placeholder="Min" 
                        className={styles.modalBudgetInput}
                        value={modalMinBudget}
                        onChange={(e) => setModalMinBudget(e.target.value)}
                      />
                    </div>
                    <span className={styles.modalBudgetDash}>-</span>
                    <div className={styles.modalBudgetInputWrapper}>
                      <span className={styles.rupeePrefix}>₹</span>
                      <input 
                        type="number" 
                        placeholder="Max" 
                        className={styles.modalBudgetInput}
                        value={modalMaxBudget}
                        onChange={(e) => setModalMaxBudget(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}

              {queryMode === 'rent' && (
                <div className={styles.filterSection}>
                  <h4 className={styles.filterSectionTitle}>Property Type</h4>
                  <div className={styles.filterPillGroup}>
                    {['Flat', 'House/Villa', '1 BHK', '2 BHK', '3 BHK', '4+ BHK', 'Office', 'Shop', 'Showroom', 'Agricultural Land', 'Farm House'].map(pt => (
                      <button 
                        key={pt}
                        className={`${styles.filterPillBtn} ${queryProps.includes(pt) ? styles.filterPillActive : ''}`}
                        onClick={() => handlePropToggle(pt)}
                      >
                        {pt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {queryMode === 'pg' && (
                <>
                  <div className={styles.filterSection}>
                    <h4 className={styles.filterSectionTitle}>Gender</h4>
                    <div className={styles.filterPillGroup}>
                      {['Boys', 'Girls', 'Co-ed'].map(g => (
                        <button 
                          key={g}
                          className={`${styles.filterPillBtn} ${queryGender === g ? styles.filterPillActive : ''}`}
                          onClick={() => handleGenderToggle(g)}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className={styles.filterSection}>
                    <h4 className={styles.filterSectionTitle}>Room Type</h4>
                    <div className={styles.filterPillGroup}>
                      {['Shared-Flat', 'Single Room', 'Double Sharing', 'Triple Sharing'].map(pt => (
                        <button 
                          key={pt}
                          className={`${styles.filterPillBtn} ${queryPgTypes.includes(pt) ? styles.filterPillActive : ''}`}
                          onClick={() => handlePgTypeToggle(pt)}
                        >
                          {pt}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

            </div>
            <div className={styles.drawerFooter}>
              <button className={styles.clearAllBtn} onClick={handleClearFilters}>Clear all</button>
              <button className={styles.applyFiltersBtn} onClick={handleApplyFilters}>Show results</button>
            </div>
          </div>
        </>
      )}

    </div>
  );
};

export default SearchResults;
