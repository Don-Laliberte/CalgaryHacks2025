import { useState, useEffect } from 'react';

// Separate PhidgetKit class
class PhidgetController {
  constructor() {
    this.connection = null;
    this.isConnecting = false;
    this.retryAttempts = 0;
    this.maxRetries = 3;
    this.digitalInput0 = null;
    this.digitalInput5 = null;
    this.digitalOutput1 = null;
    this.digitalOutput4 = null;
  }

  async connect() {
    if (this.isConnecting) return false;
    this.isConnecting = true;

    try {
      const phidget22 = await import('phidget22');
      
      // Create the connection
      this.connection = new phidget22.Connection(8989, 'localhost');
      
      // Connect first
      await this.connection.connect();
      console.log('Phidget connection established');

      // Then initialize components
      await this.initializeComponents(phidget22);
      
      this.isConnecting = false;
      return true;
    } catch (error) {
      console.error('Phidget connection error:', error);
      this.isConnecting = false;
      return false;
    }
  }

  async initializeComponents(phidget22) {
    try {
      // Create instances
      this.digitalInput0 = new phidget22.DigitalInput();
      this.digitalInput5 = new phidget22.DigitalInput();
      this.digitalOutput1 = new phidget22.DigitalOutput();
      this.digitalOutput4 = new phidget22.DigitalOutput();

      // Configure inputs
      await this.digitalInput0.setHubPort(0);
      await this.digitalInput0.setIsHubPortDevice(true);
      await this.digitalInput0.setChannel(0);

      await this.digitalInput5.setHubPort(5);
      await this.digitalInput5.setIsHubPortDevice(true);
      await this.digitalInput5.setChannel(0);

      // Configure outputs
      await this.digitalOutput1.setHubPort(1);
      await this.digitalOutput1.setIsHubPortDevice(true);
      await this.digitalOutput1.setChannel(0);

      await this.digitalOutput4.setHubPort(4);
      await this.digitalOutput4.setIsHubPortDevice(true);
      await this.digitalOutput4.setChannel(0);

      // Set up event handlers
      this.digitalInput0.onStateChange = (state) => {
        console.log('Red Button State:', state);
      };

      this.digitalInput5.onStateChange = (state) => {
        console.log('Green Button State:', state);
      };

      // Open all devices
      await this.digitalInput0.open(5000);
      await this.digitalInput5.open(5000);
      await this.digitalOutput1.open(5000);
      await this.digitalOutput4.open(5000);

      console.log('All Phidget components initialized');
      return true;
    } catch (error) {
      console.error('Error initializing components:', error);
      throw error;
    }
  }

  async setRedLED(state) {
    if (this.digitalOutput1) {
      await this.digitalOutput1.setState(state);
    }
  }

  async setGreenLED(state) {
    if (this.digitalOutput4) {
      await this.digitalOutput4.setState(state);
    }
  }

  disconnect() {
    if (this.connection) {
      this.connection.close();
    }
  }
}

// Separate React hook
export function usePhidget() {
  const [phidgetController] = useState(() => new PhidgetController());
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    let mounted = true;

    const connectPhidget = async () => {
      try {
        const connected = await phidgetController.connect();
        if (mounted) {
          setIsConnected(connected);
        }
      } catch (error) {
        console.error('Error in usePhidget:', error);
        if (mounted) {
          setIsConnected(false);
        }
      }
    };

    connectPhidget();

    return () => {
      mounted = false;
      phidgetController.disconnect();
    };
  }, [phidgetController]);

  return { phidget: phidgetController, isConnected };
} 