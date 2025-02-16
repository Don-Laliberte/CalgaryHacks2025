const express = require('express');
const cors = require('cors');
const phidget22 = require('phidget22');
const phidgetRoutes = require('./routes/phidget');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Initialize Phidget connection
const initPhidget = async () => {
  try {
    console.log('Initializing Phidget connection...');
    
    // Enable verbose logging
    phidget22.Log.enable(phidget22.LogLevel.VERBOSE, 'phidget22log.txt');
    
    // Create connection to VINT Hub
    const conn = new phidget22.Connection({
      hostname: 'localhost',
      port: 5661,
      name: 'Server Connection'
    });

    await conn.connect();
    console.log('Connected to Phidget server');

    // Create Digital Inputs (Buttons)
    const redButton = new phidget22.DigitalInput();
    const greenButton = new phidget22.DigitalInput();
    
    // Configure buttons
    redButton.setHubPort(0);    // Red button on port 0
    greenButton.setHubPort(5);  // Green button on port 5
    redButton.setIsHubPortDevice(true);
    greenButton.setIsHubPortDevice(true);

    // Create Digital Outputs (LEDs)
    const redLED = new phidget22.DigitalOutput();
    const greenLED = new phidget22.DigitalOutput();
    
    // Configure LEDs
    redLED.setHubPort(1);     // Red LED on port 1
    greenLED.setHubPort(4);   // Green LED on port 4
    redLED.setIsHubPortDevice(true);
    greenLED.setIsHubPortDevice(true);

    // Add event handlers for buttons
    redButton.onStateChange = (state) => {
      console.log(`Red Button state changed to: ${state}`);
      // Optionally light up the red LED when button is pressed
      redLED.setState(state);
    };

    greenButton.onStateChange = (state) => {
      console.log(`Green Button state changed to: ${state}`);
      // Optionally light up the green LED when button is pressed
      greenLED.setState(state);
    };

    // Open all devices
    await Promise.all([
      redButton.open(5000),
      greenButton.open(5000),
      redLED.open(5000),
      greenLED.open(5000)
    ]);

    console.log('All Phidget devices opened');

    // Make devices available to routes
    app.set('redButton', redButton);
    app.set('greenButton', greenButton);
    app.set('redLED', redLED);
    app.set('greenLED', greenLED);
    
  } catch (error) {
    console.error('Phidget initialization error:', error);
    throw error;
  }
};

// Start server only after Phidget is initialized
initPhidget()
  .then(() => {
    app.use('/phidget', phidgetRoutes);
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(error => {
    console.error('Failed to start server:', error);
    process.exit(1);
  });

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
}); 