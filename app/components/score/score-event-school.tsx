import axios from 'axios';
import React, { useState, useEffect } from 'react';

const ScoreEventSchool = (props) => {
    const [tier, setTier] = useState(props.tier);
    const [score, setScore] = useState(props.score);
    const [name, setName] = useState('');
    const [teamId, setTeamId] = useState(props.teamId);

    useEffect(() => {
        const fetchData = async () => {
            try {
                //console.log(props.attend)
                const teamResponse = await axios.get(`http://localhost:3000/get-team/${props.teamId}`);
                const team = teamResponse.data;
                setName(team.name);
                setTeamId(team.unique_id);
            } catch (error) {
                console.error("Error fetching team data:", error);
            }
        };

        fetchData();
    }, [props.teamId]);

    // Check for tie using a loop
    const checkTie = () => {
        if (!props.teams || props.teams.length === 0) return false;

        for (const team of props.teams) {
            if (team.Team_ID !== props.teamId && team.Score === score && team.Tier === tier) {
                return true;
            }
        }
        return false;
    };

    const isTie = checkTie();

    const handleTierChange = (e) => {
        const value = e.target.value;

        // Prevent input greater than 3
        if (value === '' || (parseInt(value) <= 3)) {
            const newTier = value === '' ? '' : parseInt(value); // Check if the value is empty
            setTier(newTier);
            props.onChange({ Team_ID: props.teamId, Tier: newTier, Score: score }); // Pass updated values to parent
        } else {
            // Optionally, you can provide feedback to the user
            alert("Tier cannot be more than 3.");
        }
    };

    const handleScoreChange = (e) => {
        const value = e.target.value;

        // Check if the value is empty or not a valid number
        if (value === '') {
            setScore('');
            props.onChange({ Team_ID: props.teamId, Tier: tier, Score: '' }); // Pass updated values to parent
            return;
        }

        const floatValue = parseFloat(value);

        // Round to one decimal place
        const roundedValue = Math.round(floatValue * 10) / 10;

        setScore(roundedValue);
        props.onChange({ Team_ID: props.teamId, Tier: tier, Score: roundedValue }); // Pass updated values to parent
    };

    return (
        <div
            id="event-item"
            className="flex justify-between items-center pl-5 py-4"
            style={{ backgroundColor: props.color }}
        >
            <div id="school-name" className="pl-6 flex-shrink-0 w-1/3 flex items-center">
                <h3>{name}</h3>
            </div>
            <div id="school-section" className="w-39 pr-12 pl-4">
                <h3>{teamId}</h3>
            </div>
            <div id="school-rank" className="w-39 pl-9 pr-3 mr-4">
                <h3>{props.rank}</h3>
            </div>
            <div id="school-tier" className="mr-5">
                {props.attend === 0 ? (
                    <span className="text-gray-500 ml-24 pr-12">Absent</span> // Show N/A if attend is 0
                ) : (
                    <input
                        type="text"
                        value={tier}
                        onChange={handleTierChange}
                        className="border border-gray-300 rounded px-0.5 py-2 text-center text-xs"
                        disabled={props.isFinalized} // Disable input if finalized
                    />
                )}
            </div>
            <div id="school-score">
                {props.attend === 0 ? (
                    <span className="text-gray-500 mr-24 pl-3">Absent</span> // Show N/A if attend is 0
                ) : (
                    <input
                        type="number"
                        value={score === null ? '' : score}
                        onChange={handleScoreChange}
                        step="0.1"
                        className={`border border-gray-300 rounded px-0.5 py-2 text-center text-xs ${isTie ? 'text-red-500' : ''}`}
                        disabled={props.isFinalized} // Disable input if finalized
                        onBlur={(e) => {
                            // Format score on blur...
                        }}
                    />
                )}
            </div>

            <hr className='border-t-3 border-black' />
        </div>
    );
};

export default ScoreEventSchool;
