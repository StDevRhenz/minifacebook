import React from 'react';

interface ButtonProps {
    onClick?: () => void;
    children: React.ReactNode;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
    variant?: 'primary' | 'secondary' | 'danger';
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
    onClick, 
    children, 
    className, 
    type = 'button', 
    variant = 'primary',
    disabled = false 
}) => {
    const getVariantClass = () => {
        switch (variant) {
            case 'secondary':
                return 'btn-secondary';
            case 'danger':
                return 'btn-danger';
            default:
                return 'btn-primary';
        }
    };

    return (
        <button 
            onClick={onClick} 
            className={`btn ${getVariantClass()} ${className || ''}`} 
            type={type}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;