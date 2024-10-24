"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import DeleteIcon from '../../../images/delete.png';
import Image from 'next/image';

const AddTeamTimeBlockEvents = (props) => {
  const [events, setEvents] = useState([]);
  const [selectedTimeBlocks, setSelectedTimeBlocks] = useState({});
  const [teamsByTimeBlock, setTeamsByTimeBlock] = useState({});
  const [openTimeBlocks, setOpenTimeBlocks] = useState({});
  const [openTeams, setOpenTeams] = useState({});

  // Fetch events when the component mounts
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/get-events-by-tournament/${props.id}`);
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  // Fetch time blocks for a specific event
  const fetchTimeBlocks = async (eventId) => {
    if (openTimeBlocks[eventId]) {
      // If already open, just close it
      setOpenTimeBlocks((prev) => ({ ...prev, [eventId]: false }));
      return;
    }

    try {
      const response = await axios.get(`http://localhost:3000/get-timeblock-by-event/${eventId}`);
      setSelectedTimeBlocks((prev) => ({ ...prev, [eventId]: response.data }));
      setOpenTimeBlocks((prev) => ({ ...prev, [eventId]: true }));
    } catch (error) {
      console.error("Error fetching time blocks:", error);
    }
  };

  // Fetch teams for a specific time block
  const fetchTeams = async (timeBlockId) => {
    if (openTeams[timeBlockId]) {
      // If already open, just close it
      setOpenTeams((prev) => ({ ...prev, [timeBlockId]: false }));
      return;
    }

    try {
      const response = await axios.get(`http://localhost:3000/get-team-timeblocks-by-timeblock-detailed/${timeBlockId}`);
      setTeamsByTimeBlock((prev) => ({ ...prev, [timeBlockId]: response.data }));
      setOpenTeams((prev) => ({ ...prev, [timeBlockId]: true }));
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };

  // Handle deleting a team from a time block
  const handleDeleteTeam = async (teamId, timeBlockId) => {
    // Ask for confirmation before proceeding with deletion
    const confirmDelete = window.confirm("Are you sure you want to delete this team?");
    if (!confirmDelete) {
      return; // Abort if the user cancels
    }

    try {
      await axios.delete(`http://localhost:3000/delete-team-timeblock/${teamId}`);
      // Update the teamsByTimeBlock state to reflect the deletion
      setTeamsByTimeBlock((prev) => {
        const updatedTeams = { ...prev };
        // Filter out the deleted team
        updatedTeams[timeBlockId] = updatedTeams[timeBlockId].filter(team => team.TeamTimeBlock_ID !== teamId);
        return updatedTeams;
      });
    } catch (error) {
      console.error("Error deleting team:", error);
    }
  };

  return (
    <div className="p-4 bg-white border-2 border-gray-300 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Events and Time Blocks</h2>
      <div style={{ maxHeight: '675px' }} className="overflow-y-auto scrollbar-hidden"> {/* Add this div for scrolling */}
        {events.map((event, index) => (
          <div 
            key={event.event_id} 
            className={` border-b border-gray-300 pb-4 ${index % 2 === 0 ? "bg-white" : "bg-gray-100"}`} // Alternate background
          >
            <h3 className="text-lg font-semibold pt-4 flex items-center">
              <button 
                onClick={() => fetchTimeBlocks(event.event_id)} 
                className="ml-2 focus:outline-none mr-5"
              >
                {openTimeBlocks[event.event_id] ? (
                  <FaChevronUp /> // Up chevron
                ) : (
                  <FaChevronDown /> // Down chevron
                )}
              </button>
              {event.name}
            </h3>

            {openTimeBlocks[event.event_id] && selectedTimeBlocks[event.event_id] && (
              <div className="mt-2">
                {selectedTimeBlocks[event.event_id].map((timeBlock, index) => (
                  <div key={timeBlock.TimeBlock_ID} className={`mb-4 p-2 border rounded-md ${index % 2 === 0 ? "bg-white" : "bg-gray-100"} `}>
                    <div className="flex justify-between items-center">
                      <span>
                        <b>{new Date(timeBlock.TimeBegin).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - 
                        {new Date(timeBlock.TimeEnd).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</b> 
                        <span className="ml-2">| Location: {timeBlock.Buildings} | Room: {timeBlock.RoomNumber}</span>
                      </span>
                      <button 
                        onClick={() => fetchTeams(timeBlock.TimeBlock_ID)} 
                        className="focus:outline-none"
                      >
                        {openTeams[timeBlock.TimeBlock_ID] ? (
                          <FaChevronUp /> // Up chevron
                        ) : (
                          <FaChevronDown /> // Down chevron
                        )}
                      </button>
                    </div>

                    {openTeams[timeBlock.TimeBlock_ID] && (
                      <div className="mt-2">
                        {teamsByTimeBlock[timeBlock.TimeBlock_ID] && teamsByTimeBlock[timeBlock.TimeBlock_ID].length > 0 ? (
                          teamsByTimeBlock[timeBlock.TimeBlock_ID].map((team, index) => (
                            <div key={team.TeamTimeBlock_ID} className={`flex justify-between items-center p-2 rounded-md mb-2 ${index % 2 === 0 ? "bg-white" : "bg-gray-100"}`}>
                              <span>{team.team_name} | Flight: {team.flight} | Tier: {team.Tier}</span>
                              <button 
                                className="text-red-500 hover:text-red-700"
                                onClick={() => handleDeleteTeam(team.TeamTimeBlock_ID, timeBlock.TimeBlock_ID)} // Pass team ID and time block ID
                              >
                                <Image src={DeleteIcon} alt="Delete" className="mx-auto w-5 h-5" />
                              </button>
                            </div>
                          ))
                        ) : (
                          <div className="text-gray-500">No teams available for this time block.</div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddTeamTimeBlockEvents;
