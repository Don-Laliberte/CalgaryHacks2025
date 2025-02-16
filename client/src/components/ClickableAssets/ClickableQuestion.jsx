import React from 'react';
import "./ClickableQuestion.css";
import { useQuizStore } from "../../store";
import { questions } from '../../data/quizQuestions';

const ClickableQuestion = ({ imageSrc, questionId, top, left }) => {
  const { isOpen, openQuizModal, closeQuizModal } = useQuizStore();

  const handleClick = () => {
    const questionToShow = questions.find(q => q.id === questionId);
    if (questionToShow) {
      openQuizModal(questionToShow);
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
      {isOpen && (
        <div className="modal-overlay" onClick={closeQuizModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 className="question-text">{questions[questionId - 1].question}</h2>
            <div className="question-options">
              {questions[questionId - 1].options.map((option, index) => (
                <button 
                  key={index} 
                  className="option-button"
                  onClick={() => {
                    // Handle answer selection here
                    closeQuizModal();
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
            <button className="close-button" onClick={closeQuizModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClickableQuestion;