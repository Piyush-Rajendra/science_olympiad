"use client";
import React, { useState, Suspense, useEffect } from 'react';
const LazyTimeInfo = React.lazy(() => import('./timeblock-info'));
import axios from 'axios';
import { Menu } from '@headlessui/react';
import CreateTeams from './create-teams';

interface TournamentProps {
    name: string;
    division: string;
    date: any;
    location: string;
    description: string;
    id: number;
    isOpen: boolean;
    onClose: () => void;
}

const ManageEvents: React.FC<TournamentProps> = ({ name, division, date, location, description, id, isOpen, onClose }: TournamentProps) => {
    if (!isOpen) return null;

    const [events, setEvents] = useState([]);
    const [dropdownIds, setDropdownIds] = useState({});
    const [trigger, setTrigger] = useState(false);
    const [showNextStep, setShowNextStep] = useState(false);
    useEffect(() => {
        fetchEvents()
    }, []);

    const fetchEvents = async () => {
        try {
            let eventsResponse; 
            eventsResponse = await axios.get(`http://localhost:3000/get-events-by-tournament/${id}`); 
            setEvents(eventsResponse.data);
        } catch (error) {
            console.error("Error retrieving events", error)
        }
    }

    // State for new event fields
    const [currentEventId, setCurrentEventId] = useState(null);
    const [currentEventName, setCurrentEventName] = useState("")
    const [timeBlockDuration, setTimeBlockDuration] = useState('');
    const [numOfTimeBlocks, setNumOfTimeBlocks] = useState('');
    const [eventLocation, setEventLocation] = useState('');
    const [startTime, setStartTime] = useState('');
    const [everyMinutes, setEveryMinutes] = useState('');
    const [maxSpots, setMaxSpots] = useState('');
    const [roomNumber, setRoomNumber] = useState('');
    const [showTeamsCreation, setShowTeamsCreation] = useState(false);

    const openEvent = (index: number) => {
        const eventInfo = document.getElementById(`row-${index}`);
        eventInfo.classList.toggle('hidden');
    };


    const toggleDropdown = (id: number) => {
        setDropdownIds((prevState) => ({
            ...prevState,
            [id]: !prevState[id]
        }));
    };

    const handleClose = () => {
        setShowTeamsCreation(true);
    }


    const addTimeblocks = async () => {
        try {
            await fetch(`http://localhost:3000/add-timeblocks`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    startTime: startTime,
                    event_id: currentEventId,
                    tournament_id: id,
                    building: eventLocation,
                    roomNumber: roomNumber,
                    duration: timeBlockDuration,
                    breakTime: everyMinutes,
                    amount: numOfTimeBlocks,
                    status: 0
                })
            })
            
            setCurrentEventId(null);
            setCurrentEventName('');
            setTimeBlockDuration('');
            setNumOfTimeBlocks('');
            setEventLocation('');
            setStartTime('');
            setEveryMinutes('');
            setMaxSpots('');
            setRoomNumber('');

            setTrigger((prev) => !prev);
        } catch (error) {
            console.error("Error generating timeblocks", error.message)
        }

    }

    const eventSelect = (id) => {
        setCurrentEventId(id)
        const selectedEvent = events.find(event => event.event_id === id);
        setCurrentEventName(selectedEvent.name)
    }


    const handleNextStep = () => {
        const [showNextStep, setShowNextStep] = useState(false);
    }

    const returnBack = () => {
        setShowTeamsCreation(false);
    }

    return (
        <div className="flex flex-col min-h-screen">
            {!showTeamsCreation ? (
                <>
            <div className="px-12 py-6">
                <div className='flex space-x-10 border-b border-gray-300'>
                    <h1 className="text-4xl font-bold">{name}</h1>
                    <h1 className="text-4xl font-bold">{date instanceof Date ? date.toLocaleDateString() : date}</h1>
                    <h1 className="text-4xl font-bold" style={{ color: '#006330' }}>
                        Division {division}
                    </h1>
                </div>
            </div>
            <div className="flex flex-row px-12 py-2 flex-grow space-x-4">
                {/* Left Side: Form for Adding Events */}
                <div className="w-1/2 pr-4 border border-gray-300 rounded-3xl px-4 py-8 ">
                    <h2 className='text-3xl font-bold'>Generate Timeblocks</h2>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        {/* Left Column */}
                        <div className="space-y-4">
                            <div>
                                <label className="font-bold">Event</label>
                                <Menu>
                                    <Menu.Button 
                                        className="border border-gray-300 rounded-md p-2 w-full mt-2 text-left bg-gray-50">
                                        {currentEventId ? currentEventName : <span className="text-gray-400">Event Name</span>}
                                    </Menu.Button>
                                    <Menu.Items className="absolute border border-gray-300 bg-gray-50 rounded-md p-2 text-left">
                                        {events.map((event) => (
                                            <Menu.Item key={event.event_id}>
                                                {({ active }) => (
                                                    <button
                                                        className={`${
                                                            active ? 'bg-gray-100' : ''
                                                        } block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-200`}
                                                        onClick={() => eventSelect(event.event_id)}
                                                    >
                                                        {event.name}
                                                    </button>
                                                )}
                                            </Menu.Item>
                                        ))}
                                    </Menu.Items>
                                </Menu>
                            </div>
                            <div>
                                <label className="font-bold">Time Block Duration</label>
                                <input
                                    type="text"
                                    placeholder="Time Block Duration"
                                    className="border border-gray-300 rounded-md p-2 w-full mt-2 bg-gray-50"
                                    value={timeBlockDuration}
                                    onChange={(e) => setTimeBlockDuration(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="font-bold"># of Time Blocks</label>
                                <input
                                    type="number"
                                    placeholder="Number of Time Blocks"
                                    className="border border-gray-300 rounded-md p-2 w-full mt-2 bg-gray-50"
                                    value={numOfTimeBlocks}
                                    onChange={(e) => setNumOfTimeBlocks(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="font-bold">Location</label>
                                <input
                                    type="text"
                                    placeholder="Location"
                                    className="border border-gray-300 rounded-md p-2 w-full mt-2 bg-gray-50"
                                    value={eventLocation}
                                    onChange={(e) => setEventLocation(e.target.value)}
                                    required
                                />
                            </div>
                            <button
                                className="bg-green-800 text-white rounded-full text-center px-6 py-2 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                                onClick={() => addTimeblocks()}
                            >
                                Generate timeblocks
                            </button>

                        </div>

                        {/* Right Column */}
                        <div className="space-y-4 ">
                            <div>
                                <label className="font-bold">Start Time</label>
                                <input
                                    type="time"
                                    className="border border-gray-300 rounded-md p-2 w-full mt-2 bg-gray-50"
                                    value={startTime}
                                    onChange={(e) => setStartTime(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="font-bold">Every # of Minutes</label>
                                <input
                                    type="number"
                                    placeholder="Every # of Minutes"
                                    className="border border-gray-300 rounded-md p-2 w-full mt-2 bg-gray-50"
                                    value={everyMinutes}
                                    onChange={(e) => setEveryMinutes(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="font-bold">Room Number</label>
                                <input
                                    type="number"
                                    placeholder="Room #"
                                    className="border border-gray-300 rounded-md p-2 w-full mt-2 bg-gray-50"
                                    value={roomNumber}
                                    onChange={(e) => setRoomNumber(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Current Events Table */}
                <div className="w-1/2 px-4 py-8 ">
                    <table className="w-full table-auto text-left">
                        <thead className="border-b border-gray-300">
                            <tr>
                                <th className="px-2"></th>
                                <th className="py-2 px-4">Event Name</th>
                                <th className="py-2 px-4">Number of Timeblocks</th>
                            </tr>
                        </thead>
                        <tbody>
                            {events.map((row, index) => (
                                <React.Fragment key={row.event_id}>
                                    <tr className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} border-b`}>
                                        <td className="px-2" onClick={() => { openEvent(index); toggleDropdown(index) }}>
                                            {dropdownIds[row.id] ? '▲' : '▼'}
                                        </td>
                                        <td className="py-2 px-4">{row.name}</td>
                                        <td className="py-2 px-4">{row.name}</td>
                                    </tr>
                                    <tr id={`row-${index}`} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} border-b hidden`}>
                                        <td colSpan={3} className="p-4">
                                            <Suspense fallback={<div>Loading Timeblocks</div>}>
                                                <LazyTimeInfo id={row.event_id} trigger={trigger} />
                                            </Suspense>
                                        </td>
                                    </tr>
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        <div className="border-t border-gray-300" />
            <div className="bg-gray-50 relative flex justify-end px-12 space-x-2 text-center">
                <h4 className="text-gray-500 pt-2 mr-4">Next Step: Add Schools</h4>
                <button
                    className="bg-white border border-green-800 text-green-800 rounded-full px-6 py-2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                    onClick={onClose}
                    >
                    Back
                </button>
                <button
                    className="bg-green-800 text-white rounded-full px-6 py-2 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                    onClick={handleClose}
                >
                    Next
                </button>
            </div>
            </>
            ) : (
                <CreateTeams onClose={returnBack} name={name} division={division} date={date} id={id}></CreateTeams>
            )}
        </div>
    );
}

export default ManageEvents;
