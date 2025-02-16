import React, { useEffect, useState } from 'react';

class PhidgetKit {
  constructor() {
    this.connection = null;
    this.isConnecting = false;
    this.retryAttempts = 0;
    this.maxRetries = 3;
    this.digitalInput0 = null; // Red button (port 0)
    this.digitalInput5 = null; // Green button (port 5)
    this.digitalOutput1 = null; // Red LED (port 1)
    this.digitalOutput4 = null; // Green LED (port 4)
  }

  async connect() {
    if (this.isConnecting) return false;
    this.isConnecting = true;

    try {
      const phidget22 = await import('phidget22');
      
      // Create the connection with timeout
      this.connection = new phidget22.Connection(3002, 'localhost');
      await Promise.race([
        this.connection.connect(),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Connection timeout')), 5000)
        )
      ]);

      // Initialize components with error checking
      await this.initializeComponents(phidget22);
      this.isConnecting = false;
      return true;
    } catch (error) {
      console.error('Phidget connection error:', error);
      this.isConnecting = false;
      
      if (this.retryAttempts < this.maxRetries) {
        this.retryAttempts++;
        return await this.connect();
      }
      return false;
    }
  }

  async initializeComponents(phidget22) {
    try {
      // Initialize inputs
      this.digitalInput0 = new phidget22.DigitalInput();
      this.digitalInput5 = new phidget22.DigitalInput();
      
      // Initialize outputs
      this.digitalOutput1 = new phidget22.DigitalOutput();
      this.digitalOutput4 = new phidget22.DigitalOutput();

      // Configure channels
      await Promise.all([
        this.configureChannel(this.digitalInput0, 0),
        this.configureChannel(this.digitalInput5, 5),
        this.configureChannel(this.digitalOutput1, 1),
        this.configureChannel(this.digitalOutput4, 4)
      ]);
    } catch (error) {
      throw new Error(`Failed to initialize components: ${error.message}`);
    }
  }

  async configureChannel(component, channel) {
    try {
      component.setChannel(channel);
      await component.open();
    } catch (error) {
      throw new Error(`Failed to configure channel ${channel}: ${error.message}`);
    }
  }

  async disconnect() {
    try {
      if (this.digitalInput0) await this.digitalInput0.close();
      if (this.digitalInput5) await this.digitalInput5.close();
      if (this.digitalOutput1) await this.digitalOutput1.close();
      if (this.digitalOutput4) await this.digitalOutput4.close();
      if (this.connection) await this.connection.close();
    } catch (error) {
      console.error('Error disconnecting Phidget:', error);
    }
  }

  // LED control methods
  async setGreenLED(state) {
    if (this.digitalOutput4) {
      await this.digitalOutput4.setState(state);
    }
  }

  async setRedLED(state) {
    if (this.digitalOutput1) {
      await this.digitalOutput1.setState(state);
    }
  }
}

export const usePhidget = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [phidget] = useState(new PhidgetKit());

  useEffect(() => {
    const initPhidget = async () => {
      const connected = await phidget.connect();
      setIsConnected(connected);
    };

    initPhidget();

    return () => {
      phidget.disconnect();
    };
  }, [phidget]);

  return { phidget, isConnected };
}; 