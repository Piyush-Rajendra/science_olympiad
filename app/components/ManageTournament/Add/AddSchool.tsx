"use client"

import React, { useState} from 'react';
import DeleteIcon from '../../../images/delete.png'
import Image from 'next/image';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'



interface SchoolContent {
    name: string;
    teamID: string;
    flight: string;
    id: number;
}

interface Props {
    isOpen: boolean;
    onAdd: (timeblocks: SchoolContent[]) => void;
    onClose: () => void;
    id: number;
}

const AddSchool: React.FC<Props> = ({ isOpen, onAdd, onClose, id }) => {
    if (!isOpen) return null;

    const [schools, setSchools] = useState<SchoolContent[]>([
        { name: "", teamID: "", flight: "", id: id + 0 },
        { name: "", teamID: "", flight: "", id: id + 1 },
        { name: "", teamID: "", flight: "", id: id + 2 },
        { name: "", teamID: "", flight: "", id: id + 3 },
    ]);

    const [nextId, setNextId] = useState<number>(4 + id);

    const addSchool = () => {
        setSchools([...schools, { name: "", teamID: "", flight: "", id: nextId }]);
        setNextId(nextId + 1);
    };

    const handleChange = (index: number, valueType: string, value: string) => {
        const newSchools = [...schools];
        newSchools[index][valueType] = value;
        setSchools(newSchools);
    };

    const deleteTimeBlock = (id: number) => {
        setSchools(schools.filter(school => school.id !== id));
    };

    const submit = () => {
        const filledSchools = schools.filter((school) => school.name && school.teamID);
        onAdd(filledSchools);

        // Resetting schools and nextId
        setSchools([
            { name: "", teamID: "", flight: "", id: id + 0 },
            { name: "", teamID: "", flight: "", id: id + 1 },
            { name: "", teamID: "", flight: "", id: id + 2 },
            { name: "", teamID: "", flight: "", id: id + 3 },
        ]);
        setNextId(4 + id);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-5xl">
                <h1 className="text-3xl font-bold px-4 py-4">Add School</h1>
                <div className="flex justify-between">
                    <h1 className="text-2xl font-bold px-4">School</h1>
                    <button onClick={addSchool} className="text-1xl font-bold underline px-4" style={{ color: '#006330' }}>
                        Add school
                    </button>
                </div>
                <div>
                    {schools.map((school, index) => (
                        <React.Fragment key={school.id}>
                            <div className="flex items-center py-2 px-4 space-x-2">
                                <input
                                    className="border border-gray-300 bg-gray-50 rounded-lg p-2.5 w-1/2 mr-4"
                                    placeholder="School Name"
                                    onChange={(e) => handleChange(index, 'name', e.target.value)}
                                />
                                <input
                                    className="border border-gray-300 bg-gray-50 rounded-lg p-2.5"
                                    placeholder="Team ID"
                                    onChange={(e) => handleChange(index, 'teamID', e.target.value)}
                                />
                                <Menu as="div" className="relative inline-block text-left">
                                    <div>
                                        <Menu.Button className="border border-gray-300 bg-gray-50 rounded-lg p-2.5">
                                            {school.flight || 'Select Flight'}
                                        </Menu.Button>
                                    </div>
                                    <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <Menu.Item>
                                            {({ active }) => (
                                                <button
                                                    onClick={() => handleChange(index, 'flight', "A")}
                                                    className={`block px-4 py-2 text-sm ${active ? 'bg-gray-100' : ''}`}
                                                >
                                                    A
                                                </button>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <button
                                                    onClick={() => handleChange(index, 'flight', "B")}
                                                    className={`block px-4 py-2 text-sm ${active ? 'bg-gray-100' : ''}`}
                                                >
                                                    B
                                                </button>
                                            )}
                                        </Menu.Item>
                                    </Menu.Items>
                                </Menu>
                                <button className="px-4" onClick={() => deleteTimeBlock(school.id)}>
                                    <Image src={DeleteIcon} alt="Delete" className="h-10 w-10" />
                                </button>
                            </div>
                        </React.Fragment>
                    ))}
                </div>
                <div className="px-4 flex justify-end">
                    <button onClick={onClose} className="text-1xl font-bold underline px-4" style={{ color: '#006330' }}>
                        Cancel
                    </button>
                    <button onClick={submit} className="rounded-full px-6 py-2" style={{ backgroundColor: '#B7E394' }}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddSchool;