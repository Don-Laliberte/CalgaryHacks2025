import pkg from 'phidget22';
const { DigitalInput } = pkg;

export const initPhidget = async () => {
  try {
    console.log('Attempting to connect to Phidget...');
    const button = new DigitalInput();
    button.setHubPort(0);
    button.setIsHubPortDevice(true);
    
    // Add state change handler
    button.onStateChange = (state) => {
      console.log(`Button state changed to: ${state}`);
    };

    await button.open(5000);
    console.log('Phidget button connected successfully');
    return button;
  } catch (error) {
    console.error('Phidget connection error:', error);
    return null;
  }
}; 