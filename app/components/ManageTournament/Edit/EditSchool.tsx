"use client"

import React, { useState} from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'


interface SchoolContent {
    name: string;
    teamID: string;
    flight: string;
    id: number;
}


interface Props {
    isOpen: boolean;
    onEdit: (timeblocks: SchoolContent) => void;
    onClose: () => void;
    nextId: number;
}

const EditSchool: React.FC<Props> = ({ isOpen, onEdit, onClose, nextId }) => {
    if (!isOpen) return null;

    const [name, setName] = useState("");
    const [teamID, setTeamID] = useState("")
    const [flight, setFlight] = useState("");

    const submit = () => {
        const newSchool: SchoolContent = {
            name: name,
            teamID: teamID,
            flight: flight,
            id: nextId
        };
        setName("");
        setTeamID("");
        setFlight("");
        onEdit(newSchool);
        onClose();
        
    }

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-5xl">
                <h1 className="text-3xl font-bold px-4 py-4">
                    Edit School
                </h1>
                <div> 
                    <div className="flex items-center justify-between py-2 px-4">
                        <input
                        className="border border-gray-300 bg-gray-50 rounded-lg p-2.5 w-2/3 mr-4"
                        placeholder="School Name"
                        onChange={(e) => setName(e.target.value)}
                        />
                        <input
                        className="border border-gray-300 bg-gray-50 rounded-lg p-2.5 mr-14"
                        placeholder="Team ID"
                        onChange={(e) => setTeamID(e.target.value)}
                        />
                        <Menu as="div" className="relative inline-block text-left">
                            <div>
                                <Menu.Button className="border border-gray-300 bg-gray-50 rounded-lg p-2.5">
                                    {flight || 'Select Flight'}
                                </Menu.Button>
                            </div>
                            <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            onClick={() => setFlight("A")}
                                            className={`block px-4 py-2 text-sm ${active ? 'bg-gray-100' : ''}`}
                                        >
                                            A
                                        </button>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            onClick={() => setFlight("B")}
                                            className={`block px-4 py-2 text-sm ${active ? 'bg-gray-100' : ''}`}
                                        >
                                            B
                                        </button>
                                    )}
                                </Menu.Item>
                            </Menu.Items>
                        </Menu>
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

export default EditSchool;