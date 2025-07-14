import React from 'react';

interface InputProps {
    type?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    className?: string;
    name?: string;
}

const Input: React.FC<InputProps> = ({ 
    type = 'text', 
    value, 
    onChange, 
    placeholder, 
    className,
    name 
}) => {
    return (
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`border rounded p-2 ${className}`}
        />
    );
};

export default Input;