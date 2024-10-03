import React, { useState } from 'react';
import DocViewer from './docViewer';

const faq = () => {
  const [message, setMessage] = useState(''); // State for the popup message

  return (
    <div>
        <div className="container mx-auto px-0 py-6"> {/* Removed horizontal padding */}
            <input 
                type="text" 
                placeholder="Search..." 
                className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" 
            />
        </div>
        <div className="px-10 pt-5">
          {/* Event Header */}
          <div className="p-2 border-b border-gray-300"> {/* Removed font-bold */}
            <div className="ml-10">Question</div>
          </div>
          </div>
    </div>
  );
};

export default faq;