import React from 'react';
import { useQuizStore } from "../store";
import { useImageStore } from "../store"; // Import image store
import QuizItem from "../components/QuizItem";
import ClickableImage from "../components/ClickableAssets/ClickableImage";
import ClickableQuestion from "../components/ClickableAssets/ClickableQuestion";

const HomePage = () => {
  const { isOpen, currentQuestion, closeQuizModal } = useQuizStore(); // Quiz state
  const { isImageOpen, closeImageModal } = useImageStore(); // Image modal state

  return (
    <div className="home-container">
      <img 
        src="/background-scrollable.png" 
        alt="background" 
        className="background-image"
      />

      {/* Show QuizItem when a ClickableQuestion is clicked */}
      {isOpen && currentQuestion && (
        <QuizItem question={currentQuestion} onClose={closeQuizModal} />
      )}

      {/* Show ClickableImage message when a ClickableImage is clicked */}
      {isImageOpen && (
        <div className="modal-overlay image-block-overlay" onClick={closeImageModal}>
          {/* The modal content will be inside ClickableImage */}
        </div>
      )}

      {/* Hide everything else when either quiz OR image modal is open */}
      {!isOpen && !isImageOpen && (
        <div className="clickable-images-container">
          {/* Clickable Questions */}
          <ClickableQuestion imageSrc="/bear2.png" questionId={1} top={150} left={300} />
          <ClickableQuestion imageSrc="/panda.png" questionId={2} top={200} left={1200} />
          <ClickableQuestion imageSrc="/makima.png" questionId={3} top={400} left={800} />
          <ClickableQuestion imageSrc="/aki.png" questionId={4} top={350} left={1600} />
          <ClickableQuestion imageSrc="/walrus.png" questionId={5} top={600} left={400} />
          <ClickableQuestion imageSrc="/elefant-1.png" questionId={6} top={500} left={1400} />

          {/* Clickable Images */}
          <ClickableImage imageSrc="/images/ash.png" altText="Ash Image" factIndex={0} style={{ top: '200px', left: '600px' }} />
          <ClickableImage imageSrc="/images/tree.png" altText="Tree Image" factIndex={1} style={{ top: '250px', left: '1800px' }} />
          <ClickableImage imageSrc="/images/bush-1.png" altText="Bush Image" factIndex={2} style={{ top: '450px', left: '1000px' }} />
          <ClickableImage imageSrc="/images/treepine.png" altText="Tree Spine Image" factIndex={3} style={{ top: '400px', left: '2000px' }} />
          <ClickableImage imageSrc="/images/Untitled_Artwork1.png" altText="Artwork Image" factIndex={4} style={{ top: '650px', left: '1200px' }} />
          <ClickableImage imageSrc="/images/bush-2.png" altText="Bush 2 Image" factIndex={5} style={{ top: '550px', left: '1900px' }} />
        </div>
      )}
    </div>
  );
};

export default HomePage;
