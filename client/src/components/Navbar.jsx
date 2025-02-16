import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import Login from '../pages/Login';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const location = useLocation();

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/leaderboard', label: 'Leaderboard' },
    { path: '/about', label: 'About' }
  ];

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo">
            LeafQuest
          </Link>

          {/* Desktop Navigation */}
          <div className="nav-menu">
            {navLinks.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`nav-link ${isActivePath(path) ? 'active' : ''}`}
              >
                {label}
              </Link>
            ))}
            <button 
              className="nav-button"
              onClick={() => setIsLoginOpen(true)}
            >
              Login
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className={`mobile-menu-button ${isMobileMenuOpen ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>

          {/* Mobile Navigation */}
          <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
            {navLinks.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`mobile-nav-link ${isActivePath(path) ? 'active' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
            <Link 
              to="/login" 
              className="mobile-nav-button"
              onClick={() => setIsLoginOpen(true)}
            >
              Login
            </Link>
          </div>
        </div>
      </nav>
      
      <Login 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
      />
    </>  
  );
};

export default Navbar;
