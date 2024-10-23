// Faq.js
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import QuestionList from './questionList'; // Import the new component

const Faq = () => {
  const [questions, setQuestions] = useState([]);
  const [openQuestionId, setOpenQuestionId] = useState(null);
  const [isQAModalOpen, setIsQAModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [message, setMessage] = useState('');
  const [schoolGroupID, setSchoolGroupID] = useState('');

  useEffect(() => {
    const getInfo = () => {
      setSchoolGroupID(localStorage.getItem('group_id'));
    };
    getInfo();
  }, []);

  
  // Fetch FAQs based on the user type and group ID
  const fetchQuestionsBySchoolGroup = async () => {
    try {
      const QuestionsBySchoolGroup = await fetch(`http://localhost:3000/questions/bySchool/${schoolGroupID}`);
      if (QuestionsBySchoolGroup.ok) {
        const data = await QuestionsBySchoolGroup.json();
        setQuestions(data);
        console.log('Fetched questions:', data);
        if (data.length > 0) {
          const currentQuestionId = data[0].QandA_id;
          let questionsResponse = await fetch(`http://localhost:3000/questions/${currentQuestionId}`);
          let qr = await questionsResponse.json();
          setQuestion(qr);
        }
        return data; // Return the fetched data
      } else {
        console.error('Error fetching questions:', QuestionsBySchoolGroup.statusText);
        return []; // Return an empty array if there was an error
      }
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
    console.log('Current schoolGroupID:', schoolGroupID);
    console.log('Current questions:', questions);

  
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
            const response = await fetch(`http://localhost:3000/questions/${QandA_id}`);
            console.log("Response is: " + response);
            if (response.ok) {
                const data = await response.json();
                setAnswer(data.Answer); // Set the fetched answer
                console.log("Response is: " + response);
            } else {
                console.error('Failed to fetch answer:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching answer:', error);
        }
    }
};

  // const toggleQuestion = async () => {
  //   if (openQuestionId === schoolGroupID) {
  //     // If the question is already open, close it
  //     setOpenQuestionId(null);
  //     setAnswer(''); // Clear answer when closing
  //   } else {
  //     setOpenQuestionId(localStorage.getItem('QandA_id')); // Open the selected question

  //     try {
  //       console.log("QuestionID is: " + openQuestionId);
  //       const response = await fetch(`http://localhost:3000/questions/${openQuestionId}/answer`);
  //       console.log("What are you, response? " + response);
  //       if (response.ok) {
  //         const data = await response.json();
  //         setAnswer(data.answer); // Set the fetched answer
  //         console.log("What are you, data? " + data);
  //         console.log("What are you, data.ans? " + data.answer);
  //         console.log("What are you? " + answer);
  //       } else {
  //         console.error('Failed to fetch answer:', response.statusText);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching answer:', error);
  //     }
  //   }
  // };


  const handleOpenQAModal = () => {
    setIsQAModalOpen(true);
  };

  const handleCloseQAModal = () => {
    setIsQAModalOpen(false);
  };

  const handleOpenEditModal = (id) => {
    const questionToEdit = questions.find((q) => q.id === id);
    if (questionToEdit) {
      setQuestion(questionToEdit.question);
      setAnswer(questionToEdit.answer);
      setIsEditModalOpen(true);
    }
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleSubmitQuestion = async () => {
    try {
      handleCloseQAModal();
  
      // Create the body object with the correct structure
      let body = {
        Question: question,
        Answer: answer, // Assign the answer directly to the body
        schoolGroup_id: schoolGroupID, // Include the school group ID
      };
  
      console.log("Request body:", JSON.stringify(body));
  
      const response = await fetch('http://localhost:3000/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
  
      if (!response.ok) {
        throw new Error('Failed to submit question');
      }
  
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
  
  
  
  

  // Function to delete a question
  const handleDeleteQuestion = async (QandA_id) => {
    try {
      const response = await fetch(`http://localhost:3000/questions/${QandA_id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete question');
      }

      // Optionally, re-fetch questions here or remove the deleted question from the state
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
        questions={questions}
        openQuestionId={openQuestionId}
        toggleQuestion={toggleQuestion}
        answer={answer} // Pass the answer state
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
              placeholder="Type your question here..."
              className="w-full p-2 border border-gray-300 rounded-lg mb-4 h-20"
            />
            <h3>Answer: (Optional)</h3>
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Type your answer here (Optional)..."
              className="w-full p-2 border border-gray-300 rounded-lg mb-4 h-60"
            />
            <div className="flex justify-end space-x-4">
              <button onClick={handleCloseQAModal} className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
                Cancel
              </button>
              <button onClick={handleSubmitQuestion} className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800">
                Submit
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
              placeholder="Type your question here..."
              className="w-full p-2 border border-gray-300 rounded-lg mb-4 h-20"
            />
            <h3>Answer: (Optional)</h3>
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Type your answer here (Optional)..."
              className="w-full p-2 border border-gray-300 rounded-lg mb-4 h-60"
            />
            <div className="flex justify-end space-x-4">
              <button onClick={handleCloseEditModal} className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
                Cancel
              </button>
              <button onClick={handleSubmitQuestion} className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800">
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
