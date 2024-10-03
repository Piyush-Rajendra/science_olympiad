"use client";
import React, { useState } from 'react';
import ScoreEventSchool from './score-event-school';

const ScoreEvent = (props) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const DUMMY_SCHOOLS = [
        { name: "Mill Creek High School", section: "C1", rank: "C2", tier: 1, score: 400 },
        { name: "Lakeside High School", section: "C2", rank: "C3", tier: 2, score: 350 },
        { name: "Northview High School", section: "C3", rank: "C1", tier: 1, score: 475 },
        { name: "Brookwood High School", section: "C4", rank: "C2", tier: 1, score: 420 },
        { name: "Peachtree Ridge High School", section: "C5", rank: "C4", tier: 3, score: 275 },
        { name: "Dunwoody High School", section: "C6", rank: "C3", tier: 2, score: 300 },
        { name: "Alpharetta High School", section: "C2", rank: "C5", tier: 3, score: 200 },
        { name: "Chattahoochee High School", section: "C1", rank: "C6", tier: 2, score: 320 },
        { name: "West Forsyth High School", section: "C3", rank: "C4", tier: 2, score: 380 },
        { name: "Roswell High School", section: "C4", rank: "C1", tier: 1, score: 450 },
        { name: "Lambert High School", section: "C5", rank: "C2", tier: 1, score: 490 },
        { name: "Etowah High School", section: "C6", rank: "C3", tier: 3, score: 230 },
        { name: "Johns Creek High School", section: "C1", rank: "C5", tier: 2, score: 310 }
    ];

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div>
            <div
                id="event-item"
                className="flex justify-between items-center px-5 py-4"
                style={{ backgroundColor: props.color }}
            >
                <div id="event-name" className="pl-6 flex-shrink-0 w-1/5 flex items-center">
                    <div id="button-and-dropdown" className='flex space-x-4'>
                        <button 
                            className="ml-3 text-gray-500 focus:outline-none"
                            onClick={toggleDropdown}
                        >
                            {isDropdownOpen ? '▲' : '▼'}
                        </button>
                        <h3>{props.name}</h3>
                    </div>
                </div>

                <div id="event-timeblock" className="w-25">
                    <h3>{props.timeBlock}</h3>
                </div>

                {/* Adjusted width and margins to move the status and graded sections more to the left */}
                <div
                    id="event-status"
                    className={`w-15 ml-2 p-2 border rounded ${
                        props.status === 'In Progress'
                        ? 'bg-yellow-200'
                        : props.status === 'Completed'
                        ? 'bg-green-200'
                        : props.status === 'Not Started'
                        ? 'bg-red-200'
                        : props.status === 'For Review'
                        ? 'bg-blue-200'
                        : 'bg-gray-300' // Default background color
                    }`}
                    >
                    <h3 className="text-black">{props.status}</h3>
                </div>
                <div id="event-graded" className="w-12 ml-2">
                    <h3>{props.progress}%</h3>
                </div>
            </div>

            {isDropdownOpen && (
                <div>
                     <div id="score-event-list-header" className='pl-7 pt-6 pr-9 text-gray-500 flex justify-between '>
                        <h4 className='px-12 mx-5 flex-shrink-0 w-1/4'>School Name</h4>
                        <h4 className='pl-8 '>Section</h4>
                        <h4 className=' '>Rank</h4>
                        <h4 className='pr-12 '>Tier</h4>
                        <h4 className='px-12 mx-7'>Score</h4>
                </div>
                <hr className='border-t-3 border-gray-300  ml-12'></hr>
                <div className='pl-12'>
                    {DUMMY_SCHOOLS.map((school, index) => (
                        <ScoreEventSchool
                            key={index} // Use index as the key (only if no unique id is available)
                            name={school.name}
                            section={school.section}
                            rank={school.rank}
                            tier={school.tier}
                            score={school.score}
                            color={index % 2 === 1 ? "white" : "#F3F4F6"}
                        />
                ))}
            </div>
                    <div id="score-event-buttons" className="flex justify-end space-x-4 mt-4 pr-12 pb-5">
                    {/* Finalize Button */}
                    <button className="px-6 py-2 border-2 border-green-300 text-green-300 rounded-full bg-white hover:bg-green-50">
                        Finalize
                    </button>
                    {/* Save Button */}
                    <button className="px-6 py-2 border-2 border-green-300 text-white bg-green-300 rounded-full hover:bg-green-400">
                        Save
                    </button>
                </div>
                </div>
                
            )}
           

            <hr className='border-t-3 border-gray-300' />
        </div>
    );
};

export default ScoreEvent;
