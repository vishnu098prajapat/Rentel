import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Eye, DollarSign, Activity, ListFilter, Star } from 'lucide-react';
import styles from './HostDashboard.module.css';

// Mock Data
const earningsData = [
  { name: 'Oct', web: 2988, app: 1200, affiliate: 800 },
  { name: 'Nov', web: 1765, app: 2500, affiliate: 600 },
  { name: 'Dec', web: 4005, app: 3000, affiliate: 1500 },
];

const weeklyData = [
  { name: 'Sun', bookings: 12 },
  { name: 'Mon', bookings: 25 },
  { name: 'Tue', bookings: 68 }, // highlighted
  { name: 'Wed', bookings: 14 },
  { name: 'Thu', bookings: 35 },
  { name: 'Fri', bookings: 28 },
  { name: 'Sat', bookings: 45 },
];

const sourceData = [
  { name: 'Website', value: 374, color: '#FF385C' },
  { name: 'Mobile App', value: 241, color: 'var(--text-main)' },
  { name: 'Other', value: 213, color: 'var(--border-light)' },
];

const recentBookings = [
  { id: 1, guest: 'Rahul Sharma', type: 'Villa', rate: 100, profit: '₹12,450', color: '#FF385C' },
  { id: 2, guest: 'Priya Patel', type: 'Studio', rate: 80, profit: '₹4,500', color: 'var(--text-main)' },
  { id: 3, guest: 'Aman Singh', type: 'Cabin', rate: 50, profit: '₹6,000', color: '#FF385C' },
  { id: 4, guest: 'Neha Gupta', type: 'Apartment', rate: 60, profit: '₹8,200', color: 'var(--text-main)' },
];

