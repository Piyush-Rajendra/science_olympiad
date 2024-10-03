"use client"
import React, { useState } from 'react';


const ScoreEventSchool = (props) => {


    const [tier, setTier] = useState(props.tier);
    const [score, setScore] = useState(props.score);


    return (
        <div
                id="event-item"
                className="flex justify-between items-center pl-5 py-4"
                style={{ backgroundColor: props.color }} // Dynamically set background color
            >
                <div id="school-name" className="pl-6 flex-shrink-0 w-1/3 flex items-center">
                    <h3>{props.name}</h3>
                </div>
                <div id="school-section" className="w-39 pr-12 pl-4">
                    <h3>{props.section}</h3>
                </div>
                <div id="school-rank" className="w-39 pl-9 pr-3 mr-4">
                    <h3>{props.rank}</h3>
                </div>
                <div id="school-tier" className="mr-5">
                <input
                    type="text"
                    value={tier}
                    onChange={(e) => setTier(e.target.value)}
                    className="border border-gray-300 rounded px-.5 py-2 text-center text-xs"
                />
            </div>
                <div id="school-score" className="">
                    <input
                        type="text"
                        value={score}
                        onChange={(e) => setScore(e.target.value)}
                        className="border border-gray-300 rounded px-0.5 py-2 text-center text-xs"
                    />
                </div>
                <hr className='border-t-3 border-black' />
            </div>
    )




}

export default ScoreEventSchool; 