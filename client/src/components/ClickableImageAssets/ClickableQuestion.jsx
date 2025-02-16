import "./ClickableImage.css";
import {useQuestionStore} from "../../store";
import QuizItem from "../QuizItem";

const ClickableQuestion = ({ imageSrc, question }) => {
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
        <QuizItem question={question} onClose={() => (console.log('question closed'))}/>
      )}
    </div>
  );
};
  
  export default ClickableQuestion;