import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ClickableImageWrapper from './components/ClickableImageAssets/ClickableImageWrapper.jsx';
import testImage from './assets/pictures/1-16dfb034.png'
import QuizWithErrorBoundary from './components/QuestionModal';
import Login from './pages/Login.jsx'
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
          <Navbar></Navbar>
          <div className="pt-16">
            <Routes>
              <Route path="/" element={<div></div>} />
              <Route path="/leaderboard" element={<div>Leaderboard Coming Soon</div>} />
              <Route path="/about" element={<div>About Page</div>} />
              <Route path="/login" element={<Login/>}></Route>
              <Route path="/jonathan-hudson<3" element={<div><ClickableImageWrapper 
              imageSrc={testImage}
              message='skib'/></div>}/>
            </Routes>
          </div>
        </div>
      </PhidgetErrorBoundary>
    </Router>
  );
}

export default App;
