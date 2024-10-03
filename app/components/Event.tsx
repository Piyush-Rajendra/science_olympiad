"use client";
import React, { useState, useEffect } from 'react';
import { Hanuman } from "next/font/google";
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import TimeBlock from './TimeBlock';

const Event = ({ event, index }) => {
    const [isEventOpen, setIsEventOpen] = useState(false);
  
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
          <div>{event.date}</div>
          <div>{event.division}</div>
      </div>
      {/* Dropdown for Time Blocks with Padding */}
      {isEventOpen && (
        <div className="px-10 pt-5 pb-10"> {/* 40px padding-left and 24px padding-bottom */}
            <div className="p-2 border-b border-gray-300"> {/* Removed font-bold */}
              <div className="ml-10">Time Bock</div>
          </div>
          {event.timeBlocks.map((timeBlock, timeIndex) => (
            <TimeBlock key={timeIndex} timeBlock={timeBlock} index={timeIndex} />
          ))}
        </div>
      )}
    </div>
    );
  };

  export default Event;