import React from 'react';
import { Search, ClipboardCheck, PartyPopper } from 'lucide-react';
import styles from './HowItWorks.module.css';

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      icon: <Search size={40} />,
      title: "1. Search",
      desc: "Find properties in your city with smart filters like budget, type & amenities."
    },
    {
      id: 2,
      icon: <ClipboardCheck size={40} />,
      title: "2. Compare",
      desc: "Compare prices, read verified reviews & check property features in detail."
    },
    {
      id: 3,
      icon: <PartyPopper size={40} />,
      title: "3. Book",
      desc: "Book instantly with secure payments and zero brokerage fees. Pack your bags!"
    }
  ];

  return (
    <section className={styles.section}>
      <div className={`container ${styles.container}`}>
        <div className={styles.header}>
          <h2 className={styles.title}>How StayVista Works</h2>
          <p className={styles.subtitle}>Your dream stay is just three steps away</p>
        </div>

        <div className={styles.steps}>
          {steps.map(step => (
            <div key={step.id} className={styles.stepCard}>
              <div className={styles.iconWrapper}>{step.icon}</div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDesc}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
