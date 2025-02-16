import phidget22 from 'phidget22';

class PhidgetDevice {
  constructor() {
    this.redButton = null;
    this.greenButton = null;
    this.redLED = null;
    this.greenLED = null;
    this.isInitialized = false;
  }

  async initialize(maxRetries = 3) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`Attempt ${attempt}/${maxRetries} to initialize Phidget devices...`);
        
        // Enable verbose logging
        phidget22.Log.enable(phidget22.LogLevel.VERBOSE, 'phidget22log.txt');
        
        const conn = new phidget22.Connection({
          hostname: 'localhost',
          port: 5661,
          name: 'Server Connection',
          timeout: 5000
        });

        console.log('Attempting to connect to Phidget Network Server...');
        await conn.connect();
        console.log('Connected to Phidget Network Server');
        
        // Initialize devices
        this.redButton = new phidget22.DigitalInput();
        this.greenButton = new phidget22.DigitalInput();
        this.redLED = new phidget22.DigitalOutput();
        this.greenLED = new phidget22.DigitalOutput();

        // Configure ports with logging
        console.log('Configuring devices...');
        
        this.redButton.setHubPort(0);
        this.redButton.setIsHubPortDevice(true);
        console.log('Red button configured to port 0');
        
        this.greenButton.setHubPort(1);
        this.greenButton.setIsHubPortDevice(true);
        console.log('Green button configured to port 1');
        
        this.redLED.setHubPort(2);
        this.redLED.setIsHubPortDevice(true);
        console.log('Red LED configured to port 2');
        
        this.greenLED.setHubPort(3);
        this.greenLED.setIsHubPortDevice(true);
        console.log('Green LED configured to port 3');

        // Add event handlers
        this.redButton.onStateChange = (state) => {
          console.log('Red button state changed:', state);
        };
        
        this.greenButton.onStateChange = (state) => {
          console.log('Green button state changed:', state);
        };

        console.log('Opening devices...');
        await Promise.all([
          this.redButton.open(5000),
          this.greenButton.open(5000),
          this.redLED.open(5000),
          this.greenLED.open(5000)
        ]);

        this.isInitialized = true;
        console.log('Phidget devices initialized successfully');
        
        // Test LEDs
        await this.testLEDs();
        
        return true;
      } catch (error) {
        console.error(`Attempt ${attempt} failed:`, error);
        
        if (attempt === maxRetries) {
          throw new Error(`Failed to initialize Phidget devices after ${maxRetries} attempts: ${error.message}`);
        }
        
        // Wait before next attempt
        console.log(`Waiting 2 seconds before retry...`);
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }
  }

  async testLEDs() {
    try {
      // Test red LED
      await this.redLED.setState(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      await this.redLED.setState(false);

      // Test green LED
      await this.greenLED.setState(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      await this.greenLED.setState(false);
    } catch (error) {
      console.error('LED test failed:', error);
    }
  }

  async setLEDs(red, green) {
    if (!this.isInitialized) {
      throw new Error('Phidget devices not initialized');
    }

    try {
      console.log('Setting LED states:', { red, green });
      
      // Set states one at a time to ensure proper operation
      if (red !== undefined) {
        await this.redLED.setState(Boolean(red));
      }
      if (green !== undefined) {
        await this.greenLED.setState(Boolean(green));
      }

      // Verify the states were set correctly
      const currentStates = {
        red: this.redLED.getState(),
        green: this.greenLED.getState()
      };
      console.log('LED states after setting:', currentStates);

      return true;
    } catch (error) {
      console.error('Failed to set LED states:', error);
      throw error;
    }
  }

  getButtonStates() {
    if (!this.isInitialized) {
      throw new Error('Phidget devices not initialized');
    }

    try {
      // Get the current state of both buttons
      const states = {
        red: Boolean(this.redButton.getState()),
        green: Boolean(this.greenButton.getState())
      };
      
      console.log('Current button states:', states);
      
      return states;  // Note: Changed to return red/green instead of redButton/greenButton
    } catch (error) {
      console.error('Error getting button states:', error);
      throw error;
    }
  }

  async close() {
    if (this.isInitialized) {
      await Promise.all([
        this.redButton.close(),
        this.greenButton.close(),
        this.redLED.close(),
        this.greenLED.close()
      ]);
      this.isInitialized = false;
    }
  }
}

export default PhidgetDevice; 