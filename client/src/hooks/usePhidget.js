import { useState, useCallback } from 'react';

export const usePhidget = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState(null);

  const connect = useCallback(async () => {
    try {
      // Mock connection for now - replace with actual Phidget connection
      setIsConnected(true);
      setError(null);
    } catch (err) {
      setError(err.message);
      setIsConnected(false);
      throw err;
    }
  }, []);

  const disconnect = useCallback(async () => {
    try {
      // Mock disconnection - replace with actual Phidget disconnection
      setIsConnected(false);
      setError(null);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  const getSensorValue = useCallback(async () => {
    if (!isConnected) {
      throw new Error('Phidget not connected');
    }
    try {
      // Mock sensor reading - replace with actual Phidget sensor reading
      return Math.random() * 100; // Returns random value between 0-100 for testing
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [isConnected]);

  return {
    isConnected,
    error,
    connect,
    disconnect,
    getSensorValue,
  };
}; 