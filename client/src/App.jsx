import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import QuestionModal from './components/QuestionModal';
import Login from './pages/Login.jsx'
import HomePage from './pages/HomePage';
import { useState, useEffect } from 'react';
import PhidgetErrorBoundary from './components/PhidgetErrorBoundary';
import PhidgetTest from './components/PhidgetTest';
import { PhidgetProvider } from './components/PhidgetKit';

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
      <div className="flex flex-col h-screen">
        <Navbar />
        <main className="flex-1">
          <PhidgetErrorBoundary>
            <PhidgetProvider>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/quiz" element={<QuestionModal />} />
                <Route path="/phidget-test" element={<PhidgetTest />} />
                <Route path="/leaderboard" element={<div>Leaderboard Coming Soon</div>} />
                <Route path="/about" element={<div>About Page</div>} />
                <Route path="/login" element={<Login/>} />
              </Routes>
            </PhidgetProvider>
          </PhidgetErrorBoundary>
        </main>
      </div>
    </Router>
  );
}

export default App;
