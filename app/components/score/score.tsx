"use client"
import React, { useState } from 'react';
import ScoreEvent from './score-event';

const Score = () => {


    const DUMMY_EVENTS = [
        { name: "Dynamic Planet", timeBlock: "9:00 AM - 10:00 AM", status: "In Progress", percentGraded: 50 },
        { name: "Fossils", timeBlock: "10:00 AM - 11:00 AM", status: "Completed", percentGraded: 100 },
        { name: "Mission Possible", timeBlock: "11:00 AM - 12:00 PM", status: "Not Started", percentGraded: 0 },
        { name: "Water Quality", timeBlock: "12:00 PM - 1:00 PM", status: "For Review", percentGraded: 75 },
        { name: "Circuit Lab", timeBlock: "1:00 PM - 2:00 PM", status: "In Progress", percentGraded: 60 },
        { name: "Disease Detectives", timeBlock: "2:00 PM - 3:00 PM", status: "Completed", percentGraded: 100 },
        { name: "Thermodynamics", timeBlock: "3:00 PM - 4:00 PM", status: "Not Started", percentGraded: 0 },
        { name: "Geology", timeBlock: "4:00 PM - 5:00 PM", status: "For Review", percentGraded: 80 },
        { name: "Astronomy", timeBlock: "5:00 PM - 6:00 PM", status: "In Progress", percentGraded: 40 },
        { name: "Forensic Science", timeBlock: "6:00 PM - 7:00 PM", status: "Not Started", percentGraded: 0 }
    ];
    

    return (
        <div id="score-page">
            <div id="score-header">
                <h1 className="text-3xl pl-7 pt-4 pb-5 ">Score - Master Score Sheet</h1>
            </div>
            <hr className='border-t-3 border-black pb-8'></hr>
            <div id="score-event-list-header" className='pl-7  text-gray-500 flex justify-between items-center'>
                <h4 className='px-12 mx-5 flex-shrink-0 w-1/4'>Event Name</h4>
                <h4 className='px-12  mr-12'>Time Block</h4>
                <h4 className='pl-12 ml-12'>Status</h4>
                <h4 className='px-12 mx-5'>Percent Graded</h4>

            </div>
            <hr className='border-t-3 border-gray-400 ml-12'></hr>
            <div id="score-event-list">
            {DUMMY_EVENTS.map((event, index) => (
                <ScoreEvent
                    key={index} // Use index as the key (only if no unique id is available)
                    name={event.name}
                    timeBlock={event.timeBlock}
                    status={event.status}
                    progress={event.percentGraded}
                    color={index % 2 === 1 ? "white" : "#F3F4F6"}
                />
            ))}

            </div>





    </div>

    )

}

export default Score; 