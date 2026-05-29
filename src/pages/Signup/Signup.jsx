import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Mail, Lock, User, ArrowRight, Home as HomeIcon } from 'lucide-react';
import { register, clearError } from '../../features/auth/authSlice';
import styles from './Signup.module.css';

const Signup = () => {
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, error } = useSelector((state) => state.auth);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      const redirect = searchParams.get('redirect') || '/';
      navigate(redirect);
    }
  }, [isAuthenticated, navigate, searchParams]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(formData));
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        {/* Left side branding/visuals */}
        <div className={styles.authBranding}>
        <div className={styles.brandContent}>
          <Link to="/" className={styles.logo}>
            <div className={styles.logoIcon}>
              <HomeIcon size={24} color="white" fill="white" />
            </div>
            <span className={styles.logoText}>StayVista</span>
          </Link>
          <h1 className={styles.brandTitle}>
            Join the<br />
            <span>Premium Experience</span>
          </h1>
          <p className={styles.brandSubtitle}>
            Create an account to unlock exclusive access to handpicked luxury stays, seamless bookings, and personalized recommendations.
          </p>
        </div>
        
        {/* Decorative elements */}
        <div className={styles.blob1}></div>
        <div className={styles.blob2}></div>
      </div>

      {/* Right side form */}
      <div className={styles.authFormWrapper}>
        <div className={styles.authFormCard}>
          <div className={styles.formHeader}>
            <h2>Create an account</h2>
            <p>Already have an account? <Link to={`/login${searchParams.get('redirect') ? `?redirect=${searchParams.get('redirect')}` : ''}`}>Sign in</Link></p>
          </div>

          {/* Google Signup Button */}
          <button className={styles.googleBtn}>
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" 
              alt="Google" 
              className={styles.googleIcon}
            />
            Sign up with Google
          </button>

          <div className={styles.divider}>
            <span>or sign up with email</span>
          </div>

          {error && <div style={{ color: 'red', fontSize: '14px', marginBottom: '10px', textAlign: 'center' }}>{error}</div>}

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <label>Full Name</label>
              <div className={styles.inputWrapper}>
                <User size={18} className={styles.inputIcon} />
                <input type="text" name="fullName" placeholder="John Doe" required value={formData.fullName} onChange={handleChange} />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label>Email Address</label>
              <div className={styles.inputWrapper}>
                <Mail size={18} className={styles.inputIcon} />
                <input type="email" name="email" placeholder="you@example.com" required value={formData.email} onChange={handleChange} />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label>Password</label>
              <div className={styles.inputWrapper}>
                <Lock size={18} className={styles.inputIcon} />
                <input type="password" name="password" placeholder="Create a password" required value={formData.password} onChange={handleChange} />
              </div>
            </div>

            <button type="submit" className={styles.submitBtn}>
              Create Account <ArrowRight size={18} />
            </button>
            
            <p className={styles.termsText}>
              By signing up, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
            </p>
          </form>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Signup;
