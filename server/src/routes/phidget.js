import express from 'express';
import phidget22 from 'phidget22';

const router = express.Router();

let voltageInput = null;

router.post('/connect', async (req, res) => {
  try {
    console.log('Creating voltage input...');
    voltageInput = new phidget22.VoltageInput();
    
    // Configure the voltage input
    voltageInput.setHubPort(0);
    voltageInput.setIsHubPortDevice(false);
    voltageInput.setChannel(0);
    
    // Add event handlers
    voltageInput.onAttach = () => {
      console.log('Voltage input attached');
    };
    
    voltageInput.onDetach = () => {
      console.log('Voltage input detached');
    };
    
    voltageInput.onError = (code, description) => {
      console.error('Voltage input error:', code, description);
    };

    await voltageInput.open(5000);
    console.log('Voltage input opened successfully');
    
    res.json({ message: 'Connected to Phidget', status: 'success' });
  } catch (error) {
    console.error('Phidget connection error:', error);
    res.status(500).json({ error: error.message });
  }
});

router.get('/value', async (req, res) => {
  try {
    const redButton = req.app.get('redButton');
    if (!redButton) {
      return res.status(500).json({ 
        error: 'Device not initialized',
        details: 'Phidget connection not established'
      });
    }
    
    const state = {
      redButton: redButton.getState()
    };
    
    res.json(state);
  } catch (error) {
    console.error('Error getting button state:', error);
    res.status(500).json({ error: error.message });
  }
});

router.get('/status', async (req, res) => {
  try {
    const redButton = req.app.get('redButton');
    const greenButton = req.app.get('greenButton');
    const isConnected = redButton && greenButton && 
                       redButton.getAttached() && greenButton.getAttached();
    
    res.json({
      connected: isConnected,
      devices: {
        redButton: redButton?.getAttached() || false,
        greenButton: greenButton?.getAttached() || false
      }
    });
  } catch (error) {
    console.error('Error getting status:', error);
    res.status(500).json({ error: error.message });
  }
});

router.post('/disconnect', async (req, res) => {
  try {
    if (voltageInput) {
      console.log('Closing voltage input...');
      await voltageInput.close();
      voltageInput = null;
      console.log('Voltage input closed');
    }
    res.json({ message: 'Disconnected from Phidget' });
  } catch (error) {
    console.error('Error disconnecting Phidget:', error);
    res.status(500).json({ error: error.message });
  }
});

// Add endpoint to control LEDs
router.post('/led', async (req, res) => {
  try {
    const { red, green } = req.body;
    const redLED = req.app.get('redLED');
    const greenLED = req.app.get('greenLED');

    if (red !== undefined && redLED) {
      await redLED.setState(red);
    }
    if (green !== undefined && greenLED) {
      await greenLED.setState(green);
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Error controlling LEDs:', error);
    res.status(500).json({ error: error.message });
  }
});

router.get('/test', (req, res) => {
  res.json({ status: 'Phidget routes working' });
});

export default router; 