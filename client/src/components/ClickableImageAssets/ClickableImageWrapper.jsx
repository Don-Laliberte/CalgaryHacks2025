import React, { useState } from "react";
import ClickableImage from "./ClickableImage"; // Import your component

const ClickableImageWrapper = ({ imageSrc, message }) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const handleImageLoad = (event) => {
    setDimensions({
      width: event.target.naturalWidth, 
      height: event.target.naturalHeight
    });
  };

  return (
    <div>
      {/* Hidden preloading image to get dimensions */}
      <img
        src={imageSrc}
        alt="Preload"
        onLoad={handleImageLoad}
        style={{ display: "none" }} // Hide preloading image
      />
      
      {/* Render ClickableImage with actual dimensions */}
      {dimensions.width > 0 && (
        <ClickableImage
          imageSrc={imageSrc}
          message={message}
          width={dimensions.width}
          height={dimensions.height}
        />
      )}
    </div>
  );
};

export default ClickableImageWrapper;
