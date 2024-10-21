"use client";
import React, { useState, Suspense, useEffect } from 'react';
import { useRouter } from 'next/router'; // Import useRouter
import EditIcon from '../../images/edit-246.png';
import DeleteIcon from '../../images/delete.png';
import Image from 'next/image';
const LazyEventInfo = React.lazy(() => import('./Info/EventInfo'));
const LazyAddEvent = React.lazy(() => import('./Add/AddEvent'));
const LazyEditEvent = React.lazy(() => import('./Edit/EditEvent'));
import CreateTimeBlocks from '../create-tourney/create-time-blocks';
import axios from 'axios';

interface TournamentProps {
    tournament_id: number;
    onClose: () => void;
    isOpen: boolean; 
}

interface GroupContent {
    name: string;
    description: string;
    score: string;
    id: number;
}

const ManageEvents: React.FC<TournamentProps> = ({ tournament_id, isOpen, onClose }: TournamentProps) => {
    if (!isOpen) return null;

    // State to store tournament details
    const [tournamentDetails, setTournamentDetails] = useState({
        name: '',
        division: '',
        date: '', // Keep date as a string initially
        location: '',
        description: '',
        id: 1, // Example: starting ID
    });

    const [tID, setTID] = useState(tournament_id);
    const [events, setEvents] = useState([]);
    const [isAdmin, setIsAdmin] = useState(true);
    const [isEventSuperVisor, setIsEventSuperVisor] = useState(false);
    const [eventSuperVisorID, setEventSuperVisorID] = useState(null);
    const [groupId, setGroupId] = useState(null);
    const [noCurrentTournaments, setNoCurrentTournaments] = useState(false);
    const [tourneyId, setTourneyId] = useState();
    

    useEffect(() => { //fetches events when the page remounts
        fetchTourneyDetails();
        fetchEvents();
    }, [isAdmin, eventSuperVisorID, groupId, tourneyId, tID]);

    const fetchTourneyDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/get-tournament/${tID}`);
            const data = response.data;
      
            // Update state with the fetched tournament details
            setTournamentDetails({
              name: data.name,
              division: data.division,
              date: new Date(data.date).toISOString().split('T')[0], // Convert date to YYYY-MM-DD format
              location: data.location,
              description: data.description,
              id: data.tournament_id, // Assuming 'tournament_id' is the ID from the server response
            });
          } catch (error) {
            console.error("Error fetching tournament details:", error);
            alert("Failed to fetch tournament details.");
          }
    }

    const fetchEvents = async () => {
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

                // Make sure groupId is defined before making the API call
                if (!groupId) return;

                const currentTournamentResponse = await axios.get(`http://localhost:3000/get-current-tournaments/${groupId}`);
                const currentTournaments = currentTournamentResponse.data;

                let eventsResponse; 

                if (isAdmin) {
                    eventsResponse = await axios.get(`http://localhost:3000/get-events-by-tournament/${tID}`); 
                    setEvents(eventsResponse.data);
        
                } 
                    
                else {
                    setNoCurrentTournaments(true);
                }

                //const response = await axios.get('http://localhost:3000/get-events-all');
                //setEvents(response.data); // Assuming the API returns an array of events
        } catch (error) {
            console.error('Error fetching events:', error);
        }
        }

    
    const [nextId, setNextId] = useState<number>(1);
    const [currentEventId, setCurrentEventId] = useState(0);
    const [isOpenEvent, setIsOpenEvent] = useState(false);
    const [dropdownIds, setDropdownIds] = useState({});
    const [showNextStep, setShowNextStep] = useState(false);
    const [isOpenEditEvents, setIsOpenEditEvents] = useState(false);

    const addEvent = (name: string, description: string, score: string, tournamentId: number,) => {
        fetchEvents();
    };

    const createEvent = (id: number) => {
        setCurrentEventId(id);
        setIsOpenEvent(true);
    };

    const EditEvent = (id: number) => { 
        setCurrentEventId(id);
        setIsOpenEditEvents(true);

    }

    const closeEvent = () => {
        setIsOpenEvent(false);
        setIsOpenEditEvents(false);
    };

    const openEvent = (index: number) => {
        const eventInfo = document.getElementById(`row-${index}`);
        eventInfo.classList.toggle('hidden');
    };

    const deleteEvent = async (id: number) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this event?");
        
        if (!confirmDelete) {
            return; // If the user clicks "Cancel", don't proceed with deletion
        }
    
        try {
            await axios.delete(`http://localhost:3000/delete-event/${id}`); // Replace with actual delete endpoint
            fetchEvents(); // Re-fetch events after deletion
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    };

    const toggleDropdown = (index: number) => {
        setDropdownIds(state => ({
            ...state, [index]: !state[index]
        }));
    };

    const handleNextStep = () => {
        setShowNextStep(true);
    };

    const handleRemove = async () => {
        try {
            await axios.delete(`http://localhost:3000/delete-tournament/${tID}`); // Replace with actual delete endpoint
        } catch (error) {
            console.error('Error deleting event:', error);
        }

    }

    const handleBackButton = async () => {
        onClose();
        handleRemove(); 
    }

    /*const publishTournament = async () => {
        // Check if required fields are provided
        if (!name || !division) {
            alert('Please provide both name and division before publishing the tournament.');
            return;
        }

        const tournamentId = Math.floor(Math.random() * 10000);
        const groupId = 1; // Replace with actual logic for group ID if necessary

        const tournamentData = {
            tournament_id: tournamentId,
            group_id: groupId,
            isCurrent: true,
            division: division,
            NumOfTimeBlocks: events.length,
            name: name,
            date: date.toISOString(), // Use toISOString for better compatibility
            location: location,
            description: description
        };

        console.log('Publishing Tournament with Data:', JSON.stringify(tournamentData, null, 2));

        try {
            const response = await fetch('http://localhost:3000/add-tournament', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(tournamentData),
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                console.error('Failed to publish tournament:', errorMessage);
                throw new Error(`Failed to publish tournament: ${errorMessage}`);
            }

            alert('Tournament published successfully!');
            onClose();
        } catch (error) {
            console.error('Error:', error);
            alert('Error publishing tournament. Please try again.');
        }
    };*/

    return (
        <div className=" py-6 relative min-h-screen">
            {!showNextStep ? (
                <>
                    
                    <div className='flex py-6 px-12 space-x-10 border-b border-gray-300'>
                        <h1 className="text-4xl font-bold">{tournamentDetails.name}</h1>
                        <h1 className="text-4xl font-bold">
                        {tournamentDetails.date 
                            ? new Date(tournamentDetails.date).toLocaleDateString() 
                            : "Invalid date"}
                        </h1>
                        <h1 className="text-4xl font-bold" style={{ color: '#006330' }}>
                            Division {tournamentDetails.division}
                        </h1>
                    </div>
    
                    <div className='px-12 flex justify-between py-6'>
                        <h2 className='text-3xl font-bold'>Events</h2>
                    </div>
    
                    {noCurrentTournaments ? (
                        <div className="text-center text-lg font-semibold text-gray-500">
                            There are no current tournaments.
                        </div>
                    ) : (
                        <table className="w-full table-auto text-left">
                            <thead className="border-b border-gray-300">
                                <tr>
                                    <th className="px-2"></th>
                                    <th className="py-2 px-4">Event Name</th>
                                    <th className="py-2 px-8">      </th>
                                    <th className="py-2 px-8">Scoring Algorithm</th>
                                    <th className="px-4 py-2">Manage</th>
                                </tr>
                            </thead>
                            <tbody>
                                {events.map((row, index) => (
                                    <React.Fragment key={row.event_id}>
                                        <tr className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} border-b`}>
                                            <td className="px-2" onClick={() => { openEvent(index); toggleDropdown(row.event_id) }}>
                                                {dropdownIds[row.id] ? '▲' : '▼'}
                                            </td>
                                            <td className="py-2 px-4">{row.name}</td>
                                            <td className="py-2 px-8"></td>
                                            <td className="py-2 px-8">
                                                <button className="rounded-md px-2 py-2" style={{ backgroundColor: '#B7E394' }}>
                                                    {row.scoringAlg}
                                                </button>
                                            </td>
                                            <td className="px-4 py-2 justify-normal flex space-x-4">
                                                <button className="flex justify-center" onClick={() => EditEvent(row.event_id)}>
                                                    <Image src={EditIcon} alt="Edit" className="mx-auto w-10 h-10" />
                                                </button>
                                                <button className="flex justify-center" onClick={() => deleteEvent(row.event_id)}>
                                                    <Image src={DeleteIcon} alt="Delete" className="mx-auto w-10 h-10" />
                                                </button>
                                            </td>
                                        </tr>
                                        <tr id={`row-${index}`} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} border-b hidden`}>
                                            <td colSpan={5} className="p-4">
                                                <Suspense fallback={<div>Loading Events</div>}>
                                                    <LazyEventInfo name={row.name} description={row.description} id={row.id} />
                                                </Suspense>
                                            </td>
                                        </tr>
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>
                    )}
    
                    <Suspense fallback={<div>Loading Add Event</div>}>
                        <LazyAddEvent
                            isOpen={isOpenEvent}
                            onAdd={(name: string, description: string, score: string, tourneyId: number,) => addEvent(name, description, score, tID)}
                            onClose={closeEvent}
                            tournamentId={tID}
                        />
                    </Suspense>
    
                    <Suspense fallback={<div>Loading Edit Event</div>}>
                        <LazyEditEvent
                            isOpen={isOpenEditEvents}
                            eventId={currentEventId}
                            onUpdate={(name: string, description: string, score: string) => addEvent(name, description, score, tourneyId)}
                            onClose={closeEvent}
                        />
                    </Suspense>
    
                    {/* Footer with Add Event and Next buttons */}
                    {!noCurrentTournaments && (
                        <div id="create-tourney-footer" className="bg-white sticky bottom-0 left-0 w-full flex flex-col pb-2">
                        <hr className="w-full border-t-3 border-black mb-2" />
                        <div className="flex justify-between items-center ml-5 mr-5"> {/* Main flex container */}
                            <button onClick={() => createEvent(nextId)} className="flex items-center text-lg font-semibold text-green-800 rounded-full px-4 py-2 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
                                <span className="text-2xl mr-2">+</span>
                                Add Event
                            </button>
                            
                            <div className="flex space-x-2"> {/* Wrapper for Next and Back buttons */}
                                <button onClick={handleBackButton} className="bg-green-800 text-white rounded-full px-6 py-2 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
                                    {"< Back"}
                                </button>
                                <button
                                    className="bg-green-800 text-white rounded-full px-6 py-2 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                                    onClick={handleNextStep} // Change to handleNextStep
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                    )}
                </>
            ) : (
                <CreateTimeBlocks
                    name={tournamentDetails.name}
                    division={tournamentDetails.division}
                    date={new Date(tournamentDetails.date)}  // Ensure you're passing a Date object
                    location={tournamentDetails.location}
                    description={tournamentDetails.description}
                    id={tournamentDetails.id}
                    isOpen={showNextStep}
                    onClose={() => setShowNextStep(false)} />
            )}
        </div>
    );
    
}

export default ManageEvents;
