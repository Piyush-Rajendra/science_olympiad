"use client"

import React, { useState } from 'react';
import Image from 'next/image';
const LazyEnd = React.lazy(() => import('./EndTournament'))



interface TournamentProps {
    isOpen: boolean;
    editTourn: (name: string, divison: string) => void;
    editEvent: (name: string, divison: string) => void;
    name: string;
    division: string;
    date: string;
}

interface TournamentContent {
    name: string;
    description: string;
    division: string;
    start: string;
    end: string;
    id: number;
    isCurrent: boolean;
}

const TournamentSum: React.FC<TournamentProps> = ({isOpen, editTourn, editEvent, name, division, date}: TournamentProps) => {
    if (!isOpen) return null;

    const [tournaments, setTournaments] = useState<TournamentContent[]>([
        {name: 'KSU', description: "", division: "C", start: "", end: "9/11/08", id: 0, isCurrent:false},
        {name: 'UGA', description: "", division: "B", start: "", end: "12/26/02", id: 1, isCurrent:false},
        {name: 'MGA', description: "This is a trial, making a note here: huge success", division: "A", start: "10/1/24", end: "10/19/24", id: 2, isCurrent:true}
    ])
    const [nextId, setNextId] = useState(3);
    const currentTournament = tournaments.find(tournament => tournament.isCurrent);
    if (currentTournament) {
        currentTournament.name = name
        currentTournament.division = division
        currentTournament.start = date
    }
    const pastTournaments = tournaments.filter(tournament => !tournament.isCurrent);
    const [isEndTournament, setEndTournament] = useState(false);

    const endCurrentTournament = () => {
        tournaments.find(tournament => tournament.isCurrent).isCurrent= false;
    }

    const addDummyTournament = () => {
        setTournaments([...tournaments, {name: 'GT', description: "", division: "B", start: "", end: "12/26/02", id: nextId, isCurrent:true}])
        setNextId(nextId + 1)
    }

    const downloadScores = (id: number) => {

    }



    return (
        <div>
            <div className="px-12 py-4">
                <h2 className="text-3xl font-bold py-2">
                    Current Tournament
                </h2>
                <div className="rounded-2xl px-12 py-6 flex flex-col space-y-4"
                    style={{ backgroundColor: '#FAFBFC', border: '2px solid #D9D9D9' }}>
                    <div className="px-12 py-6 flex justify-between items-start">
                        <div>
                            <p className="font-bold text-xl">{name}</p>
                            <p><strong>Division: </strong>{division}</p>
                            <p><strong>Date: </strong>{date}</p>
                            <p><strong>Location: </strong>UGA Miller Learning Center</p>
                            <p>48 Baxter St, Athens, GA 30602</p>
                        </div>
                        {/* Vertical buttons and separator */}
                        <div className="border-l-2 border-gray-300 pl-6 flex flex-col space-y-4">
                            <button
                                onClick={() => editTourn(name, division)}
                                className="py-2 px-4 rounded-full bg-white border-2 border-green-600 text-green-600"
                            >
                                Edit tournament
                            </button>
                            <button
                                onClick={() => editEvent(name, division)}
                                className="py-2 px-4 rounded-full bg-white border-2 border-green-600 text-green-600"
                            >
                                Edit events
                            </button>
                            <button
                                onClick={() => {}}
                                className="py-2 px-4 rounded-full bg-white border-2 border-green-600 text-green-600"
                            >
                                Manage admins and event supervisors
                            </button>
                            <button
                                onClick={() => setEndTournament(true)}
                                className="py-2 px-4 rounded-full bg-green-600 text-white"
                            >
                                End Tournament
                            </button>
                        </div>
                    </div>
                </div>

                <h2 className="text-3xl font-bold pt-12 pb-2">
                    Past Tournaments
                </h2>
                <div className="relative w-full">
                    <input
                        className="bg-white py-4 px-10 rounded-full w-full pl-12"
                        placeholder="Search"
                        style={{ backgroundColor: '#FAFBFC', border: '2px solid #D9D9D9' }}
                    />
                        <img src="images/search.png" alt="Search Icon"
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6"  />
                </div>
                <div className="pt-8">
                    <table className="w-full text-left table-auto min-w-max">
                        <thead className="border-b border-gray-300">
                            <tr>
                                <th className="px-4">
                                    Tournament Name
                                </th>
                                <th className="px-4">
                                    Date
                                </th>
                                <th className="px-4">
                                    Division
                                </th>

                            </tr>
                        </thead>
                        <tbody>
                            {pastTournaments.map((row, index) => (
                                <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} border-b`}>
                                    <td className="py-2 px-4">{row.name}</td>
                                    <td className="py-2 px-4">{row.end}</td>
                                    <td className="py-2 px-4">{row.division}</td>
                                    <td className="text-right py-2 px-4">
                                        <div className="flex justify-end">
                                            <button onClick={() => downloadScores(row.id)} className="py-4 rounded-full px-4 bg-white flex items-center"
                                                    style={{border:'2px solid #006330', color:'#006330'}}>
                                                <img src="images/downloading.png" alt="Download button" className="h-5 w-5 mr-2"/>
                                                Download Score Sheet
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <LazyEnd 
                isOpen={isEndTournament}
                onConfirm={endCurrentTournament}
                onClose={() => setEndTournament(false)}
            />
        </div>
    )
}

export default TournamentSum;