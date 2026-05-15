import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Home as HomeIcon } from 'lucide-react';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`${styles.navbar} ${scrolled ? styles.navScrolled : styles.navTransparent}`}>
        <div className={`container ${styles.navContainer}`}>
          <Link to="/" className={styles.logo}>
            <div className={styles.logoIcon}>
              <HomeIcon size={22} color="white" fill="white" />
            </div>
            <span className={styles.logoText}>StayVista</span>
          </Link>

          <div className={styles.navActions}>
            <Link to="/list-property" className={styles.navLink}>List your property</Link>
            <div className={styles.authButtons}>
              <button className={styles.loginBtn}>Login</button>
              <button className={styles.signupBtn}>Sign up</button>
            </div>
          </div>

          <button className={styles.mobileMenuBtn} onClick={() => setMobileMenuOpen(true)}>
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Sidebar */}
      <div className={`${styles.overlay} ${mobileMenuOpen ? styles.overlayVisible : ''}`} onClick={() => setMobileMenuOpen(false)} />
      <div className={`${styles.mobileMenu} ${mobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <span className={styles.logoText}>StayVista</span>
          <button onClick={() => setMobileMenuOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <X size={28} color="#222" />
          </button>
        </div>
        <Link to="/" className={styles.mobileMenuLink} onClick={() => setMobileMenuOpen(false)}>Home</Link>
        <Link to="/list-property" className={styles.mobileMenuLink} onClick={() => setMobileMenuOpen(false)}>List your property</Link>
        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <button className={styles.signupBtn} style={{ width: '100%' }}>Sign up</button>
          <button className={styles.loginBtn} style={{ width: '100%' }}>Login</button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
