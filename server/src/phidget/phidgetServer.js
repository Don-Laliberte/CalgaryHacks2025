import pkg from 'phidget22';
const { PhidgetManager, DigitalInput } = pkg;

const connectPhidget = async () => {
    try {
        // Create a new digital input for the button
        const button = new DigitalInput();
        
        // Configure the connection settings
        await button.setIsHubPortDevice(true);
        await button.setIsRemote(false);
        await button.setHubPort(0);
        await button.setDeviceSerialNumber(0);
        
        // Set up error handlers
        button.onError = (code, description) => {
            console.error(`Phidget Error ${code}: ${description}`);
        };

        // Add state change handler before opening
        button.onStateChange = (state) => {
            console.log(`Button state changed to: ${state}`);
        };

        // Set addressing parameters
        await button.setChannel(0);
        await button.setDeviceSerialNumber(0);

        // Open the connection to the button with a longer timeout (30 seconds)
        console.log('Attempting to connect to Phidget...');
        await button.open(30000);
        
        console.log('Phidget button sensor connected successfully');
        
        return button;

    } catch (error) {
        console.error('Error connecting to Phidget:', error);
        // If the connection fails, we'll return null instead of throwing
        return null;
    }
};

export { connectPhidget }; 