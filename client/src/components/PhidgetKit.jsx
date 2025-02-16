import { createContext, useContext, useState, useEffect } from 'react';

const PhidgetContext = createContext(null);

export const PhidgetProvider = ({ children }) => {
  const [buttonStates, setButtonStates] = useState({
    red: false,
    green: false
  });
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState(null);

  // Poll button states
  useEffect(() => {
    const pollButtons = async () => {
      try {
        // Simplified URL - try direct connection to Phidget webserver
        const response = await fetch('http://localhost:8989/phidget', {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          console.error('Phidget response not OK:', response.status);
          throw new Error('Failed to get button states');
        }
        
        const data = await response.json();
        console.log('Phidget data received:', data);
        
        setButtonStates({
          red: data.redButton,
          green: data.greenButton
        });
        setIsConnected(true);
        setError(null);
      } catch (err) {
        console.error('Error polling buttons:', err);
        setError(err.message);
        setIsConnected(false);
      }
    };

    const interval = setInterval(pollButtons, 50);
    pollButtons();
    return () => clearInterval(interval);
  }, []);

  // Function to get current answer based on button states
  const getCurrentAnswer = () => {
    const { red, green } = buttonStates;
    if (red && !green) return 0;      // First answer
    if (!red && green) return 1;      // Second answer
    if (red && green) return 2;       // Third answer
    return null;                      // No answer selected
  };

  // Function to control LEDs
  const setLEDs = async (isCorrect) => {
    try {
      const response = await fetch('http://localhost:8989/phidget', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          red: !isCorrect,
          green: isCorrect
        })
      });
      if (!response.ok) throw new Error('Failed to set LED states');
    } catch (err) {
      console.error('Error setting LEDs:', err);
      throw err;
    }
  };

  return (
    <PhidgetContext.Provider value={{
      isConnected,
      error,
      buttonStates,
      getCurrentAnswer,
      setLEDs
    }}>
      {children}
    </PhidgetContext.Provider>
  );
};

export const usePhidget = () => {
  const context = useContext(PhidgetContext);
  if (!context) {
    throw new Error('usePhidget must be used within a PhidgetProvider');
  }
  return context;
}; 