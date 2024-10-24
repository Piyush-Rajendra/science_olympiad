import React, { useState, useEffect } from 'react';
import DocViewer from './docViewer';

const GeneralRules = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(''); // State to hold the file name
  const [pdfUrl, setPdfUrl] = useState(''); // State to hold the PDF Blob URL
  const [schoolGroupID, setSchoolGroupID] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Loading state

  useEffect(() => {
    const getInfo = () => {
      const groupId = localStorage.getItem('group_id');
      if (groupId) {
        setSchoolGroupID(groupId);
      } else {
        setMessage('School group ID is not set.'); // Handle missing ID
      }
    };
    getInfo();
  }, []);

  // Function to fetch the PDF from the server
  const fetchPdf = async () => {
    if (schoolGroupID) {
      try {
        const response = await fetch(`http://localhost:3000/get-pdf/${schoolGroupID}`);
        if (!response.ok) {
          throw new Error('Failed to fetch PDF');
        }
        const blob = await response.blob(); // Get the PDF as a Blob
        const url = URL.createObjectURL(blob); // Create a URL for the Blob
        setPdfUrl(url); // Set the URL to display in the DocViewer
      } catch (error) {
        console.error('Error fetching PDF:', error);
        setMessage('Error fetching PDF');
      }
    }
  };

  // Fetch PDF when schoolGroupID is set
  useEffect(() => {
    fetchPdf(); // Call fetchPdf on component mount and when schoolGroupID changes
  }, [schoolGroupID]);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name); // Set the file name
    }
  };

  const uploadFile = async () => {
    if (!file) {
      setMessage('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('pdf', file); // Append the PDF file
    formData.append('schoolGroup_id', schoolGroupID); // Include the school group ID

    setIsLoading(true); // Start loading

    try {
      const response = await fetch('http://localhost:3000/upload-pdf', {
        method: 'POST',
        body: formData, // Use FormData for file upload
      });

      if (!response.ok) {
        throw new Error('Failed to upload PDF');
      }

      const result = await response.json();
      setMessage(`Success: ${result.message}`); // Show success message with details

      // Fetch the updated PDF after successful upload
      await fetchPdf(); // Call fetchPdf to reload the PDF

    } catch (error) {
      console.error('Error uploading file:', error);
      setMessage('Error uploading file'); // Show error message
    } finally {
      setIsLoading(false); // Stop loading
      setFile(null); // Reset file input
      setFileName(''); // Reset file name
    }
  };

  const handleUploadClick = () => {
    uploadFile(); // Trigger upload on button click
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
            <div className="fixed bottom-0 left-[300px] w-[calc(100%-300px)] p-2 flex justify-between items-center bg-white shadow-lg border-t border-gray-300">
              {/* Open File Explorer Button */}
              <label className="cursor-pointer flex items-center text-green-700 rounded-lg p-2">
                <input
                  type="file"
                  accept="application/pdf"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <div className='hover:underline'>
                  <span className="text-2xl font-bold mr-2">+</span>
                  <span className="font-medium">Upload PDF File</span>
                </div>
              </label>
              <span className="ml-2">{fileName}</span> {/* Display selected file name */}
              <button 
                className=" cursor-pointer bg-green-700 text-white p-2 rounded-lg hover:bg-green-800" 
                onClick={handleUploadClick} 
                disabled={isLoading || !file} // Disable button if loading or no file selected
              >
                {isLoading ? 'Uploading...' : 'Confirm Upload'}
              </button>
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
