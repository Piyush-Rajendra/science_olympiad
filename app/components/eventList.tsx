"use client";
import React, { useState, useEffect } from 'react';
import { Hanuman } from "next/font/google";
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import Event from './Event'

const EventList = ({ events }) => {
    return (
        <div className="px-10 pt-5">
          {/* Event Header */}
          <div className="grid grid-cols-3 p-2 border-b border-gray-300"> {/* Removed font-bold */}
            <div className="ml-10">Event Name</div>
            <div>Date</div>
            <div>Division</div>
          </div>
    
          {/* Events */}
          {events.map((event, index) => (
            <Event key={index} event={event} index={index} />
          ))}
        </div>
    );
  };

  export default EventList;