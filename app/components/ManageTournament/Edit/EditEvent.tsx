"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios

interface Props {
    isOpen: boolean;
    eventId: number; // Event ID to fetch the event data
    onClose: () => void;
    onUpdate: (name: string, description: string, score: string) => void;
}

const EditEvent: React.FC<Props> = ({ isOpen, eventId, onClose, onUpdate }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [score, setScore] = useState<string | null>('Default');
    const [isLoading, setIsLoading] = useState(true);
    const [status, setStatus] = useState();
    const [scoreStatus, setScoreStatus] = useState(); 
    const [tournamentId, setTournamentId] = useState();

    // Fetch event data on component load
    useEffect(() => {
        if (isOpen && eventId) {
            // Fetch the event data by its ID
            const fetchEvent = async () => {
                try {
                    const response = await axios.get(`http://localhost:3000/get-event/${eventId}`);
                    const event = response.data;

                    setName(event.name);
                    setDescription(event.description);
                    setScore(event.scoringAlg || 'Default');
                    setScoreStatus(event.scoreStatus);
                    setStatus(event.status);
                    setTournamentId(event.tournament_id)
                    setIsLoading(false);
                } catch (error) {
                    console.error('Error fetching event:', error);
                    setIsLoading(false);
                }
            };

            fetchEvent();
        }
    }, [isOpen, eventId]);

    const buttonStyle = (type: string) => ({
        backgroundColor: score === type ? '#B7E394' : '#FFFFFF',
    });

    const submit = async () => {
        if (!name.trim()) {
            alert("Event name cannot be blank."); // Alert if name is empty
            return; // Prevent submission
        }
    
        try {
            // Update the event via PUT request
            await axios.put(`http://localhost:3000/edit-event/${eventId}`, {
                name,
                tournament_id: tournamentId, // Keep tournament ID
                scoringAlg: score, // score will go to scoringAlg
                description,
                status, // Set status
                scoreStatus // Set scoreStatus
            });
    
            //alert("Event updated!"); // Notify on success
            onUpdate(name, description, score); // Call onUpdate after successful update
            onClose(); // Close the modal
        } catch (error) {
            console.error('Error updating event:', error); // Handle errors
        }
    };

    if (!isOpen || isLoading) return null;

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-5xl">
                <h1 className="text-3xl font-bold px-4 py-4">
                    Edit Event
                </h1>
                <div className="flex justify-between px-4">
                    <div className="py-2 w-1/2">
                        <h2 className="text-2xl font-bold">
                            Name
                        </h2>
                        <input
                            className="border border-gray-300 bg-gray-50 rounded-lg p-2.5 w-full"
                            placeholder="Event Name"
                            value={name} // Pre-fill the input with event name
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="px-6 py-2 w-1/2">
                        <h2 className="text-2xl font-bold">
                            Scoring Algorithm
                        </h2>
                        <div className="inline-flex">
                            <button onClick={() => setScore('Default')} className="rounded-tl-full rounded-bl-full px-4 py-2 border border-r-0 border-gray-600"
                                style={buttonStyle('Default')}>
                                Default
                            </button>
                            <button onClick={() => setScore('Flipped')} className="rounded-tr-full rounded-br-full px-4 py-2 border border-gray-600"
                                style={buttonStyle('Flipped')}>
                                Flipped
                            </button>
                        </div>
                    </div>
                </div>
                <div className="py-4 px-4">
                    <h2 className='text-2xl font-bold'>
                        Description
                    </h2>
                    <textarea className="border border-gray-300 bg-gray-50 rounded-lg w-full h-48 p-2.5"
                        placeholder="Event Description"
                        value={description} // Pre-fill textarea with event description
                        onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className="px-4 flex justify-end">
                    <button onClick={onClose} className="text-1xl font-bold underline px-4"
                        style={{ color: '#006330' }}>
                        Cancel
                    </button>
                    <button onClick={submit} className="rounded-full px-6 py-2"
                        style={{ backgroundColor: '#B7E394' }}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditEvent;
