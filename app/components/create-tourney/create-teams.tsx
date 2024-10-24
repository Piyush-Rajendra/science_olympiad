"use client";
import React, { useState, useEffect } from 'react';
import TeamList from './team-list'
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';

const EditSchoolModal = ({ isOpen, onTheClose, school, handleUpdateSchool }) => {
    const [name, setName] = useState(school.name);
    const [flight, setFlight] = useState(school.flight);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3000/edit-school/${school.ID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ school_group_id: school.school_group_id, name: name, flight: flight, tournament_id: school.tournament_id }),
            });

            if (!response.ok) {
                throw new Error('Failed to update the school');
            }

            // Call onUpdate to refresh local state
            handleUpdateSchool({ ...school, name, flight });
            onTheClose(); // Close the modal after successful update
        } catch (error) {
            console.error('Error updating school:', error);
        }
    };

    return (
        isOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"> {/* Backdrop */}
                <div className="bg-white rounded-lg shadow-lg p-6 w-96"> {/* Modal content box */}
                    <h2 className="text-xl font-bold mb-4">Edit School</h2>
                    <form onSubmit={handleSubmit}>
                        <label className="block mb-2">
                            School Name:
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="mt-1 p-2 border border-gray-300 rounded w-full"
                            />
                        </label>
                        <label className="block mb-4">
                            Flight:
                            <select
                                value={flight}
                                onChange={(e) => setFlight(e.target.value)}
                                required
                                className="mt-1 p-2 border border-gray-300 rounded w-full"
                            >
                                <option value="A">Flight A</option>
                                <option value="B">Flight B</option>
                            </select>
                        </label>
                        <div className="flex justify-end space-x-2">
                            <button type="button" onClick={onTheClose} className="bg-gray-300 rounded px-4 py-2">Cancel</button>
                            <button type="submit" className="bg-green-800 text-white rounded px-4 py-2">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    );
};

