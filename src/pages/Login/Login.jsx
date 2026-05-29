import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, clearError } from '../../features/auth/authSlice';
import { Mail, Lock, ArrowRight, Home as HomeIcon } from 'lucide-react';
import styles from './Login.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isAuthenticated, error } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      const redirect = searchParams.get('redirect') || '/';
      navigate(redirect);
    }
  }, [isAuthenticated, navigate, searchParams]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      dispatch(login({ email, password }));
    }
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
            Welcome Back to<br />
            <span>Premium Stays</span>
          </h1>
          <p className={styles.brandSubtitle}>
            Log in to continue exploring handpicked luxury villas, boutique hotels, and premium properties across India.
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
            <h2>Sign in</h2>
            <p>Don't have an account? <Link to={`/signup${searchParams.get('redirect') ? `?redirect=${searchParams.get('redirect')}` : ''}`}>Sign up</Link></p>
          </div>

          {/* Google Login Button */}
          <button className={styles.googleBtn}>
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" 
              alt="Google" 
              className={styles.googleIcon}
            />
            Continue with Google
          </button>

          <div className={styles.divider}>
            <span>or sign in with email</span>
          </div>

          {error && <div style={{ color: 'red', fontSize: '14px', marginBottom: '10px', textAlign: 'center' }}>{error}</div>}

          <form className={styles.form} onSubmit={handleLogin}>
            <div className={styles.inputGroup}>
              <label>Email Address</label>
              <div className={styles.inputWrapper}>
                <Mail size={18} className={styles.inputIcon} />
                <input 
                  type="email" 
                  placeholder="you@example.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <div className={styles.labelRow}>
                <label>Password</label>
                <a href="#" className={styles.forgotLink}>Forgot password?</a>
              </div>
              <div className={styles.inputWrapper}>
                <Lock size={18} className={styles.inputIcon} />
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
              </div>
            </div>

            <button type="submit" className={styles.submitBtn}>
              Sign In <ArrowRight size={18} />
            </button>
          </form>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Login;
