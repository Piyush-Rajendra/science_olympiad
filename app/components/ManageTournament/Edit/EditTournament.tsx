"use client"

import React, { useState } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'

interface TournamentProps {
    name: string;
    division: string;
    date: string;
    isOpen: boolean;
    onClose: (name, division, date) => void;
}

const EditTournament: React.FC<TournamentProps> = ({ name, division, date, isOpen, onClose }: TournamentProps)  => {
    if (!isOpen) return null;

    const [currentDivision, setDivision] = useState('Select Division')
    const [newName, setNewName] = useState(name)
    const [newDate, setDate] = useState(date)

    const backToSum = () => {

        onClose(name, division, date);
    }

    const save = () => {

        onClose(newName, currentDivision, newDate);
    }



    return (
        <div className="px-12 py-6 pb-24">
            <button onClick={backToSum} className="text-2xl font-bold"
                    style={{color:'#006330'}}>
                Back to Tournaments Summary
            </button>
            <div className='flex py-6 space-x-10 border-b border-gray-300'>
                <h1 className="text-4xl font-bold">
                    {name}
                </h1>
                <h1 className="text-4xl font-bold"
                    style={{color:'#006330'}}>
                    Division {division}
                </h1>
            </div>
            <div className='flex'>
                <div>
                    <h2 className='text-3xl font-bold pt-8 pb-4'>
                        Name
                    </h2>
                    <input className="border border-gray-300 bg-gray-50 rounded-lg p-2.5" 
                        placeholder={"Tournament Name"}
                        onChange={(e) => setNewName(e.target.value)} />
                </div>
                <div className="ml-auto w-1/2">
                    <h2 className='text-3xl font-bold pt-8 pb-4'>
                        Division
                    </h2>
                    <Menu>
                        <MenuButton className="border border-gray-300 bg-gray-50 rounded-lg p-2.5">{currentDivision}</MenuButton>
                        <MenuItems className="border border-gray-300 bg-gray-50 rounded-lg p-2.5" anchor="bottom">
                            <MenuItem>
                            <a className="block data-[focus]:bg-blue-100" onClick={() => setDivision('B')}>
                                B
                            </a>
                            </MenuItem>
                            <MenuItem>
                            <a className="block data-[focus]:bg-blue-100" onClick={() => setDivision('C')}>
                                C
                            </a>
                            </MenuItem>
                        </MenuItems>
                    </Menu>
                </div>
            </div>
            <div>
                <h2 className='text-3xl font-bold pt-8 pb-4'>
                    Description
                </h2>
                <textarea className="border border-gray-300 bg-gray-50 rounded-lg w-full h-48 p-2.5" 
                    placeholder={"Tournament Description"} />
            </div>
            
            <h2 className='text-3xl font-bold pt-4 pb-4'>
                Date
            </h2>
            <input
                type="date"
                className="border border-gray-300 bg-gray-50 rounded-lg p-2.5"
                placeholder={"mm/dd/yyyy"}
                onChange={(e) => setDate(e.target.value)}
            />
            <div className="fixed bottom-0 left-0 w-full border-t border-gray-300 bg-gray-50 px-12 py-4 text-right">
                <button onClick={save} className="rounded-full px-4 py-2 bg-white"
                        style={{border:'2px solid #006330', color:'#006330'}}>
                    Save Changes
                </button>
            </div>
        </div>

    )
}

export default EditTournament;