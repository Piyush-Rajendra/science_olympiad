import React from 'react';
import Image from 'next/image'; // or your image import method
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'; // icons for toggling questions

const QuestionList = ({ questions, openQuestionId, toggleQuestion, answer, handleOpenEditModal, handleDeleteQuestion }) => {
    console.log("Answer is: " + answer);
    return (
      <div className="px-10">
        {/* Questions Header */}
        <div className="px-10 pt-5">
          <div className="grid grid-cols-3 p-2 border-b border-gray-300 w-full">
            <div className="ml-10">Question</div>
            <div className="text-center">Status</div>
            <div className="text-right">Manage</div>
          </div>
        </div>
  
        {/* Scrollable Questions Area */}
        <div className="h-[400px] overflow-y-auto w-full">
          {questions.map((item, index) => (
            <div
              key={item.QandA_id}
              className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} border-b border-gray-300`}
            >
              <div className="grid grid-cols-3 items-center p-4">
                <div className="flex items-center space-x-4">
                  <button onClick={() => toggleQuestion(item.QandA_id)}>
                    {openQuestionId === item.QandA_id ? <FaChevronUp /> : <FaChevronDown />}
                  </button>
                  <span className="text-lg">{item.Question}</span>
                </div>
  
                {/* Status Section */}
                <div className="flex justify-center">
                  <div
                    id="question-status"
                    className={`w-24 p-2 border rounded text-center ${item.isAnswered ? 'bg-green-200' : 'bg-red-200'}`}
                    style={{ width: '140px' }}
                  >
                    {item.isAnswered ? <h3 className="text-black">Answered</h3> : <h3 className="text-black">Not Answered</h3>}
                  </div>
                </div>
  
                <div className="flex justify-end space-x-4 pr-3">
                  <button onClick={() => handleOpenEditModal(item.QandA_id)}>
                    <Image src="/images/note-pencil.png" alt="Edit" width={30} height={30} />
                  </button>
                  <button onClick={() => handleDeleteQuestion(item.QandA_id)}>
                    <Image src="/images/trash.png" alt="Delete" width={30} height={30} />
                  </button>
                </div>
              </div>
  
              {openQuestionId === item.QandA_id && (
                <div className="px-10 pt-2 pb-4">
                  <p className="text-gray-700">{answer}</p> {/* Display the fetched answer here */}
                </div>
              )}
            </div>
          ))}
        </div>
  
        {/* Adjusting the dividing bar length */}
        <div className="border-b border-gray-300 mt-2 mb-5 w-full" />
      </div>
    );
  };
  
  export default QuestionList;
  