"use client";
import React, { useState, useEffect } from 'react';
import { Hanuman } from "next/font/google";
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const TimeBlock = ({ timeBlock, key, index }) => {
  const [isTimeBlockOpen, setIsTimeBlockOpen] = useState(false);
  const [teams, setTeams] = useState(timeBlock.teams); // State for team attendance

  const handleStatusChange = (teamIndex, status) => {
    const updatedTeams = teams.map((team, i) =>
      i === teamIndex ? { ...team, present: status } : team
    );
    setTeams(updatedTeams); // Update state with the new attendance
    console.log(teams)
  };

  return (
    <div className={`grid grid-cols-1 items-center p-4 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} border-b border-gray-300`}>
      {/* Time Block Dropdown */}
      <div className="flex items-center">
        <button onClick={() => setIsTimeBlockOpen(!isTimeBlockOpen)}>
          {isTimeBlockOpen ? <FaChevronUp /> : <FaChevronDown />}
        </button>
        <h3 className="ml-4">{timeBlock.time}</h3>
      </div>

      {/* Dropdown content for Teams */}
      {isTimeBlockOpen && (
        <div className="ml-6 mt-2 pb-6 pt-6">
          {/* Team List Headers */}
          <div className="grid grid-cols-3 p-2 border-b border-gray-300">
            <span className='ml-4'>School Name</span>
            <span>Team ID</span>
            <span>Status</span>
          </div>
          <hr className="w-full border-t border-gray-300" />

          {/* Team List */}
          {teams.map((team, teamIndex) => (
            <div key={teamIndex} className={`${teamIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'} border-b border-gray-300`}>
              <div className="grid grid-cols-3 items-center p-4">
                <span>{team.schoolName}</span>
                <span>{team.teamId}</span>
                <div className="flex">
                  {/* Present/Absent Button */}
                  <div className="flex border border-black rounded-full overflow-hidden">
                    <button
                      className={`px-10 py-1 ${!team.present ? 'text-black' : 'bg-gray-200'} rounded-l-full`}
                      style={{ backgroundColor: !team.present ? '#FFB0B0' : 'transparent' }}
                      onClick={() => handleStatusChange(teamIndex, false)}
                    >
                      Absent
                    </button>

                    {/* Separator Line */}
                    <div className="w-px h-full bg-black"></div>

                    <button
                      className={`px-10 py-1 ${team.present ? 'text-black' : 'bg-gray-200'} rounded-r-full`}
                      style={{ backgroundColor: team.present ? '#B7E394' : 'transparent' }}
                      onClick={() => handleStatusChange(teamIndex, true)}
                    >
                      Present
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

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


const AttendanceView = () => {
  const events = [
    {
      name: 'Event 1',
      date: '2024-09-21',
      division: 'Division A',
      timeBlocks: [
        {
          time: '10:00 AM - 11:00 AM',
          teams: [
            { schoolName: 'School 1', teamId: 'T01', present: true },
            { schoolName: 'School 2', teamId: 'T02', present: false },
            { schoolName: 'School 1', teamId: 'T01', present: true },
            { schoolName: 'School 2', teamId: 'T02', present: false },
            { schoolName: 'School 1', teamId: 'T01', present: true },
            { schoolName: 'School 2', teamId: 'T02', present: false },
          ],
        },
        {
          time: '10:00 AM - 11:00 AM',
          teams: [
            { schoolName: 'School 1', teamId: 'T01', present: true },
            { schoolName: 'School 2', teamId: 'T02', present: false },
            { schoolName: 'School 1', teamId: 'T01', present: true },
            { schoolName: 'School 2', teamId: 'T02', present: false },
          ],
        },
      ],
    },
    {
      name: 'Event 2',
      date: '2024-09-22',
      division: 'Division B',
      timeBlocks: [
        {
          time: '1:00 PM - 2:00 PM',
          teams: [
            { schoolName: 'School 5', teamId: 'T05', present: true },
            { schoolName: 'School 6', teamId: 'T06', present: true },
          ],
        },
      ],
    },
    {
      name: 'Event 2',
      date: '2024-09-22',
      division: 'Division B',
      timeBlocks: [
        {
          time: '1:00 PM - 2:00 PM',
          teams: [
            { schoolName: 'School 5', teamId: 'T05', present: true },
            { schoolName: 'School 6', teamId: 'T06', present: true },
          ],
        },
      ],
    },
    {
      name: 'Event 1',
      date: '2024-09-21',
      division: 'Division A',
      timeBlocks: [
        {
          time: '10:00 AM - 11:00 AM',
          teams: [
            { schoolName: 'School 1', teamId: 'T01', present: true },
            { schoolName: 'School 2', teamId: 'T02', present: false },
          ],
        },
      ],
    },
    {
      name: 'Event 2',
      date: '2024-09-22',
      division: 'Division B',
      timeBlocks: [
        {
          time: '1:00 PM - 2:00 PM',
          teams: [
            { schoolName: 'School 5', teamId: 'T05', present: true },
            { schoolName: 'School 6', teamId: 'T06', present: true },
          ],
        },
      ],
    },
    {
      name: 'Event 2',
      date: '2024-09-22',
      division: 'Division B',
      timeBlocks: [
        {
          time: '1:00 PM - 2:00 PM',
          teams: [
            { schoolName: 'School 5', teamId: 'T05', present: true },
            { schoolName: 'School 6', teamId: 'T06', present: true },
          ],
        },
      ],
    },
  ];

  return (
    <div>
      <div className="h-20 border-b border-gray-300 flex items-center pl-10">
        <h1 className="font-bold text-2xl">Attendance</h1>
      </div>
      <div className="pt-5"> {/* Keep this padding to align left */}
        <EventList events={events} />
      </div>
    </div>
    );
};

export default AttendanceView;