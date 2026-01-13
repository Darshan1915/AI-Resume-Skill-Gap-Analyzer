import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  
  // Navigation items only relevant for authenticated users
  const navItems = [
    { name: 'Analyze', path: '/dashboard', icon: '⬆️' },
    { name: 'Results', path: '/results/latest', icon: '📊' },
    { name: 'History', path: '/history', icon: '🕒' },
  ];

  // Helper function for styling active/inactive authenticated links
  const getNavLinkClass = ({ isActive }) =>
    `px-4 py-2 font-medium transition-colors duration-200 ${
      isActive
        ? 'text-primary border-b-2 border-primary bg-blue-50/50'
        : 'text-gray-600 hover:text-primary hover:border-b-2 hover:border-blue-200'
    }`;

  // --- Main Header Content ---
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-md">
      <div className="container flex items-center justify-between px-6 py-4 mx-auto">
        
        {/* 1. Logo and Title (Always Visible) */}
        <motion.div 
          className="flex items-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to={isAuthenticated ? '/dashboard' : '/'} className="flex items-center">
            <div className="p-2 mr-3 rounded-full bg-primary">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">SkillBridge Analyzer</h1>
          </Link>
        </motion.div>

        {/* 2. Right Side: Conditional Content */}
        <div className="flex items-center space-x-4">
          
          {isAuthenticated ? (
            // --- Authenticated User Display ---
            <>
              <span className="hidden text-sm text-gray-600 md:block">{user?.email || 'User'}</span>
              <motion.button 
                onClick={logout} 
                className="p-2 text-gray-500 transition duration-150 rounded-full hover:text-red-500 hover:bg-red-50"
                whileTap={{ scale: 0.9 }}
                aria-label="Logout"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-16v1M12 2v2m0 16v2M2 12h2m16 0h2M3 15.328a8 8 0 1118 0" />
                </svg>
              </motion.button>
            </>
          ) : (
            // --- Unauthenticated User Display ---
            <Link 
              to="/auth" 
              className="px-4 py-2 text-sm font-semibold text-white transition duration-200 rounded-lg shadow-md bg-primary hover:bg-blue-700"
            >
              Login / Start Now
            </Link>
          )}
        </div>
      </div>
      
      {/* 3. Navigation Tabs (Only shows if authenticated) */}
      {isAuthenticated && (
        <nav className="container flex px-6 mx-auto space-x-2 border-t border-gray-100 sm:space-x-4">
          {navItems.map((item) => (
            <motion.div
              key={item.path}
              initial={{ y: 5, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 * navItems.indexOf(item) }}
            >
              <NavLink to={item.path} className={getNavLinkClass}>
                {item.icon} <span className="hidden sm:inline">{item.name}</span>
              </NavLink>
            </motion.div>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Header;