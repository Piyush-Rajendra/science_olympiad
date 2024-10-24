import { useState, useEffect } from "react";

interface Props {
    isOpen: boolean;
    onConfirm: () => void;
    onClose: () => void;
}

const EndTournament: React.FC<Props> = ({ isOpen, onConfirm, onClose }) => {
    const [groupId, setGroupID] = useState(localStorage.getItem('group_id'));
    const [tourneyId, setTourneyId] = useState<number | null>(null);
    const [tournamentData, setTournamentData] = useState<any | null>(null); // Store the tournament data

    // Fetch the tournament data when the component mounts
    useEffect(() => {
        const fetchCurrentTournament = async () => {
            if (groupId) {
                try {
                    const response = await fetch(`http://localhost:3000/get-current-tournaments/${groupId}`);
                    const data = await response.json();
                    if (data.length > 0) {
                        setTourneyId(data[0].tournament_id);  // Get tournament ID
                        setTournamentData(data[0]);  // Store the tournament data
                    }                    
                } catch (error) {
                    console.error('Error fetching tournament data:', error);
                }
            }
        };
        fetchCurrentTournament();
    }, [groupId]);

    if (!isOpen) return null;

    // When the user confirms ending the tournament
    const submit = async () => {
        if (tourneyId && tournamentData) {
            onConfirm();  // Perform any confirmation logic
            onClose();    // Close the modal

            try {
                // Post the tournament data to add-history
                const response = await fetch(`http://localhost:3000/tournaments/${tourneyId}/add-history/${groupId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: tournamentData.name,   // Tournament name
                        date: tournamentData.date,   // Tournament date
                        division: tournamentData.division // Tournament division
                    }),
                });

                if (!response.ok) {
                    throw new Error('Failed to add tournament history');
                }
            } catch (error) {
                alert('Error: Unable to save the tournament history');
                return;
            }

            try {
                // After saving the tournament history, delete the tournament
                const response = await fetch(`http://localhost:3000/delete-tournament/${tourneyId}`, {
                    method: 'DELETE',
                });

                if (response.ok) {                    
                    window.location.reload();  // Reload the parent component
                } else {
                    alert('Error: Unable to end the tournament');
                }
            } catch (error) {
                alert('Error: Unable to end the tournament');
            }
            
        } else {
            alert('Tournament ID or data not found');
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-5xl">
                <h1 className="text-3xl font-bold px-4 py-4">
                    End Tournament?
                </h1>
                <h1 className="text-1xl px-4 pb-10">
                    Are you sure you would like to end the tournament? The tournament will no longer
                    be active and will not be able to generate another master score sheet. This action
                    is not reversible.
                </h1>
                <div className="px-4 flex justify-end">
                    <button onClick={onClose} className="text-1xl font-bold underline px-4"
                        style={{color:'#006330'}}>
                        Cancel
                    </button>
                    <button onClick={submit} className="rounded-full text-xl font-bold px-8 py-3 text-white"
                            style={{backgroundColor:'#006330'}}>
                        End Tournament
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EndTournament;