const DashboardOverview = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className={styles.headerRow}>
        <div>
          <h1 className={styles.pageTitle}>Dashboard Overview</h1>
          <p className={styles.pageSubtitle}>Here's what's happening with your properties today.</p>
        </div>
        <button className={styles.createBtn} onClick={() => navigate('/become-a-host/profile')}>+ Create New Listing</button>
      </div>

      {/* ROW 1: KPIs */}
      <div className={styles.kpiGrid}>
        <div className={styles.kpiCard}>
          <div className={styles.kpiHeader}>
            <span className={styles.kpiTitle}><Eye size={16} /> Total Views</span>
            <span className={styles.kpiInfoIcon}>ⓘ</span>
          </div>
          <div className={styles.kpiValueRow}>
            <h2 className={styles.kpiValue}>12,450</h2>
            <span className={`${styles.kpiBadge} ${styles.success}`}>15.8% ↗</span>
          </div>
        </div>

        <div className={styles.kpiCard}>
          <div className={styles.kpiHeader}>
            <span className={styles.kpiTitle}><DollarSign size={16} /> Total Earnings</span>
            <span className={styles.kpiInfoIcon}>ⓘ</span>
          </div>
          <div className={styles.kpiValueRow}>
            <h2 className={styles.kpiValue}>₹4,34,500</h2>
            <span className={`${styles.kpiBadge} ${styles.danger}`}>12.0% ↘</span>
          </div>
        </div>

        <div className={styles.kpiCard}>
          <div className={styles.kpiHeader}>
            <span className={styles.kpiTitle}><Activity size={16} /> Booking Rate</span>
            <span className={styles.kpiInfoIcon}>ⓘ</span>
          </div>
          <div className={styles.kpiValueRow}>
            <h2 className={styles.kpiValue}>86.5%</h2>
            <span className={`${styles.kpiBadge} ${styles.success}`}>24.2% ↗</span>
          </div>
        </div>

        {/* 4th Card: Overall Rating */}
        <div className={styles.kpiCard}>
          <div className={styles.kpiHeader}>
            <span className={styles.kpiTitle}><Star size={16} /> Guest Rating</span>
            <span className={styles.kpiInfoIcon}>ⓘ</span>
          </div>
          <div className={styles.kpiValueRow}>
            <h2 className={styles.kpiValue}>4.9</h2>
            <span className={`${styles.kpiBadge} ${styles.success}`}>0.1 ↗</span>
          </div>
        </div>
      </div>

      {/* ROW 2: Main Charts */}
      <div className={styles.row2}>
        {/* Earnings Overview */}
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <div>
              <span className={styles.panelTitle}>Earnings Overview</span>
              <h2 className={styles.panelSubtitle}>$ 9,257.51</h2>
              <span className={`${styles.kpiBadge} ${styles.success}`} style={{display: 'inline-flex', marginTop: '8px'}}>15.8% ↗ <span style={{color: '#A3AED0', fontWeight: 500, marginLeft: '6px'}}>+ $143.50 increased</span></span>
            </div>
            <div className={styles.panelFilter}>
              <button className={styles.filterBtn}><ListFilter size={14}/> Filter</button>
            </div>
          </div>
          <div className={styles.chartContainer}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={earningsData} margin={{ top: 20, right: 0, bottom: 0, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E9EDF7" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: 'var(--text-secondary)', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: 'var(--text-secondary)', fontSize: 12}} />
                <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }} />
                <Bar dataKey="web" stackId="a" fill="#FF385C" radius={[0, 0, 4, 4]} barSize={40} />
                <Bar dataKey="app" stackId="a" fill="var(--text-main)" />
                <Bar dataKey="affiliate" stackId="a" fill="var(--border-light)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Weekly Bookings */}
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <div>
              <span className={styles.panelTitle}>Weekly Bookings</span>
              <h2 className={styles.panelSubtitle}>24,473</h2>
              <span className={`${styles.kpiBadge} ${styles.success}`} style={{display: 'inline-flex', marginTop: '8px'}}>8.3% ↗ <span style={{color: '#A3AED0', fontWeight: 500, marginLeft: '6px'}}>+ 749 increased</span></span>
            </div>
          </div>
          <div className={styles.chartContainer}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData} margin={{ top: 20, right: 0, bottom: 0, left: 0 }}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={({x, y, payload}) => (
                  <text x={x} y={y + 15} fill={payload.value === 'Tue' ? 'var(--text-main)' : 'var(--text-secondary)'} fontWeight={payload.value === 'Tue' ? 700 : 500} fontSize={12} textAnchor="middle">
                    {payload.value}
                  </text>
                )} />
                <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }} />
                <Bar dataKey="bookings" barSize={30} radius={[8, 8, 8, 8]}>
                  {weeklyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.name === 'Tue' ? '#FF385C' : 'var(--border-light)'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ROW 3: Gauge & Table */}
      <div className={styles.row3}>
        {/* Booking Source Gauge */}
        <div className={styles.panel}>
           <div className={styles.panelHeader}>
             <span className={styles.panelTitle}>Booking Distribution</span>
           </div>
           
           <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 10px', marginBottom: '20px' }}>
              <div>
                <span style={{color: '#FF385C', fontWeight: 700}}>|</span> <span style={{color: 'var(--text-secondary)', fontSize: 13, fontWeight: 500}}>Website</span>
                <h3 style={{margin: '4px 0 0 0', color: 'var(--text-main)', fontSize: 20}}>$ 374.82</h3>
              </div>
              <div>
                <span style={{color: 'var(--text-main)', fontWeight: 700}}>|</span> <span style={{color: 'var(--text-secondary)', fontSize: 13, fontWeight: 500}}>Mobile App</span>
                <h3 style={{margin: '4px 0 0 0', color: 'var(--text-main)', fontSize: 20}}>$ 241.60</h3>
              </div>
           </div>

           <div className={styles.chartContainer} style={{ minHeight: '180px', marginTop: '-20px' }}>
             <ResponsiveContainer width="100%" height="100%">
               <PieChart>
                 <Pie
                   data={sourceData}
                   cx="50%"
                   cy="100%"
                   startAngle={180}
                   endAngle={0}
                   innerRadius={70}
                   outerRadius={100}
                   paddingAngle={2}
                   dataKey="value"
                   stroke="none"
                   cornerRadius={4}
                 >
                   {sourceData.map((entry, index) => (
                     <Cell key={`cell-${index}`} fill={entry.color} />
                   ))}
                 </Pie>
               </PieChart>
             </ResponsiveContainer>
           </div>
        </div>

        {/* Recent Bookings Table */}
        <div className={styles.panel}>
           <div className={styles.panelHeader} style={{marginBottom: '16px'}}>
             <span className={styles.panelTitle}>Recent Reservations</span>
             <button className={styles.seeAllBtn}>See All</button>
           </div>
           <div className={styles.tableContainer}>
             <table className={styles.dataTable}>
               <thead>
                 <tr>
                   <th>GUEST / SOURCE</th>
                   <th>TYPE</th>
                   <th>COMPLETION</th>
                   <th>PAYOUT</th>
                 </tr>
               </thead>
               <tbody>
                 {recentBookings.map(item => (
                   <tr key={item.id}>
                     <td>
                       <div className={styles.tableAppCol}>
                         <div className={styles.appIcon} style={{ background: item.color }}>
                           {item.guest.charAt(0)}
                         </div>
                         <span>{item.guest}</span>
                       </div>
                     </td>
                     <td className={styles.tableType}>{item.type}</td>
                     <td>
                       <div className={styles.tableRate}>
                         <span>{item.rate}%</span>
                         <div className={styles.progressBar}>
                           <div className={styles.progressFill} style={{width: `${item.rate}%`, background: item.color}}></div>
                         </div>
                       </div>
                     </td>
                     <td>{item.profit}</td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
        </div>
      </div>
    </>
  );
};

export default DashboardOverview;
