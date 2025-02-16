import "./ClickableQuestion.css";
import { useQuizStore } from "../../store";
import QuizItem from "../QuizItem";
import { useState } from "react";

const ClickableQuestion = ({ imageSrc, questionId, top, left }) => {
  const { isOpen, openQuizModal, closeQuizModal, setQuestionDone, questions } = useQuizStore();
  const [isAnswered, setIsAnswered] = useState(false);
  const question = questions.find(q => q.id === questionId);

  const handleImageClick = () => {
    if (question && !question.isDone) {
      openQuizModal(question);
    }
  };

  const handleQuestionAnswered = (answeredCorrectly) => {
    if (answeredCorrectly) {
      setQuestionDone(question.id);
      setIsAnswered(true);
    }
    closeQuizModal();
  };

  return (
    <div
      className="clickable-question"
      style={{ position: "absolute", top: `${top}px`, left: `${left}px`, pointerEvents: isAnswered || question?.isDone ? "none" : "auto" }}
    >
      <img
        src={imageSrc}
        alt="Clickable"
        className={`responsive ${isAnswered || question?.isDone ? "disabled" : "hover-effect"}`}
        onClick={isAnswered || question?.isDone ? undefined : handleImageClick}
      />
      {isOpen && question && <QuizItem question={question} onClose={handleQuestionAnswered} />}
    </div>
  );
};

export default ClickableQuestion;