import { AiOutlinePlus, AiOutlineClose, AiOutlineSearch } from 'react-icons/ai';
import { useState, useEffect } from 'react';

export default function ActionButtons({ activeTab, addAdmin, addEventSupervisor }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isEventSupervisorPopup, setIsEventSupervisorPopup] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [groupId, setGroupID] = useState(localStorage.getItem('group_id'));
  const [events, setEvents] = useState([]);

  const [adminFirstName, setAdminFirstName] = useState('');
  const [adminLastName, setAdminLastName] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminSchoolGroupId, setAdminSchoolGroupId] = useState(localStorage.getItem('group_id'));
  const [isTournamentDirector, setIsTournamentDirector] = useState(false);
  const [adminPassword, setAdminPassword] = useState('null');
  const [adminUsername, setAdminUsername] = useState(adminEmail);

  // State for event supervisor form inputs
  const [supervisorFirstName, setSupervisorFirstName] = useState('');
  const [supervisorLastName, setSupervisorLastName] = useState('');
  const [supervisorEmail, setSupervisorEmail] = useState('');
  const [selectedEvents, setSelectedEvents] = useState([]); // State to store selected event IDs

  const buttonText = activeTab === 'Admins' ? 'Add Admin' : 'Add Event Supervisor';

  const openPopup = () => {
    setIsPopupOpen(true);
    setIsEventSupervisorPopup(activeTab === 'Event Supervisors');
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    // Reset form inputs when closing the popup
    setSupervisorFirstName('');
    setSupervisorLastName('');
    setSupervisorEmail('');
    setAdminEmail('');
    setAdminFirstName('');
    setAdminLastName('');
    setSelectedEvents([]); // Reset selected events
  };

  const handleCheckboxChange = (eventId) => {
    setSelectedEvents((prevSelected) =>
      prevSelected.includes(eventId)
        ? prevSelected.filter((id) => id !== eventId) // Uncheck (remove ID)
        : [...prevSelected, eventId] // Check (add ID)
    );
  };

  const handleSupervisorSave = async () => {
    try {
      // Step 1: Create the Event Supervisor
      const newSupervisor = {
        name: `${supervisorFirstName} ${supervisorLastName}`,
        email: supervisorEmail,
      };

      // Send POST request to create the supervisor
      const supervisorResponse = await fetch('http://localhost:3000/auth/registerES', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`, // Include your token here
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ school_group_id: groupId, email: supervisorEmail, username: supervisorEmail, firstName: supervisorFirstName, lastName: supervisorLastName }),
      });

      if (!supervisorResponse.ok) {
        throw new Error('Failed to create event supervisor');
      }

      const supervisorID = await fetch(`http://localhost:3000/get-eventSupervisor-id?email=${supervisorEmail}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!supervisorID.ok) {
        throw new Error('Failed to get event supervisor id');
      }
      const createdSupervisor = await supervisorID.json(); // Assuming the response contains the supervisor's ID
      console.log(createdSupervisor)

      // Step 2: Assign selected events to the newly created supervisor
      const assignEventsPromises = selectedEvents.map((event_id) => {
        return fetch('http://localhost:3000/add-EventSupervisorsEvent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            event_id: event_id,
            eventSupervisor_id: createdSupervisor.eventSupervisor_id,
          }),
        });
      });
      // Wait for all the event assignments to be completed
      await Promise.all(assignEventsPromises);

      // If successful, call the addEventSupervisor function to update the UI
      addEventSupervisor({
        id: createdSupervisor.eventSupervisor_id,
        name: `${supervisorFirstName} ${supervisorLastName}`,
        email: supervisorEmail,
        assignedEvents: selectedEvents,
      });

      closePopup(); // Close the popup after saving
    } catch (error) {
      console.error('Error saving event supervisor:', error);
    }
  };

  const handleAdminSave = async () => {
    try {
      const endpoint = 'http://localhost:3000/auth/registerAdmin';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`, // Include your token here
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ school_group_id: adminSchoolGroupId, firstName: adminFirstName, lastName: adminLastName, email: adminEmail, username: adminEmail, password: adminPassword, isTournamentDirector: isTournamentDirector }), // Send the updated entry
      });

      if (!response.ok) {
        throw new Error(`Error updating entry: ${response.statusText}`);
      }
    } catch {
      console.error('Not working');
    }
    const newAdmin = {
      id: Date.now(), // Simple ID generation using timestamp
      name: `${adminFirstName} ${adminLastName}`,
      email: adminEmail,
    };
    addAdmin(newAdmin); // Call the addAdmin function passed from ManageUsers
    closePopup(); // Close the popup after saving
  };


  const getCurrentEvents = async () => {
    const currentTournamentResponse = await fetch(`http://localhost:3000/get-current-tournaments/${groupId}`);
    const currentTournaments = await currentTournamentResponse.json();
    if (currentTournaments.length > 0) {
      const currentTournamentId = currentTournaments[0].tournament_id;
      const eventsResponse = await fetch(`http://localhost:3000/get-events-by-tournament/${currentTournamentId}`);
      const er = await eventsResponse.json();
      setEvents(er);
    }
  };

  useEffect(() => {
    getCurrentEvents();
  }, []);

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

            {/* Event Supervisor Form */}
            {isEventSupervisorPopup && (
              <>
                <input
                  type="text"
                  placeholder="First Name"
                  value={supervisorFirstName}
                  onChange={(e) => setSupervisorFirstName(e.target.value)}
                  className="w-full p-2 border border-[#D9D9D9] rounded-md mb-2"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={supervisorLastName}
                  onChange={(e) => setSupervisorLastName(e.target.value)}
                  className="w-full p-2 border border-[#D9D9D9] rounded-md mb-2"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={supervisorEmail}
                  onChange={(e) => setSupervisorEmail(e.target.value)}
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
                {events.length > 0 ? (
                  <div className="max-h-60 overflow-auto">
                    <div className="grid grid-cols-4 gap-4" style={{ maxHeight: '12rem', overflowY: 'auto' }}>
                      {events.map((event) => (
                        <label key={event.event_id} className="flex items-center text-lg py-2">
                          <input
                            type="checkbox"
                            className="mr-3 w-5 h-5"
                            value={event.name}
                            checked={selectedEvents.includes(event.event_id)} // Check if the event is selected
                            onChange={() => handleCheckboxChange(event.event_id)} // Update the selected events state
                          />
                          {event.name}
                        </label>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p>No events available</p>
                )}
              </>
            )} 
            {!isEventSupervisorPopup && (
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
                onClick={isEventSupervisorPopup ? handleSupervisorSave : handleAdminSave}
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
