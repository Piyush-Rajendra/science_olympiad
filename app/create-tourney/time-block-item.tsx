"use client";
import React from 'react';

const TimeBlockItem = ({ startTime, endTime, onStartTimeChange, onEndTimeChange }) => {
    return (
        <div className='flex justify-between items-center px-7 py-4'>
            <div id="times" className='flex space-x-4'>
                <input
                    type="time"
                    id="first-time"
                    name="startTime" // Add a name for handling changes in the parent component
                    value={startTime}
                    onChange={onStartTimeChange} // Handle start time change
                    className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <h4 className='pt-3'>to</h4>
                <input
                    type="time"
                    id="second-time"
                    name="endTime" // Add a name for handling changes in the parent component
                    value={endTime}
                    onChange={onEndTimeChange} // Handle end time change
                    className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div id="add-school-button">
                <button className="bg-white border border-green-600 text-green-600 rounded-full px-6 py-2 hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-200">
                    Add School to Timeblock
                </button>
            </div>
        </div>
    );
};

export default TimeBlockItem;
