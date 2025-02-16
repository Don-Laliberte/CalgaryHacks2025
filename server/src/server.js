const express = require('express');
const cors = require('cors');
const phidget22 = require('phidget22');
const app = express();
const PORT = 3001;

// Enable CORS
app.use(cors());
app.use(express.json());

// Basic Phidget initialization
const initPhidget = async () => {
  try {
    console.log('Initializing Phidget connection...');
    
    const conn = new phidget22.Connection({
      hostname: 'localhost',
      port: 5661,
      name: 'Server Connection',
      timeout: 5000
    });

    await conn.connect();
    console.log('Connected to Phidget Network Server');

    // Initialize both buttons
    const redButton = new phidget22.DigitalInput();
    const greenButton = new phidget22.DigitalInput();
    
    // Configure buttons with correct ports
    redButton.setHubPort(0);
    redButton.setIsHubPortDevice(true);
    
    greenButton.setHubPort(5);  // Back to port 5
    greenButton.setIsHubPortDevice(true);
    
    // Simple event handlers
    redButton.onStateChange = (state) => {
      console.log('Red button state changed to:', state);
    };

    greenButton.onStateChange = (state) => {
      console.log('Green button state changed to:', state);
    };

    // Open devices
    await redButton.open(5000);
    await greenButton.open(5000);
    console.log('Buttons opened successfully');

    app.set('redButton', redButton);
    app.set('greenButton', greenButton);
    
    return { redButton, greenButton };
  } catch (error) {
    console.error('Phidget initialization error:', error);
    throw error;
  }
};

// Simplify the button state endpoint
app.get('/phidget/value', (req, res) => {
  try {
    const redButton = app.get('redButton');
    const greenButton = app.get('greenButton');
    
    if (!redButton || !greenButton) {
      return res.status(500).json({ error: 'Devices not initialized' });
    }
    
    const redState = redButton.getState();
    const greenState = greenButton.getState();
    
    console.log('Raw button states:', {
      redPort: redButton.getHubPort(),
      greenPort: greenButton.getHubPort(),
      redState,
      greenState
    });
    
    const states = {
      red: redState,
      green: greenState
    };
    
    res.json(states);
  } catch (error) {
    console.error('Error getting button states:', error);
    res.status(500).json({ error: error.message });
  }
});

// Questions endpoint
app.get('/questions', (req, res) => {
  res.json([
    {
      id: 1,
      text: "What is the primary cause of global warming?",
      options: ["Greenhouse gas emissions", "Solar flares", "Volcanic activity"],
      correctAnswer: 0
    },
    {
      id: 2,
      text: "Which of these species is currently endangered?",
      options: ["House cats", "Giant Pandas", "Pigeons"],
      correctAnswer: 1
    },
    {
      id: 3,
      text: "What is the most effective way to reduce your carbon footprint?",
      options: ["Using public transportation", "Turning off lights", "Reducing meat consumption"],
      correctAnswer: 2
    }
  ]);
});

// Start server
const startServer = async () => {
  try {
    await initPhidget();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Server startup error:', error);
    process.exit(1);
  }
};

startServer();

// Handle graceful shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down...');
  const redButton = app.get('redButton');
  const greenButton = app.get('greenButton');
  
  if (redButton?.getAttached()) {
    await redButton.close();
  }
  if (greenButton?.getAttached()) {
    await greenButton.close();
  }
  
  process.exit(0);
});

module.exports = app;
