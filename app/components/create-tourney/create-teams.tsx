"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Menu } from '@headlessui/react';

const CreateTeams = ({ name, division, date, onClose }) => {
  const handleNextStep = () => {};

  const [schools, setSchools] = useState([]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div className="px-12 py-6">
        <div className="flex space-x-10 border-b border-gray-300">
          <h1 className="text-4xl font-bold">{name}</h1>
          <h1 className="text-4xl font-bold">{date instanceof Date ? date.toLocaleDateString() : date}</h1>
          <h1 className="text-4xl font-bold" style={{ color: '#006330' }}>
            Division {division}
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow">
        <div className="grid grid-cols-4 p-2 border-b border-gray-300"> {/* Removed font-bold */}
          <div className="ml-10">School Name</div>
          <div>Team ID</div>
          <div className="ml-1">Flight</div>
          <div>Manage</div>
        </div>
        {/* You can populate school data here */}
        {/* Example */}
        <div className="grid grid-cols-4 p-2 border-b border-gray-300">
          <div className="ml-10">Example School</div>
          <div>12345</div>
          <div className="ml-1">A</div>
          <div>Manage Button</div>
        </div>
      </div>

      {/* Footer: Buttons */}
      <div className="bg-gray-50 sticky bottom-0 flex justify-end px-12 space-x-2 text-center py-4 border-t border-gray-300">
        <h4 className="text-gray-500 pt-2 mr-4">Next Step: Add Schools</h4>
        <button
          className="bg-white border border-green-800 text-green-800 rounded-full px-6 py-2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          onClick={onClose}
        >
          Back
        </button>
        <button
          className="bg-green-800 text-white rounded-full px-6 py-2 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CreateTeams;
