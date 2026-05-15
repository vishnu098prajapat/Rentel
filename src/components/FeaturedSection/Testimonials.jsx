import React from 'react';
import { Star, Quote } from 'lucide-react';
import styles from './Testimonials.module.css';

const Testimonials = () => {
  const reviews = [
    {
      id: 1,
      name: "Anjali Sharma",
      city: "Delhi",
      text: "Booked a villa in Jaipur through BetaStay. The experience was seamless! The property was exactly as shown in photos.",
      rating: 5,
      avatar: "https://i.pravatar.cc/150?u=anjali"
    },
    {
      id: 2,
      name: "Rahul Verma",
      city: "Mumbai",
      text: "Found a great PG in Bangalore. Zero brokerage actually saved me a lot of money. Highly recommended for students.",
      rating: 4,
      avatar: "https://i.pravatar.cc/150?u=rahul"
    },
    {
      id: 3,
      name: "Priyanka Chopra",
      city: "Goa",
      text: "The luxury hotel collection is amazing. The interface is much better and easier to use than other platforms.",
      rating: 5,
      avatar: "https://i.pravatar.cc/150?u=priyanka"
    }
  ];

  return (
    <section className={styles.section}>
      <div className={`container ${styles.container}`}>
        <div className={styles.header}>
          <h2 className={styles.title}>What Our Guests Say</h2>
          <p className={styles.subtitle}>Join 50,000+ happy travelers across India</p>
        </div>

        <div className={styles.grid}>
          {reviews.map(review => (
            <div key={review.id} className={styles.card}>
              <div className={styles.quoteIcon}><Quote size={40} fill="var(--primary-light)" color="var(--primary-light)" /></div>
              <div className={styles.stars}>
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="var(--primary)" color="var(--primary)" />
                ))}
              </div>
              <p className={styles.text}>"{review.text}"</p>
              <div className={styles.user}>
                <img src={review.avatar} alt={review.name} className={styles.avatar} />
                <div>
                  <h4 className={styles.userName}>{review.name}</h4>
                  <p className={styles.userCity}>{review.city}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
