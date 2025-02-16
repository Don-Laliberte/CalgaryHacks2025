import React from 'react';
import './HomePage.css';
import QuizProgress from '../components/ClickableAssets/QuizProgress';

const HomePage = () => {
  return (
    <div className="home-container">
        <div>
          <img 
            src="/background-scrollable.png" 
            alt="background" 
            className="background-image"
          />
        </div>
        <QuizProgress />
    </div> 
  );
};

export default HomePage;
