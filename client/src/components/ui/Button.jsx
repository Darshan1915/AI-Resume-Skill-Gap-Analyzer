import React from 'react';

const Button = ({ children, onClick, type = 'button', variant = 'primary', className = '', ...props }) => {
  const baseStyles = 'px-6 py-3 rounded-lg font-semibold transition-all duration-300 ease-in-out transform';
  const variants = {
    primary: 'bg-primary text-white hover:bg-blue-700 active:scale-98 shadow-md hover:shadow-lg',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 active:scale-98 shadow-sm hover:shadow-md',
    outline: 'border border-primary text-primary hover:bg-primary hover:text-white active:scale-98',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className} focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;