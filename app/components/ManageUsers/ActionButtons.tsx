import { AiOutlinePlus, AiOutlineClose, AiOutlineSearch } from 'react-icons/ai';
import { useState } from 'react';

export default function ActionButtons({ activeTab }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isEventSupervisorPopup, setIsEventSupervisorPopup] = useState(false);

  const buttonText = activeTab === 'Admins' ? 'Add Admin' : 'Add Event Supervisor';

  const openPopup = () => {
    setIsPopupOpen(true);
    setIsEventSupervisorPopup(activeTab === 'Event Supervisors');
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="flex justify-between items-center p-4">
      <button 
        className="flex items-center text-[#006330] border-0 focus:outline-none"
        onClick={openPopup}
      >
        <AiOutlinePlus className="mr-2" />
        {buttonText}
      </button>

      <button className="bg-[#006330] text-white py-2 px-5 rounded-lg hover:bg-[#004b24] transition-colors duration-300">
        Save Changes
      </button>

      {/* Popup */}
      {isPopupOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg relative">
            <button 
              className="absolute top-2 right-2 text-black" 
              onClick={closePopup}
            >
              <AiOutlineClose />
            </button>
            <h2 className="text-lg font-semibold mb-4">{isEventSupervisorPopup ? 'Add Event Supervisor' : 'Add Admin'}</h2>

            {isEventSupervisorPopup ? (
              <>
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full p-2 border border-[#D9D9D9] rounded-md mb-2"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-full p-2 border border-[#D9D9D9] rounded-md mb-2"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full p-2 border border-[#D9D9D9] rounded-md mb-2"
                />
                <div className="flex items-center border border-[#D9D9D9] rounded-full mb-2">
                  <AiOutlineSearch className="text-gray-400 ml-2 text-lg" />
                  <input
                    type="text"
                    placeholder="Assigned Events"
                    className="flex-1 p-2 bg-[#FAFBFC] border-0 focus:outline-none rounded-full"
                  />
                </div>
                {/* Checkboxes for assigned events */}
                <div className="max-h-60 overflow-auto">
                  <div className="grid grid-cols-4 gap-2">
                    {/* Replace these checkboxes with actual events */}
                    {['Event 1', 'Event 2', 'Event 3', 'Event 4', 'Event 5', 'Event 6', 'Event 7', 'Event 8'].map(event => (
                      <label key={event} className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        {event}
                      </label>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <>
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full p-2 border border-[#D9D9D9] rounded-md mb-2"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-full p-2 border border-[#D9D9D9] rounded-md mb-2"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full p-2 border border-[#D9D9D9] rounded-md mb-2"
                />
              </>
            )}

            <div className="flex justify-end">
              <button className="mr-2 p-2 border border-gray-400 rounded-md" onClick={closePopup}>Cancel</button>
              <button className="bg-[#006330] text-white py-2 px-4 rounded-md">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
