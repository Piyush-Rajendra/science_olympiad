"use client";
import React, { useState, useEffect } from 'react';
import { Hanuman } from "next/font/google";
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import TimeBlock from './timeBlock';

const Event = ({ event, index, isAdmin }) => {
  const [isEventOpen, setIsEventOpen] = useState(false);
  const [totalAbsent, setTotalAbsent] = useState(0);
  const [timeBlocks, setTimeBlocks] = useState([]);
  const [eventStatus, setEventStatus] = useState(event.status);
  const [currentEvent, setCurrentEvent] = useState(event);

  useEffect(() => {
    fetchData();
    fetchStatus();
    const intervalId = setInterval(() => {
      fetchStatus();
    }, 5000); // Adjust the interval time as needed

    // Clean up the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [event.event_id]);
  const fetchData = async () => {
    try {
      // Fetch the absent teams count
      const absentResponse = await fetch(`http://localhost:3000/event/${event.event_id}/absent-teams`);
      if (!absentResponse.ok) {
        throw new Error('Error fetching absent teams');
      }
      const absentData = await absentResponse.json();
      setTotalAbsent(absentData.count);
      // Fetch the time blocks for the event
      const timeBlocksResponse = await fetch(`http://localhost:3000/get-timeblock-by-event/${event.event_id}`);
      if (!timeBlocksResponse.ok) {
        throw new Error('Error fetching time blocks');
      }
      const timeBlocksData = await timeBlocksResponse.json();
      setTimeBlocks(timeBlocksData); // Assuming the backend responds with an array of time blocks

    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchStatus = async () => {
    try {
      const response = await fetch(`http://localhost:3000/events/${event.event_id}/update-status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        return;
      }
  
      const data = await response.json();
  
      // Directly update the event status from the response
      setEventStatus(data.newEventStatus);
  
    } catch (error) {
      return;
    }
  };

  return (
    <div
      className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} border-b border-gray-300`} // Use grid for consistent layout
    >
      <div className={`grid grid-cols-3 items-center p-4`}>
        {/* Event Header */}
        <div className="flex items-center space-x-4">
          <button onClick={() => setIsEventOpen(!isEventOpen)}>
            {isEventOpen ? <FaChevronUp /> : <FaChevronDown />}
          </button>
          <span className="">{event.name}</span>
        </div>
        <div className="ml-11">{totalAbsent}</div>
        <div
          id="event-status"
          className={`w-24 ml-2 p-2 border rounded text-center ${eventStatus === 1
            ? 'bg-yellow-200'
            : eventStatus === 2
              ? 'bg-green-200'
              : eventStatus === 0
                ? 'bg-red-200'
                : 'bg-gray-300' // Default background color
            }`}
          style={{ width: '140px' }} // You can adjust this value
        >
          {eventStatus === 0 && <h3 className="text-black">Not Started</h3> ||
            eventStatus === 1 && <h3 className="text-black">In Progress</h3> ||
            eventStatus === 2 && <h3 className="text-black">Completed</h3> ||
            <h3 className="text-black">Not Started</h3>}
        </div>
      </div>
      {/* Dropdown for Time Blocks with Padding */}
      {isEventOpen && (
        <div className="pl-10 pt-5 pb-10"> {/* 40px padding-left and 24px padding-bottom */}
          <div className="flex justify-between items-center p-2 pr-5 border-b border-gray-300 bg-white"> {/* Flex container for alignment */}
            <div className="ml-10">Time Block</div>
            <div className='mr-10 w-24'>Status</div> {/* Set a specific width for the header */}
          </div>
          {timeBlocks.map((timeBlock, timeIndex) => (
            <TimeBlock isAdmin={isAdmin} onEventStatusUpdate={fetchStatus} onAttendanceUpdate={fetchData} key={timeIndex} timeBlock={timeBlock} index={timeIndex} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Event;