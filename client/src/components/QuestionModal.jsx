import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { questions } from '../data/questions';
import { usePhidget } from './PhidgetKit';
import './QuestionModal.css';

const QuestionModal = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const navigate = useNavigate();
  
  const { isConnected, error, buttonStates, getCurrentAnswer, setLEDs } = usePhidget();

  useEffect(() => {
    if (!showScore) {
      const currentAnswer = getCurrentAnswer();
      if (currentAnswer !== null) {
        const isCorrect = currentAnswer === questions[currentQuestion].correctAnswer;
        setLEDs(isCorrect).catch(console.error);
        
        // Auto-submit after a delay
        setTimeout(() => handleAnswerSubmit(), 1000);
      }
    }
  }, [buttonStates, currentQuestion, showScore]);

  const handleAnswerSubmit = () => {
    const currentAnswer = getCurrentAnswer();
    if (currentAnswer === null) return;

    if (currentAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    // Turn off LEDs after showing result
    setTimeout(() => {
      setLEDs(false).catch(console.error);
    }, 1000);

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
  };

  if (showScore) {
    return (
      <div className="quiz-container">
        <div className="score-section">
          <h2>Quiz Complete!</h2>
          <p>You scored {score} out of {questions.length}</p>
          <div className="button-container">
            <button onClick={restartQuiz} className="restart-button">
              Restart Quiz
            </button>
            <button onClick={() => navigate('/')} className="home-button">
              Return Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <div className="question-section">
        <div className="question-count">
          <span>Question {currentQuestion + 1}</span>/{questions.length}
        </div>
        <div className="question-text">
          {questions[currentQuestion].question}
        </div>
      </div>

      <div className="answer-section">
        {questions[currentQuestion].type === 'true-false' ? (
          <div className="true-false-grid">
            {['True', 'False'].map((option) => (
              <button
                key={option}
                className={`answer-button ${getCurrentAnswer() === option ? 'selected' : ''}`}
              >
                {option}
              </button>
            ))}
          </div>
        ) : (
          questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              className={`answer-button ${getCurrentAnswer() === index ? 'selected' : ''}`}
            >
              {option}
            </button>
          ))
        )}
      </div>

      <div className="phidget-status">
        <p>Connection Status: {isConnected ? 'Connected' : 'Disconnected'}</p>
        {error && <p className="error">Error: {error}</p>}
      </div>

      <div className="button-status">
        <p>Red Button (False): {buttonStates.red ? 'Pressed' : 'Released'}</p>
        <p>Green Button (True): {buttonStates.green ? 'Pressed' : 'Released'}</p>
        <p>Selected Answer: {getCurrentAnswer() || 'None'}</p>
      </div>
    </div>
  );
};

export default QuestionModal; 