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
  const { isVisible, currentMessage, setMessage, hideMessage } = useInfoStore();

  const handleImageClick = () => {
    if (isVisible) {
      hideMessage();
    } else {
      const fact = facts[factIndex];
      setMessage(fact);
    }
  };

  return (
    <div className="image-container" style={style}>
      <img
        src={imageSrc}
        alt={altText}
        className="responsive hover-effect"
        onClick={handleImageClick}
      />
      {isVisible && currentMessage === facts[factIndex] && (
        <div className="modal-overlay" onClick={hideMessage}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <p className="fact-text">{facts[factIndex]}</p>
            <button className="close-button" onClick={hideMessage}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClickableImage;
