import { createContext, useContext, useState, useEffect, useRef, useCallback, useMemo } from 'react';
import axios from 'axios';

const PhidgetContext = createContext(null);

const DEBUG = true;
const log = (message, data) => {
  if (DEBUG) {
    console.log(`[PhidgetKit] ${message}`, data || '');
  }
};

// Create an axios instance with default config
const phidgetApi = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add response interceptor for better error handling
phidgetApi.interceptors.response.use(
  response => response,
  error => {
    log('API Error:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data
    });
    return Promise.reject(error);
  }
);

export const PhidgetProvider = ({ children }) => {
  const [buttonStates, setButtonStates] = useState({
    red: false,
    green: false
  });
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasSubmittedAnswer, setHasSubmittedAnswer] = useState(false);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);

  // Add a ref to track component mounted state
  const mountedRef = useRef(true);

  // Add state to track button press
  const [lastButtonState, setLastButtonState] = useState({
    red: false,
    green: false
  });

  // Add a ref to track initialization
  const initializationComplete = useRef(false);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  // Fetch questions on mount
  useEffect(() => {
    const fetchQuestions = async () => {
      if (initializationComplete.current) return;
      
      try {
        setIsLoading(true);
        const response = await phidgetApi.get('/questions');
        
        if (response.data && Array.isArray(response.data) && response.data.length > 0) {
          setQuestions(response.data);
          setCurrentQuestionIndex(0);
          setSelectedOptionIndex(0);
          setIsLoading(false);
          setError(null);
          initializationComplete.current = true;
          
          console.log('Questions initialized:', {
            count: response.data.length,
            firstQuestion: response.data[0],
            correctAnswer: response.data[0].correctAnswer
          });
        } else {
          throw new Error('Invalid question data received');
        }
      } catch (err) {
        console.error('Failed to load questions:', err);
        setError('Failed to load questions');
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  // Modify the button polling effect to be more explicit about state changes
  useEffect(() => {
    let mounted = true;
    let pollInterval;

    const pollButtons = async () => {
      if (!mounted || isSubmitting) return;

      try {
        const response = await phidgetApi.get('/phidget/value');
        
        if (mounted && response.data) {
          const newButtonStates = {
            red: Boolean(response.data.red),
            green: Boolean(response.data.green)
          };
          
          // Only update if states have actually changed
          setButtonStates(prev => {
            if (prev.red !== newButtonStates.red || prev.green !== newButtonStates.green) {
              console.log('Button states changed:', {
                previous: prev,
                new: newButtonStates
              });
              return newButtonStates;
            }
            return prev;
          });
        }
      } catch (err) {
        console.error('Button polling error:', err);
      }
    };

    pollInterval = setInterval(pollButtons, 100);
    pollButtons();

    return () => {
      mounted = false;
      clearInterval(pollInterval);
    };
  }, [isSubmitting]);

  // Handle green button (answer submission)
  useEffect(() => {
    if (!questions[currentQuestionIndex] || isSubmitting) return;

    const greenPressed = buttonStates.green && !lastButtonState.green;
    if (greenPressed) {
      console.log('Green button pressed - checking answer');
      const isCorrect = selectedOptionIndex === questions[currentQuestionIndex].correctAnswer;
      
      if (isCorrect) {
        setFeedback('Correct!');
        
        if (currentQuestionIndex === questions.length - 1) {
          setTimeout(() => {
            window.location.href = '/';
          }, 1000);
        } else {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
          setSelectedOptionIndex(0);
          setFeedback(null);
          console.log('Moving to question:', currentQuestionIndex + 1);
        }
      } else {
        setFeedback('Incorrect. Try again!');
      }
    }
    
    setLastButtonState(prev => ({
      ...prev,
      green: buttonStates.green
    }));
  }, [buttonStates.green, lastButtonState.green, questions, currentQuestionIndex, selectedOptionIndex]);

  // Keep the red button handler as is
  useEffect(() => {
    if (!questions[currentQuestionIndex] || isSubmitting) return;

    const redPressed = buttonStates.red && !lastButtonState.red;
    if (redPressed) {
      const maxOptions = questions[currentQuestionIndex].options.length;
      setSelectedOptionIndex(prev => (prev + 1) % maxOptions);
    }
    setLastButtonState(prev => ({
      ...prev,
      red: buttonStates.red
    }));
  }, [buttonStates.red, lastButtonState.red, questions, currentQuestionIndex, isSubmitting]);

  // Modify getCurrentAnswer to return the selected option
  const getCurrentAnswer = useCallback(() => {
    return selectedOptionIndex;
  }, [selectedOptionIndex]);

  // Add restart quiz function
  const restartQuiz = useCallback(() => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setIsComplete(false);
    setFeedback(null);
    setError(null);
    setIsSubmitting(false);
  }, []);

  const value = useMemo(() => ({
    isConnected,
    error,
    buttonStates,
    questions,
    currentQuestion: questions[currentQuestionIndex],
    currentQuestionIndex,
    feedback,
    getCurrentAnswer,
    score,
    isComplete,
    restartQuiz,
    totalQuestions: questions.length,
    isSubmitting,
    isLoading,
    selectedOptionIndex
  }), [
    isConnected, error, buttonStates, questions, currentQuestionIndex,
    feedback, getCurrentAnswer, score, isComplete,
    restartQuiz, isSubmitting, isLoading, selectedOptionIndex
  ]);

  return (
    <PhidgetContext.Provider value={value}>
      {children}
    </PhidgetContext.Provider>
  );
};

export const usePhidget = () => {
  const context = useContext(PhidgetContext);
  if (context === undefined) {
    throw new Error('usePhidget must be used within a PhidgetProvider');
  }
  return context;
};