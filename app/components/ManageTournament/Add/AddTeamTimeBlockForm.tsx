"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DeleteIcon from '../../../images/delete.png';
import Image from 'next/image';

const AddTeamTimeBlockForm = (props) => {
    const [teams, setTeams] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [selectedTimeBlock, setSelectedTimeBlock] = useState(null);
    const [selectedTeams, setSelectedTeams] = useState([]);
    const [showTeams, setShowTeams] = useState(false);
    const [error, setError] = useState("");
    const [events, setEvents] = useState([]);
    const [timeBlocks, setTimeBlocks] = useState([]);
    const [searchTerm, setSearchTerm] = useState(""); // State for search term

    // Fetch events and teams from API
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/get-events-by-tournament/${props.id}`);
                setEvents(response.data);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };
        fetchEvents();
    }, []);

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await axios.get('http://localhost:3000/get-teams-by-tournament/1');
                setTeams(response.data);
            } catch (error) {
                console.error('Error fetching teams:', error);
            }
        };
        fetchTeams();
    }, []);

    // Fetch time blocks when an event is selected
    const fetchTimeBlocks = async (eventId) => {
        setTimeBlocks([]); // Clear previous time blocks
        try {
            const response = await axios.get(`http://localhost:3000/get-timeblock-by-event/${eventId}`);
            if (response.data.length > 0) {
                setTimeBlocks(response.data);
            }
        } catch (error) {
            console.error('Error fetching time blocks:', error);
            setTimeBlocks([]); // Reset to empty if an error occurs
        }
    };

    const handleEventSelect = (eventId) => {
        setSelectedEvent(eventId);
        fetchTimeBlocks(eventId); // Fetch time blocks based on the selected event
    };

    const handleTeamSelect = (team_id) => {
        if (selectedTeams.includes(team_id)) {
            setSelectedTeams(selectedTeams.filter(id => id !== team_id));
        } else {
            setSelectedTeams([...selectedTeams, team_id]);
        }
    };

    const handleRemoveTeam = (team_id) => {
        setSelectedTeams(selectedTeams.filter(id => id !== team_id));
    };

    const handleSubmit = async () => {
        if (!selectedEvent) {
            setError("Please select an event.");
            return;
        }
        if (!selectedTimeBlock) {
            setError("Please select a time block.");
            return;
        }
        if (selectedTeams.length === 0) {
            setError("Please select at least one team.");
            return;
        }

        setError(""); // Clear error if all fields are valid

        try {
            await Promise.all(selectedTeams.map(async (team_id) => {
                const payload = {
                    timeBlock_id: selectedTimeBlock,
                    team_id: team_id,
                    event_id: selectedEvent,
                    attend: false,
                    comment: "",
                    tier: 1,
                    score: null
                };

                const response = await axios.post('http://localhost:3000/add-team-timeblock', payload);
                console.log('Team added:', response.data);
            }));

            setSelectedTeams([]);
            setSelectedEvent(null);
            setSelectedTimeBlock(null);
            setShowTeams(false);
            alert("Teams added successfully!");
        } catch (error) {
            console.error('Error adding teams:', error);
            setError("An error occurred while adding teams. Please try again.");
        }
    };

    // Filter teams based on the search term
    const filteredTeams = teams.filter(team => 
        team.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-4 bg-white border-2 border-gray-300 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Add Teams</h2>
            
            <div className="mb-4">
                <label className="block mb-2">Event</label>
                <select 
                    value={selectedEvent} 
                    onChange={(e) => handleEventSelect(Number(e.target.value))} 
                    className="w-full p-2 border rounded-md"
                >
                    <option value="">Select an Event</option>
                    {events.map(event => (
                        <option key={event.event_id} value={event.event_id}>{event.name}</option>
                    ))}
                </select>
            </div>

            <div className="mb-4">
                <label className="block mb-2">Time Block</label>
                <select 
                    value={selectedTimeBlock} 
                    onChange={(e) => setSelectedTimeBlock(Number(e.target.value))} 
                    className="w-full p-2 border rounded-md"
                >
                    <option value="">Select a Time Block</option>
                    {timeBlocks.map(block => (
                        <option key={block.TimeBlock_ID} value={block.TimeBlock_ID}>
                            {new Date(block.TimeBegin).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(block.TimeEnd).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mb-4">
                <button 
                    className="w-full p-2 border rounded-md bg-gray-200 hover:bg-gray-300" 
                    onClick={() => setShowTeams(!showTeams)}
                >
                    {showTeams ? 'Hide Teams' : 'Select Teams'}
                </button>
                {showTeams && (
                    <div className="mt-2">
                        <div className="mb-4">
                            <div className="relative">
                                <input 
                                    type="text" 
                                    placeholder="Search Teams..." 
                                    value={searchTerm} 
                                    onChange={(e) => setSearchTerm(e.target.value)} 
                                    className="w-full p-2 border rounded-md pl-10" // Add padding to the left for the icon
                                />
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    {/* Search Icon (SVG) */}
                                    <svg 
                                        className="w-4 h-4 text-gray-500" 
                                        fill="none" 
                                        stroke="currentColor" 
                                        viewBox="0 0 24 24" 
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path 
                                            strokeLinecap="round" 
                                            strokeLinejoin="round" 
                                            strokeWidth={2} 
                                            d="M11 4a7 7 0 100 14 7 7 0 000-14zM21 21l-4.35-4.35" 
                                        />
                                    </svg>
                                </span>
                            </div>
                        </div>
                        <div className="max-h-72 overflow-y-auto border border-gray-300 rounded-md p-2">
                            {filteredTeams.map(team => (
                                <div key={team.team_id} className="flex items-center mb-2">
                                    <input 
                                        type="checkbox" 
                                        id={`team-${team.team_id}`} 
                                        checked={selectedTeams.includes(team.team_id)} 
                                        onChange={() => handleTeamSelect(team.team_id)}
                                        className="mr-2"
                                    />
                                    <label htmlFor={`team-${team.team_id}`} className="cursor-pointer">{team.name}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <h3 className="text-lg font-semibold mb-2">Currently Selected</h3>
            <div className="mb-4">
                {selectedTeams.map(team_id => {
                    const team = teams.find(t => t.team_id === team_id);
                    return (
                        <div key={team_id} className="flex justify-between items-center p-2 bg-white border rounded-md mb-2">
                            <span>{team.name} - {team.unique_id}</span>
                            <button 
                                className="text-red-500 hover:text-red-700"
                                onClick={() => handleRemoveTeam(team_id)}
                            >
                                <Image src={DeleteIcon} alt="Delete" className="mx-auto w-10 h-10" />
                            </button>
                        </div>
                    );
                })}
            </div>

            {error && <p className="text-red-500 mb-4">{error}</p>}
            <button 
                onClick={handleSubmit} 
                className="bg-green-800 border border-green-800 text-white rounded-full px-6 py-2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            >
                Add
            </button>
        </div>
    );
};

export default AddTeamTimeBlockForm;
