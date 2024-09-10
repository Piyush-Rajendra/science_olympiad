import React from 'react';

interface SchoolGroupProps {
    name: string;
    admins: string[];
    onEdit: () => void;
    onDelete: () => void;
}

const SchoolGroup: React.FC<SchoolGroupProps> = ({ name, admins, onEdit, onDelete}) => {
    const maxAdmins = admins.slice(0, 4);

    const deleteAdmin = (name: string) => {
        
    }
    
    return (
        <div className="bg-blue-400 rounded-2xl shadow-md flex flex-col">
            <div className="bg-blue-950 text-yellow-300 text-center rounded-t-2xl py-8 text-2xl">
                <span>{name}</span>
            </div>
            <div className="flex flex-col gap-2 ml-10 mb-10 mt-10">
                {maxAdmins.map((name, index) => (
                    <div key={index} className="px-2 py-1 rounded flex">
                    <span>{name}</span>
                    </div>
                ))}
            </div>
            <div className="flex justify-between mb-10 ml-10 mr-10 ">
                <button onClick={onDelete} className="bg-red-500 text-white px-4 py-2 rounded shadow-md"
                >
                    Delete Group
                </button>
                <button onClick={onEdit} className="bg-blue-600 text-white px-4 py-2 rounded shadow-md"
                >
                    Edit Group
                </button>
            </div>
        </div>
    )
}

export default SchoolGroup;