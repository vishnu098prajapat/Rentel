import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import styles from './HostTabs.module.css';

const earningsData = [
  { month: 'Jan', earnings: 45000 },
  { month: 'Feb', earnings: 52000 },
  { month: 'Mar', earnings: 48000 },
  { month: 'Apr', earnings: 61000 },
  { month: 'May', earnings: 59000 },
  { month: 'Jun', earnings: 75000 },
  { month: 'Jul', earnings: 82000 },
  { month: 'Aug', earnings: 78000 },
  { month: 'Sep', earnings: 64000 },
];

const HostEarnings = () => {
  return (
    <div>
      <div className={styles.tabHeader}>
        <div>
          <h1 className={styles.pageTitle}>Earnings Details</h1>
          <p className={styles.pageSubtitle}>Analyze your revenue and upcoming payouts.</p>
        </div>
      </div>

      <div style={{ background: 'white', padding: '32px', borderRadius: '16px', border: '1px solid #EBEBEB', marginBottom: '32px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 24px 0' }}>Revenue Over Time</h3>
        <div style={{ height: '350px', width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={earningsData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EBEBEB" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: '#717171' }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: '#717171' }} tickFormatter={(val) => `₹${val/1000}k`} />
              <Tooltip 
                cursor={{ fill: '#F7F7F9' }}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
                formatter={(value) => [`₹${value.toLocaleString()}`, 'Earnings']}
              />
              <Bar dataKey="earnings" fill="#222222" radius={[4, 4, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <div style={{ padding: '24px', borderBottom: '1px solid #EBEBEB' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 700, margin: 0 }}>Recent Payouts</h3>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Method</th>
              <th>Booking Ref</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Sep 29, 2026</td>
              <td>Bank Transfer (...1234)</td>
              <td>B-099</td>
              <td style={{ fontWeight: 600 }}>₹36,000</td>
              <td><span style={{ color: '#00A699', fontWeight: 600 }}>Paid</span></td>
            </tr>
            <tr>
              <td>Sep 15, 2026</td>
              <td>Bank Transfer (...1234)</td>
              <td>B-098</td>
              <td style={{ fontWeight: 600 }}>₹24,000</td>
              <td><span style={{ color: '#00A699', fontWeight: 600 }}>Paid</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HostEarnings;
