import React from 'react';
import LargerModal from '../components/LargerModal';
import './About.css';

const About = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <LargerModal isOpen={isOpen} onClose={onClose}>
      <div className="about-box">
        <h2 className="about-title">Welcome to LeafQuest</h2>
        
        <div className="about-content">
          <p className="about-description">
            Test your knowledge about wildlife conservation and climate change
          </p>
          
          <div className="about-grid">
            <div className="about-card">
              <h3 className="about-card-title">
                Wildlife Conservation
              </h3>
              <p className="about-card-text">
                Learn about endangered species, conservation efforts, and how you can help protect wildlife.
              </p>
            </div>
            
            <div className="about-card">
              <h3 className="about-card-title">
                Climate Change
              </h3>
              <p className="about-card-text">
                Understand the impacts of climate change and discover ways to contribute to a sustainable future.
              </p>
            </div>
          </div>
        </div>
      </div>
    </LargerModal>
  );
};

export default About; 