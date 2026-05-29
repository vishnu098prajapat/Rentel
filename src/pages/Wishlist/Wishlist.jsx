import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Star, Heart } from 'lucide-react';
import { toggleWishlist } from '../../features/listings/listingsSlice';
import styles from './Wishlist.module.css';

const Wishlist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const wishlistIds = useSelector(state => state.listings.wishlist);
  const allListings = useSelector(state => state.listings.listings);
  
  const wishlistItems = allListings.filter(listing => wishlistIds.includes(listing.id));

  const handleCardClick = (id) => {
    navigate(`/property/${id}`);
  };

  const handleToggleFavorite = (id, e) => {
    e.stopPropagation();
    dispatch(toggleWishlist(id));
  };

  return (
    <div className={styles.wishlistPageWrapper}>
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>Wishlists</h1>
      </div>

      {wishlistItems.length === 0 ? (
        <div className={styles.emptyState}>
          <h2>Create your first wishlist</h2>
          <p>As you search, tap the heart icon to save your favorite places and Experiences to a wishlist.</p>
          <button className={styles.exploreBtn} onClick={() => navigate('/')}>Explore now</button>
        </div>
      ) : (
        <div className={styles.listingsGrid}>
          {wishlistItems.map((listing) => (
            <div 
              key={listing.id} 
              className={styles.listingCard}
              onClick={() => handleCardClick(listing.id)}
            >
              <div className={styles.cardImageContainer}>
                <img 
                  src={listing.images?.[0] || 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800'} 
                  alt={listing.title} 
                  className={styles.cardImage} 
                />
                <button 
                  className={styles.heartBtn} 
                  onClick={(e) => handleToggleFavorite(listing.id, e)}
                >
                  <Heart 
                    size={24} 
                    fill="#FF385C"
                    stroke="#ffffff"
                    strokeWidth={2}
                  />
                </button>
              </div>

              <div className={styles.cardDetails}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.location}>{listing.city}, India</h3>
                  <div className={styles.rating}>
                    <Star size={14} fill="#222" />
                    <span>{listing.rating}</span>
                  </div>
                </div>
                <p className={styles.distance}>View property details</p>
                <div className={styles.priceContainer}>
                  <span className={styles.price}>₹{listing.price}</span> night
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
