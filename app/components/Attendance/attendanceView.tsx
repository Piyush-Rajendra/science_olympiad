"use client";
import React, { useState, useEffect } from 'react';
import EventList from './eventList';

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