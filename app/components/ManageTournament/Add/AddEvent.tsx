"use client"

import React, { useState } from 'react';
import axios from 'axios'; // Import Axios

interface Props {
    isOpen: boolean;
    onAdd: (name: string, description: string, score: string, tourneyId: number) => void;
    onClose: () => void;
    tournamentId: number;
}

const AddEvent: React.FC<Props> = ({ isOpen, onAdd, onClose, tournamentId }) => {
    if (!isOpen) return null;

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [score, setScore] = useState<string | null>('Default');
    const [tourneyId, setTourneyId] = useState(); 

    const buttonStyle = (type: string) => ({
        backgroundColor: score === type ? '#B7E394' : '#FFFFFF',
    });

    const submit = async () => {
        if (!name.trim()) {
            alert("Event name cannot be blank."); // Alert if name is empty
            return; // Prevent submission
        }
    
        try {
            // Making the POST request with axios
            const response = await axios.post('http://localhost:3000/add-event', {
                name,
                tournament_id: tournamentId, // Set tournament ID
                scoringAlg: score, // score will go to scoringAlg
                description,
                status: 0, // Set status to 0
                scoreStatus: 0 // Set scoreStatus to 0
            });
    
            alert("Event added!"); // Show success alert
            onAdd(name, description, score, tournamentId); // Call onAdd after successful post
            setName(''); // Reset name state
            setDescription(''); // Reset description state
            setScore('Default'); // Reset score state
            onClose(); // Close the modal
        } catch (error) {
            console.error('Error adding event:', error); // Handle errors
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-5xl">
                <h1 className="text-3xl font-bold px-4 py-4">
                    Add/edit event
                </h1>
                <div className="flex justify-between px-4">
                    <div className="py-2 w-1/2">
                        <h2 className="text-2xl font-bold">
                            Name
                        </h2>
                        <input
                            className="border border-gray-300 bg-gray-50 rounded-lg p-2.5 w-full"
                            placeholder="Event Name"
                            value={name} // Bind the input value to state
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
                        placeholder={"Event Description"}
                        value={description} // Bind textarea value to state
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

export default AddEvent;
