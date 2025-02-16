import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePhidget } from './PhidgetKit';
import './QuestionModal.css';

const QuestionModal = () => {
  const { 
    isConnected, 
    error, 
    buttonStates, 
    getCurrentAnswer,
    currentQuestion: questionData,
    checkAnswer,
    feedback,
    isComplete,
    restartQuiz,
    selectedOptionIndex,
    currentQuestionIndex,
    questions,
    totalQuestions
  } = usePhidget();

  useEffect(() => {
    console.log('Current question index:', currentQuestionIndex);
    console.log('Total questions:', totalQuestions);
  }, [currentQuestionIndex, totalQuestions]);

  const handleAnswer = async () => {
    if (answerSubmitted) return;
    setAnswerSubmitted(true);
    
    try {
      await checkAnswer();
      
      // Reset answer submitted after a delay
      setTimeout(() => {
        setAnswerSubmitted(false);
      }, 2000);
    } catch (error) {
      console.error('Error checking answer:', error);
      setAnswerSubmitted(false);
    }
  };

  if (error) {
    return (
      <div className="quiz-container">
        <div className="error-section">
          <h2>Connection Error</h2>
          <p>{error}</p>
          <button 
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
            onClick={() => window.location.reload()}
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  if (isComplete) {
    return (
      <div className="quiz-container">
        <div className="score-section">
          <h2>Quiz Complete!</h2>
          <p>You scored {score} out of 3</p>
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

  if (!questionData) {
    return <div>Loading question...</div>;
  }

  return (
    <div className="quiz-container">
      <div className="question-section">
        <div className="question-count">
          Question {currentQuestionIndex + 1}/{questions?.length || 3}
        </div>
        <div className="question-text">
          {questionData.text}
        </div>

        <div className="options-list">
          {questionData.options.map((option, index) => (
            <div 
              key={index}
              className={`option ${selectedOptionIndex === index ? 'selected' : ''}`}
            >
              {index + 1}. {option}
            </div>
          ))}
        </div>
      </div>

      {feedback && (
        <div className="feedback">
          {feedback}
        </div>
      )}

      <div className="answer-section">
        <div className="phidget-instructions">
          <p>Use the Phidget buttons to answer:</p>
          <p>Red Button: Move to next option</p>
          <p>Green Button: Select current option</p>
        </div>
        <div className="button-status">
          <p>Red Button: {buttonStates.red ? 'Pressed' : 'Released'}</p>
          <p>Green Button: {buttonStates.green ? 'Pressed' : 'Released'}</p>
          <p>Selected Option: {selectedOptionIndex + 1}</p>
        </div>
      </div>

      <div className="phidget-status">
        <p>Connection Status: {isConnected ? 'Connected' : 'Disconnected'}</p>
      </div>
    </div>
  );
};

export default QuestionModal; 