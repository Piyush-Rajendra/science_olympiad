"use client";
import React, { useEffect, useState } from 'react';
import ManageEvents from '../ManageTournament/ManageEvents';
import axios from 'axios';

const CreateTourney = () => {
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

    /*const handleNextStep = () => {
        handleFormSubmit();
        setShowNextStep(true);
    }; */

    useEffect(() => {
        try {
            const holder = localStorage.getItem('isAdmin');
            if (holder) {
                setIsAdmin(true);
                setIsEventSuperVisor(false);
                const groupIdFromStorage = localStorage.getItem('group_id');
                setGroupId(groupIdFromStorage);
                //alert(groupId)
            } else {
                setIsAdmin(false);
                setEventSuperVisorID(localStorage.getItem('es_id'));
                const groupIdFromStorage = localStorage.getItem('group_id');
                setGroupId(groupIdFromStorage);
                //alert(groupId)
            }
        }
        catch (error) {
            console.error("Error fetching data:", error);
        }


    }, []);

    // Convert date from string to Date object when necessary
    const handleFormSubmit = async () => {
        // Check if any required field is blank
        const { name, division, location, description, date } = tournamentDetails;
    
        if (!name || !location || !description || !date) {
            alert("Please fill in all the fields before trying to create a tournament.");
            return; // Stop execution if any field is blank
        }
    
        try {
            // Convert the date to a proper format
            const tourneyDate = new Date(date).toISOString().split('T')[0]; // Convert string to date and format YYYY-MM-DD
    
            const tournamentData = {
                name: name,
                division: division || 'B',
                group_id: groupId,                // Keep group id as 1
                NumOfTimeBlocks: 0,         // Set number of time blocks to 0
                location: location,
                description: description,
                isCurrent: false,           // Set isCurrent to false
                date: tourneyDate           // Pass formatted date string
            };
    
            // Make the POST request to the API endpoint
            const response = await axios.post('http://localhost:3000/add-tournament', tournamentData);
    
            if (response.data && response.data.id) {
                // Save the new tournament ID from the response
                setNewTournamentId(response.data.id);
            }
    
            //alert("Tournament Added!");
            setShowNextStep(true);
        } catch (error) {
            alert("There was an error creating your tournament.");
        }
    };
    

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setTournamentDetails((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div id="create-tourney-page" className="bg-white min-h-screen relative">
            <div id="create-tourney-header">
                <h1 className="text-3xl pl-7 pt-4 pb-5">Create Tournament</h1>
            </div>
            <hr className="border-t-3 border-black" />

            {!showNextStep ? (
                <>
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

                    <div id="create-tourney-date">
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

                    {/* Footer with Next button */}
                    <div id="create-tourney-footer" className="bg-white sticky bottom-0 left-0 w-full flex flex-col pb-2">
                        <hr className="w-full border-t-3 border-black mb-2" />
                        <div className="flex w-full justify-end items-center mr-5 pr-5">
                            <h4 className="text-gray-500 pt-2 mr-4">Next Step: Create Your Events</h4>
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
                <ManageEvents
                    tournament_id={newTournamentId}
                    isOpen={showNextStep}
                    onClose={() => setShowNextStep(false)}
                />
            )}
        </div>
    );
};

export default CreateTourney;
