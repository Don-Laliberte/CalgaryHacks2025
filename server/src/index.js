const express = require('express');
const cors = require('cors');
const phidget22 = require('phidget22');
const phidgetRoutes = require('./routes/phidget');

const app = express();
const PORT = 3001;

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Initialize Phidget connection
const initPhidget = async () => {
  try {
    console.log('Initializing Phidget connection...');
    
    // Enable verbose logging
    phidget22.Log.enable(phidget22.LogLevel.VERBOSE, 'phidget22log.txt');
    
    // Create connection to Phidget Network Server
    const conn = new phidget22.Connection({
      hostname: 'localhost',
      port: 5661, // Default Phidget Network Server port
      name: 'Server Connection',
      timeout: 5000
    });

    // Add connection event handlers
    conn.onError = function(code, message) {
      console.error('Connection Error:', code, message);
    };

    console.log('Connecting to Phidget Network Server...');
    await conn.connect();
    console.log('Connected to Phidget Network Server');

    // Initialize devices
    const devices = {
      redButton: new phidget22.DigitalInput(),
      greenButton: new phidget22.DigitalInput(),
      redLED: new phidget22.DigitalOutput(),
      greenLED: new phidget22.DigitalOutput()
    };

    // Configure devices
    devices.redButton.setHubPort(0);
    devices.greenButton.setHubPort(5);
    devices.redLED.setHubPort(1);
    devices.greenLED.setHubPort(4);

    // Set up event handlers
    Object.entries(devices).forEach(([name, device]) => {
      device.setIsHubPortDevice(true);
      
      device.onAttach = function() {
        console.log(`${name} attached`);
      };
      
      device.onDetach = function() {
        console.log(`${name} detached`);
      };
      
      if (device instanceof phidget22.DigitalInput) {
        device.onStateChange = function(state) {
          console.log(`${name} state changed to: ${state}`);
        };
      }
    });

    // Open all devices
    console.log('Opening devices...');
    await Promise.all(Object.values(devices).map(device => device.open(5000)));
    console.log('All devices opened successfully');

    // Make devices available to routes
    Object.entries(devices).forEach(([name, device]) => {
      app.set(name, device);
    });

    return devices;
  } catch (error) {
    console.error('Phidget initialization error:', error);
    throw error;
  }
};

// Start server
const startServer = async () => {
  try {
    await initPhidget();
    
    app.use('/phidget', phidgetRoutes);
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
}); 