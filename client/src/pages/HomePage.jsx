import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full relative">
      {/* Background Container */}
      <img 
        src="/images/background.png" 
        alt="background" 
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {/* Semi-transparent overlay */}
      <div className="absolute inset-0 bg-black/20" />
      
      {/* Content Container */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        <h1 className="text-4xl font-bold text-white mb-8 text-center drop-shadow-lg">
          Welcome to LeafQuest
        </h1>
        <button 
          className="bg-green-600 hover:bg-green-700 text-white text-xl font-bold py-4 px-8 rounded-lg transition-all duration-200 hover:scale-105 shadow-lg"
          onClick={() => navigate('/quiz')}
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
};

export default HomePage;
