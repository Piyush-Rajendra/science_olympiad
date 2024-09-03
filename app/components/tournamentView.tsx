"use client";
import React, { useState, useEffect } from 'react';
import { Hanuman } from "next/font/google";

const hanuman = Hanuman({
  subsets: ["latin"],
  weight: "400", // Specify the weight you need, e.g., 400 for normal
});

type Event = {
  name: string;
};

const TournamentView = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [tourneyName, setTourneyName] = useState('');
  const [division, setDivision] = useState('');
  const [showAddEventForm, setShowAddEventForm] = useState(false);
  const [newEventName, setNewEventName] = useState('');

  const DUMMY_EVENTS = [
    { name: "Event #1" },
    { name: "Event #2" },
    { name: "Event #3" },
    { name: "Event #4" },
    { name: "Event #5" },
    { name: "Event #6" },
    { name: "Event #7" },
    { name: "Event #8" },
    { name: "Event #9" },
    { name: "Event #10" },
  ];

  useEffect(() => {
    setEvents(DUMMY_EVENTS);
    setTourneyName('TOURNEY TITLE');
    setDivision('C');
  }, []);

  const handleAddEventClick = () => {
    setShowAddEventForm(true);
  };

  const handleAddEventCancel = () => {
    setShowAddEventForm(false);
  };


  const handleAddEventSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newEventName.trim() !== '') {
      setEvents([...events, { name: newEventName }]);
      setNewEventName('');
      setShowAddEventForm(false);
    }
  };

  return (
    <div className={`${hanuman.className} flex flex-col h-screen bg-light-mint font-serif`}>
      <div id="title=division" className="flex flex-col items-center pt-12 text-dark-navy">
        <h1 className="text-4xl">{tourneyName}</h1>
        <h2 className="text-2xl">DIVISION {division}</h2>
      </div>
      <div id="add-event" className="self-start ml-12 mt-10 pb-6 pl-10">
        <button
          onClick={handleAddEventClick}
          className="bg-ocean-blue text-grass-lime text-m py-3 px-9 rounded-2xl focus:outline-none focus:shadow-outline hover:scale-95"
          style={{ minWidth: '6rem' }} // Ensure the button has a minimum width for better appearance
        >
          Add Event
        </button>
      </div>
      {showAddEventForm && (
        <div className=' flex flex-col items-center'>
        <div className="bg-sea-blue py-4 px-12 rounded-2xl mt-5 ml-12 shadow-lg inline-block">
          <h2 className="text-xl mb-4 text-ocean-blue">Add New Event</h2>
          <form onSubmit={handleAddEventSubmit}>
            <input
              type="text"
              value={newEventName}
              onChange={(e) => setNewEventName(e.target.value)}
              className="border p-2 rounded w-full mb-4"
              placeholder="Event Name"
            />
            <button
              type="submit"
              className="bg-sky-blue text-white py-2 px-4 rounded hover:bg-green-600"
            >
              Submit
            </button>
          </form>
          <button onClick={handleAddEventCancel}className='bg-sky-blue text-white py-2 px-4 mt-5 rounded hover:bg-green-600'>Cancel</button>
        </div>
        </div>
      )}
      <div id="events" className="flex flex-col flex-1 overflow-y-auto">
        <div className="self-start ml-12 mt-6 pb-2 pl-12">
          <h2 className='text-2xl'>Events</h2>
        </div>
        <div id="event-boxes" className="pl-9">
          {events.map((event, index) => (
            <div key={index} className="bg-sea-blue inline-block p-4 rounded-2xl mt-5 ml-12 hover:scale-95 hover:cursor-pointer">
              <div className="flex space-x-4 items-center">
                <h1 className="text-ocean-blue">{event.name}</h1>
                <h2>Edit</h2>
                <h2>Delete</h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TournamentView;
