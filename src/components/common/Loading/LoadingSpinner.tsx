import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6', 
    lg: 'w-8 h-8'
  };

  return (
    <div className={`loading-spinner ${className}`}>
      <div className={`spinner ${sizeClasses[size]}`}>
        <div className="spinner-bloom"></div>
      </div>
    </div>
  );
};

const PageLoader: React.FC = () => {
  return (
    <div className="page-loader">
      <LoadingSpinner size="lg" />
      <p className="loader-text">Loading your quiet space... 🌸</p>
    </div>
  );
};

export { LoadingSpinner, PageLoader };
