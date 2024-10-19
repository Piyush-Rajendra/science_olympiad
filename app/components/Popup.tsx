// components/Popup.tsx
import React from 'react';

interface PopupProps {
  message: string;
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-8 shadow-lg max-w-lg mx-auto"> {/* Increased padding and max width */}
        <p className="text-gray-800 text-center">{message}</p>
        <div className="mt-4 flex justify-center"> {/* Centering the close button */}
          <button
            className="bg-olympiadGreen text-white px-6 py-2 rounded hover:bg-green-700" // Adjusted button padding
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
