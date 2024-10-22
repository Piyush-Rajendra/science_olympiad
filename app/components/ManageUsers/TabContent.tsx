import { AiOutlineSearch, AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { useState, useEffect, act } from 'react';

interface TabContentProps {
  activeTab: 'Admins' | 'Event Supervisors';
}

export default function TabContainer ({ activeTab, adData, esData }) {
  const [adminData, setAdminData] = useState([]);
  const [supervisorData, setSupervisorData] = useState([]);
  const [groupId, setGroupID] = useState(localStorage.getItem('group_id'));
  const [data, setData] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [events, setEvents] = useState([]); // Store events
  const [selectedEvents, setSelectedEvents] = useState<number[]>([]); // Track selected events
  const [originalEvents, setOriginalEvents] = useState<number[]>([]);
  const [newSupervisorData, setNewSupervisorData] = useState([]);
  const [newAdminData, setNewAdminData] = useState([]);

  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // New fields for event supervisor editing

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
    // Fetch admin data only if the active tab is 'Admins'
    getCurrentEvents();
    getAdminESData();
    setToken(localStorage.getItem('token'));
  }, [activeTab, newAdminData, newSupervisorData, adData, esData]);

  const getAdminESData = async () => {
    if (activeTab === 'Admins') {
      const response = await fetch('http://localhost:3000/auth/admin', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      setAdminData(result);
      setData(result);
    } else {
      const response = await fetch('http://localhost:3000/auth/eventsupervisor', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      setSupervisorData(result);
      setData(result);
    }
  }

  const handleDelete = async (a_id: number, es_id: number) => {
    try {
      const endpoint = activeTab === 'Admins'
        ? `http://localhost:3000/auth/deleteAdmin/${a_id}` // Replace with the correct endpoint for admins
        : `http://localhost:3000/auth/deleteEventSupervisor/${es_id}`; // Replace with the correct endpoint for supervisors

      // Make a DELETE request
      const response = await fetch(endpoint, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`, // Add your bearer token here
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`Error deleting entry: ${response.statusText}`);
      }
    } catch {
      console.error('An error was thrown for ')
    }
    if (activeTab === 'Admins') {
      const updatedAdminData = adminData.filter(entry => entry.admin_id !== a_id);
      setNewAdminData(updatedAdminData);
    } else {
      const updatedSupervisorData = supervisorData.filter(entry => entry.eventSupervisor_id !== es_id);
      setNewSupervisorData(updatedSupervisorData);
    }
  };

  const handleEdit = async (a_id: number, es_id: number) => {
    const entryToEdit = activeTab === 'Admins'
      ? adminData.find(entry => entry.admin_id === a_id)
      : supervisorData.find(entry => entry.eventSupervisor_id === es_id);
    if (activeTab === 'Event Supervisors') {
      const response = await fetch(`http://localhost:3000/get-event-supervisor/${entryToEdit.eventSupervisor_id}/events`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error fetching events: ${response.statusText}`);
      }

      const result = await response.json();

      // Extract event_id for each event and store them in an array
      const eventIds = result.map((event: { event_id: number }) => event.event_id);
      setSelectedEvents(eventIds);
      setOriginalEvents(eventIds);
      getAdminESData();
    }
    if (entryToEdit) {
      setEditingEntry(entryToEdit);
      setIsEditPopupOpen(true);
      getAdminESData();
    }
  };

  const handleCheckboxChange = (eventId: number) => {
    setSelectedEvents(prevSelected =>
      prevSelected.includes(eventId)
        ? prevSelected.filter(id => id !== eventId)
        : [...prevSelected, eventId]
    );
  };

  const handleSaveEdit = async () => {
    if (editingEntry) {
      try {
        const endpoint = activeTab === 'Admins'
          ? `http://localhost:3000/auth/updateAdmin` // Replace with correct endpoint for admins
          : `http://localhost:3000/auth/updateEventSupervisor`; // Replace with correct endpoint for supervisors
        if (activeTab === 'Admins') {
          const response = await fetch(endpoint, {
            method: 'PUT',
            headers: {
              'Authorization': `Bearer ${token}`, // Include your token here
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ admin_id: editingEntry.admin_id, school_group_id: editingEntry.school_group_id, firstName: editingEntry.firstName, lastName: editingEntry.lastName, email: editingEntry.email, username: editingEntry.username, password: editingEntry.password, isTournamentDirector: editingEntry.isTournamentDirector }), // Send the updated entry
          });


          if (!response.ok) {
            throw new Error(`Error updating entry: ${response.statusText}`);
          }
        } else {
          const response = await fetch(endpoint, {
            method: 'PUT',
            headers: {
              'Authorization': `Bearer ${token}`, // Include your token here
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ eventSupervisor_id: editingEntry.eventSupervisor_id, school_group_id: editingEntry.school_group_id, firstName: editingEntry.firstName, lastName: editingEntry.lastName, email: editingEntry.email, username: editingEntry.username, password: editingEntry.password }), // Send the updated entry
          });
          if (!response.ok) {
            throw new Error(`Error updating entry: ${response.statusText}`);
          }

          const deleteEventsPromises = originalEvents
            .filter(event_id => !selectedEvents.includes(event_id)) // Filter events not in selectedEvents
            .map(event_id => {
              return fetch('http://localhost:3000/delete-EventSuperVisorsEvent', {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  event_id: event_id,
                  eventSupervisor_id: editingEntry.eventSupervisor_id,
                }),
              });
            });
          await Promise.all(deleteEventsPromises);

          const assignEventsPromises = selectedEvents
            .filter(event_id => !originalEvents.includes(event_id)) // Filter events not in originalEvents
            .map(event_id => {
              return fetch('http://localhost:3000/add-EventSupervisorsEvent', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  event_id: event_id,
                  eventSupervisor_id: editingEntry.eventSupervisor_id,
                }),
              });
            });
          await Promise.all(assignEventsPromises);
        }



        // If the update is successful, update local state
        if (activeTab === 'Admins') {
          const updatedAdminData = adminData.map(entry =>
            entry.id === editingEntry.id ? editingEntry : entry
          );
          setNewAdminData(updatedAdminData);
        } else {
          const updatedSupervisorData = supervisorData.map(entry =>
            entry.id === editingEntry.id ? editingEntry : entry
          );
          setNewSupervisorData(updatedSupervisorData);
        }
        setData(activeTab === 'Admins' ? adminData : supervisorData);
        setIsEditPopupOpen(false);
        setEditingEntry(null);
      } catch (error) {
        console.error('An error occurred while saving the edit:', error);
        // Handle the error appropriately (e.g., show a message to the user)
      }
    }
  };


