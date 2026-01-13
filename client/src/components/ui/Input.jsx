import React from 'react';

const Input = ({ label, id, type = 'text', value, onChange, placeholder, className = '', ...props }) => {
  return (
    <div className="relative w-full">
      {label && (
        <label htmlFor={id} className="block mb-1 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder || label}
        className={`w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 ease-in-out ${className}`}
        {...props}
      />
    </div>
  );
};

export default Input;