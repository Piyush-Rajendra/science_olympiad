"use client";
import React, { useState, Suspense, useEffect } from 'react';
import axios from 'axios';
import { Menu } from '@headlessui/react';

const CreateTeams = ({id}) => {

    const handleNextStep = () => {

    }


    {/* FILL IN APPROPIATE VAR NAMES */}
    return (
        <div className="flex flex-col min-h-screen">
            <div className="px-12 py-6">
                <div className='flex space-x-10 border-b border-gray-300'>
                    <h1 className="text-4xl font-bold">{name}</h1>
                    <h1 className="text-4xl font-bold">{date instanceof Date ? date.toLocaleDateString() : date}</h1>
                    <h1 className="text-4xl font-bold" style={{ color: '#006330' }}>
                        Division {division}
                    </h1>
                </div>
            </div>

            {/* Top Two Dropdowns */}
            <div className="flex justify-between px-12">
                <div>
                    <label className="font-bold">Event</label>
                    <Menu>
                        <Menu.Button 
                            className="border border-gray-300 rounded-md p-2 w-full mt-2 text-left bg-gray-50">
                            {currentEventId ? currentEventName : <span className="text-gray-400">Select Event</span>}
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
                    <label className="font-bold">Time Block</label>
                    <Menu>
                        <Menu.Button 
                            className="border border-gray-300 rounded-md p-2 w-full mt-2 text-left bg-gray-50">
                            {currentEventId ? currentEventName : <span className="text-gray-400">Select timeblock</span>}
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
            </div>



            <div className="flex flex-row px-12 py-2 flex-grow space-x-4">
                {/* Right Side: Current Events Table */}
                <div className="w-1/2 px-4 py-8 ">
                    <table className="w-full table-auto text-left">
                        <thead className="border-b border-gray-300">
                            <tr>
                                <th className="px-2"></th>
                                <th className="px-2 py-2">Time Blocks</th>
                                <th className="px-8 py-2">Location</th>
                                <th className="px-6 py-2">Room Number</th>
                                <th className="px-2 py-2">Manage</th>
                            </tr>
                        </thead>
                        <tbody>
                            {events.map((row, index) => (
                                <React.Fragment key={row.event_id}>
                                    
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
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default CreateTeams