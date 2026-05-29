import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import styles from './BookingCard.module.css';

const BookingCard = ({ property }) => {
  const [searchParams] = useSearchParams();
  const queryCheckIn = searchParams.get('checkIn') || '6/19/2026';
  const queryCheckOut = searchParams.get('checkOut') || '6/21/2026';
  const queryGuests = searchParams.get('guests') || '1';

  const [rateType, setRateType] = useState('non-refundable');

  // Calculate nights
  let nights = 2; // Default for 19 to 21
  if (queryCheckIn && queryCheckOut && queryCheckIn !== '6/19/2026') {
    const d1 = new Date(queryCheckIn);
    const d2 = new Date(queryCheckOut);
    if (!isNaN(d1) && !isNaN(d2)) {
      const diffTime = Math.abs(d2 - d1);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays > 0) nights = diffDays;
    }
  }

  const nonRefundableTotal = property.price * nights;
  const refundableTotal = nonRefundableTotal + 3000;

  return (
    <div className={styles.stickyCardContainer}>
      <div className={styles.bookingCard}>
        <div className={styles.priceRow}>
          <span className={styles.priceVal}>₹{(rateType === 'non-refundable' ? nonRefundableTotal : refundableTotal).toLocaleString()}</span>
          <span className={styles.priceNight}>for {nights} nights</span>
        </div>
        
        <div className={styles.inputsGroup}>
          <div className={styles.dateInputs}>
            <div className={styles.inputField}>
              <span className={styles.inputLabel}>Check-in</span>
              <span className={styles.inputVal}>{queryCheckIn}</span>
            </div>
            <div className={styles.inputField}>
              <span className={styles.inputLabel}>Checkout</span>
              <span className={styles.inputVal}>{queryCheckOut}</span>
            </div>
          </div>
        </div>

        <div className={styles.ratesSection}>
          <h4 className={styles.ratesTitle}>Select rate</h4>
          
          <div className={styles.ratesBox}>
            <label className={styles.rateOption}>
              <div className={styles.rateContent}>
                <span className={styles.rateName}>Non-refundable</span>
                <span className={styles.rateDesc}>₹{nonRefundableTotal.toLocaleString()} total</span>
              </div>
              <div className={styles.radioWrapper}>
                <input type="radio" name="rate" checked={rateType === 'non-refundable'} onChange={() => setRateType('non-refundable')} />
              </div>
            </label>
            
            <label className={styles.rateOption}>
              <div className={styles.rateContent}>
                <span className={styles.rateName}>Refundable</span>
                <span className={styles.rateDesc}>₹{refundableTotal.toLocaleString()} total</span>
              </div>
              <div className={styles.radioWrapper}>
                <input type="radio" name="rate" checked={rateType === 'refundable'} onChange={() => setRateType('refundable')} />
              </div>
            </label>
          </div>
        </div>

        <button className={styles.reserveBtn}>Reserve</button>
      </div>
    </div>
  );
};

export default BookingCard;
