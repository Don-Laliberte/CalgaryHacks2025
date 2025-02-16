import "./ClickableImage.css";
import useBubbleStore from "../../store";

const ClickableImage = ({ imageSrc, message, width, height }) => {
  const { isVisible, setMessage, hideMessage } = useBubbleStore();

  const handleClick = () => {
    if (isVisible) {
      hideMessage();
    } else {
      setMessage(message);
    }
  };

  return (
    <div className="relative inline-block" style={{ width, height }} onClick={handleClick}>
      <img src={imageSrc} alt="Clickable" className="w-full h-full cursor-pointer" />
      {isVisible && (
        <div
          className="speech-bubble"
          style={{
            top: `${height * 0.2}px`,
            left: `${width * 0.75}px`,
            fontSize: `${width * 0.05}px`,
            padding: `${width * 0.03}px`,
            maxWidth: `${width * 0.5}px`,
          }}
        >
          {message}
        </div>
      )}
    </div>
  );
};
  
  export default ClickableImage;