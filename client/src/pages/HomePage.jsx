import React, { useState, useEffect } from 'react';
import './HomePage.css';
import QuizProgress from '../components/ClickableAssets/QuizProgress';
import ClickableImage from '../components/ClickableAssets/ClickableImage';
import ClickableQuestion from '../components/ClickableAssets/ClickableQuestion';

const HomePage = () => {
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Array of ALL image paths
  const imagePaths = [
    // Background
    '/background-scrollable.png',
    
    // Question Images
    '/bear2.png',
    '/panda.png',
    '/makima.png',
    '/aki.png',
    '/walrus.png',
    '/elefant-1.png',
    
    // Fact Images
    '/images/ash.png',
    '/images/tree.png',
    '/images/bush-1.png',
    '/images/treepine.png',
    '/images/Untitled_Artwork1.png',
    '/images/bush-2.png'
  ];

  useEffect(() => {
    const loadImages = async () => {
      setImagesLoaded(false); // Reset loading state
      
      const loadImage = (src) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = src;
          img.onload = () => resolve(src);
          img.onerror = () => reject(`Failed to load image: ${src}`);
        });
      };

      try {
        // Load all images concurrently
        await Promise.all(imagePaths.map(loadImage));
        console.log('All images loaded successfully');
        setImagesLoaded(true);
      } catch (error) {
        console.error('Error loading images:', error);
        // You might want to show an error message to the user here
        setImagesLoaded(true); // Still set to true to prevent infinite loading
      }
    };

    loadImages();
  }, []); // Empty dependency array means this runs once on mount

  if (!imagesLoaded) {
    return (
      <div className="loading-screen">
        <div className="loading-content">
          <div className="loading-spinner"></div>
          <p>Loading images...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="home-container">
      <img 
        src="/background-scrollable.png" 
        alt="background" 
        className="background-image"
      />
      <div className="clickable-images-container">
        {/* Questions - First Row */}
        <ClickableQuestion 
          imageSrc="/bear2.png"
          questionId={1}
          top={150}
          left={300}
        />
        <ClickableQuestion 
          imageSrc="/panda.png"
          questionId={2}
          top={200}
          left={1200}
        />
        
        {/* Questions - Middle Row */}
        <ClickableQuestion 
          imageSrc="/makima.png"
          questionId={3}
          top={400}
          left={800}
        />
        <ClickableQuestion 
          imageSrc="/aki.png"
          questionId={4}
          top={350}
          left={1600}
        />
        
        {/* Questions - Bottom Row */}
        <ClickableQuestion 
          imageSrc="/walrus.png"
          questionId={5}
          top={600}
          left={400}
        />
        <ClickableQuestion 
          imageSrc="/elefant-1.png"
          questionId={6}
          top={500}
          left={1400}
        />

        {/* Fact Images - First Row */}
        <ClickableImage 
          imageSrc="/images/ash.png"
          altText="Ash Image" 
          factIndex={0}  // "Since 1970, species populations have declined..."
          style={{ top: '200px', left: '600px' }} 
        />
        <ClickableImage 
          imageSrc="/images/tree.png"
          altText="Tree Image" 
          factIndex={1}  // "Giant pandas are found exclusively..."
          style={{ top: '250px', left: '1800px' }} 
        />

        {/* Fact Images - Middle Row */}
        <ClickableImage 
          imageSrc="/images/bush-1.png"
          altText="Bush Image" 
          factIndex={2}  // "The Irrawaddy dolphin became..."
          style={{ top: '450px', left: '1000px' }} 
        />
        <ClickableImage 
          imageSrc="/images/treepine.png"
          altText="Tree Spine Image" 
          factIndex={3}  // "At the first-ever global summit..."
          style={{ top: '400px', left: '2000px' }} 
        />

        {/* Fact Images - Bottom Row */}
        <ClickableImage 
          imageSrc="/images/Untitled_Artwork1.png"
          altText="Artwork Image" 
          factIndex={4}  // "Approximately 20,000 elephants..."
          style={{ top: '650px', left: '1200px' }} 
        />
        <ClickableImage 
          imageSrc="/images/bush-2.png"
          altText="Bush 2 Image" 
          factIndex={5}  // "Namibia was the first African country..."
          style={{ top: '550px', left: '1900px' }} 
        />
      </div>
      <QuizProgress />
    </div> 
  );
};

export default HomePage;
