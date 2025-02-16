import React from 'react';

const AboutModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        
        <h2 className="text-3xl font-bold text-green-700 mb-6">
          Welcome to LeafQuest
        </h2>
        
        <div className="space-y-6 text-gray-700">
          <p className="text-xl">
            Test your knowledge about wildlife conservation and climate change
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-green-600 mb-3">
                Wildlife Conservation
              </h3>
              <p>
                Learn about endangered species, conservation efforts, and how you can help protect wildlife.
              </p>
            </div>
            
            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-green-600 mb-3">
                Climate Change
              </h3>
              <p>
                Understand the impacts of climate change and discover ways to contribute to a sustainable future.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutModal; 