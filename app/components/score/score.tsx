"use client";
import React, { useState, useEffect } from 'react';
import ScoreEvent from './score-event';
import axios from 'axios';

const Score = () => {
    const [events, setEvents] = useState([]);
    const [noCurrentTournaments, setNoCurrentTournaments] = useState(false); // New state to track if there are no current tournaments
    const [isAdmin, setIsAdmin] = useState(false);
    const [isEventSuperVisor, setIsEventSuperVisor] = useState(true);
    const [eventSuperVisorID, setEventSuperVisorID] = useState(1);
    const [groupId, setGroupId] = useState(1);


    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch the IDs of currently running tournaments
                const currentTournamentResponse = await axios.get(`http://localhost:3000/get-current-tournaments/${groupId}`);
                const currentTournaments = currentTournamentResponse.data;
    
                if (currentTournaments.length > 0) {
                    // Get the first tournament's ID
                    const currentTournamentId = currentTournaments[0].tournament_id;
    
                    let eventsResponse;
    
                    if (isAdmin) {
                        // Admin route: Fetch events for the current tournament
                        eventsResponse = await axios.get(`http://localhost:3000/get-events-by-tournament/${currentTournamentId}`);
                    } else if (isEventSuperVisor) {
                        // Event supervisor route: Fetch events for the current tournament by supervisor
                        eventsResponse = await axios.get(`http://localhost:3000/get-events/supervisor/${eventSuperVisorID}/tournament/${currentTournamentId}`);
                    }
    
                    // Set the events data
                    setEvents(eventsResponse.data);
                } else {
                    // If no current tournaments, set the flag
                    setNoCurrentTournaments(true);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
    
        fetchData();
    }, [isAdmin, isEventSuperVisor, events])

    return (
        <div id="score-page">
            <div id="score-header">
                <h1 className="text-3xl pl-7 pt-4 pb-5">Score - Master Score Sheet</h1>
            </div>
            <hr className='border-t-3 border-black pb-8'></hr>
            <div id="score-event-list-header" className='pl-7  text-gray-500 flex justify-between items-center'>
                <h4 className='px-12 mx-4 flex-shrink-0 w-1/4'>Event Name</h4>
                <h4 className=''>Scoring Type</h4>
                <h4 className='pl-12 ml-12 pr-4'>Status</h4>
                <h4 className='px-12 ml-5'>Percent Graded</h4>
            </div>
            <hr className='border-t-3 border-gray-400 ml-12'></hr>
            <div id="score-event-list">
                {noCurrentTournaments ? (
                    // Render this if there are no current tournaments
                    <p className="pl-7 pt-5 text-xl">There are no current tournaments.</p>
                ) : (
                    // Render the list of events if there are any
                    events.map((event, index) => (
                        <ScoreEvent
                            id={event.event_id}
                            key={index} // Use index as the key (only if no unique id is available)
                            name={event.name}
                            scoringAlg={event.scoringAlg}
                            status="In Progress"
                            progress="50"
                            color={index % 2 === 1 ? "white" : "#F3F4F6"}
                            isAdmin={isAdmin}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default Score;




