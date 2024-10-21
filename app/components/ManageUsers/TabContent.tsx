import { AiOutlineSearch, AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { useState, useEffect } from 'react';

interface TabContentProps {
  activeTab: 'Admins' | 'Event Supervisors';
}

const TabContent: React.FC<TabContentProps> = ({ activeTab }) => {
  // Initial data for Admins and Event Supervisors
  const initialAdminData = [
    { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com' },
    { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com' },
    // Add more entries to test scrolling
    { id: 3, firstName: 'Alice', lastName: 'Johnson', email: 'alice@example.com' },
    { id: 4, firstName: 'Bob', lastName: 'Brown', email: 'bob@example.com' },
    { id: 5, firstName: 'Charlie', lastName: 'Green', email: 'charlie@example.com' },
    { id: 6, firstName: 'David', lastName: 'White', email: 'david@example.com' },
    { id: 7, firstName: 'Eva', lastName: 'Black', email: 'eva@example.com' },
    { id: 8, firstName: 'Frank', lastName: 'Gray', email: 'frank@example.com' },
    { id: 9, firstName: 'Grace', lastName: 'Blue', email: 'grace@example.com' },
    { id: 10, firstName: 'Hank', lastName: 'Red', email: 'hank@example.com' },
  ];

  const initialSupervisorData = [
    { id: 1, firstName: 'Alice', lastName: 'Joh', email: 'alice@example.com' },
    { id: 2, firstName: 'Bob', lastName: 'Brown', email: 'bob@example.com' },
  ];

  const [adminData, setAdminData] = useState(initialAdminData);
  const [supervisorData, setSupervisorData] = useState(initialSupervisorData);
  const [data, setData] = useState(initialAdminData);

  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);

  useEffect(() => {
    if (activeTab === 'Admins') {
      setData(adminData);
    } else {
      setData(supervisorData);
    }
  }, [activeTab, adminData, supervisorData]);

  const handleDelete = (id: number) => {
    if (activeTab === 'Admins') {
      const updatedAdminData = adminData.filter(entry => entry.id !== id);
      setAdminData(updatedAdminData);
      setData(updatedAdminData);
    } else {
      const updatedSupervisorData = supervisorData.filter(entry => entry.id !== id);
      setSupervisorData(updatedSupervisorData);
      setData(updatedSupervisorData);
    }
  };

  const handleEdit = (id: number) => {
    const entryToEdit = activeTab === 'Admins'
      ? adminData.find(entry => entry.id === id)
      : supervisorData.find(entry => entry.id === id);

    if (entryToEdit) {
      setEditingEntry(entryToEdit);
      setIsEditPopupOpen(true);
    }
  };

  const handleSaveEdit = () => {
    if (editingEntry) {
      if (activeTab === 'Admins') {
        const updatedAdminData = adminData.map(entry =>
          entry.id === editingEntry.id ? editingEntry : entry
        );
        setAdminData(updatedAdminData);
      } else {
        const updatedSupervisorData = supervisorData.map(entry =>
          entry.id === editingEntry.id ? editingEntry : entry
        );
        setSupervisorData(updatedSupervisorData);
      }
      setData(activeTab === 'Admins' ? adminData : supervisorData);
      setIsEditPopupOpen(false);
      setEditingEntry(null);
    }
  };

  // Sort data by Last Name
  const sortedData = [...data].sort((a, b) => a.lastName.localeCompare(b.lastName));

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
                  <button onClick={() => handleEdit(entry.id)} className="text-blue-600">
                    <AiOutlineEdit />
                  </button>
                  <button onClick={() => handleDelete(entry.id)} className="text-red-600">
                    <AiOutlineDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Popup */}
      {isEditPopupOpen && (
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
    </div>
  );
};

export default TabContent;