const AddSchoolModal = ({ id, isOpen, onTheClose, handleAddSchools }) => {

    // Initial state for schools with one default row
    const [schools, setSchools] = useState([{ name: '', flight: 'A' }]);

    const handleInputChange = (index, field, value) => {
        const updatedSchools = [...schools];
        updatedSchools[index][field] = value;
        setSchools(updatedSchools);
    };

    const handleAddSchool = () => {
        // Add a new school row
        setSchools([...schools, { name: '', flight: 'A' }]);
    };

    const handleClearRow = (index) => {
        // Remove the school row
        const updatedSchools = schools.filter((_, i) => i !== index);
        setSchools(updatedSchools);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const responses = await Promise.all(schools.map(async (school) => {
                return fetch(`http://localhost:3000/add-school`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        school_group_id: localStorage.getItem('group_id'), // Assuming this is passed down
                        name: school.name,
                        flight: school.flight,
                        tournament_id: id, // Assuming this is passed down
                    }),
                });
            }));

            // Check if all responses are ok
            const allOk = responses.every(response => response.ok);

            if (!allOk) {
                alert('Failed to add one or more schools');
                onTheClose();
                return; // Return early to avoid further execution if any request failed
            }

            // Call onUpdate to refresh local state
            handleAddSchools(schools);
            onTheClose();
        } catch (error) {
            console.error('Error adding schools:', error);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"> {/* Backdrop */}
            <div className="bg-white rounded-lg shadow-lg p-6 w-1/2"> {/* Modal content box - increased width */}
                <h2 className="mb-4 flex justify-between items-center">
                    <span className='font-bold text-xl'>Add Schools</span>
                    <button
                        type="button"
                        onClick={handleAddSchool}
                        className="border border-green-700 hover:bg-green-800 hover:bg-opacity-20 text-green-700 rounded-full px-3 py-1 bg-transparent transition duration-200"
                    >
                        Add School
                    </button>

                </h2>
                <form onSubmit={handleSubmit}>
                    {schools.map((school, index) => (
                        <div key={index} className="flex items-center mb-4"> {/* Row for each school */}
                            <input
                                type="text"
                                value={school.name}
                                onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                                required
                                placeholder="School Name" // Placeholder text
                                className="mt-1 p-2 border border-gray-300 rounded w-1/2 mr-2"
                            />
                            <select
                                value={school.flight}
                                onChange={(e) => handleInputChange(index, 'flight', e.target.value)}
                                required
                                className="mt-1 p-2 border border-gray-300 rounded w-1/3 mr-2"
                            >
                                <option value="" disabled>Select Flight</option> {/* Placeholder option */}
                                <option value="A">Flight A</option>
                                <option value="B">Flight B</option>
                            </select>
                            <button
                                type="button"
                                onClick={() => handleClearRow(index)}
                                className="flex items-center p-1 text-white rounded" // Increased padding and background color
                            >
                                <img src="/images/trash.png" alt="delete" className="w-6 h-6" /> {/* Increased icon size */}
                            </button>
                        </div>
                    ))}
                    <div className="flex justify-end space-x-4 mt-8">
                        <button type="button" onClick={onTheClose} className="bg-gray-300 rounded-full px-4 py-2">Cancel</button>
                        <button type="submit" className="bg-green-800 text-white rounded-full px-4 py-2">Save</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

const AddTeamModal = ({ id, isOpen, onTheClose, schoolID }) => {

    // Initial state for schools with one default row
    const [teams, setTeams] = useState([{ name: '', unique_id: '' }]);

    const handleInputChange = (index, field, value) => {
        const updatedTeams = [...teams];
        updatedTeams[index][field] = value;
        setTeams(updatedTeams);
    };

    const handleAddTeams = () => {
        // Add a new school row
        setTeams([...teams, { name: '', unique_id: '' }]);
    };

    const handleClearRow = (index) => {
        // Remove the school row
        const updatedTeams = teams.filter((_, i) => i !== index);
        setTeams(updatedTeams);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const responses = await Promise.all(teams.map(async (team) => {
                return fetch(`http://localhost:3000/add-team`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        school_id: schoolID, // Assuming this is passed down
                        name: team.name,
                        unique_id: team.unique_id,
                        tournament_id: id, // Assuming this is passed down
                    }),
                });
            }));

            // Check if all responses are ok
            const allOk = responses.every(response => response.ok);

            if (!allOk) {
                alert('Failed to add one or more schools');
                onTheClose();
                return; // Return early to avoid further execution if any request failed
            }

            // Call onUpdate to refresh local state
            onTheClose();
        } catch (error) {
            alert('Error adding teams')
            return;
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"> {/* Backdrop */}
            <div className="bg-white rounded-lg shadow-lg p-6 w-1/2"> {/* Modal content box - increased width */}
                <h2 className="mb-4 flex justify-between items-center">
                    <span className='font-bold text-xl'>Add Schools</span>
                    <button
                        type="button"
                        onClick={handleAddTeams}
                        className="border border-green-700 hover:bg-green-800 hover:bg-opacity-20 text-green-700 rounded-full px-3 py-1 bg-transparent transition duration-200"
                    >
                        Add Team
                    </button>

                </h2>
                <form onSubmit={handleSubmit}>
                    {teams.map((team, index) => (
                        <div key={index} className="flex items-center mb-4"> {/* Row for each school */}
                            <input
                                type="text"
                                value={team.name}
                                onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                                required
                                placeholder="Team Name" // Placeholder text
                                className="mt-1 p-2 border border-gray-300 rounded w-1/2 mr-2"
                            />
                            <input
                                type="text"
                                value={team.unique_id}
                                onChange={(e) => handleInputChange(index, 'unique_id', e.target.value)}
                                required
                                placeholder="Team ID" // Placeholder text
                                className="mt-1 p-2 border border-gray-300 rounded w-1/2 mr-2"
                            />
                            <button
                                type="button"
                                onClick={() => handleClearRow(index)}
                                className="flex items-center p-1 text-white rounded" // Increased padding and background color
                            >
                                <img src="/images/trash.png" alt="delete" className="w-6 h-6" /> {/* Increased icon size */}
                            </button>
                        </div>
                    ))}
                    <div className="flex justify-end space-x-4 mt-8">
                        <button type="button" onClick={onTheClose} className="bg-gray-300 rounded-full px-4 py-2">Cancel</button>
                        <button type="submit" className="bg-green-800 text-white rounded-full px-4 py-2">Save</button>
                    </div>
                </form>
            </div>
        </div>
    )
}


