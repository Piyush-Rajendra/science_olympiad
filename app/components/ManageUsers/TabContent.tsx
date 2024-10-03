import { AiOutlineSearch } from 'react-icons/ai'; 
import { useState, useEffect } from 'react';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'; 

interface TabContentProps {
  activeTab: 'Admins' | 'Event Supervisors';
}

const TabContent: React.FC<TabContentProps> = ({ activeTab }) => {
  // Initial data for Admins and Event Supervisors
  const initialAdminData = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    // Add more entries to test scrolling
    { id: 3, name: 'Alice Johnson', email: 'alice@example.com' },
    { id: 4, name: 'Bob Brown', email: 'bob@example.com' },
    { id: 5, name: 'Charlie Green', email: 'charlie@example.com' },
    { id: 6, name: 'David White', email: 'david@example.com' },
    { id: 7, name: 'Eva Black', email: 'eva@example.com' },
    { id: 8, name: 'Frank Gray', email: 'frank@example.com' },
    { id: 9, name: 'Grace Blue', email: 'grace@example.com' },
    { id: 10, name: 'Hank Red', email: 'hank@example.com' },
  ];

  const initialSupervisorData = [
    { id: 1, name: 'Alice Joh', email: 'alice@example.com' },
    { id: 2, name: 'Bob Brown', email: 'bob@example.com' },
  ];

  const [adminData, setAdminData] = useState(initialAdminData);
  const [supervisorData, setSupervisorData] = useState(initialSupervisorData);
  const [data, setData] = useState(initialAdminData);

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
      <div className="overflow-auto max-h-[400px]"> {/* Set max-height for scrollbar */}
        <table className="min-w-full bg-white table-fixed">
          <thead className="sticky top-0 bg-white z-10">
            <tr>
              <th className="p-2 text-left text-[#666666] w-[200px]">Name</th>
              <th className="p-2 text-left text-[#666666] w-[300px]">Email</th>
              <th className="p-2 text-left text-[#666666] w-[150px]">Manage</th>
            </tr>
          </thead>
          <tbody>
            {data.map((entry, index) => (
              <tr 
                key={entry.id} 
                className={`${index % 2 === 0 ? 'bg-[#FAFBFC] border-t border-b border-[#D9D9D9]' : ''} border-b border-[#D9D9D9]`}
              >
                <td className="p-6 pl-2">{entry.name}</td>
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
    </div>
  );
};

export default TabContent;
