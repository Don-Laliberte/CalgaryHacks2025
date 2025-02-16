import React, { useState, useEffect } from 'react';
import './HomePage.css';
import QuizProgress from '../components/ClickableAssets/QuizProgress';
import ClickableImage from '../components/ClickableAssets/ClickableImage';
import ClickableQuestion from '../components/ClickableAssets/ClickableQuestion';

const HomePage = () => {
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Array of image paths
  const imagePaths = [
    '/images/ash.png',
    '/images/tree.png',
    '/images/bush-1.png',
    '/images/treepine.png',
    '/images/Untitled_Artwork1.png',
    '/images/bush-2.png',
    '/background-scrollable.png'
  ];

  useEffect(() => {
    // Preload all images
    const loadImages = async () => {
      const promises = imagePaths.map((path) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = path;
          img.onload = resolve;
          img.onerror = reject;
        });
      });

      try {
        await Promise.all(promises);
        setImagesLoaded(true);
      } catch (error) {
        console.error('Error loading images:', error);
        // Still set as loaded even if there's an error to prevent infinite loading
        setImagesLoaded(true);
      }
    };

    loadImages();
  }, []);

  if (!imagesLoaded) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="home-container">
      <img 
        src="/background-scrollable.png" 
        alt="background" 
        className="background-image"
      />
      <div className="clickable-images-container">
      <ClickableQuestion 
              imageSrc="/aki.png"
              questionId={1}
              top={400}
              left={400}/>
        <ClickableQuestion 
          imageSrc="/panda.png"
          questionId={2}
          top={600}
          left={600}
        />
        <ClickableQuestion 
          imageSrc="/dolphin.png"
          questionId={3}
          top={250}
          left={750}
        />
        <ClickableQuestion 
          imageSrc="/freakytiger.png"
          questionId={4}
          top={200}
          left={200}
        />
        <ClickableQuestion 
          imageSrc="/elefant.png"
          questionId={5}
          top={100}
          left={100}
        />
        <ClickableQuestion 
          imageSrc="/makima.png"
          questionId={6}
          top={750}
          left={750}
        />
        <ClickableImage 
          imageSrc="/images/ash.png"
          altText="Ash Image" 
          factIndex={0} 
          style={{ top: '20%', left: '20%' }} 
        />
        <ClickableImage 
          imageSrc="/images/tree.png"
          altText="Tree Image" 
          factIndex={1} 
          style={{ top: '30%', left: '40%' }} 
        />
        <ClickableImage 
          imageSrc="/images/bush-1.png"
          altText="Bush Image" 
          factIndex={2} 
          style={{ top: '40%', left: '60%' }} 
        />
        <ClickableImage 
          imageSrc="/images/treepine.png"
          altText="Tree Spine Image" 
          factIndex={3} 
          style={{ top: '50%', left: '30%' }} 
        />
        <ClickableImage 
          imageSrc="/images/Untitled_Artwork1.png"
          altText="Artwork Image" 
          factIndex={4} 
          style={{ top: '25%', left: '70%' }} 
        />
        <ClickableImage 
          imageSrc="/images/bush-2.png"
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
