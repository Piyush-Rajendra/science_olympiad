"use client";
import React, { useState, Suspense } from 'react';
import EditIcon from '../../images/edit-246.png';
import DeleteIcon from '../../images/delete.png';
import Image from 'next/image';
const LazyEventInfo = React.lazy(() => import('../ManageTournament/Info/EventInfo'));
const LazyAddEvent = React.lazy(() => import('../ManageTournament/Add/AddEvent'));
import CreateTourneyLanding from '../create-tourney/create-tourney-landing';

interface TournamentProps {
    tournament_id: number;
    group_id: number;
    isCurrent: boolean;
    division: string;
    NumOfTimeBlocks: number;
    name: string;
    date: Date;
    location: string;
    description: string;
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

    const [events, setEvents] = useState<GroupContent[]>([]);
    const [nextId, setNextId] = useState<number>(1);
    const [currentEventId, setCurrentEventId] = useState(0);
    const [isOpenEvent, setIsOpenEvent] = useState(false);
    const [dropdownIds, setDropdownIds] = useState({});
    const [showNextStep, setShowNextStep] = useState(false);

    // State for new event fields
    const [eventName, setEventName] = useState('');
    const [timeBlockDuration, setTimeBlockDuration] = useState('');
    const [numOfTimeBlocks, setNumOfTimeBlocks] = useState('');
    const [eventLocation, setEventLocation] = useState('');
    const [startTime, setStartTime] = useState('');
    const [everyMinutes, setEveryMinutes] = useState('');
    const [maxSpots, setMaxSpots] = useState('');
    const [roomNumber, setRoomNumber] = useState('');

    const addEvent = () => {
        const newEvent = {
            name: eventName,
            description: `Duration: ${timeBlockDuration}, Blocks: ${numOfTimeBlocks}, Location: ${eventLocation}, Start: ${startTime}, Every: ${everyMinutes}, Max Spots: ${maxSpots}, Room: ${roomNumber}`,
            score: 'Scoring Algorithm', // Default value or modify as needed
            id: nextId,
        };

        setEvents([...events, newEvent]);
        setNextId(nextId + 1);

        // Clear the input fields after adding
        setEventName('');
        setTimeBlockDuration('');
        setNumOfTimeBlocks('');
        setEventLocation('');
        setStartTime('');
        setEveryMinutes('');
        setMaxSpots('');
        setRoomNumber('');
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
            date: date.toISOString(),
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
        <div className="flex flex-col min-h-screen">
            <div className="flex flex-row px-12 py-6 flex-grow">
                {/* Left Side: Form for Adding Events */}
                <div className="w-1/2 pr-4">
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

                    <h2 className='text-3xl font-bold'>Add Event</h2>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        {/* Left Column */}
                        <div>
                            <label className="font-bold">Event Name</label>
                            <input
                                type="text"
                                placeholder="Event Name"
                                className="border border-gray-300 rounded-md p-2 w-full mt-2"
                                value={eventName}
                                onChange={(e) => setEventName(e.target.value)}
                                required
                            />
                            <label className="font-bold mt-4">Time Block Duration</label>
                            <input
                                type="text"
                                placeholder="Time Block Duration"
                                className="border border-gray-300 rounded-md p-2 w-full mt-2"
                                value={timeBlockDuration}
                                onChange={(e) => setTimeBlockDuration(e.target.value)}
                                required
                            />
                            <label className="font-bold mt-4">Number of Time Blocks</label>
                            <input
                                type="number"
                                placeholder="Number of Time Blocks"
                                className="border border-gray-300 rounded-md p-2 w-full mt-2"
                                value={numOfTimeBlocks}
                                onChange={(e) => setNumOfTimeBlocks(e.target.value)}
                                required
                            />
                            <label className="font-bold mt-4">Location</label>
                            <input
                                type="text"
                                placeholder="Location"
                                className="border border-gray-300 rounded-md p-2 w-full mt-2"
                                value={eventLocation}
                                onChange={(e) => setEventLocation(e.target.value)}
                                required
                            />
                        </div>

                        {/* Right Column */}
                        <div>
                            <label className="font-bold">Start Time</label>
                            <input
                                type="time"
                                className="border border-gray-300 rounded-md p-2 w-full mt-2"
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                                required
                            />
                            <label className="font-bold mt-4">Every # of Minutes</label>
                            <input
                                type="number"
                                placeholder="Every # of Minutes"
                                className="border border-gray-300 rounded-md p-2 w-full mt-2"
                                value={everyMinutes}
                                onChange={(e) => setEveryMinutes(e.target.value)}
                                required
                            />
                            <label className="font-bold mt-4">Max # of Spots</label>
                            <input
                                type="number"
                                placeholder="Max # of Spots"
                                className="border border-gray-300 rounded-md p-2 w-full mt-2"
                                value={maxSpots}
                                onChange={(e) => setMaxSpots(e.target.value)}
                                required
                            />
                            <label className="font-bold mt-4">Room #</label>
                            <input
                                type="text"
                                placeholder="Room #"
                                className="border border-gray-300 rounded-md p-2 w-full mt-2"
                                value={roomNumber}
                                onChange={(e) => setRoomNumber(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                </div>

                {/* Right Side: Current Events Table */}
                <div className="w-1/2 pl-4">
                    <h2 className='text-3xl font-bold mt-6'>Current Events</h2>
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
                </div>
            </div>

        {/* Footer with Add Event and Next buttons */}
        <div className="border-t border-gray-300 my-4" />
            <div className="bg-white relative flex justify-between px-12 py-4">
                <div className="flex items-center ml-5">
                    <button onClick={() => createEvent(nextId)} className="flex items-center text-lg font-semibold text-green-800 rounded-full px-4 py-2 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
                        <span className="text-2xl mr-2">+</span>
                        Add Event
                    </button>
                </div>
                <button
                    className="bg-green-800 text-white rounded-full px-6 py-2 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                    onClick={publishTournament}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default ManageEvents;
