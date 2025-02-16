import { usePhidget } from './PhidgetKit';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const QuestionDisplay = () => {
  const {
    isConnected,
    error,
    currentQuestion,
    feedback,
    checkAnswer,
    getCurrentAnswer,
    buttonStates,
    score,
    isComplete,
    restartQuiz,
    totalQuestions,
    isSubmitting,
    isLoading
  } = usePhidget();

  const navigate = useNavigate();
  const selectedAnswer = getCurrentAnswer();

  useEffect(() => {
    console.log('QuestionDisplay state:', {
      currentQuestion,
      selectedAnswer,
      buttonStates,
      isSubmitting,
      feedback
    });
  }, [currentQuestion, selectedAnswer, buttonStates, isSubmitting, feedback]);

  if (isLoading) {
    return <div>Loading questions...</div>;
  }

  if (!isConnected) {
    return <div>Connecting to device...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (isComplete) {
    return (
      <div>
        <h2>Quiz Complete!</h2>
        <p>You scored {score} out of {totalQuestions}</p>
        <button onClick={restartQuiz}>Restart Quiz</button>
        <button onClick={() => navigate('/')}>Return Home</button>
      </div>
    );
  }

  if (!currentQuestion) {
    return <div>No question available</div>;
  }

  return (
    <div className="quiz-container">
      <h2>Question {currentQuestion.id} of {totalQuestions}</h2>
      <h3>{currentQuestion.text}</h3>
      
      <div className="options-container">
        {currentQuestion.options.map((option, index) => (
          <div 
            key={index}
            className={`option ${selectedAnswer === index ? 'selected' : ''}`}
          >
            {index + 1}. {option}
          </div>
        ))}
      </div>

      {feedback && (
        <div className="feedback">
          {feedback}
        </div>
      )}

      <button 
        onClick={checkAnswer}
        disabled={selectedAnswer === undefined || isSubmitting}
        className="submit-button"
      >
        {isSubmitting ? 'Checking...' : 'Submit Answer'}
      </button>

      <div className="debug-info">
        <p>Red Button: {buttonStates.red ? 'Pressed' : 'Released'}</p>
        <p>Selected: {selectedAnswer !== undefined ? `Option ${selectedAnswer + 1}` : 'None'}</p>
      </div>
    </div>
  );
}; 