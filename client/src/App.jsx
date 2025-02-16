import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ClickableImageWrapper from './components/ClickableImageAssets/ClickableImageWrapper.jsx';
import QuestionModal from './components/QuestionModal';
import Login from './pages/Login.jsx'
import HomePage from './pages/HomePage';
import { useState, useEffect } from 'react';
import PhidgetErrorBoundary from './components/PhidgetErrorBoundary';
import PhidgetTest from './components/PhidgetTest';
import { PhidgetProvider } from './components/PhidgetKit';
import Leaderboard from './pages/Leaderboard.jsx';
import About from './pages/About.jsx';

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
            <PhidgetProvider>
            <Routes>
            <Route path="/" element={<HomePage />} />
              <Route path="/quiz" element={<QuizWithErrorBoundary />} />
              <Route path="/leaderboard" element={<Leaderboard/>} />
              <Route path="/about" element={<About/>} />
              <Route path="/login" element={<Login/>} />
            </Routes>
            </PhidgetProvider>
          </main>
        </div>
      </PhidgetErrorBoundary>
    </Router>
  );
}

export default App;
