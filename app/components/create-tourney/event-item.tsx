"use client";
import React, { useState } from 'react';
import EditEventForm from './edit-event-form';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'; 

const EventItem = (props) => {
    // State to manage dropdown visibility
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Toggle dropdown visibility
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div>
            <div
                id="event-item"
                className="flex justify-between items-center px-5 py-4"
                style={{ backgroundColor: props.color }} // Dynamically set background color
            >
                <div id="event-name" className="pl-6 flex-shrink-0 w-1/3 flex items-center">
                    <div id="button-and-dropdown" className='flex space-x-4'>
                        <button 
                            className="ml-3 text-gray-500 focus:outline-none"
                            onClick={toggleDropdown}
                        >
                            {/* Use an arrow icon (or text) that toggles based on state */}
                            {isDropdownOpen ? <FaChevronUp />: <FaChevronDown />}
                        </button>
                        <h3>{props.name}</h3>
                    </div>
                </div>
                <div id="event-division" className="w-31">
                    <h3>{props.division}</h3>
                </div>
                <div id="event-buttons" className="flex space-x-3">
                    <button id="Edit">Edit</button>
                    <button id="Delete">Delete</button>
                    <button id="More">More</button>
                </div>
            </div>

            {/* Conditionally render the dropdown content */}
            {isDropdownOpen && (
                <div className="px-5 py-2">
                    <EditEventForm
                        name={props.name} 
                    />
                </div>
            )}

            <hr className='border-t-3 border-black' />
        </div>
    );
};

export default EventItem;
