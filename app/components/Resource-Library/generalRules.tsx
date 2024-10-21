import React, { useState } from 'react';
import DocViewer from './docViewer';

const GeneralRules = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null); 
  const pdfUrl = '../images/Science_Olympiad_Div_C_Rules_2025.pdf';

  // Function to change the active tab
  const handleTabClick = (index) => {
    setActiveTab(index);
  }; 

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      uploadFile(selectedFile); // Automatically upload the file after selection
    }
  };

  // Function to upload the selected PDF to the backend
  const uploadFile = async (selectedFile) => {
    const formData = new FormData();
    formData.append('pdf', selectedFile);
    formData.append('schoolGroup_id', '1'); // Replace '1' with the actual schoolGroup_id you want to use

    try {
      const response = await fetch('http://localhost:3000/resource-library/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload PDF');
      }

      const result = await response.json();
      setMessage(result.message); // Show the success message
    } catch (error) {
      console.error('Error uploading file:', error);
      setMessage('Error uploading file'); // Show error message
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
    <div className="container mx-auto pr-4 py-6">
      {/* Tab Content */}
      <div className="content-tabs">
        {activeTab === 1 && (
          <div>
            <div className="flex items-center justify-center bg-gray-100">
              <DocViewer pdfUrl={pdfUrl} />
            </div>

            {/* Sticky Bottom container for buttons */}
            <div className="fixed bottom-0 left-[300px] w-[calc(100%-300px)] p-4 flex justify-between items-center bg-white shadow-lg border-t border-gray-300">
              {/* Open File Explorer Button */}
              <label className="cursor-pointer flex items-center text-green-700 rounded-lg p-2">
                <input
                  type="file"
                  accept="application/pdf"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <span className="text-2xl font-bold mr-2">+</span>
                <span className="font-medium">Upload PDF File</span>
              </label>
            </div>

            {/* Popup Message */}
            {message && (
              <div className="fixed bottom-16 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-green-600 text-white rounded-lg shadow-lg text-center">
                {message}
              </div>
            )}
          </div>
        )}
        
        {activeTab === 2 && (
          <div className="content active-content">
            <h2 className="text-xl font-bold mb-4">Q&A</h2>
            <p className="text-gray-600">This is where the FAQ content will go.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GeneralRules;
