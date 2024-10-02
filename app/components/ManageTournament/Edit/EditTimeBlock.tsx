"use client"

import React, { useState} from 'react';

interface timeBlockContent {
    start: string;
    end: string;
    address: string;
    roomNumber: number;
    id: number;
}

interface Props {
    isOpen: boolean;
    onEdit: (timeblock: timeBlockContent) => void;
    onClose: () => void;
    nextId: number;
}

const EditTimeBlock: React.FC<Props> = ({ isOpen, onEdit, onClose, nextId }) => {
    if (!isOpen) return null;

    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [address, setAddress] = useState("");
    const [roomNumber, setRoomNumber] = useState(0);

    const submit = () => {
        const newTimeBlock: timeBlockContent = {
            start: start,
            end: end,
            address: address,
            roomNumber: roomNumber,
            id: nextId
        };
        setStart("");
        setEnd("");
        setAddress("");
        setRoomNumber(0)
        onEdit(newTimeBlock);
        onClose();
    }

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-5xl">
                <h1 className="text-3xl font-bold px-4 py-4">
                    Edit Time Block
                </h1>
                <div>
                    <div className="flex items-center justify-between py-2 px-4">
                        <input
                        className="border border-gray-300 bg-gray-50 rounded-lg p-2.5 w-full"
                        placeholder="00:00 AM/PM"
                        onChange={(e) => setStart(e.target.value)}
                        />
                        <h2 className="px-4">to</h2>
                        <input
                        className="border border-gray-300 bg-gray-50 rounded-lg p-2.5 w-full"
                        placeholder="00:00 AM/PM"
                        onChange={(e) => setEnd(e.target.value)}
                        />
                        <h2 className="px-4">at</h2>
                        <input
                        className="border border-gray-300 bg-gray-50 rounded-lg p-2.5 w-full mr-8"
                        placeholder="Address"
                        onChange={(e) => setAddress(e.target.value)}
                        />
                        <input
                        className="border border-gray-300 bg-gray-50 rounded-lg p-2.5 w-full mr-8"
                        placeholder="Room Number"
                        onChange={(e) => setRoomNumber(parseInt(e.target.value))}
                        />
                    </div>
                </div>
                <div className="px-4 flex justify-end">
                    <button onClick={onClose} className="text-1xl font-bold underline px-4"
                        style={{color:'#006330'}}>
                        Cancel
                    </button>
                    <button onClick={submit} className="rounded-full px-6 py-2"
                            style={{backgroundColor:'#B7E394'}}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    )
}

export default EditTimeBlock;