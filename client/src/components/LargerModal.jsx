import React from 'react';
import './LargerModal.css';

const LargerModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="larger-modal-backdrop" onClick={onClose}>
      <div className="larger-modal-content" onClick={e => e.stopPropagation()}>
        <button className="larger-modal-close" onClick={onClose}>×</button>
        {children}
      </div>
    </div>
  );
};

export default LargerModal;