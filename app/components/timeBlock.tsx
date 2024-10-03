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

export default TimeBlock;