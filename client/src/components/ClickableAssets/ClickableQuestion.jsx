import React from 'react';
import "./ClickableQuestion.css";
import { useQuizStore } from "../../store";
import { questions } from '../../data/quizQuestions';

const ClickableQuestion = ({ imageSrc, questionId, top, left }) => {
  const { openQuizModal } = useQuizStore(); // Get function to open the quiz
  
  const handleClick = () => {
    const questionToShow = questions.find(q => q.id === questionId); // Find question by ID
    if (questionToShow) {
      openQuizModal(questionToShow); // Open quiz with correct question
    }
  };

  return (
    <div className="image-container" style={{ position: 'absolute', top: `${top}px`, left: `${left}px` }}>
      <img
        src={imageSrc}
        alt="Question"
        className="responsive hover-effect"
        onClick={handleClick}
        style={{ width: '100px', height: 'auto' }}
      />
    </div>
  );
};

export default ClickableQuestion;
