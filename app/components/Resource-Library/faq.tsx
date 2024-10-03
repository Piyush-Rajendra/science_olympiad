import React, { useState } from 'react';
import DocViewer from './docViewer';

const faq = () => {
  const [message, setMessage] = useState(''); // State for the popup message
  const [isQAModalOpen, setQAModalOpen] = useState(false); // State for Q&A modal
  const [question, setQuestion] = useState(''); // State for user question
  const [answer, setAnswer] = useState(''); // State for the answer (mocked)

    // Function to show save message
    const handleSaveChanges = () => {
      setMessage('Changes have been saved!');
      
      // Hide the message after 3 seconds
      setTimeout(() => {
        setMessage('');
      }, 3000);
    };
  
    // Function to handle Q&A popup
    const handleOpenQAModal = () => {
      setQAModalOpen(true);
    };
  
    const handleCloseQAModal = () => {
      setQAModalOpen(false);
    };
  
    const handleSubmitQuestion = () => {
      setAnswer('This is a placeholder answer.'); // Placeholder answer logic
      setQAModalOpen(false);
    };

    const handleFileChange = (e) => {
      const file = e.target.files?.[0];
      if (file) {
        const fileUrl = URL.createObjectURL(file);
        console.log(fileUrl); // Placeholder for actual file handling
      }
    };

    return (
      <div>
        <div className="container mx-auto px-0 py-6">
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" 
          />
        </div>
  
        <div className="px-10 pt-5">
          {/* Event Header */}
          <div className="p-2 border-b border-gray-300">
            <div className="ml-10">Question</div>
          </div>
        </div>
  
        {/* Sticky Bottom container for buttons */}
        <div className="fixed bottom-0 left-[300px] w-[calc(100%-300px)] p-4 flex justify-between items-center bg-white shadow-lg border-t border-gray-300">
          {/* Open File Explorer Button */}
          <label className="cursor-pointer flex items-center text-green-700 rounded-lg p-2">
          {/* Ask a Question Button */}
          <button
            onClick={handleOpenQAModal}
            className="cursor-pointer flex items-center text-green-700 rounded-lg p-2">
            <span className="text-2xl font-bold mr-2">+</span>
            <span className="font-medium">Add a Question</span>
          </button>
          </label>
  
  
          {/* Save Changes Button */}
          <button
            onClick={handleSaveChanges}
            className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-750">
            Save Changes
          </button>
        </div>
  
        {/* Popup Message */}
        {message && (
          <div className="fixed bottom-16 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-green-600 text-white rounded-lg shadow-lg text-center">
            {message}
          </div>
        )}
  
        {/* Q&A Modal */}
        {isQAModalOpen && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
              <h2 className="text-xl font-bold mb-4">Ask a Question</h2>
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Type your question here..."
                className="w-full p-2 border border-gray-300 rounded-lg mb-4"
              />
              <div className="flex justify-end space-x-4">
                <button
                  onClick={handleCloseQAModal}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
                  Cancel
                </button>
                <button
                  onClick={handleSubmitQuestion}
                  className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800">
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
  
        {/* Answer Section (if an answer exists) */}
        {answer && (
          <div className="mt-6 p-4 bg-blue-100 text-blue-700 rounded-lg shadow-lg">
            <h3 className="font-bold">Answer:</h3>
            <p>{answer}</p>
          </div>
        )}
      </div>
    );
  };

export default faq;