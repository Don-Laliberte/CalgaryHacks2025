import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import QuizWithErrorBoundary from './components/QuestionModal';
import './App.css'
import { useState, useEffect } from 'react';
import PhidgetErrorBoundary from './components/PhidgetErrorBoundary';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        setIsLoading(true);
        // Add any initialization logic here
        setIsLoading(false);
      } catch (error) {
        console.error('App initialization error:', error);
        setError(error);
        setIsLoading(false);
      }
    };

    initializeApp();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Router>
      <PhidgetErrorBoundary>
        <div className="min-h-screen">
          <Navbar />
          <div className="pt-16">
            <Routes>
              <Route path="/" element={<div>Home Page</div>} />
              <Route path="/quiz" element={<QuizWithErrorBoundary />} />
              <Route path="/start-quiz" element={<QuizWithErrorBoundary />} />
              <Route path="/leaderboard" element={<div>Leaderboard Coming Soon</div>} />
              <Route path="/about" element={<div>About Page</div>} />
            </Routes>
          </div>
        </div>
      </PhidgetErrorBoundary>
    </Router>
  );
}

export default App;
