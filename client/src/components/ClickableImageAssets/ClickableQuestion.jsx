import "./ClickableImage.css";
import useQuestionStore from "../../store";
import QuizItem from "../QuestionModal";

const ClickableQuestion = ({ imageSrc, id }) => {
  const { isVisible, showMessage, hideMessage } = useQuestionStore();

  const handleImageClick = () => {
    if (isVisible) {
      hideMessage();
    } else {
      showMessage();
    }
  };

  return (
    <div className="image-container">
      <img
        src={imageSrc}
        alt="Clickable"
        className="responsive"
        onClick={handleImageClick}
      />
      {isVisible && (
        <QuizItem/>
      )}
    </div>
  );
};
  
  export default ClickableImage;