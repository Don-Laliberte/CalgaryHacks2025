import React from 'react';

class PhidgetErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Phidget Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-red-50 p-4 rounded-md">
          <p className="text-red-600">Phidget Error: Unable to connect to device</p>
          <button 
            onClick={() => this.setState({ hasError: false })}
            className="mt-2 text-sm text-red-600 hover:text-red-800"
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default PhidgetErrorBoundary; 