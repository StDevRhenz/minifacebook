import React from 'react';
import Link from 'next/link';
import { useAuth } from '../../hooks/useAuth';

const Header: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className="header">
      <div className="header-content">
        <Link href="/" className="header-title" style={{ textAlign: 'center', flex: 1 }}>
          Unspoken Letters
        </Link>
        
        <div className="header-actions">
          {user && (
            <div className="user-info">
              Welcome, {user.username}
            </div>
          )}
          
          {user ? (
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Link href="/profile" className="btn btn-ghost">
                Profile
              </Link>
              <button onClick={logout} className="btn btn-secondary">
                Logout
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
};

export default Header;
