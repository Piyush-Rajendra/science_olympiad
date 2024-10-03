import React, { useState } from 'react';
import DocViewer from './docViewer';

const GeneralRules = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [message, setMessage] = useState(''); // State for the popup message
  const pdfUrl = '../images/Science_Olympiad_Div_C_Rules_2025.pdf'

  // Function to change the active tab
  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      // Assuming DocViewer can handle dynamic URLs, update the file
      console.log(fileUrl); // You could set this in state if you want to show a selected file
    }
  };

  // Function to show save message
  const handleSaveChanges = () => {
    setMessage('Changes have been saved!');
    
    // Hide the message after 3 seconds
    setTimeout(() => {
      setMessage('');
    }, 3000);
  };

  return (
    <div className="container mx-auto px-4 py-6">

      {/* Tab Content */}
      <div className="content-tabs mt-6">
        {activeTab === 1 && (
          <div>
            <div className="content active-content flex items-center justify-center bg-gray-100">
              <DocViewer pdfUrl={pdfUrl} />
            </div>

            {/* Sticky Bottom container for buttons */}
            <div className="h-20 border-b border-gray-300 flex items-center pl-10">
            <div className="fixed bottom-0 left-[310px] w-[1225px] p-4 flex justify-between items-center bg-white shadow-lg">
              {/* Open File Explorer Button */}
              <label className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                Open File
                <input
                  type="file"
                  accept="application/pdf"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>

              {/* Save Changes Button */}
              <button
                onClick={handleSaveChanges}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-750"
              >
                Save Changes
              </button>
            </div>

            {/* Popup Message */}
            {message && (
              <div className="fixed bottom-16 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-green-600 text-white rounded-lg shadow-lg text-center">
                {message}
              </div>
            )}
          </div>
          </div>
        )}
        
        {activeTab === 2 && (
          <div className="content active-content">
            <h2 className="text-xl font-bold mb-4">FAQ</h2>
            <p className="text-gray-600">This is where the FAQ content will go.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GeneralRules;