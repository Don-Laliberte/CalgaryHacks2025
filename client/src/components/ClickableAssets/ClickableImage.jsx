import "./ClickableImage.css";
import { useImageStore } from "../../store";
import React from "react";
import ImageModal from "./ImageModal"; // Import the new modal

const facts = [
  "Since 1970, species populations have declined by an average of 69%.",
  "Giant pandas are found exclusively in the wild in China.",
  "The Irrawaddy dolphin became the face of a global campaign to stop the Don Sahong dam on the Mekong River.",
  "At the first-ever global summit on a single species, an ambitious goal was set to double the number of wild tigers by 2022.",
  "Approximately 20,000 elephants are poached each year for their tusks.",
  "Namibia was the first African country to enshrine environmental protection in its constitution."
];

const ClickableImage = ({ imageSrc, altText, factIndex, style }) => {
  const { openImageModal } = useImageStore();

  const handleImageClick = () => {
    openImageModal(facts[factIndex]); // Open modal with correct fact
  };

  return (
    <div className="image-container" style={style}>
      <img
        src={imageSrc}
        alt={altText}
        className="responsive hover-effect"
        onClick={handleImageClick}
      />
    </div>
  );
};

export default ClickableImage;
