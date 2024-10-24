// Faq.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import QuestionList from './questionList'; // Import the new component

const Faq = () => {
  const [searchInput, setSearchInput] = useState('');
  const [questions, setQuestions] = useState([]);
  const [openQuestionId, setOpenQuestionId] = useState(null);
  const [isQAModalOpen, setIsQAModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [message, setMessage] = useState('');
  const [schoolGroupID, setSchoolGroupID] = useState('');
  const [editingQuestionId, setEditingQuestionId] = useState(null); // Track the ID of the question being edited

  useEffect(() => {
    const getInfo = () => {
      setSchoolGroupID(localStorage.getItem('group_id'));
    };
    getInfo();
  }, []);

  const filteredQuestions = questions.filter((question) =>
    question.Question.toLowerCase().includes(searchInput.toLowerCase())
  );

  // Fetch FAQs based on the user type and group ID
  const fetchQuestionsBySchoolGroup = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/questions/bySchool/${schoolGroupID}`);
      const data = response.data;
      setQuestions(data);
      console.log('Fetched questions:', data);
      if (data.length > 0) {
        const currentQuestionId = data[0].QandA_id;
        const questionResponse = await axios.get(`http://localhost:3000/questions/${currentQuestionId}`);
        setQuestion(questionResponse.data);
      }
      return data; // Return the fetched data
    } catch (error) {
      console.error('Error fetching questions:', error);
      return []; // Return an empty array on error
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const questionsData = await fetchQuestionsBySchoolGroup();
      if (questionsData && Array.isArray(questionsData)) {
        setQuestions(questionsData);
      } else {
        setQuestions([]);
      }
    };
    //console.log('Current schoolGroupID:', schoolGroupID);
    //console.log('Current questions:', questions);

    // Only fetch data if schoolGroupID is not empty
    if (schoolGroupID) {
      fetchData();
    }
  }, [schoolGroupID]); // Add schoolGroupID to dependencies

  const toggleQuestion = async (QandA_id) => {
    if (openQuestionId === QandA_id) {
      // If the question is already open, close it
      setOpenQuestionId(null);
      setAnswer(''); // Clear answer when closing
    } else {
      setOpenQuestionId(QandA_id); // Open the selected question

      try {
        const response = await axios.get(`http://localhost:3000/questions/${QandA_id}`);
        setAnswer(response.data.Answer); // Set the fetched answer
        console.log("Response is: ", response.data);
      } catch (error) {
        console.error('Error fetching answer:', error);
      }
    }
  };

  const handleOpenQAModal = () => {
    setQuestion('');
    setAnswer('');
    setIsQAModalOpen(true);
  };

  const handleCloseQAModal = () => {
    setIsQAModalOpen(false);
  };

  const handleOpenEditModal = (id) => {
    const questionToEdit = questions.find((q) => q.QandA_id === id); // Ensure you're matching the correct key
    if (questionToEdit) {
      setEditingQuestionId(questionToEdit.QandA_id); // Set the ID of the question being edited
      setQuestion(questionToEdit.Question); // Use the 'Question' field, not the entire object
      setAnswer(questionToEdit.Answer); // Use the 'Answer' field
      setIsEditModalOpen(true);
    }
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingQuestionId(null); // Reset the editing question ID
  };

  const handleSubmitQuestion = async () => {
    try {
      handleCloseQAModal();

      let body = {
        Question: question,
        Answer: answer, // Assign the answer directly to the body
        schoolGroup_id: schoolGroupID, // Include the school group ID
      };

      console.log("Request body:", JSON.stringify(body));

      const response = await axios.post('http://localhost:3000/questions', body);
      console.log("Question submitted successfully:", question, "Answer:", answer);

      setMessage('Question submitted successfully!');

      // Re-fetch Questions after new one is added
      fetchQuestionsBySchoolGroup();

      // Clear the message after 3 seconds
      setTimeout(() => {
        setMessage('');
      }, 3000);

      // Clear question and answer after successful submission
      setQuestion('');
      setAnswer('');
    } catch (error) {
      console.error('Error submitting question:', error);
    }
  };

  const handleSubmitEdit = async () => {
    try {
      const body = {
        Question: question,
        Answer: answer,
      };

      //console.log("Editing Question:", editingQuestionId);
      //console.log("Request body for edit:", JSON.stringify(body));

      // Make a PUT request to update the question
      await axios.put(`http://localhost:3000/questions/edit-questions/${editingQuestionId}`, body);

      //console.log('Question updated successfully!');
      setMessage('Question updated successfully!');

      // Re-fetch Questions after edit
      fetchQuestionsBySchoolGroup();

      // Clear message after 3 seconds
      setTimeout(() => {
        setMessage('');
      }, 3000);

      handleCloseEditModal(); // Close the edit modal
    } catch (error) {
      console.error('Error updating question:', error);
    }
  };

  // Function to delete a question
  const handleDeleteQuestion = async (QandA_id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this question?');

    if (!confirmDelete) {
      return; // If the user clicks "Cancel", exit the function
    }

    try {
      await axios.delete(`http://localhost:3000/questions/${QandA_id}`);
      setQuestions((prevQuestions) => prevQuestions.filter((q) => q.QandA_id !== QandA_id));
      console.log('Question deleted successfully!');
    } catch (error) {
      console.error('Error deleting question:', error);
    }
  };

  return (
    <div>
      {/* Search Input */}
      <div className="container mx-auto px-0 py-6 relative">
        <input
          type="text"
          placeholder="Search..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
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

      {/* Questions List */}
      <QuestionList
        questions={filteredQuestions} // Use filtered questions
        openQuestionId={openQuestionId}
        toggleQuestion={toggleQuestion}
        answer={answer}
        handleOpenEditModal={handleOpenEditModal}
        handleDeleteQuestion={handleDeleteQuestion}
      />

      {/* Footer Add Question Button */}
      <div className="fixed bottom-0 left-[300px] w-[calc(100%-300px)] p-4 flex justify-between items-center bg-white shadow-lg border-t border-gray-300">
        <button onClick={handleOpenQAModal} className="cursor-pointer flex items-center text-green-700 rounded-lg">
          <span className="text-2xl font-bold mr-2">+</span>
          <span className="font-medium">Add a Question</span>
        </button>
      </div>

      {/* Success Message */}
      {message && (
        <div className="fixed bottom-16 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-green-600 text-white rounded-lg shadow-lg text-center">
          {message}
        </div>
      )}

      {/* Ask Question Modal */}
      {isQAModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full">
            <h2 className="text-xl font-bold mb-4">Ask a Question</h2>
            <h3>Question:</h3>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              rows={2}
              className="w-full border border-gray-300 rounded-lg p-2 mb-4"
            />
            <h3>Answer:</h3>
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              rows={5}
              className="w-full border border-gray-300 rounded-lg p-2 mb-4"
            />
            <div className="flex justify-between">
            <button onClick={handleCloseQAModal} className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
                Cancel
              </button>
              <button onClick={handleSubmitQuestion} className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800">
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Question Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full">
            <h2 className="text-xl font-bold mb-4">Edit Question</h2>
            <h3>Question:</h3>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              rows={2} // Changed from "2" to 2
              className="w-full border border-gray-300 rounded-lg p-2 mb-4"
            />
            <h3>Answer:</h3>
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              rows={5} // Changed from "5" to 5
              className="w-full border border-gray-300 rounded-lg p-2 mb-4"
            />
            <div className="flex justify-between">
              <button onClick={handleCloseEditModal} className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
                Cancel
              </button>
              <button onClick={handleSubmitEdit} className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Faq;