let sortedData = ([...data].sort((a, b) => a.lastName.localeCompare(b.lastName)));

    const handleSearch = (e) => {
      const searchTerm = e.target.value.toLowerCase(); // Convert to lowercase for case-insensitive search
    
      // Filter the original data based on the search term
      const filteredData = (activeTab === 'Admins' ? adminData : supervisorData).filter(entry => {
        const fullName = `${entry.firstName} ${entry.lastName}`.toLowerCase();
        return fullName.includes(searchTerm);
      });
    
      // Sort the filtered data by first name, then last name
      const sortedFilteredData = filteredData.sort((a, b) => {
        const firstNameA = a.firstName.toLowerCase();
        const firstNameB = b.firstName.toLowerCase();
        const lastNameA = a.lastName.toLowerCase();
        const lastNameB = b.lastName.toLowerCase();
    
        if (firstNameA < firstNameB) return -1;
        if (firstNameA > firstNameB) return 1;
        if (lastNameA < lastNameB) return -1;
        if (lastNameA > lastNameB) return 1;
        return 0; // They are equal
      });
    
      // Update the state with the filtered and sorted data
      setData(sortedFilteredData);
    };

  // Sort data by Last Name



  if (loading) return <p>Loading data...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-4">
      {/* Search Bar */}
      <div className="mb-4 -ml-2">
        <div className="flex items-center border border-[#D9D9D9] rounded-full">
          <AiOutlineSearch className="text-gray-400 ml-2 text-lg" />
          <input
            type="text"
            placeholder="Search..."
            className="flex-1 p-2 bg-[#FAFBFC] border-0 focus:outline-none rounded-full"
            onChange={handleSearch} // Call handleSearch method on change
          />
        </div>
      </div>

      {/* Content for active tab */}
      <h2 className="text-lg font-semibold mb-2">{activeTab}</h2>
      <div className="overflow-auto max-h-[400px]">
        <table className="min-w-full bg-white table-fixed">
          <thead className="top-0 bg-white z-10">
            <tr>
              <th className="p-2 text-left text-[#666666] w-[200px]">Name (Last, First Name)</th>
              <th className="p-2 text-left text-[#666666] w-[300px]">Email</th>
              <th className="p-2 text-left text-[#666666] w-[150px]">Manage</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((entry, index) => (
              <tr
                key={entry.id}
                className={`${index % 2 === 0 ? 'bg-[#FAFBFC]' : ''} border-b border-[#D9D9D9]`}
              >
                <td className="p-6 pl-2">{`${entry.lastName}, ${entry.firstName}`}</td>
                <td className="p-6 pl-2">{entry.email}</td>
                <td className="p-6 pl-2 flex justify-start space-x-2">
                  <button onClick={() => handleEdit(entry.admin_id, entry.eventSupervisor_id)} className="text-blue-600">
                    <AiOutlineEdit />
                  </button>
                  <button onClick={() => handleDelete(entry.admin_id, entry.eventSupervisor_id)} className="text-red-600">
                    <AiOutlineDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Popup */}
      {isEditPopupOpen && activeTab === 'Admins' && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg relative">
            <h2 className="text-lg font-semibold mb-4">Edit {activeTab.slice(0, -1)}</h2>
            <input
              type="text"
              placeholder="First Name"
              value={editingEntry?.firstName || ''}
              onChange={(e) => setEditingEntry(prev => ({ ...prev, firstName: e.target.value }))}
              className="w-full p-2 border border-[#D9D9D9] rounded-md mb-2"
            />
            <input
              type="text"
              placeholder="Last Name"
              value={editingEntry?.lastName || ''}
              onChange={(e) => setEditingEntry(prev => ({ ...prev, lastName: e.target.value }))}
              className="w-full p-2 border border-[#D9D9D9] rounded-md mb-2"
            />
            <input
              type="email"
              placeholder="Email"
              value={editingEntry?.email || ''}
              onChange={(e) => setEditingEntry(prev => ({ ...prev, email: e.target.value }))}
              className="w-full p-2 border border-[#D9D9D9] rounded-md mb-2"
            />
            <div className="flex justify-end">
              <button className="mr-2 p-2 border border-gray-400 rounded-md" onClick={() => setIsEditPopupOpen(false)}>Cancel</button>
              <button
                className="bg-[#006330] text-white py-2 px-4 rounded-md"
                onClick={handleSaveEdit}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      {isEditPopupOpen && activeTab === 'Event Supervisors' && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg relative">
            <h2 className="text-lg font-semibold mb-4">Edit Event Supervisor</h2>
            <input
              type="text"
              placeholder="First Name"
              value={editingEntry?.firstName || ''}
              onChange={(e) => setEditingEntry(prev => ({ ...prev, firstName: e.target.value }))}
              className="w-full p-2 border border-[#D9D9D9] rounded-md mb-2"
            />
            <input
              type="text"
              placeholder="Last Name"
              value={editingEntry?.lastName || ''}
              onChange={(e) => setEditingEntry(prev => ({ ...prev, lastName: e.target.value }))}
              className="w-full p-2 border border-[#D9D9D9] rounded-md mb-2"
            />
            <input
              type="email"
              placeholder="Email"
              value={editingEntry?.email || ''}
              onChange={(e) => setEditingEntry(prev => ({ ...prev, email: e.target.value }))}
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

            <div className="mt-4">
              <button
                onClick={handleSaveEdit}
                className="bg-blue-600 text-white py-2 px-4 rounded-md mr-2"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditPopupOpen(false)}
                className="bg-gray-400 text-white py-2 px-4 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
