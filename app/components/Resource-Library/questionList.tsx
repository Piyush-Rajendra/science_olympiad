// QuestionList.js
import React from 'react';
import Image from 'next/image'; // or your image import method
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'; // icons for toggling questions

const QuestionList = ({ questions, openQuestionId, toggleQuestion, handleOpenEditModal }) => {
  return (
    <div className="px-10">
      {/* Questions Header */}
      <div className="px-10 pt-5">
        <div className="grid grid-cols-[3fr,1fr] p-2 border-b border-gray-300">
          <div className="ml-10">Question</div>
          <div className="text-right mr-20">Manage</div>
        </div>
      </div>

      {/* Questions */}
      {questions.map((item, index) => (
        <div
          key={item.id}
          className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} border-b border-gray-300`}
        >
          <div className="grid grid-cols-[3fr,1fr] items-center p-4">
            <div className="flex items-center space-x-4">
              <button onClick={() => toggleQuestion(item.id)}>
                {openQuestionId === item.id ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              <span className="text-lg">{item.Question}</span>
            </div>

            <div className="flex justify-end space-x-4 pr-3">
              <button onClick={() => handleOpenEditModal(item.id)}>
                <Image src="/images/note-pencil.png" alt="Edit" width={30} height={30} />
              </button>
              <button>
                <Image src="/images/trash.png" alt="Delete" width={30} height={30} />
              </button>
              <button>
                <Image src="/images/list.png" alt="Details" width={30} height={30} />
              </button>
            </div>
          </div>

          {openQuestionId === item.id && (
            <div className="px-10 pt-2 pb-4">
              <p className="text-gray-700">{item.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default QuestionList;
