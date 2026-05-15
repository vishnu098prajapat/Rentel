import React from 'react';
import { Star, Heart } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleWishlist } from '../../features/listings/listingsSlice';
import styles from './ListingCard.module.css';

const ListingCard = ({ listing }) => {
  const dispatch = useDispatch();
  const wishlist = useSelector(state => state.listings.wishlist);
  const isWishlisted = wishlist.includes(listing.id);

  const handleWishlist = (e) => {
    e.stopPropagation();
    dispatch(toggleWishlist(listing.id));
  };

  return (
    <div className={styles.card}>

      {/* IMAGE CONTAINER — clips image */}
      <div className={styles.imageContainer}>
        <img 
          src={listing.images[0]} 
          alt={listing.title} 
          className={styles.cardImage} 
          loading="lazy" 
        />

        {/* Badge top-left */}
        {listing.badge && <span className={styles.badge}>{listing.badge}</span>}

        {/* Heart top-right */}
        <button className={styles.heartBtn} onClick={handleWishlist}>
          <Heart 
            size={15} 
            className={isWishlisted ? styles.heartFilled : styles.heartEmpty}
          />
        </button>
      </div>

      {/* CARD BODY — below image, no clip */}
      <div className={styles.cardBody}>
        <div className={styles.titleRow}>
          <span className={styles.title}>{listing.title}</span>
          <span className={styles.rating}>
            <Star size={11} className={styles.ratingIcon} />
            {listing.rating}
          </span>
        </div>
        <p className={styles.location}>{listing.city}, {listing.state}</p>
        <div className={styles.priceRow}>
          <span className={styles.price}>₹{listing.price.toLocaleString()}</span>
          <span className={styles.priceLabel}>for 2 nights</span>
        </div>
      </div>

    </div>
  );
};

export default ListingCard;
