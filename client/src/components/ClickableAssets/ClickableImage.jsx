import "./ClickableImage.css";
import { useInfoStore } from "../../store";

const ClickableImage = ({ imageSrc, message }) => {
  const { isVisible, setMessage, hideMessage } = useInfoStore();

  const handleImageClick = () => {
    if (isVisible) {
      hideMessage();
    } else {
      setMessage(message);
    }
  };

  return (
    <div className="image-container">
      <img
        src={imageSrc}
        alt="Clickable"
        className="responsive hover-effect"
        onClick={handleImageClick}
      />
      {isVisible && (
        <div className="modal-overlay" onClick={hideMessage}>
          <div className="modal-content centered" onClick={(e) => e.stopPropagation()}>
            <p>{message}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClickableImage;
