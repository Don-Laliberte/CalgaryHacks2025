const express = require('express');
const cors = require('cors');
const phidget22 = require('phidget22');
const app = express();
const PORT = 3001;

// Enable CORS
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Test route to verify server is running
app.get('/test', (req, res) => {
  res.json({ 
    status: 'Server running',
    time: new Date().toISOString()
  });
});

// Function to retry Phidget connection
const connectWithRetry = async (maxAttempts = 5) => {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      console.log(`Attempt ${attempt}/${maxAttempts} to connect to Phidget Network Server...`);
      
      const conn = new phidget22.Connection({
        hostname: 'localhost',
        port: 5661,
        name: 'Server Connection',
        timeout: 2000
      });

      await conn.connect();
      console.log('Successfully connected to Phidget Network Server');
      return conn;
    } catch (error) {
      console.error(`Connection attempt ${attempt} failed:`, error.message);
      if (attempt === maxAttempts) {
        throw new Error('Failed to connect to Phidget Network Server after multiple attempts');
      }
      // Wait 2 seconds before next attempt
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
};

// Basic Phidget initialization
const initPhidget = async () => {
  try {
    // First try to connect to the Network Server
    const conn = await connectWithRetry();
    
    console.log('Initializing red button...');
    const redButton = new phidget22.DigitalInput();
    
    // Configure button
    redButton.setHubPort(0);
    redButton.setIsHubPortDevice(true);
    
    // Add event handlers
    redButton.onAttach = () => {
      console.log('Red button attached');
    };

    redButton.onDetach = () => {
      console.log('Red button detached');
    };

    redButton.onError = (code, description) => {
      console.error('Red button error:', code, description);
    };

    redButton.onStateChange = (state) => {
      console.log('Red button state changed to:', state);
    };

    console.log('Opening red button...');
    await redButton.open(5000);
    console.log('Red button opened successfully');

    app.set('redButton', redButton);
    return redButton;
  } catch (error) {
    console.error('Phidget initialization error:', error);
    throw error;
  }
};

// Endpoint to get button state
app.get('/phidget/value', (req, res) => {
  try {
    const redButton = app.get('redButton');
    if (!redButton) {
      return res.status(500).json({ 
        error: 'Device not initialized',
        details: 'Phidget connection not established'
      });
    }
    
    if (!redButton.getAttached()) {
      return res.status(500).json({ 
        error: 'Device not attached',
        details: 'Physical device is not connected'
      });
    }
    
    const state = {
      redButton: redButton.getState()
    };
    
    res.json(state);
  } catch (error) {
    console.error('Error getting button state:', error);
    res.status(500).json({ 
      error: error.message,
      details: 'Error reading device state'
    });
  }
});

// Start server
const startServer = async () => {
  try {
    // Start Express first
    const server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Test the server at http://localhost:${PORT}/test`);
    });

    // Handle server shutdown
    process.on('SIGINT', async () => {
      console.log('Shutting down...');
      const redButton = app.get('redButton');
      if (redButton?.getAttached()) {
        await redButton.close();
        console.log('Phidget connection closed');
      }
      server.close(() => {
        console.log('Server stopped');
        process.exit(0);
      });
    });

    // Initialize Phidget
    console.log('Initializing Phidget connection...');
    await initPhidget();
  } catch (error) {
    console.error('Server startup error:', error);
    console.error('Make sure the Phidget Network Server is running!');
  }
};

startServer(); 