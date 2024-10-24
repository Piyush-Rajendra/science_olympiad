"use client";
import React, { useState, useEffect } from 'react';

const EditTeamModal = ({ isOpen, onTheClose, team, handleUpdateTeam }) => {
    const [name, setName] = useState(team.name);
    const [unique_id, setUnique_id] = useState(team.unique_id);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3000/edit-team/${team.team_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ school_id: team.school_id, name: name, unique_id: unique_id, tournament_id: team.tournament_id }),
            });

            if (!response.ok) {
                alert('Failed to update the Team');
                return;
            }

            // Call onUpdate to refresh local state
            handleUpdateTeam({ ...team, name, unique_id });
            onTheClose(); // Close the modal after successful update
        } catch (error) {
            alert('Error updating team');
        }
    };

    return (
        isOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"> {/* Backdrop */}
                <div className="bg-white rounded-lg shadow-lg p-6 w-96"> {/* Modal content box */}
                    <h2 className="text-xl font-bold mb-4">Edit Team</h2>
                    <form onSubmit={handleSubmit}>
                        <label className="block mb-2">
                            Tean Name:
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="mt-1 p-2 border border-gray-300 rounded w-full"
                            />
                        </label>
                        <label className="block mb-2">
                            Tean ID:
                            <input
                                type="text"
                                value={unique_id}
                                onChange={(e) => setUnique_id(e.target.value)}
                                required
                                className="mt-1 p-2 border border-gray-300 rounded w-full"
                            />
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

const TeamList = ({ id, index }) => {
    const [listTeams, setListTeams] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState([]);
    const [EditModal, setEditModalOpen] = useState(false);

    const getTeams = async () => {
        try {
            const response = await fetch(`http://localhost:3000/get-teams-by-school/${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch teams');
            }
            const data = await response.json();
            setListTeams(data); // Set the fetched teams to state
        } catch (error) {
            return;
        }
    };

    useEffect(() => {
        getTeams(); // Call getTeams if id is provided\
    }, [id, listTeams]); // Dependency array to call getTeams when id changes

    const handleDeleteTeam = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/delete-team/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                alert('Failed to delete the team');
                return;
            }

            // Remove the school from the local state
            setListTeams((prevTeams) => prevTeams.filter((team) => team.team_id !== id));
            getTeams();
        } catch (error) {
            alert('Failed to delete the team')
        }
    };

    const handleEditTeam = async (team) => {
        setSelectedTeam(team);
        setEditModalOpen(true);
    }

    const handleUpdateTeam = (updatedTeam) => {
        setListTeams((prevTeams) =>
            prevTeams.map((team) => (team.team_id === updatedTeam.team_id ? updatedTeam : team))
        );
        getTeams();
    };


    return (
        <div className="pb-4">
        {/* Wrap each team entry in a div for alternating background colors */}
        {listTeams.map((team, teamIndex) => (
            <div
                key={teamIndex}
                className={`${teamIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'} border-b border-gray-300`} // Alternating background colors
            >
                <div className={`grid grid-cols-3 items-center p-4`}> {/* Consistent grid layout with padding */}
                    {/* Team Name Column */}
                    <div className="flex items-center space-x-4 ml-12">
                        <span>{team.name}</span>
                    </div>
                    {/* Team ID Column */}
                    <div>
                        <span>{team.unique_id}</span>
                    </div>
                    {/* Modify Column */}
                    <div className="flex items-center space-x-3"> {/* Container for modify actions */}
                        <button onClick={() => handleEditTeam(team)}> {/* Replace with your modify logic */}
                            <img src="/images/note-pencil.png" alt="Modify" className="w-8 h-8" />
                        </button>
                        <button onClick={() => handleDeleteTeam(team.team_id)}> {/* Replace with your modify logic */}
                            <img src="/images/trash.png" alt="Modify" className="w-8 h-8" />
                        </button>
                    </div>
                </div>
            </div>
        ))}
        {EditModal &&
                <EditTeamModal
                    isOpen={EditModal}
                    onTheClose={() => setEditModalOpen(false)}
                    team={selectedTeam}
                    handleUpdateTeam={handleUpdateTeam}
                />
            }
    </div>
    );
};

export default TeamList;