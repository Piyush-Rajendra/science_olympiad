"use client";
import React, { useState } from 'react';
import TimeBlockItem from './time-block-item';

const EditEventForm = (props) => {

    const [eventName, setEventName] = useState(props.name);

    const [timeBlocks, setTimeBlocks] = useState([
        { startTime: "08:00", endTime: "10:00" },
        { startTime: "10:30", endTime: "12:30" },
        { startTime: "13:00", endTime: "15:00" },
        { startTime: "15:30", endTime: "17:30" }
    ]);

    // Function to add a new time block
    const addTimeBlock = () => {
        setTimeBlocks([...timeBlocks, { startTime: "", endTime: "" }]);
    };

    const handleNameInputChange = (e) => {
        setEventName(e.target.value);
    };

    

    const handleTimeChange = (index, event) => {
        const { name, value } = event.target;
        const updatedTimeBlocks = [...timeBlocks];
        updatedTimeBlocks[index][name] = value; // name will be either 'startTime' or 'endTime'
        setTimeBlocks(updatedTimeBlocks);
    };

    return (
        <div id="new-event-form-component bg-white">
            <div id="name">
                <h2 className="pl-7  pt-3">Name</h2>
                <input
                    className="ml-7 shadow appearance-none border rounded w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="inputBox"
                    type="text"
                    value={eventName} // Set initial text and bind to state
                    onChange={handleNameInputChange} // Update state on change
                    placeholder="Event Name"
            />
            </div>
            <div id="description">
                <h2 className="pl-7 pt-4">Description</h2>
                <textarea className="ml-7 shadow appearance-none border rounded w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32" 
                    id="textarea"  placeholder="Event Description"></textarea>
            </div>
            <div id="time-blocks">
                <h2 className="pl-7 pt-4">Time Blocks</h2>
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
    )
}

export default EditEventForm; 