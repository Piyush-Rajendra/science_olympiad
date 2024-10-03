"use client";
import React, { useState } from 'react';
import EventItem from './event-item';


const CreateEvent = () => {

    const DummyTournamentData = {
        name: 'Annual Championship',
        division: 'B',
        startDate: '2024-09-15',
        endDate: '2024-09-20',
        addresses: [
          '123 Main St, Anytown, USA',
          '456 Elm St, Othertown, USA',
        ],
      };

      const DUMMY_EVENTS = [
        { name: "Dynamic Planet", division: "B" },
        { name: "Fossils", division: "C" },
        { name: "Mission Possible", division: "B" },
        { name: "Water Quality", division: "C" },
        { name: "Circuit Lab", division: "B" },
        { name: "Disease Detectives", division: "C" },
        { name: "Thermodynamics", division: "B" },
        { name: "Geology", division: "C" },
        { name: "Astronomy", division: "B" },
        { name: "Forensic Science", division: "C" },
    ];
    


    return (
        <div id="create-event-page"  className='bg-white min-h-screen'>
            <div id="event-header">
                <h1 className="text-3xl pl-7 pt-4 pb-5 ">Create Tournament {'>'} Create Events</h1>
            </div>
            <hr className='border-t-3 border-black'></hr>
            <div id="back-to-create">
                <h3 className="pl-7 pt-4 text-green-700">{'<'} Back to Create Tournament</h3>
            </div>
            <div id="tourney-info" className="flex space-x-12 text-2xl font-bold pl-7 pt-5">
                <h2>{DummyTournamentData.name}</h2>
                <h2>{DummyTournamentData.startDate}</h2>
                <h2 className='text-green-700'>Division {DummyTournamentData.division}</h2>
            </div>
            <hr className=" ml-7 border-t-3 border-gray-700 pt-2 w-3/4" />
            <div id="list-of-events">
                <div id="list-and-button" className='flex justify-between items-center pl-7 pt-5 pb-3 pr-7'>
                    <h2 className="pt-2 mr-12">List of Events</h2>
                    <div id="button-holder" className="flex justify-end">
                    <button className="ml-12 bg-green-300 border border-green-400 rounded-full px-5 py-1 hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
                        Create new event
                    </button>
                </div>

                </div>
                <div id="event-display" className='pl-7 text-gray-500 flex justify-between items-center'>
                    <h4 className='px-12 mx-5 flex-shrink-0 w-1/3'>Event Name</h4>
                    <h4 className='px-12 mx-5'>Division</h4>
                    <h4 className='px-12 mx-5'>Manage</h4>
                </div>
                <hr className=" ml-7 border-t-3 border-gray-400" />
                <div id="event-list" className='pl-12'>
                {DUMMY_EVENTS.map((event, index) => (
                <EventItem
                    key={index} // Use index as the key (only if no unique id is available)
                    name={event.name}
                    division={event.division}
                    color={index % 2 === 1 ? "white" : "#F3F4F6"}
                />
            ))}
                </div>

            </div>
            <div id="creating-new-event">

            </div>
            <div className="pb-6 pt-12"></div>
            <div id="publish-footer" className=" bg-white fixed bottom-0 left-0 w-full flex flex-col items-end  pb-5">
                <hr className='w-full border-t-3 border-black mb-2' />
                <div className="flex space-x-4 mr-5">
                    <h4 className='text-gray-500 pt-2'>Next Step: Add Admins and Event Sponsors</h4>
                    <button className="ml-6 mr-6 bg-white border border-green-800 text-green-800 rounded-full px-6 py-2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
                        Publish Tournament
                    </button>
        </div>
    </div>        
    </div>
    )



}

export default CreateEvent; 