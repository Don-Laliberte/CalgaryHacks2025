import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <img 
        src="/background-scrollable.png" 
        alt="background" 
        className="background-image"
      />
    </div> 
  );
};

export default HomePage;
