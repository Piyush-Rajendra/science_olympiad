"use client"

import React, { useState, Suspense } from 'react';
import EditIcon from '../../images/edit-246.png'
import DeleteIcon from '../../images/delete.png'
import Image from 'next/image';
const LazyEventInfo = React.lazy(() => import('./Info/EventInfo'))
const LazyAddEvent = React.lazy(() => import('./Add/AddEvent'))

interface TournamentProps {
    name: string;
    division: string;
    date: string
    id: number;
    isOpen: boolean;
    onClose: () => void;
}

interface GroupContent {
    name: string;
    description: string
    score: string;
    id: number
}

const ManageEvents: React.FC<TournamentProps> = ({ name, division, date, isOpen, onClose}: TournamentProps)  => {
    if (!isOpen) return null;

    const [events, setEvents] = useState<GroupContent[]>([]);
    const [nextId, setNextId] = useState<number>(1);
    const [currentEventId, setCurrentEventId] = useState(0);
    const [isOpenEvent, setIsOpenEvent] = useState(false);
    const [dropdownIds, setDropdownIds] = useState({});



    const addEvent = (name: string, description: string, score: string) => {

        // Editing event
        if (events.some(event => event.id === currentEventId)) {
            setEvents((prevEvents) => 
                prevEvents.map((event) => 
                    event.id === currentEventId ? { ...events, ...{ name, description, score, id: currentEventId } } : event
                )
            );
        // Adding event
        } else {
            setEvents([...events, { name, description, score, id: nextId}]);
            setNextId(nextId + 1);
        }
    }


    const createEvent = (id: number) => {
        setCurrentEventId(id);
        setIsOpenEvent(true);
    }

    const closeEvent = () => {
        setIsOpenEvent(false);
    }


    const openEvent = (index: number) => {
        const eventInfo = document.getElementById(`row-${index}`);
        eventInfo.classList.toggle('hidden')
    }

    const deleteEvent = (index: number) => {
        setEvents(events.filter(event => event.id !== index));
    }

    const toggleDropdown = (index: number) => {
        setDropdownIds(state => ({
            ...state, [index]: !state[index]
        }))
    }


    return (


        <div className="px-12 py-6">
            <button onClick={onClose} className="text-2xl font-bold"
                    style={{color:'#006330'}}>
                {"< Back to create tournament"}
            </button>
            <div className='flex py-6 space-x-10 border-b border-gray-300'>
                <h1 className="text-4xl font-bold">
                    {name}
                </h1>
                <h1 className="text-4xl font-bold">
                    {date}
                </h1>
                <h1 className="text-4xl font-bold"
                    style={{color:'#006330'}}>
                    Division {division}
                </h1>
            </div>
            <div className='flex justify-between py-6'>
                <h2 className='text-3xl font-bold'>
                    Events
                </h2>
                <button onClick={() => createEvent(nextId)} className="rounded-full px-6 py-2"
                        style={{backgroundColor:'#B7E394'}}>
                    Add Event
                </button>
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
                                <td className="px-2" onClick={() => {openEvent(index); toggleDropdown(row.id)}}>
                                    {dropdownIds[row.id] ? '▲' : '▼'}
                                </td>
                                <td className="py-2 px-4">{row.name}</td>
                                <td className="py-2 px-8">{division}</td>
                                <td className="py-2 px-8">
                                    <button className="rounded-md px-2 py-2"
                                            style={{backgroundColor:'#B7E394'}}>
                                        {row.score}
                                    </button>
                                </td>
                                <td className="px-4 py-2 justify-normal flex space-x-4">
                                    <button className="flex justify-center"
                                        onClick ={() => createEvent(row.id)}>
                                        <Image 
                                            src={EditIcon} 
                                            alt="e"
                                            className="mx-auto w-10 h-10"/>
                                    </button>
                                    <button className="flex justify-center"
                                        onClick ={() => deleteEvent(row.id)}>
                                        <Image 
                                            src={DeleteIcon} 
                                            alt="d"
                                            className="mx-auto w-10 h-10"/>
                                    </button>
                                </td>
                            </tr>
                            <tr id ={`row-${index}`} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} border-b hidden`}>
                                <td colSpan={5} className="p-4">
                                    <Suspense fallback={<div>Loading Events</div>}>
                                        <LazyEventInfo name={row.name} description={row.description} id={row.id}/>
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
        </div>
    )
}

export default ManageEvents;