const CreateTeams = ({ name, division, date, onClose, id }) => {
    const [schools, setSchools] = useState([]);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [selectedSchool, setSelectedSchool] = useState(null);
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [isAddTeamModalOpen, setAddTeamModalOpen] = useState(false);
    const [ID, setID] = useState(null);

    const [expandedSchoolIndex, setExpandedSchoolIndex] = useState(null); // State to track which school is expanded

    const toggleSchoolTeams = (index) => {
        setExpandedSchoolIndex(expandedSchoolIndex === index ? null : index); // Toggle the expanded index
    };
    // Fetch schools list from the endpoint
    useEffect(() => {
        const fetchSchools = async () => {
            try {
                const response = await fetch(`http://localhost:3000/get-schools-by-tournament/${id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setSchools(data);
            } catch (error) {
                console.error('Error fetching schools:', error);
            }
        };

        fetchSchools();
    }, [schools, isAddTeamModalOpen]); // Empty dependency array to run once on mount

    const handleNextStep = async (id) => {
        return;
    };

    const handleEditSchool = async (school) => {
        setSelectedSchool(school);
        setEditModalOpen(true);
    }

    const handleAddSchool = async () => {
        setAddModalOpen(true);
    }

    const handleUpdateSchool = (updatedSchool) => {
        setSchools((prevSchools) =>
            prevSchools.map((school) => (school.id === updatedSchool.id ? updatedSchool : school))
        );
    };

    const handleDeleteSchool = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/delete-school/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                alert('Failed to delete the school');
                return;
            }

            // Remove the school from the local state
            setSchools((prevSchools) => prevSchools.filter((school) => school.id !== id));
        } catch (error) {
            alert('Error deleting school');
        }
    };




    const handleAddTeam = async (id) => {
        setID(id)
        setAddTeamModalOpen(true);

        return;
    }

    return (
        <div className="flex flex-col min-h-screen">
            {/* Header */}
            <div className="px-12 py-6">
                <div className="flex space-x-10 border-b border-gray-300">
                    <h1 className="text-4xl font-bold">{name}</h1>
                    <h1 className="text-4xl font-bold">{date instanceof Date ? date.toLocaleDateString() : date}</h1>
                    <h1 className="text-4xl font-bold" style={{ color: '#006330' }}>
                        Division {division}
                    </h1>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-grow pt-5 pr-10"> {/* Add flex-grow here */}
                <div className="pt-5 pr-10">
                    <div className="pl-10 pt-5">
                        {/* School List Headers */}
                        <div className="grid grid-cols-3 p-2 border-b border-gray-300 text-gray-500">
                            <div className="ml-10">School Name</div>
                            <div className="">Flight</div>
                            <div className="ml-1">Manage</div>
                        </div>

                        {/* School List */}
                        {schools.map((school, index) => (
                            <div
                                key={index}
                                className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} border-b border-gray-300`} // Alternating background colors
                            >
                                <div className="grid grid-cols-3 items-center p-4"> {/* Consistent grid layout with padding */}
                                    {/* School Name Column */}
                                    <div className="flex items-center space-x-4"> {/* Added ml-10 for consistent spacing */}
                                        <button onClick={() => toggleSchoolTeams(index)} className="ml-2">
                                            {expandedSchoolIndex === index ? <FaChevronUp /> : <FaChevronDown />} {/* Chevron dropdown indicator */}
                                        </button>
                                        <span>{school.name}</span>
                                    </div>
                                    {/* Flight Column */}
                                    <div className="">{school.flight}</div> {/* ml-11 for alignment */}
                                    {/* Manage Column */}
                                    <div className="flex space-x-3"> {/* Container with space between buttons */}
                                        <button onClick={() => handleAddTeam(school.ID)}> {/* Button for adding */}
                                            <img src="/images/plus-circle_dark.png" alt="Add" className="w-8 h-8" /> {/* Increased size */}
                                        </button>
                                        <button onClick={() => handleEditSchool(school)}> {/* Button for editing */}
                                            <img src="/images/note-pencil.png" alt="Edit" className="w-8 h-8" /> {/* Increased size */}
                                        </button>
                                        <button onClick={() => handleDeleteSchool(school.ID)}> {/* Button for deleting */}
                                            <img src="/images/trash.png" alt="Delete" className="w-8 h-8" /> {/* Increased size */}
                                        </button>
                                    </div>
                                </div>

                                {/* Teams Dropdown */}
                                {expandedSchoolIndex === index &&

                                    <div className="pl-10 pt-5">
                                        {/* Event Header */}
                                        <div className="grid grid-cols-3 p-2 border-b border-gray-300 bg-white text-gray-500"> {/* Removed font-bold */}
                                            <div className="ml-10">Team Name</div>
                                            <div>Team ID</div>
                                            <div className='ml-1'>Manage</div>
                                        </div>
                                        <TeamList index={index} id={school.ID} />
                                    </div>


                                } {/* Use the new TeamList component */}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {isEditModalOpen &&
                <EditSchoolModal
                    isOpen={isEditModalOpen}
                    onTheClose={() => setEditModalOpen(false)}
                    school={selectedSchool}
                    handleUpdateSchool={handleUpdateSchool}
                />
            }


            {isAddModalOpen &&
                <AddSchoolModal
                    id={id}
                    isOpen={isAddModalOpen}
                    onTheClose={() => setAddModalOpen(false)}
                    handleAddSchools={handleUpdateSchool} />
            }

            {isAddTeamModalOpen &&
                <AddTeamModal
                    id={id}
                    isOpen={isAddTeamModalOpen}
                    onTheClose={() => setAddTeamModalOpen(false)}
                    schoolID={ID} />
            }

            {/* Footer: Buttons */}
            <div className="bg-gray-50 flex justify-between items-center px-12 py-4 border-t border-gray-300">
                <div className="flex items-center"> {/* Use flex for vertical alignment */}
                    <button onClick={handleAddSchool} className="flex items-center text-green-800 rounded-full px-6 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
                        <span className="text-2xl">+</span> {/* Adjust the size as needed */}
                        <span className="ml-2">Add School</span> {/* Optional margin for spacing */}
                    </button>

                </div>

                <div className="flex space-x-2">
                    <h4 className="text-gray-500 pt-2">Next Step: Add Schools</h4>
                    <button
                        className="bg-white border border-green-800 text-green-800 rounded-full px-6 py-2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                        onClick={onClose}
                    >
                        Back
                    </button>
                    <button
                        className="bg-green-800 text-white rounded-full px-6 py-2 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>

        </div>
    );
};

export default CreateTeams;
