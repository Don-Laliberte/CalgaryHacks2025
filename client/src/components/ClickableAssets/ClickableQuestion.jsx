import "./ClickableQuestion.css";
import { useQuizStore } from "../../store";

const BasicClickableQuestion = ({ imageSrc, top, left }) => {
  const { openQuizModal } = useQuizStore();

  const handleImageClick = () => {
    openQuizModal(); // Opens the quiz list without referencing individual questions
  };

  return (
    <div
      className="clickable-question"
      style={{ position: "absolute", top: `${top}px`, left: `${left}px` }}
    >
      <img
        src={imageSrc}
        alt="Clickable"
        className="hover-effect"
        onClick={handleImageClick}
      />
    </div>
  );
};

export default BasicClickableQuestion;
