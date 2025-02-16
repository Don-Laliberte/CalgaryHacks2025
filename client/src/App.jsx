import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ClickableImageWrapper from './components/ClickableImageAssets/ClickableImageWrapper.jsx';
import testImage from './assets/pictures/1-16dfb034.png'
import QuizWithErrorBoundary from './components/QuestionModal';
import Login from './pages/Login.jsx'
import HomePage from './pages/HomePage';
import { useState, useEffect } from 'react';
import PhidgetErrorBoundary from './components/PhidgetErrorBoundary';
import Leaderboard from './pages/Leaderboard.jsx';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        setIsLoading(true);
        setIsLoading(false);
      } catch (error) {
        console.error('App initialization error:', error);
        setError(error);
        setIsLoading(false);
      }
    };

    initializeApp();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Router>
      <PhidgetErrorBoundary>
        <div className="flex flex-col h-screen">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/quiz" element={<QuizWithErrorBoundary />} />
              <Route path="/leaderboard" element={<Leaderboard/>} />
              <Route path="/about" element={<div>About Page</div>} />
              <Route path="/login" element={<Login/>} />
            </Routes>
          </main>
        </div>
      </PhidgetErrorBoundary>
    </Router>
  );
}

export default App;
