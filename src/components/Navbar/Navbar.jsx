import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Home as HomeIcon, Sun, Moon, Heart } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice';
import styles from './Navbar.module.css';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const dropdownRef = useRef(null);
  
  const wishlist = useSelector(state => state.listings.wishlist);
  const { isAuthenticated, user } = useSelector(state => state.auth || { isAuthenticated: false });

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleListProperty = (e) => {
    e.preventDefault();
    if (isAuthenticated) {
      navigate('/become-a-host/profile');
    } else {
      navigate('/login?redirect=/become-a-host/profile');
    }
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    setProfileDropdownOpen(false);
    navigate('/');
  };

  const isHomePage = location.pathname === '/';
  const navClass = isHomePage 
    ? (scrolled ? styles.navScrolled : styles.navTransparent)
    : styles.navScrolled;

  return (
    <>
      <nav className={`${styles.navbar} ${navClass}`}>
        <div className={`container ${styles.navContainer}`}>
          <Link to="/" className={styles.logo}>
            <div className={styles.logoIcon}>
              <HomeIcon size={22} color="white" fill="white" />
            </div>
            <span className={styles.logoText}>StayVista</span>
          </Link>

          <div className={styles.navActions}>

            <button 
              className={styles.themeToggleBtn} 
              onClick={toggleTheme}
              title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            
            <button 
              className={styles.themeToggleBtn} 
              onClick={() => navigate('/wishlist')}
              title="View Wishlist"
              style={{ position: 'relative' }}
            >
              <Heart size={20} color={wishlist.length > 0 ? '#FF385C' : 'currentColor'} fill={wishlist.length > 0 ? '#FF385C' : 'none'} />
              {wishlist.length > 0 && (
                <span className={styles.wishlistBadge}>{wishlist.length}</span>
              )}
            </button>

            {isAuthenticated && (
              <a href="#" onClick={handleListProperty} className={styles.navLink}>List your property</a>
            )}
            
            {!isAuthenticated ? (
              <div className={styles.authButtons}>
                <Link to="/login" className={styles.loginBtn}>Login</Link>
                <Link to="/signup" className={styles.signupBtn}>Sign up</Link>
              </div>
            ) : (
              <div className={styles.userProfile} ref={dropdownRef}>
                <div 
                  className={styles.profileMenuBtn} 
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                >
                  <Menu size={16} color="currentColor" />
                  <div className={styles.avatarCircle}>
                    {user?.firstName?.charAt(0) || 'U'}
                  </div>
                </div>
                {profileDropdownOpen && (
                  <div className={styles.profileDropdown}>
                    <div className={styles.dropdownItem} style={{fontWeight: 600}}>Messages</div>
                    <div className={styles.dropdownItem} style={{fontWeight: 600}}>Trips</div>
                    <div className={styles.dropdownItem} style={{fontWeight: 600}}>Wishlists</div>
                    <div className={styles.dropdownDivider}></div>
                    <div className={styles.dropdownItem} onClick={() => { navigate('/hosting'); setProfileDropdownOpen(false); }}>Host Dashboard</div>
                    <div className={styles.dropdownItem} onClick={handleListProperty}>StayVista your home</div>
                    <div className={styles.dropdownItem} onClick={() => { navigate('/profile'); setProfileDropdownOpen(false); }}>Account</div>
                    <div className={styles.dropdownDivider}></div>
                    <div className={styles.dropdownItem} onClick={handleLogout}>Log out</div>
                  </div>
                )}
              </div>
            )}
          </div>

          <button className={styles.mobileMenuBtn} onClick={() => setMobileMenuOpen(true)}>
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Sidebar */}
      <div className={`${styles.overlay} ${mobileMenuOpen ? styles.overlayVisible : ''}`} onClick={() => setMobileMenuOpen(false)} />
      <div className={`${styles.mobileMenu} ${mobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <Link to="/" className={styles.logo} onClick={() => setMobileMenuOpen(false)}>
            <div className={styles.logoIcon}>
              <HomeIcon size={20} color="white" fill="white" />
            </div>
            <span className={styles.logoText} style={{ fontSize: '20px' }}>StayVista</span>
          </Link>
          <button onClick={() => setMobileMenuOpen(false)} style={{ background: 'rgba(0,0,0,0.05)', border: 'none', cursor: 'pointer', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <X size={20} color="#222" />
          </button>
        </div>
        <Link to="/" className={styles.mobileMenuLink} onClick={() => setMobileMenuOpen(false)}>Home</Link>
        {isAuthenticated && (
          <a href="#" onClick={handleListProperty} className={styles.mobileMenuLink}>List your property</a>
        )}
        
        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {!isAuthenticated ? (
            <>
              <Link to="/signup" className={styles.signupBtn} style={{ width: '100%', textAlign: 'center' }} onClick={() => setMobileMenuOpen(false)}>Sign up</Link>
              <Link to="/login" className={styles.loginBtn} style={{ width: '100%', textAlign: 'center' }} onClick={() => setMobileMenuOpen(false)}>Login</Link>
            </>
          ) : (
            <>
              <Link to="/profile" className={styles.navLink} style={{ textAlign: 'center', padding: '12px', background: '#F0F0F0', borderRadius: '8px' }} onClick={() => setMobileMenuOpen(false)}>My Profile</Link>
              <button onClick={() => { handleLogout(); setMobileMenuOpen(false); }} className={styles.loginBtn} style={{ width: '100%', textAlign: 'center' }}>Log out</button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
