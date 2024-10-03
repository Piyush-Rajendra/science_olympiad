"use client";
import React, { useState } from 'react';
import TimeBlockItem from './time-block-item';

const NewEventForm = () => {
    // State to hold multiple time blocks
    const [timeBlocks, setTimeBlocks] = useState([{ startTime: "", endTime: "" }]);

    // Function to add a new time block
    const addTimeBlock = () => {
        setTimeBlocks([...timeBlocks, { startTime: "", endTime: "" }]);
    };

    // Function to handle time change for a specific time block
    const handleTimeChange = (index, event) => {
        const { name, value } = event.target;
        const updatedTimeBlocks = [...timeBlocks];
        updatedTimeBlocks[index][name] = value; // name will be either 'startTime' or 'endTime'
        setTimeBlocks(updatedTimeBlocks);
    };

    return (
        <div id="new-event-form-component bg-white">
            <div id="name">
                <h2 className="pl-7 pt-3">Name</h2>
                <input
                    className="ml-7 shadow appearance-none border rounded w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="inputBox"
                    type="text"
                    placeholder="Event Name"
                />
            </div>
            <div id="description">
                <h2 className="pl-7 pt-4">Description</h2>
                <textarea
                    className="ml-7 shadow appearance-none border rounded w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
                    id="textarea"
                    placeholder="Event Description"
                ></textarea>
            </div>
            <div id="time-blocks">
                <div className="flex justify-between items-center">
                    <h2 className="pl-7 pt-4">Time Blocks</h2>
                    <button
                        className="bg-green-300 text-black rounded-full px-6 py-2 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 mr-7"
                        onClick={addTimeBlock}
                    >
                        Add new time block
                    </button>
                </div>

                {/* Map over the timeBlocks array to render TimeBlockItem */}
                {timeBlocks.map((block, index) => (
                    <TimeBlockItem
                        key={index}
                        startTime={block.startTime}
                        endTime={block.endTime}
                        onStartTimeChange={(e) => handleTimeChange(index, e)} // Pass handler for start time
                        onEndTimeChange={(e) => handleTimeChange(index, e)}   // Pass handler for end time
                    />
                ))}
            </div>
        </div>
    );
};

export default NewEventForm;
