"use client";

import React, { useState, Suspense } from 'react';
const LazyEditTournament = React.lazy(() => import('./Edit/EditTournament'));
const LazyManageEvents = React.lazy(() => import('./ManageEvents'));
const LazyTournamentSum = React.lazy(() => import('./TournamentSum'));
const CreateTourneyLanding = React.lazy(() => import('../create-tourney/create-tourney-landing'));

const ManageTournament: React.FC = () => {
    const [name, setName] = useState("MGA");
    const [division, setDivision] = useState("A");
    const [date, setDate] = useState("10/1/24");
    const [showCreateTournament, setShowCreateTournament] = useState(false);
    const [editEvent, setEditEvents] = useState(false);
    const [summary, setSummary] = useState(true);
    const [editTourn, setEditTourn] = useState(false);

    const header = () => {
        if (showCreateTournament) return "Create New Tournament";
        if (editEvent) return "Manage Events";
        if (summary) return "Tournaments Summary";
        if (editTourn) return "Edit Tournament";
        return "null";
    }

    const openEditEvent = (name: string, division: string) => {
        setName(name);
        setDivision(division);
        setEditEvents(true);
        setSummary(false);
        setEditTourn(false);
        setShowCreateTournament(false); // Ensure to set this to false
    }

    const openSummary = (name: string, division: string, date: string) => {
        setName(name);
        setDivision(division);
        setDate(date);
        setEditEvents(false);
        setSummary(true);
        setEditTourn(false);
        setShowCreateTournament(false); // Ensure to set this to false
    }

    const openEditTourn = (name: string, division: string) => {
        setName(name);
        setDivision(division);
        setEditEvents(false);
        setSummary(false);
        setEditTourn(true);
        setShowCreateTournament(false); // Ensure to set this to false
    }

    const handleCreateTournament = () => {
        setShowCreateTournament(true);
        setEditEvents(false);
        setSummary(false);
        setEditTourn(false);
    }

    return (
        <div>
            <div>
                {showCreateTournament ? (
                    <Suspense fallback={<div>Loading Create Tournament</div>}>
                        <CreateTourneyLanding />
                    </Suspense>
                ) : (
                    <div>
                                <div className="h-20 border-b border-gray-300 flex items-center pl-10">
                <h1 className="font-bold text-2xl">
                    Manage Tournament - {header()}
                </h1>
            </div>
                        <Suspense fallback={<div>Loading Manage Events</div>}>
                            <LazyManageEvents
                                name={name}
                                division={division}
                                date={date}
                                id={5}
                                isOpen={editEvent}
                                onClose={() => openSummary(name, division, date)}
                            />
                        </Suspense>

                        <Suspense fallback={<div>Loading Tournament Summary</div>}>
                            <LazyTournamentSum
                                name={name}
                                division={division}
                                date={date}
                                isOpen={summary}
                                editTourn={openEditTourn}
                                editEvent={() => openEditEvent(name, division)}
                                onCreateTournament={handleCreateTournament} // Pass down the handler
                            />
                        </Suspense>

                        <Suspense fallback={<div>Loading Edit Tournament</div>}>
                            <LazyEditTournament
                                name={name}
                                division={division}
                                date={date}
                                isOpen={editTourn}
                                onClose={() => openSummary(name, division, date)}
                            />
                        </Suspense>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ManageTournament;
