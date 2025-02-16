import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { usePhidget } from './PhidgetKit';
import './QuestionModal.css';
import { useQuizStore } from '../store';

const QuizItem = ({ question }) => {
  const { isOpen, question, closeQuizModal } = useQuizStore()
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [highlightedOption, setHighlightedOption] = useState(0);
  const { phidget, isConnected } = usePhidget();

  // Reset states when question changes
  useEffect(() => {
    setSelectedAnswer('');
    setIsCorrect(null);
    setShowExplanation(false);
    setHighlightedOption(0);
  }, [question.id]);

  useEffect(() => {
    let buttonHandler;
    
    if (isConnected) {
      if (question.type === 'true-false') {
        // True/false handler
        buttonHandler = async (buttonIndex, state) => {
          if (state) { // Button pressed
            const answer = buttonIndex === 5 ? 'True' : 'False'; // Green button (5) for True, Red button (0) for False
            handleAnswerSelect(answer);
          }
        };
      } else if (question.type === 'multiple-choice') {
        // Multiple-choice handler
        buttonHandler = async (buttonIndex, state) => {
          if (state) { // Button pressed
            if (buttonIndex === 0) { // Red button - move highlight
              setHighlightedOption((prev) => 
                (prev + 1) % question.options.length
              );
            } else if (buttonIndex === 5) { // Green button - select option
              handleAnswerSelect(question.options[highlightedOption]);
            }
          }
        };
      }

      // Set up button handlers
      phidget.digitalInput5.setOnStateChange(state => buttonHandler(5, state)); // Green button
      phidget.digitalInput0.setOnStateChange(state => buttonHandler(0, state)); // Red button
    }

    return () => {
      if (buttonHandler) {
        phidget.digitalInput5.setOnStateChange(null);
        phidget.digitalInput0.setOnStateChange(null);
      }
    };
  }, [isConnected, question.type, phidget, highlightedOption, question.options]);

  const handleAnswerSelect = async (answer) => {
    setSelectedAnswer(answer);
    const correct = answer === question.correctAnswer;
    setIsCorrect(correct);
    setShowExplanation(true);

    if (isConnected) {
      await phidget.setGreenLED(false);
      await phidget.setRedLED(false);

      if (correct) {
        await phidget.setGreenLED(true);
      } else {
        await phidget.setRedLED(true);
      }

      setTimeout(async () => {
        await phidget.setGreenLED(false);
        await phidget.setRedLED(false);
      }, 2000);
    }
  };

  const renderAnswerOptions = () => {
    if (question.type === 'multiple-choice') {
      return (
        <div className="options-container">
          {isConnected && (
            <div className="phidget-instructions">
              Using Phidget Kit: Press Red button to move selection, Green button to confirm
            </div>
          )}
          <div className="options-grid">
            {question.options.map((option, index) => (
              <button
                key={option}
                onClick={() => handleAnswerSelect(option)}
                className={`option-button ${
                  selectedAnswer === option 
                    ? (isCorrect ? 'correct' : 'incorrect') 
                    : (isConnected && index === highlightedOption ? 'highlighted' : '')
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      );
    } else if (question.type === 'true-false') {
      return (
        <div className="options-container">
          {isConnected && (
            <div className="phidget-instructions">
              Using Phidget Kit: Press Green button for True, Red button for False
            </div>
          )}
          <div className="true-false-grid">
            {['True', 'False'].map((option) => (
              <button
                key={option}
                onClick={() => handleAnswerSelect(option)}
                className={`option-button ${
                  selectedAnswer === option 
                    ? (isCorrect ? 'correct' : 'incorrect') 
                    : ''
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      );
    }
  };

  if (!isOpen || !question) return null;

  return (
    <div className="modal-overlay" onClick={closeQuizModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <p className="question-text">{question.question}</p>
        </div>

        <div className="modal-body">
          {renderAnswerOptions()}
          
          {showExplanation && (
            <div className={`explanation ${isCorrect ? 'correct' : 'incorrect'}`}>
              
              <p>{isCorrect ? "Correct!" : "Incorrect!"}</p>
              {question.explanation && <p>{question.explanation}</p>}
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="button secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

QuizItem.propTypes = {
  question: PropTypes.shape({
    id: PropTypes.number.isRequired,
    type: PropTypes.oneOf(['multiple-choice', 'true-false']).isRequired,
    question: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.string),
    correctAnswer: PropTypes.string.isRequired,
    isDone: PropTypes.string.isRequired,
    explanation: PropTypes.string
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default QuizItem;