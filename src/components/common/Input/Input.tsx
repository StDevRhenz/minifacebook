import React from 'react';

interface InputProps {
    type?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    className?: string;
    name?: string;
    disabled?: boolean;
    required?: boolean;
}

const Input: React.FC<InputProps> = ({ 
    type = 'text', 
    value, 
    onChange, 
    placeholder, 
    className,
    name,
    disabled = false,
    required = false 
}) => {
    return (
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`border rounded p-2 ${className || ''}`}
            disabled={disabled}
            required={required}
        />
    );
};

export default Input;