import "./ClickableImage.css";
import { useInfoStore } from "../../store";
import React from 'react';

const facts = [
  "Since 1970, species populations have declined by an average of 69%.",
  "Giant pandas are found exclusively in the wild in China.",
  "The Irrawaddy dolphin became the face of a global campaign to stop the Don Sahong dam on the Mekong River.",
  "At the first-ever global summit on a single species, an ambitious goal was set to double the number of wild tigers by 2022.",
  "Approximately 20,000 elephants are poached each year for their tusks.",
  "Namibia was the first African country to enshrine environmental protection in its constitution."
];

const ClickableImage = ({ imageSrc, altText, factIndex, style }) => {
  const { isVisible, setMessage, hideMessage } = useInfoStore();

  const handleImageClick = () => {
    if (isVisible) {
      hideMessage();
    } else {
      setMessage(facts[factIndex]);
    }
  };

  // Combine the passed style with additional positioning styles
  const combinedStyle = {
    ...style,
    position: 'absolute',
    zIndex: 20,
  };

  return (
    <div className="image-container" style={combinedStyle}>
      <img
        src={imageSrc}
        alt={altText}
        className="responsive hover-effect"
        onClick={handleImageClick}
        style={{ width: '100px', height: 'auto' }}
      />
      {isVisible && (
        <div className="modal-overlay" onClick={hideMessage}>
          <div className="modal-content centered" onClick={(e) => e.stopPropagation()}>
            <p>{facts[factIndex]}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClickableImage;
