"use client";

import React, { useEffect, useState, Suspense } from 'react';
import TournamentHistory from './TournamentHistory';

const LazyEnd = React.lazy(() => import('./EndTournament'));

interface TournamentProps {
  isOpen: boolean;
  editTourn: (name: string, division: string) => void;
  editEvent: (name: string, division: string) => void;
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

const TournamentSum: React.FC<TournamentProps> = ({ isOpen, editTourn, editEvent }: TournamentProps) => {
  const [tournament, setTournament] = useState<TournamentContent | null>(null);
  const [isEndTournament, setEndTournament] = useState(false);

  useEffect(() => {
    const fetchCurrentTournament = async () => {
      const groupId = localStorage.getItem('group_id');
      if (groupId) {
        try {
          const response = await fetch(`http://localhost:3000/get-current-tournaments/${groupId}`);
          const data: TournamentContent[] = await response.json();
          if (data.length > 0) {
            setTournament(data[0]); // Assuming you're only fetching one current tournament
          }
        } catch (error) {
          console.error('Error fetching current tournament:', error);
        }
      }
    };

    fetchCurrentTournament();
  }, []);

  if (!isOpen) return null;

  const handleEndCurrentTournament = () => {
    setEndTournament(true); // This will trigger the lazy loading of the EndTournament component
  };

  const handleConfirmEndTournament = () => {
    // Add the logic to handle the tournament ending
    console.log("Tournament ended."); // Replace with actual logic
    setTournament(null); // Clear tournament state
  };
  return (
    <div>
      <div className="px-12 py-4">
        <h2 className="text-2xl font-bold py-2">Current Tournament</h2>
        <div className="rounded-2xl px-5 py-5 flex space-x-10 mb-0" style={{ backgroundColor: '#FAFBFC', border: '2px solid #D9D9D9' }}>
          {tournament && tournament.isCurrent === 1 ? (
            <div className="flex justify-between items-start w-full">
            {/* Left Section - Tournament Info */}
            <div className="flex-1 pr-5"> {/* Reduced padding */}
              <p className="font-bold text-4xl mb-6">{tournament.name}</p> {/* Reduced font size and margin */}
              <div className="space-y-2.5"> {/* Reduced space between items */}
                <div className="flex">
                  <strong className="text-[#666666] w-1/5 text-lg">Division:</strong> {/* Reduced font size */}
                  <span className="text-sm">{tournament.division}</span> {/* Reduced font size */}
                </div>
                <div className="flex">
                  <strong className="text-[#666666] w-1/5 text-lg">Date:</strong> {/* Reduced font size */}
                  <span className="text-sm">{new Date(tournament.date).toLocaleDateString()}</span> {/* Reduced font size */}
                </div>
                <div className="flex">
                  <strong className="text-[#666666] w-1/5 text-lg">Location:</strong> {/* Reduced font size */}
                  <span className="text-sm">{tournament.location}</span> {/* Reduced font size */}
                </div>
                <div className="flex">
                  <strong className="text-[#666666] w-1/5 text-lg">Description:</strong> {/* Reduced font size */}
                  <span className="w-2/4 text-sm">{tournament.description}</span> {/* Reduced font size */}
                </div>
              </div>
            </div>

            {/* Right Section - Buttons */}
            <div className="w-1/4 pl-4 border-l-2 border-gray-300 flex flex-col space-y-5"> {/* Reduced width and space */}
              <button
                onClick={() => editTourn(tournament.name, tournament.division)}
                className="py-2 px-3 rounded-full bg-white border-2 border-[#006330] text-[#006330] hover:bg-[#F1F1F1] text-sm"> {/* Reduced padding and font size */}
                Manage Tournaments
              </button>
              <button
                onClick={() => editEvent(tournament.name, tournament.division)}
                className="py-2 px-3 rounded-full bg-white border-2 border-[#006330] text-[#006330] hover:bg-[#F1F1F1] text-sm"> {/* Reduced padding and font size */}
                Manage Events
              </button>
              <button
                onClick={() => {}}
                className="py-2 px-3 rounded-full bg-white border-2 border-[#006330] text-[#006330] hover:bg-[#F1F1F1] text-sm"> {/* Reduced padding and font size */}
                Manage Users
              </button>
              <button
                onClick={() => setEndTournament(true)}
                className="py-2 px-3 rounded-full bg-[#006330] text-white hover:bg-[#00401E] text-sm"> {/* Reduced padding and font size */}
                End Tournament
              </button>
            </div>
          </div>

          ) : (
          <div className="flex justify-between items-center w-full"> {/* Ensure the container takes full width */}
            <p className="font-bold text-3xl ml-5">No Tournament Active</p>
            <button className="py-2 px-4 rounded-full bg-[#006330] hover:bg-[#00401E] text-white mr-6 px-9">
              Create new tournament
            </button>
          </div>
          )}
        </div>
         {/* Lazy Loaded EndTournament Component */}
        {isEndTournament && (
          <Suspense fallback={<div>Loading...</div>}>
            <LazyEnd 
              isOpen={isEndTournament} 
              onConfirm={handleConfirmEndTournament} 
              onClose={() => setEndTournament(false)} 
            />
          </Suspense>
        )}
        <div className='mt-0'>
          <TournamentHistory />
        </div>
      </div>
    </div>
  );
};

export default TournamentSum;
