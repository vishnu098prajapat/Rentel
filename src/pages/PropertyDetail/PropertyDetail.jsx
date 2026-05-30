import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Share, Heart, Star, Grid, Award, Key, MapPin, Car, Wifi, Coffee, Waves, Wind, Tv, Shield, ChevronLeft, ChevronRight, Sparkles, CheckCircle, MessageSquare, Tag } from 'lucide-react';
import { listingsData } from '../../features/listings/listingsData';
import styles from './PropertyDetail.module.css';
import ListingCard from '../../components/ListingCard/ListingCard';
import BookingCard from './components/BookingCard';

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { myListings } = useSelector(state => state.host || { myListings: [] });
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isAmenitiesModalOpen, setIsAmenitiesModalOpen] = useState(false);
  const [isReviewsModalOpen, setIsReviewsModalOpen] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const photoGridRef = useRef(null);
  const moreStaysRef = useRef(null);
  
  let property = null;
  if (id && id.toString().startsWith('host_')) {
    const hostProp = myListings.find(p => p.id === id);
    if (hostProp) {
      property = {
        ...hostProp,
        rating: hostProp.rating || 0,
        reviews: hostProp.reviewsCount || 0,
        city: hostProp.address?.city || 'City',
        state: hostProp.address?.state || 'State',
        location: hostProp.location || hostProp.address?.city || 'Location',
        type: hostProp.placeType === 'room' ? 'Room' : (hostProp.placeType === 'shared' ? 'Shared Room' : 'home'),
        badge: 'New Host'
      };
    }
  }

  // Fallback to static listings data if not a host property or if host property not found
  if (!property) {
    property = listingsData.find(p => p.id === parseInt(id)) || listingsData[0];
  }

  useEffect(() => {
    if (!isGalleryOpen) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [id, isGalleryOpen]);

  const mockImages = [
    (property.images && property.images[0]) || "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800",
    (property.images && property.images[1]) || "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800",
    (property.images && property.images[2]) || "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
    (property.images && property.images[3]) || "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
    (property.images && property.images[4]) || "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800"
  ];

  // For mobile infinite carousel (duplicate images to allow endless swiping)
  const infiniteImages = Array(14).fill(mockImages).flat(); // 70 images
  const middleIndex = 35; // This lands exactly on mockImages[0]

  useEffect(() => {
    // Set initial scroll position for mobile carousel so it starts in the middle
    if (photoGridRef.current) {
      // Use setTimeout to ensure DOM is fully painted with correct widths
      setTimeout(() => {
        const container = photoGridRef.current;
        if (container && container.children.length > middleIndex) {
          const targetSlide = container.children[middleIndex];
          const scrollPos = targetSlide.offsetLeft - (container.offsetWidth / 2) + (targetSlide.offsetWidth / 2);
          container.scrollLeft = scrollPos;
        }
      }, 100);
    }
  }, [id]);

  const scrollGallery = (dir) => {
    if (photoGridRef.current) {
      const container = photoGridRef.current;
      if (container.children.length > 0) {
        const slide = container.children[0];
        const scrollAmount = slide.offsetWidth + 12; // width + gap
        container.scrollBy({ left: dir === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
      }
    }
  };

  const scrollMoreStays = (dir) => {
    if (moreStaysRef.current) {
      const scrollAmount = moreStaysRef.current.clientWidth * 0.8;
      moreStaysRef.current.scrollBy({ left: dir === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  const nearbyStays = listingsData.filter(p => p.city === property.city && p.id !== property.id).slice(0, 4);

  const reviewerAvatars = [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
  ];

  const getCategoryIcon = (name) => {
    switch (name) {
      case 'Cleanliness': return <Sparkles size={18} className={styles.categoryIcon} />;
      case 'Accuracy': return <CheckCircle size={18} className={styles.categoryIcon} />;
      case 'Check-in': return <Key size={18} className={styles.categoryIcon} />;
      case 'Communication': return <MessageSquare size={18} className={styles.categoryIcon} />;
      case 'Location': return <MapPin size={18} className={styles.categoryIcon} />;
      case 'Value': return <Tag size={18} className={styles.categoryIcon} />;
      default: return <Star size={18} className={styles.categoryIcon} />;
    }
  };

  const mapQuery = encodeURIComponent(`${property.location}, ${property.city}, ${property.state}, India`);

  return (
    <>
      <div className={styles.container}>
        
        {/* SECTION 1 - HEADER */}
      <section className={styles.header}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '0 0 16px -8px' }}>
          <button className={styles.backBtn} onClick={() => navigate(-1)}>
            <ChevronLeft size={24} />
          </button>
        </div>
        <div className={styles.titleRow}>
          <h1 className={styles.title}>{property.title}</h1>
          <div className={styles.headerActions}>
            <button className={styles.actionBtn}>
              <Share size={18} color="#4A90E2" />
              <span>Share</span>
            </button>
            <button className={styles.actionBtn}>
              <Heart size={18} color="#FF385C" />
              <span>Save</span>
            </button>
          </div>
        </div>
        <div className={styles.subHeader}>
          <div className={styles.rating}>
            <Star size={18} fill="#F5A623" color="#F5A623" />
            <strong>{property.rating}</strong>
            <button className={styles.btnText}>· {property.reviews} reviews</button>
          </div>
          <span className={styles.dotSeparator}>·</span>
          <div className={styles.locationBadge}>
            <MapPin size={16} color="#FF385C" />
            <button className={`${styles.btnText} ${styles.locationLink}`}>
              {property.location}, {property.state}, India
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 2 - PHOTO GRID (Desktop Only) */}
      <section className={styles.desktopPhotoGrid}>
        <div className={styles.mainPhotoWrapper} onClick={() => setIsGalleryOpen(true)}>
          <img src={mockImages[0]} alt="Main" className={styles.mainPhoto} />
        </div>
        <img src={mockImages[1]} alt="Grid 1" className={styles.smallPhoto} onClick={() => setIsGalleryOpen(true)} />
        <img src={mockImages[2]} alt="Grid 2" className={`${styles.smallPhoto} ${styles.smallPhotoTopRight}`} onClick={() => setIsGalleryOpen(true)} />
        <img src={mockImages[3]} alt="Grid 3" className={styles.smallPhoto} onClick={() => setIsGalleryOpen(true)} />
        <img src={mockImages[4]} alt="Grid 4" className={`${styles.smallPhoto} ${styles.smallPhotoBottomRight}`} onClick={() => setIsGalleryOpen(true)} />
        <button className={styles.showAllBtn} onClick={() => setIsGalleryOpen(true)}>
          <Grid size={16} color="#222" />
          Show all photos
        </button>
      </section>

      {/* SECTION 2 - PHOTO CAROUSEL (Mobile Only) */}
      <section className={styles.mobilePhotoCarousel}>
        <button className={`${styles.mobileNavBtn} ${styles.mobileNavLeft}`} onClick={() => scrollGallery('left')}>
          <ChevronLeft size={20} />
        </button>
        
        <div className={styles.carouselContainer} ref={photoGridRef}>
          {infiniteImages.map((img, idx) => (
            <div key={idx} className={styles.carouselSlide} onClick={() => setIsGalleryOpen(true)}>
              <img src={img} alt={`Slide ${idx}`} className={styles.carouselImage} />
            </div>
          ))}
        </div>

        <button className={`${styles.mobileNavBtn} ${styles.mobileNavRight}`} onClick={() => scrollGallery('right')}>
          <ChevronRight size={20} />
        </button>
      </section>

      {/* SECTION 3 - MAIN CONTENT */}
      <section className={styles.contentLayout}>
        <div className={styles.leftColumn}>
          <div className={styles.propertyInfo}>
            <h2 className={styles.propertyType}>Entire {property.type} in {property.city}</h2>
            <div className={styles.propertyStats}>
              <span>{property.guests || 1} guests</span> · <span>{property.bedrooms || 1} bedrooms</span> · <span>{property.beds || 1} beds</span> · <span>{property.bathrooms || 1} bathrooms</span>
            </div>
          </div>

          <div className={styles.guestFavouriteContainer}>
            <div className={styles.gfTopRow}>
              <div className={styles.gfTitleBadge}>
                <Award size={24} className={styles.gfIconAnimated} />
                <span>Guest favourite</span>
              </div>
              <div className={styles.gfStatsInline}>
                <div className={styles.gfStatItem}>
                  <span className={styles.gfStatValue}>{property.rating}</span>
                  <div className={styles.gfStarsAnimated}>
                    <Star size={12} fill="#F5A623" color="#F5A623" className={styles.starAnim} />
                    <Star size={12} fill="#F5A623" color="#F5A623" className={styles.starAnim} style={{animationDelay: '0.2s'}} />
                    <Star size={12} fill="#F5A623" color="#F5A623" className={styles.starAnim} style={{animationDelay: '0.4s'}} />
                    <Star size={12} fill="#F5A623" color="#F5A623" className={styles.starAnim} style={{animationDelay: '0.6s'}} />
                    <Star size={12} fill="#F5A623" color="#F5A623" className={styles.starAnim} style={{animationDelay: '0.8s'}} />
                  </div>
                </div>
                <div className={styles.gfStatDivider} />
                <div className={styles.gfStatItem}>
                  <span className={styles.gfStatValue}>{property.reviews}</span>
                  <span className={styles.gfStatLabel}>Reviews</span>
                </div>
              </div>
            </div>
            
            <div className={styles.gfBottomRow}>
              <span>{id?.toString().startsWith('host_') ? 'Your brand new listing on StayVista' : 'One of the most loved homes on StayVista'}</span>
            </div>
          </div>

          <div className={styles.divider}></div>

          <div className={styles.hostInfo}>
            <div className={styles.avatarWrapper}>
              <img src="https://ui-avatars.com/api/?name=Host&background=FF385C&color=fff" alt="Host" className={styles.hostAvatar} />
              {property.badge === 'Superhost' && <div className={styles.superhostBadge}><Award size={12} color="#fff" /></div>}
            </div>
            <div>
              <h3 className={styles.hostName}>Hosted by {property.badge === 'Superhost' ? 'Superhost ' : ''}User</h3>
              <p className={styles.hostDuration}>Superhost · 5 years hosting</p>
            </div>
          </div>

          <div className={styles.divider}></div>

          <div className={styles.highlights}>
            <div className={styles.highlightItem}>
              <div className={`${styles.iconCircle} ${styles.highlightBlue}`}>
                <Key size={22} />
              </div>
              <div className={styles.highlightText}>
                <h4>Exceptional check-in experience</h4>
                <p>Recent guests gave the check-in process a 5-star rating.</p>
              </div>
            </div>
            <div className={styles.highlightItem}>
              <div className={`${styles.iconCircle} ${styles.highlightRed}`}>
                <MapPin size={22} />
              </div>
              <div className={styles.highlightText}>
                <h4>Unbeatable location</h4>
                <p>100% of recent guests gave the location a 5-star rating.</p>
              </div>
            </div>
            <div className={styles.highlightItem}>
              <div className={`${styles.iconCircle} ${styles.highlightGreen}`}>
                <Car size={22} />
              </div>
              <div className={styles.highlightText}>
                <h4>Free parking on premises</h4>
                <p>This is one of the few places in the area with free parking.</p>
              </div>
            </div>
          </div>

          <div className={styles.divider}></div>

          <div className={styles.description}>
            <p>
              Welcome to <strong>{property.title}</strong>! This beautiful {property.type} offers a luxurious and comfortable stay in the heart of {property.city}. 
              Experience the perfect blend of modern amenities and local charm. The space is thoughtfully designed to provide you with everything you need for a memorable trip.
            </p>
            {isDescriptionExpanded && (
              <>
                <br />
                <p>
                  Enjoy spacious rooms, a fully equipped kitchen, and a relaxing outdoor area. Whether you're here for work or leisure, our property is the ideal home away from home.
                </p>
              </>
            )}
            <button className={styles.showMoreBtn} onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}>
              {isDescriptionExpanded ? 'Show less' : 'Show more'} <ChevronRight size={16} style={{ transform: isDescriptionExpanded ? 'rotate(-90deg)' : 'rotate(90deg)', transition: '0.2s' }} />
            </button>
          </div>

          <div className={styles.divider}></div>

          <div className={styles.amenities}>
            <h3 className={styles.sectionHeading}>What this place offers</h3>
            <div className={styles.amenitiesGrid}>
              <div className={styles.amenityItem}>
                <Wifi size={24} color="#4A90E2" /> <span>Fast wifi</span>
              </div>
              <div className={styles.amenityItem}>
                <Coffee size={24} color="#8B572A" /> <span>Kitchen</span>
              </div>
              <div className={styles.amenityItem}>
                <Waves size={24} color="#50E3C2" /> <span>Pool</span>
              </div>
              <div className={styles.amenityItem}>
                <Wind size={24} color="#9B9B9B" /> <span>Air conditioning</span>
              </div>
              <div className={styles.amenityItem}>
                <Tv size={24} color="#4A4A4A" /> <span>TV</span>
              </div>
              <div className={styles.amenityItem}>
                <Car size={24} color="#7ED321" /> <span>Free parking</span>
              </div>
            </div>
            <button className={styles.outlineBtn} onClick={() => setIsAmenitiesModalOpen(true)}>Show all</button>
          </div>
        </div>

        <div className={styles.rightColumn}>
          <BookingCard property={property} />
        </div>
      </section>

      <div className={styles.divider}></div>

      {/* SECTION 4 - REVIEWS */}
      <section className={styles.reviewsSection}>
        <div className={styles.reviewHeaderRow}>
          <div className={styles.reviewScoreBig}>
            <Star size={30} style={{ marginRight: '6px' }} />
            {property.rating}
          </div>
          <div className={`${styles.guestFavourite} ${styles.reviewGf}`}>
            <Award className={styles.gfIcon} size={28} color="#F5A623" />
            <span className={styles.gfText}>Guest favourite</span>
          </div>
        </div>

        <div className={styles.reviewCategoriesRow}>
          {['Cleanliness', 'Accuracy', 'Check-in', 'Communication', 'Location', 'Value'].map((cat, idx) => {
            const score = (property.rating - (0.01 * (idx + 1))).toFixed(1);
            return (
              <div key={idx} className={styles.categoryCard}>
                {getCategoryIcon(cat)}
                <span className={styles.categoryCardTitle}>{cat}</span>
                <span className={styles.categoryCardScore}>{score}</span>
              </div>
            );
          })}
        </div>

        <div className={styles.reviewsGrid}>
          {['Alice', 'Michael', 'Sarah', 'David'].map((name, idx) => (
            <div key={idx} className={styles.reviewCard}>
              <div className={styles.reviewerInfo}>
                <img src={reviewerAvatars[idx]} alt={name} className={styles.reviewerAvatar} />
                <div>
                  <h4 className={styles.reviewerName}>{name}</h4>
                  <p className={styles.reviewDate}>October 2025</p>
                </div>
              </div>
              <div className={styles.reviewText}>
                This was an amazing stay! The property was exactly as described and the host was very communicative. Highly recommend booking this place for your next trip. It felt like home away from home.
              </div>
            </div>
          ))}
        </div>
        <button className={`${styles.outlineBtn} ${styles.reviewsMoreBtn}`} onClick={() => setIsReviewsModalOpen(true)}>Show all {property.reviews} reviews</button>
      </section>

      <div className={styles.divider}></div>

      {/* SECTION 5 - MAP */}
      <section className={styles.mapSection}>
        <h3 className={styles.sectionHeading}>Where you'll be</h3>
        <p className={styles.locationDesc}><MapPin size={18} className={styles.mapPinIcon} />{property.location}, {property.state}, India</p>
        <div className={styles.mapBox}>
          <iframe 
            title="Property Location"
            src={`https://maps.google.com/maps?q=${mapQuery}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
            width="100%" 
            height="100%" 
            allowFullScreen="" 
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <p className={styles.exactLocation}>Exact location provided after booking.</p>
      </section>

      <div className={styles.divider}></div>

      {/* SECTION 6 - MORE STAYS */}
      <section className={styles.moreStays}>
        <div className={styles.moreStaysHeader}>
          <h3 className={styles.sectionHeading}>More stays in {property.city}</h3>
          <div className={styles.pagination}>
            <span>1 / 1</span>
            <button className={styles.arrowBtn} onClick={() => scrollMoreStays('left')}><ChevronLeft size={16} /></button>
            <button className={styles.arrowBtn} onClick={() => scrollMoreStays('right')}><ChevronRight size={16} /></button>
          </div>
        </div>
        <div className={styles.cardsRow} ref={moreStaysRef}>
          {nearbyStays.length > 0 ? (
            nearbyStays.map(listing => (
              <div key={listing.id} className={styles.carouselCardWrapper}>
                <ListingCard listing={listing} />
              </div>
            ))
          ) : (
            <p>No other properties found in this city.</p>
          )}
        </div>
      </section>

    </div>

      {/* FULLSCREEN IMAGE GALLERY MODAL */}
      {isGalleryOpen && (
        <div className={styles.galleryModal}>
          <div className={styles.galleryHeader}>
            <button className={styles.closeGalleryBtn} onClick={() => setIsGalleryOpen(false)}>
              <ChevronLeft size={24} />
            </button>
          </div>
          <div className={styles.galleryScrollArea}>
             {mockImages.map((img, idx) => (
                <div key={idx} className={styles.galleryImgWrapper}>
                  <img src={img} alt={`Gallery ${idx}`} className={styles.galleryFullscreenImg} />
                </div>
             ))}
          </div>
        </div>
      )}

      {/* POPUP AMENITIES MODAL */}
      {isAmenitiesModalOpen && (
        <div className={styles.amenitiesModalOverlay} onClick={() => setIsAmenitiesModalOpen(false)}>
          <div className={styles.amenitiesModalCard} onClick={e => e.stopPropagation()}>
            <div className={styles.amenitiesModalHeader}>
              <button className={styles.amenitiesCloseBtn} onClick={() => setIsAmenitiesModalOpen(false)}>
                ✕
              </button>
            </div>
            <div className={styles.amenitiesModalBody}>
              <h2 className={styles.amenitiesModalTitle}>What this place offers</h2>
            
            <div className={styles.amenityCategory}>
              <h4>Bathroom</h4>
              <div className={styles.amenityList}>
                <div className={styles.amenityListItem}>
                  <Waves size={24} color="#717171" />
                  <div className={styles.amenityListText}><span>Hairdryer</span></div>
                </div>
              </div>
            </div>
            
            <div className={styles.amenityCategory}>
              <h4>Bedroom and laundry</h4>
              <div className={styles.amenityList}>
                <div className={styles.amenityListItem}><Wind size={24} color="#717171" /><div className={styles.amenityListText}><span>Washing machine</span></div></div>
                <div className={styles.amenityListItem}><Sparkles size={24} color="#717171" /><div className={styles.amenityListText}><span>Essentials</span><span className={styles.amenityListDesc}>Towels, bed sheets, soap and toilet paper</span></div></div>
                <div className={styles.amenityListItem}><Tag size={24} color="#717171" /><div className={styles.amenityListText}><span>Hangers</span></div></div>
                <div className={styles.amenityListItem}><Star size={24} color="#717171" /><div className={styles.amenityListText}><span>Bed linen</span></div></div>
                <div className={styles.amenityListItem}><MessageSquare size={24} color="#717171" /><div className={styles.amenityListText}><span>Extra pillows and blankets</span></div></div>
                <div className={styles.amenityListItem}><Shield size={24} color="#717171" /><div className={styles.amenityListText}><span>Room-darkening blinds</span></div></div>
                <div className={styles.amenityListItem}><Award size={24} color="#717171" /><div className={styles.amenityListText}><span>Iron</span></div></div>
                <div className={styles.amenityListItem}><Key size={24} color="#717171" /><div className={styles.amenityListText}><span>Safe</span></div></div>
                <div className={styles.amenityListItem}><Grid size={24} color="#717171" /><div className={styles.amenityListText}><span>Clothes storage</span></div></div>
              </div>
            </div>

            <div className={styles.amenityCategory}>
              <h4>Entertainment</h4>
              <div className={styles.amenityList}>
                <div className={styles.amenityListItem}><Tv size={24} color="#717171" /><div className={styles.amenityListText}><span>TV</span></div></div>
                <div className={styles.amenityListItem}><Heart size={24} color="#717171" /><div className={styles.amenityListText}><span>Exercise equipment</span></div></div>
              </div>
            </div>

            <div className={styles.amenityCategory}>
              <h4>Family</h4>
              <div className={styles.amenityList}>
                <div className={styles.amenityListItem}><Star size={24} color="#717171" /><div className={styles.amenityListText}><span>Cot</span></div></div>
              </div>
            </div>

            <div className={styles.amenityCategory}>
              <h4>Heating and cooling</h4>
              <div className={styles.amenityList}>
                <div className={styles.amenityListItem}><Wind size={24} color="#717171" /><div className={styles.amenityListText}><span>Air conditioning</span></div></div>
                <div className={styles.amenityListItem}><Wifi size={24} color="#717171" /><div className={styles.amenityListText}><span>Heating</span></div></div>
              </div>
            </div>

            <div className={styles.amenityCategory}>
              <h4>Home safety</h4>
              <div className={styles.amenityList}>
                <div className={styles.amenityListItem}><Shield size={24} color="#717171" /><div className={styles.amenityListText}><span>Exterior security cameras on property</span><span className={styles.amenityListDesc}>Security Cameras cover the Access Road, Entry to the Property & Play Area.</span></div></div>
                <div className={styles.amenityListItem}><Shield size={24} color="#717171" /><div className={styles.amenityListText}><span>Fire extinguisher</span></div></div>
                <div className={styles.amenityListItem}><Shield size={24} color="#717171" /><div className={styles.amenityListText}><span>First aid kit</span></div></div>
              </div>
            </div>

            <div className={styles.amenityCategory}>
              <h4>Internet and office</h4>
              <div className={styles.amenityList}>
                <div className={styles.amenityListItem}><Wifi size={24} color="#717171" /><div className={styles.amenityListText}><span>Wifi</span></div></div>
                <div className={styles.amenityListItem}><Grid size={24} color="#717171" /><div className={styles.amenityListText}><span>Dedicated workspace</span></div></div>
              </div>
            </div>

            <div className={styles.amenityCategory}>
              <h4>Kitchen and dining</h4>
              <div className={styles.amenityList}>
                <div className={styles.amenityListItem}><Coffee size={24} color="#717171" /><div className={styles.amenityListText}><span>Kitchen</span><span className={styles.amenityListDesc}>Space where guests can cook their own meals</span></div></div>
                <div className={styles.amenityListItem}><Car size={24} color="#717171" /><div className={styles.amenityListText}><span>Cooking basics</span><span className={styles.amenityListDesc}>Pots and pans, oil, salt and pepper</span></div></div>
              </div>
            </div>

            <div className={styles.amenityCategory}>
              <h4>Location features</h4>
              <div className={styles.amenityList}>
                <div className={styles.amenityListItem}><MapPin size={24} color="#717171" /><div className={styles.amenityListText}><span>Private entrance</span><span className={styles.amenityListDesc}>Separate street or building entrance</span></div></div>
              </div>
            </div>

            <div className={styles.amenityCategory}>
              <h4>Outdoor</h4>
              <div className={styles.amenityList}>
                <div className={styles.amenityListItem}><Coffee size={24} color="#717171" /><div className={styles.amenityListText}><span>Outdoor dining area</span></div></div>
              </div>
            </div>

            <div className={styles.amenityCategory}>
              <h4>Parking and facilities</h4>
              <div className={styles.amenityList}>
                <div className={styles.amenityListItem}><Car size={24} color="#717171" /><div className={styles.amenityListText}><span>Free parking on premises</span></div></div>
                <div className={styles.amenityListItem}><Waves size={24} color="#717171" /><div className={styles.amenityListText}><span>Pool</span></div></div>
              </div>
            </div>

            <div className={styles.amenityCategory}>
              <h4>Services</h4>
              <div className={styles.amenityList}>
                <div className={styles.amenityListItem}><Heart size={24} color="#717171" /><div className={styles.amenityListText}><span>Pets allowed</span><span className={styles.amenityListDesc}>Assistance animals are always allowed</span></div></div>
                <div className={styles.amenityListItem}><Wind size={24} color="#717171" /><div className={styles.amenityListText}><span>Smoking allowed</span></div></div>
                <div className={styles.amenityListItem}><Key size={24} color="#717171" /><div className={styles.amenityListText}><span>Self check-in</span></div></div>
                <div className={styles.amenityListItem}><Grid size={24} color="#717171" /><div className={styles.amenityListText}><span>Keypad</span><span className={styles.amenityListDesc}>Check yourself in to the home with a door code</span></div></div>
              </div>
            </div>

            <div className={styles.amenityCategory}>
              <h4>Not included</h4>
              <div className={styles.amenityList}>
                <div className={styles.amenityListItem}><Shield size={24} color="#D1D1D1" /><div className={styles.amenityListText} style={{textDecoration: 'line-through', color: '#717171'}}><span>Smoke alarm</span><span className={styles.amenityListDesc}>This place may not have a smoke detector.</span></div></div>
                <div className={styles.amenityListItem}><Shield size={24} color="#D1D1D1" /><div className={styles.amenityListText} style={{textDecoration: 'line-through', color: '#717171'}}><span>Carbon monoxide alarm</span><span className={styles.amenityListDesc}>This place may not have a carbon monoxide detector.</span></div></div>
                <div className={styles.amenityListItem}><Waves size={24} color="#D1D1D1" /><div className={styles.amenityListText} style={{textDecoration: 'line-through', color: '#717171'}}><span>Shampoo</span></div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      )}

      {/* POPUP REVIEWS MODAL */}
      {isReviewsModalOpen && (
        <div className={styles.amenitiesModalOverlay} onClick={() => setIsReviewsModalOpen(false)}>
          <div className={styles.amenitiesModalCard} onClick={e => e.stopPropagation()}>
            <div className={styles.amenitiesModalHeader}>
              <button className={styles.amenitiesCloseBtn} onClick={() => setIsReviewsModalOpen(false)}>
                ✕
              </button>
            </div>
            <div className={styles.amenitiesModalBody}>
              <h2 className={styles.amenitiesModalTitle}>
                <Star size={28} fill="var(--text-main)" style={{marginRight: '12px', verticalAlign: 'text-bottom'}}/>
                {property.rating} · {property.reviews} reviews
              </h2>
              
              <div className={styles.reviewsModalList}>
                {/* Generating 10 mock reviews by repeating the names */}
                {Array.from({ length: 10 }).map((_, idx) => {
                   const names = ['Alice', 'Michael', 'Sarah', 'David', 'Emma', 'James', 'Olivia', 'William', 'Sophia', 'Benjamin'];
                   const name = names[idx % names.length];
                   const avatar = reviewerAvatars[idx % reviewerAvatars.length];
                   return (
                    <div key={idx} className={styles.modalReviewCard}>
                      <div className={styles.reviewerInfo}>
                        <img src={avatar} alt={name} className={styles.reviewerAvatar} />
                        <div>
                          <h4 className={styles.reviewerName}>{name}</h4>
                          <p className={styles.reviewDate}>October 2025</p>
                        </div>
                      </div>
                      <div className={styles.reviewText}>
                        This was an amazing stay! The property was exactly as described and the host was very communicative. Highly recommend booking this place for your next trip. It felt like home away from home.
                      </div>
                    </div>
                   );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

    </>
  );
};

export default PropertyDetail;
