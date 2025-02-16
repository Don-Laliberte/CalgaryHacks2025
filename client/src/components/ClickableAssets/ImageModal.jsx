import React from "react";
import "./ImageModal.css"; // Create a new CSS file for styling
import { useImageStore } from "../../store";

const ImageModal = () => {
  const { isImageOpen, currentMessage, closeImageModal } = useImageStore();

  if (!isImageOpen || !currentMessage) return null; // Don't render if not open

  return (
    <div className="modal-overlay image-block-overlay" onClick={closeImageModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <p className="fact-text">{currentMessage}</p>
        <button className="close-button" onClick={closeImageModal}>Close</button>
      </div>
    </div>
  );
};

export default ImageModal;
