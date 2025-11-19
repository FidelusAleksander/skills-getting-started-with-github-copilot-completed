import React from 'react';

/**
 * MessageDisplay component for showing success, error, and info messages
 * @param {Object} props
 * @param {string} props.message - The message text to display
 * @param {string} props.type - Message type: 'success', 'error', or 'info'
 * @param {boolean} props.isVisible - Whether the message should be visible
 */
function MessageDisplay({ message, type, isVisible }) {
  if (!isVisible || !message) {
    return null;
  }

  const getMessageStyles = () => {
    const baseStyles = "p-4 rounded-md border mb-4 transition-all duration-300";
    
    switch (type) {
      case 'success':
        return `${baseStyles} bg-green-50 border-green-200 text-green-800`;
      case 'error':
        return `${baseStyles} bg-red-50 border-red-200 text-red-800`;
      case 'info':
      default:
        return `${baseStyles} bg-blue-50 border-blue-200 text-blue-800`;
    }
  };

  return (
    <div className={getMessageStyles()}>
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
}

export default MessageDisplay;