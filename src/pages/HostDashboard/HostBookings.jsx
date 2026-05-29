import React from 'react';
import styles from './HostTabs.module.css';

const dummyBookings = [
  { id: 'B-101', guest: 'Rahul Sharma', property: 'Royal Heritage Villa', checkIn: '2026-10-12', checkOut: '2026-10-15', amount: '₹36,000', status: 'Upcoming' },
  { id: 'B-102', guest: 'Priya Patel', property: 'Minimalist Studio', checkIn: '2026-10-18', checkOut: '2026-10-20', amount: '₹9,000', status: 'Upcoming' },
  { id: 'B-099', guest: 'Aman Singh', property: 'Royal Heritage Villa', checkIn: '2026-09-25', checkOut: '2026-09-28', amount: '₹36,000', status: 'Completed' },
  { id: 'B-098', guest: 'Sneha Gupta', property: 'Himalayan Retreat', checkIn: '2026-09-10', checkOut: '2026-09-14', amount: '₹24,000', status: 'Completed' },
  { id: 'B-095', guest: 'Vikram Joshi', property: 'Minimalist Studio', checkIn: '2026-08-22', checkOut: '2026-08-25', amount: '₹13,500', status: 'Cancelled' },
];

const HostBookings = () => {
  return (
    <div>
      <div className={styles.tabHeader}>
        <div>
          <h1 className={styles.pageTitle}>Bookings</h1>
          <p className={styles.pageSubtitle}>View all your upcoming, active, and past reservations.</p>
        </div>
        <button className={styles.outlineBtn}>Download CSV</button>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Guest Name</th>
              <th>Property</th>
              <th>Dates</th>
              <th>Payout</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {dummyBookings.map(booking => (
              <tr key={booking.id}>
                <td style={{ fontWeight: 600 }}>{booking.guest}</td>
                <td>{booking.property}</td>
                <td>{booking.checkIn} to {booking.checkOut}</td>
                <td style={{ fontWeight: 600 }}>{booking.amount}</td>
                <td>
                  <span className={styles.statusBadge} style={{
                    background: booking.status === 'Upcoming' ? '#E3F2FD' : booking.status === 'Completed' ? '#E8F5E9' : '#FFEBEE',
                    color: booking.status === 'Upcoming' ? '#1565C0' : booking.status === 'Completed' ? '#2E7D32' : '#C62828'
                  }}>
                    {booking.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HostBookings;
