"use client";
import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import Image from 'next/image';
import axios from 'axios';
import { scheduler } from 'timers/promises';


const Faq = () => {
  const [message, setMessage] = useState(''); // State for the popup message
  const [isQAModalOpen, setQAModalOpen] = useState(false); // State for Q&A modal
  const [isEditModalOpen, setEditModalOpen] = useState(false); // State for Edit modal
  const [question, setQuestion] = useState(''); // State for user question
  const [answer, setAnswer] = useState(''); // State for user-provided answer
  const [group_id, setGroupID] = useState('');
  const [editingQuestionId, setEditingQuestionId] = useState(null); // Track which question is being edited
  const [questions, setQuestions] = useState([ // Dummy list of questions and answers
    { id: 1, question: "Where are the bathrooms?", answer: "The bathrooms are located on each of the floors by the elevators." },
  ]);
  const [openQuestionId, setOpenQuestionId] = useState(null); // Track which question is open

  // Function to show save message
  const handleSaveChanges = () => {
    setMessage('Changes have been saved!');
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

  // Function to handle Edit popup
  const handleOpenEditModal = (id) => {
    const questionToEdit = questions.find(item => item.id === id);
    if (questionToEdit) {
      setQuestion(questionToEdit.question);
      setAnswer(questionToEdit.answer);
      setEditingQuestionId(id);
      setEditModalOpen(true);
    }
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setQuestion('');
    setAnswer('');
    setEditingQuestionId(null);
  };

  // Function to submit a new question or edit an existing one
  const handleSubmitQuestion = async () => {
    if (question.trim()) {
        const questionData = {
            Question: question,
            schoolGroup_id: localStorage.getItem('group_id') // Calling to current local group
        };

        try {
            // Make API request to create or update the question
            const response = editingQuestionId
                ? await fetch(`http://localhost:3000/questions/${editingQuestionId}`, {
                      method: 'PUT', // Use PUT for editing
                      headers: {
                          'Content-Type': 'application/json',
                      },
                      body: JSON.stringify(questionData),
                  })
                : await fetch('http://localhost:3000/questions', {
                      method: 'POST', // Use POST for creating a new question
                      headers: {
                          'Content-Type': 'application/json',
                      },
                      body: JSON.stringify(questionData),
                  });

            const data = await response.json();

            // Update local state if successful
            if (response.ok) {
                const newQuestion = {
                    id: editingQuestionId || questions.length + 1,
                    question: question,
                    answer: answer || '',
                };

                if (editingQuestionId) {
                    // Update the existing question
                    const updatedQuestions = questions.map(item =>
                        item.id === editingQuestionId ? newQuestion : item
                    );
                    setQuestions(updatedQuestions);
                    setEditingQuestionId(null);
                } else {
                    // Add a new question
                    setQuestions([...questions, newQuestion]);
                }

                // Clear input fields
                setQuestion('');
                setAnswer('');
                handleCloseQAModal();
                handleCloseEditModal();
                setMessage('Question submitted successfully!'); // Show success message
            } else {
                setMessage(data.message || 'Failed to submit the question. Please try again.'); // Show error message
            }
        } catch (error) {
            console.error('Error submitting question:', error);
            setMessage('An error occurred while submitting the question.'); // Show error message
        }
    } else {
        alert('Please enter a question.'); // Alert if question is empty
    }
};


  // Function to toggle dropdown for a specific question
  const toggleQuestion = (id) => {
    setOpenQuestionId((prevId) => (prevId === id ? null : id));
  };

  return (
    <div>
      <div className="container mx-auto px-0 py-6 relative">
        <input 
          type="text" 
          placeholder="Search..." 
          className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" 
        />
        <Image 
          src="/images/search.png" 
          alt="Search"
          className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6"
          width={30} 
          height={30}
        />
      </div>

      <div className="px-10 pt-5">
        {/* Event Header */}
        <div className="grid grid-cols-[3fr,1fr] p-2 border-b border-gray-300">
          <div className="ml-10">Question</div>
          <div className="text-right mr-20">Manage</div>
        </div>
      </div>

      {/* List of Questions */}
      <div className="px-10">
        {questions.map((item, index) => (
          <div
            key={item.id}
            className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} border-b border-gray-300`}
          >
            <div className="grid grid-cols-[3fr,1fr] items-center p-4">
              {/* Question Header with Dropdown Button */}
              <div className="flex items-center space-x-4">
                <button onClick={() => toggleQuestion(item.id)}>
                  {openQuestionId === item.id ? <FaChevronUp /> : <FaChevronDown />}
                </button>
                <span className="text-lg">{item.question}</span>
              </div>

              {/* Manage Column: Icon Buttons for each question */}
              <div className="flex justify-end space-x-4 pr-3">
                <button onClick={() => handleOpenEditModal(item.id)}>
                  <Image src="/images/note-pencil.png" alt="Edit" width={30} height={30} />
                </button>
                <button><Image src="/images/trash.png" alt="Delete" width={30} height={30} /></button>
                <button><Image src="/images/list.png" alt="Details" width={30} height={30} /></button>
              </div>
            </div>

            {/* Dropdown for Answer with Padding */}
            {openQuestionId === item.id && (
              <div className="px-10 pt-2 pb-4">
                <p className="text-gray-700">{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Sticky Bottom container for buttons */}
      <div className="fixed bottom-0 left-[300px] w-[calc(100%-300px)] p-4 flex justify-between items-center bg-white shadow-lg border-t border-gray-300">
        {/* Ask a Question Button */}
        <button
          onClick={handleOpenQAModal}
          className="cursor-pointer flex items-center text-green-700 rounded-lg">
          <span className="text-2xl font-bold mr-2">+</span>
          <span className="font-medium">Add a Question</span>
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
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full">
            <h2 className="text-xl font-bold mb-4">Ask a Question</h2>

            {/* Question Input */}
            <h3>Question:</h3>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Type your question here..."
              className="w-full p-2 border border-gray-300 rounded-lg mb-4 h-20"
            />

            {/* Optional Answer Input */}
            <h3>Answer: (Optional)</h3>
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Type your answer here (Optional)..."
              className="w-full p-2 border border-gray-300 rounded-lg mb-4 h-60"
            />

            {/* Modal Action Buttons */}
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleCloseQAModal}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitQuestion}
                className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full">
            <h2 className="text-xl font-bold mb-4">Edit Question</h2>

            {/* Question Input */}
            <h3>Question:</h3>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Type your question here..."
              className="w-full p-2 border border-gray-300 rounded-lg mb-4 h-20"
            />

            {/* Optional Answer Input */}
            <h3>Answer: (Optional)</h3>
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Type your answer here (Optional)..."
              className="w-full p-2 border border-gray-300 rounded-lg mb-4 h-60"
            />

            {/* Modal Action Buttons */}
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleCloseEditModal}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitQuestion}
                className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Faq;
