import React from 'react';
import { usePhidget } from './PhidgetKit';

const PhidgetTest = () => {
  const { isConnected, error, buttonStates, setLEDs } = usePhidget();

  const testLEDs = async () => {
    try {
      // Test pattern: both on, then alternate
      await setLEDs(true, true);
      setTimeout(() => setLEDs(true, false), 500);
      setTimeout(() => setLEDs(false, true), 1000);
      setTimeout(() => setLEDs(false, false), 1500);
    } catch (err) {
      console.error('LED test failed:', err);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Phidget Button Test</h2>
      
      <div className="space-y-4">
        <div className="border p-4 rounded">
          <h3 className="font-bold mb-2">Button States</h3>
          <p>Red Button: {buttonStates.red ? 'Pressed' : 'Released'}</p>
          <p>Green Button: {buttonStates.green ? 'Pressed' : 'Released'}</p>
        </div>

        <div className="border p-4 rounded">
          <h3 className="font-bold mb-2">Connection Status</h3>
          <p>Status: {isConnected ? 'Connected' : 'Disconnected'}</p>
          {error && <p className="text-red-500">Error: {error}</p>}
        </div>

        <button
          onClick={testLEDs}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Test LEDs
        </button>
      </div>
    </div>
  );
};

export default PhidgetTest; 