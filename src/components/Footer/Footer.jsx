import React from 'react';
import { Home, Facebook, Twitter, Instagram, Linkedin, ArrowRight } from 'lucide-react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerGrid}`}>
        <div className={styles.col}>
          <div className={styles.logo}>
            <div className={styles.logoIcon}>
              <Home size={20} color="white" fill="white" />
            </div>
            <span>StayVista</span>
          </div>
          <p className={styles.tagline}>
            India's most trusted rental platform for luxury villas, cozy PGs, and premium hotels.
          </p>
          <div className={styles.socials}>
            <a href="#" className={styles.socialIcon}><Facebook size={20} /></a>
            <a href="#" className={styles.socialIcon}><Twitter size={20} /></a>
            <a href="#" className={styles.socialIcon}><Instagram size={20} /></a>
            <a href="#" className={styles.socialIcon}><Linkedin size={20} /></a>
          </div>
        </div>

        <div className={styles.col}>
          <h4 className={styles.colTitle}>Company</h4>
          <ul className={styles.links}>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Terms & Conditions</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
        </div>

        <div className={styles.col}>
          <h4 className={styles.colTitle}>Support</h4>
          <ul className={styles.links}>
            <li><a href="#">Help Center</a></li>
            <li><a href="#">FAQs</a></li>
            <li><a href="#">Report a Concern</a></li>
          </ul>
        </div>

        <div className={styles.col}>
          <h4 className={styles.colTitle}>Get our App</h4>
          <p className={styles.appText}>Download for better experience</p>
          <div className={styles.appBadges}>
            <button className={styles.appBtn}>
              <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" />
            </button>
            <button className={styles.appBtn}>
              <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" />
            </button>
          </div>
          <div className={styles.newsletter}>
            <input type="email" placeholder="Enter your email" />
            <button><ArrowRight size={20} /></button>
          </div>
        </div>
      </div>
      <div className={styles.bottomBar}>
        <div className={`container ${styles.bottomContent}`}>
          <p>© 2024 StayVista Rentals Private Limited. All rights reserved.</p>
          <div className={styles.bottomLinks}>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
