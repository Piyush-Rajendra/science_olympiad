"use client";

import React, { useEffect, useState, Suspense } from 'react';
import TournamentHistory from './TournamentHistory';
import ManageEvents from './ManageEvents'; // Import the new component
import ManageUsers from '../../pages/manageUsers';
import EditTournament from './Edit/EditTournament';
import EditTourney from '../create-tourney/edit-tourney';
const LazyEnd = React.lazy(() => import('./EndTournament'));
import CreateTourneyLanding from '../create-tourney/create-tourney-landing'; // Not needed here anymore

interface TournamentProps {
    isOpen: boolean;
    editTourn: (name: string, division: string) => void;
    editEvent: (name: string, division: string) => void;
    onCreateTournament: () => void; // Add this line
}

interface TournamentContent {
    tournament_id: number;
    group_id: number;
    isCurrent: number;
    division: string;
    name: string;
    date: string;
    location: string;
    description: string;
}

interface TournamentHistoryContent {
  tournament_history_id: number;
  school_group_id: number;
  date: string;
  name: string;
  division: string;
}

const TournamentSum: React.FC<TournamentProps> = ({ isOpen, editTourn, editEvent, onCreateTournament }) => {
    const [tournamentHistory, setTournamentHistory] = useState<TournamentHistoryContent[]>([]);
    const [tournament, setTournament] = useState<TournamentContent | null>(null);
    const [isEndTournament, setEndTournament] = useState(false);
    const [tourneyId, setTourneyId] = useState<number | null>(null);
    const [groupId, setGroupID] = useState(localStorage.getItem('group_id'));
    const [view, setView] = useState<'summary' | 'manageTournament' | 'manageEvents' | 'manageUsers'>('summary'); // New state to handle views
    const [isTournamentDirector, setIsTournamentDirector] = useState(localStorage.getItem('isTournamentDirector'));

    useEffect(() => {
        const fetchCurrentTournament = async () => {
            if (groupId) {
                try {
                    const response = await fetch(`http://localhost:3000/get-current-tournaments/${groupId}`);
                    const data: TournamentContent[] = await response.json();
                    if (data.length > 0) {
                        setTournament(data[0]); // Assuming you're only fetching one current tournament
                        setTourneyId(data[0].tournament_id);
                    }
                } catch (error) {
                    console.error('Error fetching current tournament:', error);
                }
            }
        };

        fetchCurrentTournament();
    }, [groupId]);

    if (!isOpen) return null;

    const handleEndCurrentTournament = () => {
        setEndTournament(true); // This will trigger the lazy loading of the EndTournament component
    };

    const handleConfirmEndTournament = () => {
        setTournament(null); // Clear tournament state
    };

    useEffect(() => {
        const fetchTournamentHistory = async () => {
            const groupId = localStorage.getItem('group_id');
            if (groupId) {
                try {
                    const response = await fetch(`http://localhost:3000/get-tournament-history/${groupId}`);
                    const data: TournamentHistoryContent[] = await response.json();

                    const sortedData = data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
                    setTournamentHistory(sortedData);
                } catch (error) {
                    console.error('Error fetching tournament history:', error);
                }
            }
        };

        fetchTournamentHistory();
    }, []);
          
    if (view === 'manageEvents') {
    return <ManageEvents tournament_id={tourneyId} isFromCreateTournament={false} isOpen={true}
    onClose={() => {}} />;
  }

  if (view === 'manageUsers') {
    return <ManageUsers />;
  }

  if (view === 'manageTournament') {
    return <EditTourney id={tourneyId} />;
  }

    const handleDownload = (tournamentId: number) => {
        const url = `http://localhost:3000/export-scores/${tournamentId}`;
        window.open(url, '_blank');
    };

    return (
        <div>
            <div className="px-12 py-4">
                <h2 className="text-2xl font-bold py-2">Current Tournament</h2>
                <div className="rounded-2xl px-5 py-5 flex space-x-10 mb-0" style={{ backgroundColor: '#FAFBFC', border: '2px solid #D9D9D9' }}>
                    {tournament && tournament.isCurrent === 1 ? (
                        <div className="flex justify-between items-start w-full">
                            <div className="flex-1 pr-5">
                                <p className="font-bold text-4xl mb-6">{tournament.name}</p>
                                <div className="space-y-2.5">
                                    <div className="flex">
                                        <strong className="text-[#666666] w-1/5 text-lg">Division:</strong>
                                        <span className="text-sm">{tournament.division}</span>
                                    </div>
                                    <div className="flex">
                                        <strong className="text-[#666666] w-1/5 text-lg">Date:</strong>
                                        <span className="text-sm">{new Date(tournament.date).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex">
                                        <strong className="text-[#666666] w-1/5 text-lg">Location:</strong>
                                        <span className="text-sm">{tournament.location}</span>
                                    </div>
                                    <div className="flex">
                                        <strong className="text-[#666666] w-1/5 text-lg">Description:</strong>
                                        <span className="w-2/4 text-sm">{tournament.description}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="w-1/4 pl-4 border-l-2 border-gray-300 flex flex-col space-y-5">
                                <button
                                    onClick={() => setView('manageTournament')}
                                    className="py-2 px-3 rounded-full bg-white border-2 border-[#006330] text-[#006330] hover:bg-[#F1F1F1] text-sm"
                                >
                                    Manage Tournaments
                                </button>
                                <button
                                    onClick={() => setView('manageEvents')}
                                    className="py-2 px-3 rounded-full bg-white border-2 border-[#006330] text-[#006330] hover:bg-[#F1F1F1] text-sm"
                                >
                                    Manage Events
                                </button>
                                <button
                                    onClick={() => setView('manageUsers')}
                                    className="py-2 px-3 rounded-full bg-white border-2 border-[#006330] text-[#006330] hover:bg-[#F1F1F1] text-sm"
                                >
                                    Manage Users
                                </button>
                                <button
                                    onClick={() => handleDownload(tournament.tournament_id)}
                                    className="py-2 px-3 rounded-full bg-white border-2 border-[#006330] text-[#006330] hover:bg-[#F1F1F1] text-sm"
                                >
                                    Download Current Score Sheet
                                </button>
                                <button
                                    onClick={handleEndCurrentTournament}
                                    className="py-2 px-3 rounded-full bg-[#006330] text-white hover:bg-[#00401E] text-sm"
                                >
                                    End Tournament
                                </button>
                                <button
                                    onClick={onCreateTournament} // Update this line
                                    className={`py-2 px-4 rounded-full ${
                                        isTournamentDirector === '1'
                                            ? 'bg-[#006330] hover:bg-[#00401E] text-white'
                                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    } mr-6 px-9`}
                                    disabled={isTournamentDirector !== '1'}
                                >
                                    Create new tournament
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex justify-between items-center w-full">
                            <p className="font-bold text-3xl ml-5">No Tournament Active</p>
                            <button
                                className={`py-2 px-4 rounded-full ${
                                    isTournamentDirector === '1'
                                        ? 'bg-[#006330] hover:bg-[#00401E] text-white'
                                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                } mr-6 px-9`}
                                disabled={isTournamentDirector !== '1'}
                                onClick={isTournamentDirector === '1' ? onCreateTournament : undefined} // Update this line
                            >
                                Create new tournament
                            </button>
                        </div>
                    )}
                </div>

                {isEndTournament && (
                    <Suspense fallback={<div>Loading...</div>}>
                        <LazyEnd isOpen={isEndTournament} onConfirm={handleConfirmEndTournament} onClose={() => setEndTournament(false)} />
                    </Suspense>
                )}
                <div className="mt-0">
                    <TournamentHistory />
                </div>
            </div>
        </div>
    );
};

export default TournamentSum;
