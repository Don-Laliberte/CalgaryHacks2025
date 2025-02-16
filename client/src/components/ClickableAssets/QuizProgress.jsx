import React, { useEffect, useState } from 'react';
import { useQuizStore } from '../../store';
import './QuizProgress.css';

const QuizProgress = () => {
  const { questions } = useQuizStore();
  const [showCongrats, setShowCongrats] = useState(false);
  
  // Count only the first 6 questions that are done
  const completedQuestions = questions
    .slice(0, 6) // Only look at first 6 questions
    .filter(q => q.isDone).length;

  // Check if all questions are completed
  useEffect(() => {
    if (completedQuestions === 6) {
      setShowCongrats(true);
    }
  }, [completedQuestions]);

  return (
    <>
      <div className="quiz-progress">
        <div className="progress-text">
          Questions Completed: {completedQuestions}/6
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${(completedQuestions / 6) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Congratulations Modal */}
      {showCongrats && (
        <div className="congrats-overlay" onClick={() => setShowCongrats(false)}>
          <div className="congrats-modal" onClick={e => e.stopPropagation()}>
            <h2>🎉 Congratulations! 🎉</h2>
            <p>You have completed all questions!</p>
            <button 
              className="close-button"
              onClick={() => setShowCongrats(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default QuizProgress;
