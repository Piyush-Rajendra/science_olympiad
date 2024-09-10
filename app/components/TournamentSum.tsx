"use client"

import React, { useState } from 'react';


const TorunamentSum: React.FC = () => {

    const data: {name: string, date: string, division: string, id: number}[] = [
        {name: 'ksu', date: '9/11/08', division: 'C', id: 1},
        {name: 'uga', date: '12/26/02', division: 'B', id: 2},
        {name: 'gt', date: '7/11/14', division: 'A', id: 3}
    ];

    const current: {name: string, data: string, division: string, id: number} = 
        {name: 'mga', data: '2/14/2024', division: 'F', id: 0}
    

    const filterTable = () => {

    }
    const test = () => {

    }

    const downloadScores = (id: number) => {

    }

    const[activeTournament, toggleActive] = useState(true);    

    return (
        <div>
            <div className="bg-white border-b border-gray-300 px-12 py-12">
                <h1 className="text-4xl font-extrabold">
                    Manage Tournament - Tournaments Summary
                </h1>
            </div> 
            <div className="px-12 py-12">
                <h2 className="text-3xl font-bold py-4">
                    Current Tournament
                </h2>
                <div className="rounded-2xl px-12 py-6 flex flex-col space-y-4"
                     style={{backgroundColor: '#FAFBFC', border:'2px solid #D9D9D9'}}>

                    


                    {/*
                    <h1 className="text-4xl font-extrabold py-3">
                        No Tournament Active
                    </h1>
                    <button onClick={test} className="rounded-full text-xl font-bold px-8 py-3 text-white"
                            style={{backgroundColor:'#006330'}}>
                        Create New Tournament
                    </button>
                    */}
                    <div className="flex justify-between">
                        <h1 className="text-4xl font-extrabold py-3">
                            {current.name}  |  Division {current.division}
                        </h1>
                        <button onClick={test} className="rounded-full text-xl font-bold px-8 py-3 text-white"
                                style={{backgroundColor:'#006330'}}>
                            End Tournament
                        </button>
                    </div>
                    <div className="flex justify-between">
                        <button onClick={test} className="rounded-full text-xl font-bold px-8 py-3"
                                style={{backgroundColor:'#B7E394'}}>
                            Edit Tournament
                        </button>
                        <button onClick={test} className="rounded-full text-xl font-bold px-8 py-3"
                                style={{backgroundColor:'#B7E394'}}>
                            Edit Events
                        </button>
                        <button onClick={test} className="rounded-full text-xl font-bold px-8 py-3"
                                style={{backgroundColor:'#B7E394'}}>
                            Manage Admins and Supervisors
                        </button>
                        <button onClick={test} className="rounded-full text-xl font-bold px-8 py-3"
                                style={{backgroundColor:'#B7E394'}}>
                            View Summary
                        </button>
                    </div>
                </div>
                <h2 className="text-3xl font-bold py-12">
                    Past Tournaments
                </h2>
                <input className="bg-white px-10 py-6 rounded-full w-full"
                        placeholder="Search"
                        style={{backgroundColor: '#FAFBFC', border:'2px solid #D9D9D9'}}
                        onChange={filterTable}>
                    
                </input>
                <div className="py-10">
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
                            {data.map((row, index) => (
                                <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} border-b`}>
                                    <td className="py-2 px-4">{row.name}</td>
                                    <td className="py-2 px-4">{row.date}</td>
                                    <td className="py-2 px-4">{row.division}</td>
                                    <td className="text-right py-2 px-4">
                                        <button onClick={test} className="py-4 rounded-full px-4 bg-white"
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
        </div>
        




    )
}

export default TorunamentSum;