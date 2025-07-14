import React from 'react';
import Link from 'next/link';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../contexts/ThemeContext';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="header">
      <div className="header-content">
        <Link href="/" className="header-title">
          MiniFacebook
        </Link>
        
        <div className="header-actions">
          {user && (
            <div className="user-info">
              Welcome, {user.email}
            </div>
          )}
          
          <button
            onClick={toggleTheme}
            className="theme-toggle"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          
          {user ? (
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Link href="/profile" className="btn btn-ghost">
                Profile
              </Link>
              <button onClick={logout} className="btn btn-secondary">
                Logout
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Link href="/login" className="btn btn-ghost">
                Login
              </Link>
              <Link href="/register" className="btn btn-primary">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
