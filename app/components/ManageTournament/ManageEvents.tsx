"use client";
import React, { useState, Suspense } from 'react';
import { useRouter } from 'next/router'; // Import useRouter
import EditIcon from '../../images/edit-246.png';
import DeleteIcon from '../../images/delete.png';
import Image from 'next/image';
const LazyEventInfo = React.lazy(() => import('./Info/EventInfo'));
const LazyAddEvent = React.lazy(() => import('./Add/AddEvent'));
import CreateTimeBlocks from '../create-tourney/create-time-blocks';

interface TournamentProps {
    tournament_id: number;
    group_id: number;
    isCurrent: boolean;
    division: string;
    NumOfTimeBlocks: number;
    name: string;
    date: Date;
    location: string; // Fixed to lowercase 'string'
    description: string; // Fixed to lowercase 'string' 
    onClose: () => void;
}

interface GroupContent {
    name: string;
    description: string;
    score: string;
    id: number;
}

const ManageEvents: React.FC<TournamentProps> = ({ name, division, date, location, description, isOpen, onClose }: TournamentProps) => {
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

    const [events, setEvents] = useState<GroupContent[]>([]);
    const [nextId, setNextId] = useState<number>(1);
    const [currentEventId, setCurrentEventId] = useState(0);
    const [isOpenEvent, setIsOpenEvent] = useState(false);
    const [dropdownIds, setDropdownIds] = useState({});
    const [showNextStep, setShowNextStep] = useState(false);

    const addEvent = (name: string, description: string, score: string) => {
        if (events.some(event => event.id === currentEventId)) {
            setEvents((prevEvents) =>
                prevEvents.map((event) =>
                    event.id === currentEventId ? { ...event, name, description, score } : event
                )
            );
        } else {
            setEvents([...events, { name, description, score, id: nextId }]);
            setNextId(nextId + 1);
        }
    };

    const createEvent = (id: number) => {
        setCurrentEventId(id);
        setIsOpenEvent(true);
    };

    const closeEvent = () => {
        setIsOpenEvent(false);
    };

    const openEvent = (index: number) => {
        const eventInfo = document.getElementById(`row-${index}`);
        eventInfo.classList.toggle('hidden');
    };

    const deleteEvent = (id: number) => {
        setEvents(events.filter(event => event.id !== id));
    };

    const toggleDropdown = (index: number) => {
        setDropdownIds(state => ({
            ...state, [index]: !state[index]
        }));
    };

    const handleNextStep = () => {
        setShowNextStep(true);
    };

    const publishTournament = async () => {
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
    };

    return (
        <div className="px-12 py-6 flex flex-col min-h-screen">
            {!showNextStep ? (
                <>
                    <button onClick={onClose} className="text-2xl font-bold" style={{ color: '#006330' }}>
                        {"< Back to create tournament"}
                    </button>
                    <div className='flex py-6 space-x-10 border-b border-gray-300'>
                        <h1 className="text-4xl font-bold">{name}</h1>
                        <h1 className="text-4xl font-bold">{date instanceof Date ? date.toLocaleDateString() : date}</h1>
                        <h1 className="text-4xl font-bold" style={{ color: '#006330' }}>
                            Division {division}
                        </h1>
                    </div>

                    <div className='flex justify-between py-6'>
                        <h2 className='text-3xl font-bold'>Events</h2>
                    </div>

                    <table className="w-full table-auto text-left">
                        <thead className="border-b border-gray-300">
                            <tr>
                                <th className="px-2"></th>
                                <th className="py-2 px-4">Event Name</th>
                                <th className="py-2 px-8">Division</th>
                                <th className="py-2 px-8">Scoring Algorithm</th>
                                <th className="px-4 py-2">Manage</th>
                            </tr>
                        </thead>
                        <tbody>
                            {events.map((row, index) => (
                                <React.Fragment key={row.id}>
                                    <tr className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} border-b`}>
                                        <td className="px-2" onClick={() => { openEvent(index); toggleDropdown(row.id) }}>
                                            {dropdownIds[row.id] ? '▲' : '▼'}
                                        </td>
                                        <td className="py-2 px-4">{row.name}</td>
                                        <td className="py-2 px-8">{division}</td>
                                        <td className="py-2 px-8">
                                            <button className="rounded-md px-2 py-2" style={{ backgroundColor: '#B7E394' }}>
                                                {row.score}
                                            </button>
                                        </td>
                                        <td className="px-4 py-2 justify-normal flex space-x-4">
                                            <button className="flex justify-center" onClick={() => createEvent(row.id)}>
                                                <Image src={EditIcon} alt="Edit" className="mx-auto w-10 h-10" />
                                            </button>
                                            <button className="flex justify-center" onClick={() => deleteEvent(row.id)}>
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

                    <Suspense fallback={<div>Loading Add Event</div>}>
                        <LazyAddEvent
                            isOpen={isOpenEvent}
                            onAdd={(name: string, description: string, score: string) => addEvent(name, description, score)}
                            onClose={closeEvent}
                        />
                    </Suspense>

                    {/* Footer with Add Event and Next buttons */}
                    <div id="footer-and-submit" className="bg-white relative w-full flex items-center justify-between mt-auto pb-5">
                        <div className="flex items-center ml-5">
                            <button onClick={() => createEvent(nextId)} className="flex items-center text-lg font-semibold text-green-800 rounded-full px-4 py-2 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
                                <span className="text-2xl mr-2">+</span>
                                Add Event
                            </button>
                        </div>

                        <div className="flex justify-end mr-5 pr-5">
                            <button
                                className="bg-green-800 text-white rounded-full px-6 py-2 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                                onClick={handleNextStep} // Change to handleNextStep
                            >
                                Next
                            </button>
                        </div>
                    </div>
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
