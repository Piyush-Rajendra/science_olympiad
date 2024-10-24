"use client";
import React, { useState, useEffect } from 'react';
import EventList from './eventList';
import { group } from 'console';

const AttendanceView = () => {
  const [events, setEvents] = useState([]);
  const [groupId, setGroupID] = useState(null);
  const [isAdmin, setIsAdmin] = useState(null);  // Set to null initially to check later
  const [isES, setIsES] = useState(null);  // Set to null initially to check later
  const [noCurrentTournaments, setNoCurrentTournaments] = useState(false);
  const [esID, setESID] = useState(null);

  useEffect(() => {
    // Check user role from localStorage first
    const checkUserType = () => {
      const holder = localStorage.getItem('isAdmin');
      if (holder) {
        setIsAdmin(true);
        setIsES(false);
        setGroupID(localStorage.getItem('group_id'));
      } else {
        setIsAdmin(false);
        setIsES(true);
        setGroupID(localStorage.getItem('group_id'));
        setESID(localStorage.getItem('es_id'));
      }
      
    };
    

    checkUserType();
  }, []);

  useEffect(() => {
    const fetchEventsData = async () => {
      try {
        // Fetch the IDs of currently running tournaments
        const currentTournamentResponse = await fetch(`http://localhost:3000/get-current-tournaments/${groupId}`);
        const currentTournaments = await currentTournamentResponse.json();
        if (currentTournaments.length > 0) {
          const currentTournamentId = currentTournaments[0].tournament_id;
          let eventsResponse;
          let er;

          if (isAdmin) {
            // Admin route
            eventsResponse = await fetch(`http://localhost:3000/get-events-by-tournament/${currentTournamentId}`);
            er = await eventsResponse.json();
          } else if (isES) {
            // Event Supervisor route
            eventsResponse = await fetch(`http://localhost:3000/get-events/supervisor/${esID}/tournament/${currentTournamentId}`);
            er = await eventsResponse.json();
          }

          setEvents(er);
          if (er.message) {
            setNoCurrentTournaments(true);
          }
        } else {
          setNoCurrentTournaments(false);
        }
      } catch (error) {
        alert(error);
      }
    };

    // Fetch data only when the user type is set
    if (isAdmin !== null || isES !== null) {
      fetchEventsData();
    }
  }, [isAdmin, isES, groupId, esID]);

  return (
    <div>
      <div className="h-20 border-b border-gray-300 flex items-center pl-10">
        <h1 className="font-bold text-2xl">Attendance</h1>
      </div>
      <div className="pt-5 pr-10"> {/* Keep this padding to align left */}
        {!noCurrentTournaments ? (
          <EventList isAdmin={isAdmin} events={events} />
        ) : (
          <p>No current tournaments available.</p>
        )}
      </div>
    </div>
  );
};

export default AttendanceView;
