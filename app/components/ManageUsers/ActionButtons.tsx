import { AiOutlinePlus, AiOutlineClose, AiOutlineSearch } from 'react-icons/ai';
import { useState } from 'react';

export default function ActionButtons({ activeTab, addAdmin, addEventSupervisor }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isEventSupervisorPopup, setIsEventSupervisorPopup] = useState(false);
  
  // State for admin form inputs
  const [adminFirstName, setAdminFirstName] = useState('');
  const [adminLastName, setAdminLastName] = useState('');
  const [adminEmail, setAdminEmail] = useState('');

  // State for event supervisor form inputs
  const [supervisorFirstName, setSupervisorFirstName] = useState('');
  const [supervisorLastName, setSupervisorLastName] = useState('');
  const [supervisorEmail, setSupervisorEmail] = useState('');

  const buttonText = activeTab === 'Admins' ? 'Add Admin' : 'Add Event Supervisor';

  const openPopup = () => {
    setIsPopupOpen(true);
    setIsEventSupervisorPopup(activeTab === 'Event Supervisors');
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    // Reset form inputs when closing the popup
    setAdminFirstName('');
    setAdminLastName('');
    setAdminEmail('');
    setSupervisorFirstName('');
    setSupervisorLastName('');
    setSupervisorEmail('');
  };

  const handleAdminSave = () => {
    const newAdmin = {
      id: Date.now(), // Simple ID generation using timestamp
      name: `${adminFirstName} ${adminLastName}`,
      email: adminEmail,
    };
    addAdmin(newAdmin); // Call the addAdmin function passed from ManageUsers
    closePopup(); // Close the popup after saving
  };

  const handleSupervisorSave = () => {
    const newSupervisor = {
      id: Date.now(), // Simple ID generation using timestamp
      name: `${supervisorFirstName} ${supervisorLastName}`,
      email: supervisorEmail,
    };
    addEventSupervisor(newSupervisor); // Call the addEventSupervisor function passed from ManageUsers
    closePopup(); // Close the popup after saving
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

            {/* Admin Form */}
            {isEventSupervisorPopup ? (
              <>
                <input
                  type="text"
                  placeholder="First Name"
                  value={supervisorFirstName}
                  onChange={(e) => setSupervisorFirstName(e.target.value)} // Update supervisorFirstName state
                  className="w-full p-2 border border-[#D9D9D9] rounded-md mb-2"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={supervisorLastName}
                  onChange={(e) => setSupervisorLastName(e.target.value)} // Update supervisorLastName state
                  className="w-full p-2 border border-[#D9D9D9] rounded-md mb-2"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={supervisorEmail}
                  onChange={(e) => setSupervisorEmail(e.target.value)} // Update supervisorEmail state
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
              // Admin Form
              <>
                <input
                  type="text"
                  placeholder="First Name"
                  value={adminFirstName}
                  onChange={(e) => setAdminFirstName(e.target.value)} // Update adminFirstName state
                  className="w-full p-2 border border-[#D9D9D9] rounded-md mb-2"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={adminLastName}
                  onChange={(e) => setAdminLastName(e.target.value)} // Update adminLastName state
                  className="w-full p-2 border border-[#D9D9D9] rounded-md mb-2"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)} // Update adminEmail state
                  className="w-full p-2 border border-[#D9D9D9] rounded-md mb-2"
                />
              </>
            )}

            <div className="flex justify-end">
              <button className="mr-2 p-2 border border-gray-400 rounded-md" onClick={closePopup}>Cancel</button>
              <button 
                className="bg-[#006330] text-white py-2 px-4 rounded-md"
                onClick={isEventSupervisorPopup ? handleSupervisorSave : handleAdminSave} // Call the appropriate save function
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
