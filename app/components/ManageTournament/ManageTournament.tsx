"use client"

import React, { useState, Suspense } from 'react';
const LazyEditTournament = React.lazy(() => import('./Edit/EditTournament'))
const LazyManageEvents = React.lazy(() => import('./ManageEvents'))
const LazyTournamentSum = React.lazy(() => import('./TournamentSum'))

const ManageTournament: React.FC = () => {
    
    const [name, setName] = useState("MGA");
    const [division, setDivision] = useState("A");
    const [date, setDate] = useState("10/1/24");
    const [editEvent, setEditEvents] = useState(false);
    const [summary, setSummary] = useState(true);
    const [editTourn, setEditTourn] = useState(false);

    const header = () => {
        switch (true) {
            case editEvent:
                return "Manage Events";
            case summary:
                return "Tournaments Summary";
            case editTourn:
                return "Edit Tournament";
            default:
                return "null";
        }
    }

    const openEditEvent = (name, division) => {
        setName(name);
        setDivision(division);
        setEditEvents(true);
        setSummary(false);
        setEditTourn(false);
    }

    const openSummary = (name, division, date) => {
        setName(name);
        setDivision(division);
        setDate(date)
        setEditEvents(false);
        setSummary(true);
        setEditTourn(false);
    }

    const openEditTourn = (name, division) => {
        setName(name);
        setDivision(division);
        setEditEvents(false);
        setSummary(false);
        setEditTourn(true);
    }




    return (
        <div className="font-sans">
            <div className="bg-white border-b border-gray-300 px-12 py-10">
                <h1 className="text-4xl font-bold">
                    Manage Tournament - {header()}
                </h1>
            </div> 
            <div>
                <Suspense fallback={<div>Loading Manage Events</div>}>
                    {<LazyManageEvents name={name} division={division} date = {date} id={5} 
                        isOpen={editEvent} onClose={() => openSummary(name, division, date)}/>}
                </Suspense>

                <Suspense fallback={<div>Loading Tournament Summary</div>}>
                    {<LazyTournamentSum name={name} division={division} date={date}
                        isOpen={summary} editTourn={openEditTourn}
                        editEvent={() => openEditEvent(name, division, date)}/>}
                </Suspense>

                <Suspense fallback={<div>Loading Edit Tournament</div>}>
                    {<LazyEditTournament name={name} division={division} date={date}
                        isOpen={editTourn} onClose={(name, division) => openSummary(name, division, date)}/>}
                </Suspense>

            </div>
        </div>

    )
}

export default ManageTournament;