import React from 'react';
import { Star, Heart, Award, Crown, Sparkles } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toggleWishlist } from '../../features/listings/listingsSlice';
import styles from './ListingCard.module.css';

const ListingCard = ({ listing }) => {
  const dispatch = useDispatch();
  const wishlist = useSelector(state => state.listings.wishlist);
  const isWishlisted = wishlist.includes(listing.id);

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleWishlist(listing.id));
  };

  const renderBadge = () => {
    if (!listing.badge) return null;
    
    let icon = null;
    let badgeClass = styles.badgeDefault;
    
    if (listing.badge === 'Guest favourite') {
      icon = <Crown size={11} className={styles.badgeIcon} />;
      badgeClass = styles.badgeGuest;
    } else if (listing.badge === 'Superhost') {
      icon = <Sparkles size={11} className={styles.badgeIcon} />;
      badgeClass = styles.badgeSuper;
    } else if (listing.badge === 'Top Rated') {
      icon = <Award size={11} className={styles.badgeIcon} />;
      badgeClass = styles.badgeTop;
    }
    
    return (
      <div className={`${styles.badge} ${badgeClass}`}>
        {icon}
        <span>{listing.badge}</span>
      </div>
    );
  };

  return (
    <div className={styles.card}>
      <Link to={`/property/${listing.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>

        {/* IMAGE CONTAINER — clips image */}
        <div className={styles.imageContainer}>
          <img 
            src={listing.images[0]} 
            alt={listing.title} 
            className={styles.cardImage} 
            loading="lazy" 
          />

          {/* Badge top-left */}
          {renderBadge()}

          {/* Heart top-right */}
          <button className={styles.heartBtn} onClick={handleWishlist}>
            <Heart 
              size={18} 
              className={isWishlisted ? styles.heartFilled : styles.heartEmpty}
            />
          </button>
        </div>

        {/* CARD BODY — below image, no clip */}
        <div className={styles.cardBody}>
          <div className={styles.titleRow}>
            <span className={styles.title}>{listing.title}</span>
            <span className={styles.rating}>
              <Star size={12} fill="currentColor" stroke="none" className={styles.ratingIcon} />
              {listing.rating}
            </span>
          </div>
          <p className={styles.location}>{listing.city}, {listing.state}</p>
          <div className={styles.priceRow}>
            <span className={styles.price}>₹{listing.price.toLocaleString()}</span>
            <span className={styles.priceLabel}>for 2 nights</span>
          </div>
        </div>

      </Link>
    </div>
  );
};

export default ListingCard;
