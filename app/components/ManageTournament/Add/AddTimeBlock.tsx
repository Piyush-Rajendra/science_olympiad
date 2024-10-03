"use client"

import React, { useState} from 'react';
import DeleteIcon from '../../../images/delete.png'
import Image from 'next/image';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'


interface timeBlockContent {
    start: string;
    end: string;
    address: string;
    roomNumber: number;
    id: number;
}

interface Props {
    isOpen: boolean;
    onAdd: (timeblocks: timeBlockContent[]) => void;
    onClose: () => void;
    id: number;
}


const AddTimeBlock: React.FC<Props> = ({ isOpen, onAdd, onClose, id }) => {
    if (!isOpen) return null;

    const [timeBlocks, setTimeBlocks] = useState<timeBlockContent[]>([
        {start: "", end: "", address: "", roomNumber: 0, id: 0 + id},
        {start: "", end: "", address: "", roomNumber: 0, id: 1 + id},
        {start: "", end: "", address: "", roomNumber: 0, id: 2 + id},
        {start: "", end: "", address: "", roomNumber: 0, id: 3 + id},
    ]);
    
    const [nextId, setNextId] = useState<number>(4 + id);

    const addTimeBlock = () => {
        setTimeBlocks([...timeBlocks, {start: "", end: "", address: "", roomNumber: 0, id:nextId}]);
        setNextId(nextId + 1 + id);
    };


    const handleChange = (index, valueType, value) => {
        const newBlocks = [...timeBlocks];
        newBlocks[index][valueType] = value;
        setTimeBlocks(newBlocks);
    }

    const deleteTimeBlock = (index: number) => {
        setTimeBlocks(timeBlocks.filter(timeblock => timeblock.id !== index));
    }

    const submit = () => {
        const filledBlocks = timeBlocks.filter((timeblock) => timeblock.start && timeblock.end && timeblock.address && timeblock.roomNumber);

        onAdd(filledBlocks);
        
        setTimeBlocks([
            {start: "", end: "", address: "", roomNumber: 0, id: 0 + id},
            {start: "", end: "", address: "", roomNumber: 0, id: 1 + id},
            {start: "", end: "", address: "", roomNumber: 0, id: 2 + id},
            {start: "", end: "", address: "", roomNumber: 0, id: 3 + id},
        ])
        setNextId(4 + id);
        onClose();
    
    }

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-5xl">
                <h1 className="text-3xl font-bold px-4 py-4">
                    Add Time Blocks
                </h1>
                <div className="flex justify-between">
                    <h1 className="text-2xl font-bold px-4">
                        Time Blocks
                    </h1>
                    <button onClick={addTimeBlock} className="text-1xl font-bold underline px-4"
                        style={{color:'#006330'}}>
                        Add time block
                    </button>
                </div>
                <div>
                    {timeBlocks.map((timeblock, index) => (
                        <React.Fragment key={timeblock.id}>
                            <div className="flex items-center justify-between py-2 px-4">
                                <input
                                type="time"
                                className="border border-gray-300 bg-gray-50 rounded-lg p-2.5 w-full"
                                placeholder="00:00 AM/PM"
                                onChange={(e) => handleChange(timeblock.id, 'start', e.target.value)}
                                />
                                <h2 className="px-4">to</h2>
                                <input
                                type="time"
                                className="border border-gray-300 bg-gray-50 rounded-lg p-2.5 w-full"
                                placeholder="00:00 AM/PM"
                                onChange={(e) => handleChange(timeblock.id, 'end', e.target.value)}
                                />
                                <h2 className="px-4">at</h2>
                                <input
                                className="border border-gray-300 bg-gray-50 rounded-lg p-2.5 w-full mr-8"
                                placeholder="Building"
                                onChange={(e) => handleChange(timeblock.id, 'address', e.target.value)}
                                />
                                <input
                                className="border border-gray-300 bg-gray-50 rounded-lg p-2.5 w-full mr-8"
                                placeholder="Room Number"
                                onChange={(e) => handleChange(timeblock.id, 'roomNumber', e.target.value)}
                                />
                                <button className="flex"
                                    onClick={() => deleteTimeBlock(timeblock.id)}>
                                    <Image 
                                        src={DeleteIcon} 
                                        alt="d"
                                        className="h-10 w-40" />
                                </button>
                            </div>
                        </React.Fragment>
                        
                    ))}
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

export default AddTimeBlock;