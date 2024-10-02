"use client"

import React, { useState } from 'react';
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
                <h2 className="text-3xl font-bold py-4">
                    Current Tournament
                </h2>
                <div className="rounded-2xl px-12 py-6 flex flex-col space-y-4"
                     style={{backgroundColor: '#FAFBFC', border:'2px solid #D9D9D9'}}>

                        {currentTournament ? (
                            <>
                                <div className="flex justify-between">
                                    <h1 className="text-4xl font-bold py-3">
                                        {currentTournament.name}  |  Division {currentTournament.division}
                                    </h1>
                                    <button onClick={() => setEndTournament(true)} className="rounded-full text-xl font-bold px-8 py-3 text-white"
                                            style={{backgroundColor:'#006330'}}>
                                        End Tournament
                                    </button>
                                </div>
                                <div className="flex justify-between">
                                    <button onClick={() => editTourn(currentTournament.name, currentTournament.division)} className="rounded-full text-xl px-8 py-3"
                                            style={{backgroundColor:'#B7E394'}}>
                                        Edit Tournament
                                    </button>
                                    <button onClick={() => editEvent(currentTournament.name, currentTournament.division)} className="rounded-full text-xl px-8 py-3"
                                            style={{backgroundColor:'#B7E394'}}>
                                        Edit Events
                                    </button>
                                    <button className="rounded-full text-xl px-8 py-3"
                                            style={{backgroundColor:'#B7E394'}}>
                                        Manage Admins and Supervisors
                                    </button>
                                    <button className="rounded-full text-xl px-8 py-3"
                                            style={{backgroundColor:'#B7E394'}}>
                                        View Summary
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="flex justify-between">
                                <h1 className="text-4xl font-bold py-3">
                                    No Tournament Active
                                </h1>
                                <button onClick={() => addDummyTournament()} className="rounded-full text-xl font-bold px-8 py-3 text-white"
                                        style={{backgroundColor:'#006330'}}>
                                    Create New Tournament
                                </button>
                                </div>
                            </>
                        )}
                    
                </div>
                <h2 className="text-3xl font-bold pt-12 pb-2">
                    Past Tournaments
                </h2>
                <input className="bg-white px-10 py-4 rounded-full w-full"
                        placeholder="Search"
                        style={{backgroundColor: '#FAFBFC', border:'2px solid #D9D9D9'}}
                        >
                    
                </input>
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
                                        <button onClick={() => downloadScores(row.id)} className="py-4 rounded-full px-4 bg-white"
                                                style={{border:'2px solid #006330', color:'#006330'}}>
                                            Download Score Sheet
                                        </button>
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