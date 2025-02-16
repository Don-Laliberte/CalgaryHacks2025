import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-full">
      {/* Background Container */}
      <img 
        src="/images/background.png" 
        alt="background" 
        className="background-image"
      />
      
      {/* Semi-transparent overlay
      <div className="absolute inset-0 bg-black/20" />
      
      {/* Button container */}
      {/* <div className="absolute inset-0 flex items-center justify-center"> */}
        {/* <button 
          className="bg-green-600 hover:bg-green-700 text-white text-xl font-bold py-4 px-8 rounded-lg transition-all duration-200 hover:scale-105 shadow-lg z-10"
          onClick={() => navigate('/quiz')}
        >
          Start Quiz
        </button> */}
      {/* </div> */}
    </div> 
  );
};

export default HomePage;
