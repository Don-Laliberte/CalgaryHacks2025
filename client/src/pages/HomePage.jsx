import React from 'react';
import './HomePage.css';
import QuizProgress from '../components/ClickableAssets/QuizProgress';
import ClickableImage from '../components/ClickableAssets/ClickableImage';

const HomePage = () => {
  return (
    <div className="home-container">
      <img 
        src="/background-scrollable.png" 
        alt="background" 
        className="background-image"
      />
      <div className="clickable-images-container">
        <ClickableImage 
          imageSrc="/images/Ash Image.png"
          altText="Ash Image" 
          factIndex={0} 
          style={{ top: '20%', left: '20%' }} 
        />
        <ClickableImage 
          imageSrc="/images/treepine.png"
          altText="Tree Image" 
          factIndex={1} 
          style={{ top: '30%', left: '40%' }} 
        />
        <ClickableImage 
          imageSrc="/images/tree.png"
          altText="Bush Image" 
          factIndex={2} 
          style={{ top: '40%', left: '60%' }} 
        />
        <ClickableImage 
          imageSrc="/images/.png"
          altText="Tree Spine Image" 
          factIndex={3} 
          style={{ top: '50%', left: '30%' }} 
        />
        <ClickableImage 
          imageSrc="/images/Artwork Image.png"
          altText="Artwork Image" 
          factIndex={4} 
          style={{ top: '25%', left: '70%' }} 
        />
        <ClickableImage 
          imageSrc="/images/Bush 2 Image.png"
          altText="Bush 2 Image" 
          factIndex={5} 
          style={{ top: '60%', left: '50%' }} 
        />
      </div>
      <QuizProgress />
    </div> 
  );
};

export default HomePage;
