import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import Login from '../pages/Login';
import AboutModal from '../pages/About';
import Leaderboard from '../pages/Leaderboard';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);
  const location = useLocation();

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo">
            LeafQuest
          </Link>

          {/* Desktop Navigation */}
          <div className="nav-menu">
            <Link
              to="/"
              className={`nav-link ${isActivePath('/levelselection') ? 'active' : ''}`}
              onClick={() => window.scrollTo(0, 0)}
            >
              Level Selection
            </Link>
            <Link
              to="/"
              className={`nav-link ${isActivePath('/leaderboard') ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                setIsLeaderboardOpen(true);
              }}
            >
              Leaderboard
            </Link>
            <Link
              to="/"
              className={`nav-link ${isActivePath('/about') ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                setIsAboutOpen(true);
              }}
            >
              About
            </Link>
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
            <Link
              to="/"
              className="mobile-nav-link"
              onClick={() => {
                window.scrollTo(0, 0);
                setIsMobileMenuOpen(false);
              }}
            >
              Level Selection
            </Link>
            <Link
              to="/"
              className="mobile-nav-link"
              onClick={(e) => {
                e.preventDefault();
                setIsLeaderboardOpen(true);
                setIsMobileMenuOpen(false);
              }}
            >
              Leaderboard
            </Link>
            <Link
              to="/"
              className="mobile-nav-link"
              onClick={(e) => {
                e.preventDefault();
                setIsAboutOpen(true);
                setIsMobileMenuOpen(false);
              }}
            >
              About
            </Link>
            <button 
              className="mobile-nav-button"
              onClick={() => {
                setIsLoginOpen(true);
                setIsMobileMenuOpen(false);
              }}
            >
              Login
            </button>
          </div>
        </div>
      </nav>

      <Leaderboard
        isOpen={isLeaderboardOpen}
        onClose={() => setIsLeaderboardOpen(false)}
      />
      <AboutModal 
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />
      <Login 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
      />
    </>
  );
};

export default Navbar;
