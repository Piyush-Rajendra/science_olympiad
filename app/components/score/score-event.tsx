"use client";
import React, { useState, useEffect } from "react";
import ScoreEventSchool from "./score-event-school";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import axios from "axios";

const ScoreEvent = (props) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [teams, setTeams] = useState([]);
    const [status, setStatus] = useState();
    const [scorePercent, setScorePercent] = useState<number | null>(null);
    const [isFinalized, setIsFinalized] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const statusResponse = await axios.get(`http://localhost:3000/get-event-status/${props.id}`);
                const statusData = statusResponse.data;
                setStatus(statusData.status);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [props.id]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const scoreResponse = await axios.get(`http://localhost:3000/get-score-percentage/${props.id}`);
                const scoreData = scoreResponse.data;
                setScorePercent(scoreData.scorePercentage);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [props.id]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const eventTeamsResponse = await axios.get(`http://localhost:3000/get-team-timeblocks-by-event/${props.id}`);
                const eventTeams = eventTeamsResponse.data;
                const rankedTeams = rankSchools(eventTeams);
                setTeams(rankedTeams);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [props.id]);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const rankSchools = (schools) => {
        return [...schools].sort((a, b) => {
            if (a.Tier !== b.Tier) {
                return a.Tier - b.Tier;
            }
            if (props.scoringAlg === "Default") {
                return b.Score - a.Score;
            } else if (props.scoringAlg === "Flipped") {
                return a.Score - b.Score;
            }
            return 0;
        });
    };

    const handleFinalize = () => {
        setIsFinalized(true); // Set finalized state to true
        // Optionally, you can also add logic here to handle finalization in the database.
    };

    // Function to update the database with the new values
    const handleSave = async () => {
        try {
            const updates = teams.map(async (team) => {
                const { Team_ID, Score, Tier } = team;
    
                // Fetch original team data to get the current values
                const originalTeam = await axios.get(`http://localhost:3000/get-team-timeblocks-by-id/${team.TeamTimeBlock_ID}`);
    
                const body = {
                    timeBlock_id: originalTeam.data.TimeBlock_ID, // Assuming this is part of the original team data
                    team_id: Team_ID,
                    event_id: props.id,
                    score: Score === '' ? null : Score, // Ensure null is sent if the score is empty
                    attend: originalTeam.data.Attend, // Keep the current value of attend
                    comment: originalTeam.data.Comment, // Assuming you want to keep the original comment, adjust as needed
                    tier: Tier,
                };
    
                console.log(body);
    
                // Send PUT request if score or tier have changed
                await axios.put(`http://localhost:3000/edit-team-timeblock/${team.TeamTimeBlock_ID}`, body);
            });
    
            await Promise.all(updates);
            alert('Scores updated successfully!');
    
        } catch (error) {
            console.error("Error updating scores:", error);
        }
    };
    

    return (
        <div>
            <div
                id="event-item"
                className="flex justify-between items-center px-5 py-4"
                style={{ backgroundColor: props.color }}
            >
                <div id="event-name" className="pl-6 flex-shrink-0 w-1/5 flex items-center">
                    <div id="button-and-dropdown" className="flex space-x-4">
                        <button
                            className="ml-3 text-gray-500 focus:outline-none"
                            onClick={toggleDropdown}
                        >
                            {isDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
                        </button>
                        <h3>{props.name}</h3>
                    </div>
                </div>

                <div id="event-timeblock" className="w-25 pl-9">
                    <h3>{props.scoringAlg}</h3>
                </div>

                <div>
                    <div
                        id="event-status"
                        className={`w-24 ml-2 p-2 border rounded text-center ${
                            status === "In Progress"
                                ? "bg-yellow-200"
                                : status === "Completed"
                                ? "bg-green-200"
                                : status === "Not Started"
                                ? "bg-red-200"
                                : status === "For Review"
                                ? "bg-blue-200"
                                : "bg-gray-300"
                        }`}
                        style={{ width: "140px" }}
                    >
                        <h3 className="text-black">{status}</h3>
                    </div>
                </div>
                <div id="event-graded" className="w-24 pr-7">
                    <h3>{scorePercent ? scorePercent.toFixed(2) : '0.00'}%</h3>
                </div>
            </div>

            {isDropdownOpen && (
                <div>
                    <div
                        id="score-event-list-header"
                        className="pl-7 pt-6 pr-9 text-gray-500 flex justify-between "
                    >
                        <h4 className="px-12 mx-5 flex-shrink-0 w-1/4">Team Name</h4>
                        <h4 className="pl-8 ">Team ID</h4>
                        <h4 className="">Rank</h4>
                        <h4 className="pr-12 ml-7 ">Tier</h4>
                        <h4 className="px-12 mx-7">Score</h4>
                    </div>
                    <hr className="border-t-3 border-gray-300 ml-12" />
                    <div className="pl-12">
                        {teams.map((school, index) => (
                            <ScoreEventSchool
                                key={index}
                                isFinalized={isFinalized}
                                teamId={school.Team_ID}
                                rank={index + 1}
                                tier={school.Tier}
                                score={school.Score}
                                teams={teams}
                                color={index % 2 === 1 ? "white" : "#F3F4F6"}
                                onChange={(updatedTeam) => {
                                    const updatedTeams = teams.map((team) =>
                                        team.Team_ID === updatedTeam.Team_ID ? { ...team, ...updatedTeam } : team
                                    );
                                    setTeams(updatedTeams);
                                }}
                            />
                        ))}
                    </div>
                    <div id="score-event-buttons" className="flex justify-end space-x-4 mt-4 pr-12 pb-5">
                    {teams.length > 0 && ( // Check if there are teams
                        <div>
                             {props.isAdmin && !isFinalized && ( // Check if isAdmin is true
                                <button className="px-6 py-2 mr-3 border-2 border-green-300 text-green-300 rounded-full bg-white hover:bg-green-50"
                                onClick={handleFinalize}>
                                    Finalize
                                </button>
                            )}
                            {!isFinalized && ( // Only show Save button if not finalized
                                <button
                                    className="px-6 py-2 border-2 border-green-300 text-white bg-green-300 rounded-full hover:bg-green-400"
                                    onClick={handleSave}
                                >
                                    Save
                                </button>
                            )}
                        </div>
                    )}
                </div>
                    </div>
                    )}
            <hr className="border-t-3 border-gray-300" />
        </div>
    );
};

export default ScoreEvent;
