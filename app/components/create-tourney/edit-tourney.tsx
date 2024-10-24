"use client";
import React, { useEffect, useState } from 'react';
import ManageEvents from '../ManageTournament/ManageEvents';
import axios from 'axios';
import TournamentSum from '../ManageTournament/TournamentSum';

const EditTourney = (props) => {
    const [showNextStep, setShowNextStep] = useState(false);
    const [newTournamentId, setNewTournamentId] = useState();
    const [isAdmin, setIsAdmin] = useState(true);
    const [isEventSuperVisor, setIsEventSuperVisor] = useState(false);
    const [eventSuperVisorID, setEventSuperVisorID] = useState(null);
    const [groupId, setGroupId] = useState(null);

    // State to store tournament details
    const [tournamentDetails, setTournamentDetails] = useState({
        name: '',
        division: '',
        date: '', // Keep date as a string initially
        location: '', // Single location field
        description: '',
        id: 1, // Example: starting ID
    });

    useEffect(() => {
        try {
            const holder = localStorage.getItem('isAdmin');
            if (holder) {
                const groupIdFromStorage = localStorage.getItem('group_id');
                setGroupId(groupIdFromStorage);
            } 
        }
        catch (error) {
            console.error("Error fetching data:", error);
        }


    }, []);

    // Fetch the tournament details when the component mounts
    useEffect(() => {
        const fetchTournamentDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/get-tournament/${props.id}`);
                if (response.data) {
                    const formattedDate = new Date(response.data.date).toISOString().split('T')[0]; // Convert to YYYY-MM-DD
                    setTournamentDetails({
                        name: response.data.name || '',
                        division: response.data.division || 'B',
                        date: formattedDate || '', // Set the converted date
                        location: response.data.location || '',
                        description: response.data.description || '',
                        id: response.data.id || 1,
                    });
                }
            } catch (error) {
                console.error('Error fetching tournament details:', error);
            }
        };
    
        fetchTournamentDetails();
    }, [props.id]);

    // Convert date from string to Date object when necessary
    const handleFormSubmit = async () => {
        const { name, division, location, description, date } = tournamentDetails;
    
        if (!name || !location || !description || !date) {
            alert("Please fill in all the fields before submitting.");
            return;
        }
    
        try {
            // Convert the date to ISO string format (if necessary)
            const tourneyDate = new Date(date).toISOString().split('T')[0]; // Only take the date part (YYYY-MM-DD)
    
            const tournamentData = {
                name,
                division: division || 'B',
                group_id: groupId,
                NumOfTimeBlocks: 0,
                location,
                description,
                isCurrent: true,
                date: tourneyDate, // Use the formatted date
            };
    
            const response = await axios.put(`http://localhost:3000/edit-tournament/${props.id}`, tournamentData);
    
            if (response.data && response.data.id) {
                setNewTournamentId(response.data.id);
            }
    
            setShowNextStep(true);
        } catch (error) {
            console.error("There was an error editing the tournament:", error);
            alert("There was an error editing the tournament.");
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setTournamentDetails((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div id="edit-tourney-page" className="bg-white min-h-screen relative">
            {!showNextStep ? (
                <>
            <div id="edit-tourney-header">
                <h1 className="text-3xl pl-7 pt-4 pb-5">Edit Tournament</h1>
            </div>
            <hr className="border-t-3 border-black" />

            
                    <div id="name-and-division" className="flex space-x-4">
                        <div id="name">
                            <h2 className="pl-7 pt-3">Name</h2>
                            <input
                                name="name"
                                value={tournamentDetails.name}
                                onChange={handleInputChange}
                                className="ml-7 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                placeholder="Tournament Name"
                            />
                        </div>
                        <div id="division">
                            <h2 className="pl-7 pt-3">Division</h2>
                            <select
                                name="division"
                                value={tournamentDetails.division}
                                onChange={handleInputChange}
                                className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 pr-8 ml-6 rounded leading-tight focus:outline-none focus:shadow-outline"
                            >
                                <option value="B">B</option>
                                <option value="C">C</option>
                            </select>
                        </div>
                    </div>

                    <div id="description">
                        <h2 className="pl-7 pt-4">Description</h2>
                        <textarea
                            name="description"
                            value={tournamentDetails.description}
                            onChange={handleInputChange}
                            className="ml-7 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32 max-w-xl"
                            placeholder="Tournament Description"
                        ></textarea>
                    </div>

                    <div id="edit-tourney-date">
                        <h2 className="pl-7 pt-4">Date</h2>
                        <input
                            type="date"
                            name="date"
                            value={tournamentDetails.date}
                            onChange={handleInputChange}
                            className="ml-7 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>

                    <div id="location">
                        <h2 className="pl-7 pt-4">Location</h2>
                        <input
                            className="ml-7 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline max-w-md"
                            type="text"
                            placeholder="Enter Location"
                            name="location"
                            value={tournamentDetails.location}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='pb-12'></div>

                    <div id="edit-tourney-footer" className="bg-white sticky bottom-0 left-0 w-full flex flex-col pb-2">
                        <hr className="w-full border-t-3 border-black mb-2" />
                        <div className="flex w-full justify-end items-center mr-5 pr-5">
                            <h4 className="text-gray-500 pt-2 mr-4">Next Step: Edit Your Events</h4>
                            <button
                                className="bg-white border border-green-800 text-green-800 rounded-full px-6 py-2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                                onClick={handleFormSubmit}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </>
            ) : (
                <TournamentSum isOpen={true} editTourn={() => {}} editEvent={() => {}} onCreateTournament={() => {}}/>
            )}
        </div>
    );
};

export default EditTourney;
