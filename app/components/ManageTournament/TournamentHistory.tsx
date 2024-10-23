import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface TournamentHistoryContent {
    tournament_history_id: number;
    school_group_id: number;
    date: string;
    name: string;
    division: string;
}

const TournamentHistory: React.FC = () => {
    const [tournamentHistory, setTournamentHistory] = useState<TournamentHistoryContent[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>(''); // State for search input

    useEffect(() => {
        const fetchTournamentHistory = async () => {
            const groupId = localStorage.getItem('group_id');
            if (groupId) {
                try {
                    const response = await fetch(`http://localhost:3000/get-tournament-history/${groupId}`);
                    const data: TournamentHistoryContent[] = await response.json();
                    
                    // Sort by most recent date
                    const sortedData = data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
                    setTournamentHistory(sortedData);
                } catch (error) {
                    console.error('Error fetching tournament history:', error);
                }
            }
        };

        fetchTournamentHistory();
    }, []);

    const handleDownload = (tournamentId: number) => {
        const url = `http://localhost:3000/tournament-history/${tournamentId}/download`;
        window.open(url, '_blank');
    };

    // Filtered tournaments based on the search query
    const filteredTournaments = tournamentHistory.filter(tournament =>
        tournament.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="pt-0">
            <h2 className="text-2xl font-bold pt-12 pb-2">Past Tournaments</h2>
            {/* Search Bar */}
            <div className="mb-4 flex items-center" style={{ height: '48px' }}>
                <div className="relative w-full">
                    <img 
                        src="/images/search.png" // Replace with your search icon path
                        alt="Search"
                        className="absolute left-3 top-1.5 w-5 h-5"                         
                    />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by tournament name..."
                        className="pl-10 py-2 border border-gray-300 rounded-full w-full" 
                    />
                </div>
            </div>

            {/* Scrollable Table Container */}
            <div style={{ maxHeight: '400px', overflowY: 'auto', marginBottom: "40px"}}>
                <table className="w-full text-left table-auto min-w-max">
                    <thead className="border-b border-gray-300">
                        <tr>
                            <th className="px-4 py-2">Tournament Name</th>
                            <th className="px-4 py-2">Date</th>
                            <th className="px-4 py-2">Division</th>
                            <th className="px-4 py-2">Download Score</th>
                        </tr>
                    </thead>
                    <tbody className="min-h-[40px]">
                        {filteredTournaments.length > 0 ? (
                            filteredTournaments.map((row, index) => (
                                <tr key={row.tournament_history_id} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} border-b`}>
                                    <td className="py-4 px-4">{row.name}</td> {/* Increased padding */}
                                    <td className="py-4 px-4">{new Date(row.date).toLocaleDateString()}</td>
                                    <td className="py-4 px-4">{row.division}</td>
                                    <td className="py-4 px-4 flex items-center">
                                        <button
                                            onClick={() => handleDownload(row.tournament_history_id)}
                                            className="flex items-center text-[#006330] hover:underline"
                                        >
                                            <img className="w-5 h-5 mr-3" src="/images/downloading.png" 
                                            style={{ filter: 'brightness(0) saturate(100%) invert(32%) sepia(75%) saturate(1084%) hue-rotate(98deg) brightness(97%) contrast(98%)' }} 
                                            />
                                            Download Score Sheet
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className="py-4 text-center text-gray-500">No tournaments found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TournamentHistory;
