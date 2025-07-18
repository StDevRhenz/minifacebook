/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Midnight Bloom Theme Colors
        primary: {
          50: '#f0ede7',
          100: '#d4cfc5',
          200: '#b8b0a3',
          300: '#9c927f',
          400: '#d4a4a4',
          500: '#c9969c',
          600: '#a4798a',
          700: '#8a6578',
          800: '#705066',
          900: '#563c54',
        },
        background: {
          primary: '#1a1625',
          secondary: '#252135',
          tertiary: '#2f2a3e',
          hover: '#3a3449',
          active: '#453e54',
        },
        text: {
          primary: '#f0ede7',
          secondary: '#d4cfc5',
          tertiary: '#b8b0a3',
          muted: '#9c927f',
        },
        border: {
          light: '#3d3550',
          medium: '#4a4059',
          strong: '#574b62',
        },
        accent: {
          DEFAULT: '#d4a4a4',
          hover: '#c9969c',
          light: 'rgba(212, 164, 164, 0.15)',
        },
        success: {
          DEFAULT: '#a4c4a4',
          light: 'rgba(164, 196, 164, 0.15)',
        },
        error: {
          DEFAULT: '#d4a4a4',
          light: 'rgba(212, 164, 164, 0.15)',
        },
        warning: {
          DEFAULT: '#d4c4a4',
          light: 'rgba(212, 196, 164, 0.15)',
        },
      },
      fontFamily: {
        sans: [
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          '"Noto Sans"',
          'sans-serif',
        ],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      animation: {
        'gentle-float': 'gentleFloat 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s ease-in-out infinite',
        'spin-bloom': 'spinBloom 1s linear infinite',
        'bloom-pulse': 'bloomPulse 2s ease-in-out infinite',
        'fade-in-out': 'fadeInOut 2s ease-in-out infinite',
        'edit-slide-in': 'editSlideIn 0.3s ease-out',
        'error-pulse': 'errorPulse 1s ease-in-out infinite',
        'modal-fade-in': 'modalFadeIn 0.3s ease-out',
        'modal-slide-in': 'modalSlideIn 0.3s ease-out',
        'icon-pulse': 'iconPulse 1s ease-in-out infinite',
      },
      keyframes: {
        gentleFloat: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        spinBloom: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        bloomPulse: {
          '0%, 100%': { opacity: '0.7', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        fadeInOut: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        editSlideIn: {
          '0%': { 
            opacity: '0', 
            transform: 'translateY(-20px) scale(0.95)' 
          },
          '100%': { 
            opacity: '1', 
            transform: 'translateY(0) scale(1)' 
          },
        },
        errorPulse: {
          '0%, 100%': { 
            borderColor: 'rgba(212, 164, 164, 0.3)',
            boxShadow: '0 0 0 0 rgba(212, 164, 164, 0.3)' 
          },
          '50%': { 
            borderColor: 'rgba(212, 164, 164, 0.6)',
            boxShadow: '0 0 0 4px rgba(212, 164, 164, 0.1)' 
          },
        },
        modalFadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        modalSlideIn: {
          '0%': { 
            opacity: '0', 
            transform: 'translateY(-50px) scale(0.95)' 
          },
          '100%': { 
            opacity: '1', 
            transform: 'translateY(0) scale(1)' 
          },
        },
        iconPulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        },
      },
    },
  },
  plugins: [],
}
