"use client";
import React, { useState, useEffect } from 'react';
import EventList from './eventList';

const AttendanceView = () => {
  const [events, setEvents] = useState([]);
  const [groupId, setGroupID] = useState(1);
  const [isAdmin, setIsAdmin] = useState(true);
  const [isES, setIsES] = useState(false);
  const [noCurrentTournaments, setNoCurrentTournaments] = useState(false);
  const [esID, setESID] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the IDs of currently running tournaments
        const currentTournamentResponse = await fetch(`http://localhost:3000/get-current-tournaments/${groupId}`);
        const currentTournaments = await currentTournamentResponse.json();
        if (currentTournaments.length > 0) {
          // Get the first tournament's ID
          const currentTournamentId = currentTournaments[0].tournament_id;
          let eventsResponse;
          let er;

          if (isAdmin) {
            // Admin route: Fetch events for the current tournament
            eventsResponse = await fetch(`http://localhost:3000/get-events-by-tournament/${currentTournamentId}`);
            er = await eventsResponse.json();
          } else if (isES) {
            // Event supervisor route: Fetch events for the current tournament by supervisor
            eventsResponse = await fetch(`http://localhost:3000/get-events/supervisor/${esID}/tournament/${currentTournamentId}`);
            er = await eventsResponse.json();
          }

          // Set the events data
          setEvents(er);
        } else {
          // If no current tournaments, set the flag
          setNoCurrentTournaments(true);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [isAdmin, isES, events])

  return (
    <div>
      <div className="h-20 border-b border-gray-300 flex items-center pl-10">
        <h1 className="font-bold text-2xl">Attendance</h1>
      </div>
      <div className="pt-5 pr-10"> {/* Keep this padding to align left */}
        <EventList isAdmin={isAdmin} events={events} />
      </div>
    </div>
  );
};

export default AttendanceView;