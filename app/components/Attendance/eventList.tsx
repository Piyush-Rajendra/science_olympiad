"use client";
import React, { useState, useEffect } from 'react';
import { Hanuman } from "next/font/google";
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import Event from './Event'

const EventList = ({ events, isAdmin}) => {
    return (
        <div className="pl-10 pt-5">
          {/* Event Header */}
          <div className="grid grid-cols-3 p-2 border-b border-gray-300"> {/* Removed font-bold */}
            <div className="ml-10">Event Name</div>
            <div>Total Absences</div>
            <div className='ml-1'>Status</div>
          </div>
    
          {/* Events */}
          {events.map((event, index) => (
            <Event isAdmin={isAdmin} key={index} event={event} index={index} />
          ))}
        </div>
    );
  };

  export default EventList;