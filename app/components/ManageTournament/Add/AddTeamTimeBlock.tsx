"use client";
import React, { useEffect, useState } from "react";
import AddTeamTimeBlockForm from "./AddTeamTimeBlockForm";
import AddTeamTimeBlockEvents from "./AddTeamTimeBlockEvents";
import ManageEvents from "../ManageEvents"; // Import the ManageEvents component
import axios from "axios";
import CreateTeams from "../../create-tourney/create-teams";
import TournamentSum from "../TournamentSum";

const AddTeamTimeBlocks = (props) => {
  const [tournamentId, setTournamentId] = useState(null);
  const [showManageTournament, setShowManageTournament] = useState(false); // State to track ManageEvents
  const [showReview, setShowReview] = useState(false); // State to track Review component
  const [tournament, setTournament] = useState(null);
  const [showTournamentView, setShowTournamentView] = useState(false);

  useEffect(() => {
    const fetchTournament = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/get-tournament/${props.id}`);
        setTournament(response.data);
      } catch (error) {
        console.error('Error fetching tournament:', error);
      }
    };

    fetchTournament();
  }, [tournamentId, props.id]);

  // Handle the Back button click to show ManageEvents
  const handleBackClick = () => {
    setShowManageTournament(true); // Switch to the ManageEvents component
  };

  // Handle the Review button click to show Review
  const handleReviewClick = async () => {
    try {
      const response = await axios.put(`http://localhost:3000/setTournamentToCurrent/${props.id}`);

      if (response.status === 200) {
         alert("Tournament Saved!")
         setShowTournamentView(true);
      } else {
          // Handle errors (e.g., notify the user)
          console.error("There was an error trying to save the tournament.");
      }
      
  } catch (error) {
      console.error('Error setting tournament to current:', error);
  }

  };

  if (showTournamentView) {
    return <TournamentSum isOpen={true} editTourn={() => {}} editEvent={() => {}} onCreateTournament={() => {}}/>
  }

  if (showManageTournament) {
    return (
      <CreateTeams 
        onClose={() => {}} 
        name={tournament.name} 
        division={tournament.division} 
        date={new Date(tournament.date).toLocaleDateString('en-US', {
          year: 'numeric', 
          month: '2-digit', 
          day: '2-digit'
        })} 
        id={props.id}>
      </CreateTeams>
    );
  }

  /*if (showReview) {
    return (
      <Review
        tournament_id={tournamentId}
        isOpen={showReview}
        onClose={() => setShowReview(false)}
      />
    );
  }*/

  // Check if the tournament data is loaded
  if (!tournament) {
    return <div>Loading...</div>; // Render a loading message while fetching data
  }

  return (
    <div id="add-team-time-blocks-page">
      <div id="tt-header" className="pl-9 pb-5">
        <b><h1 className="text-2xl">
        {tournament.name}{" | "}
            {new Date(tournament.date).toLocaleDateString("en-US")}{" | "}
            <span className="text-green-700">
                Division {tournament.division}
            </span>
        </h1></b>
        <hr className="border-t-2 border-gray-300"></hr>
      </div>
      <div id="add-team-time-blocks-page" className="px-6 pb-5">
        <div id="add-team-time-main" className="flex">
          <div id="add-team-form" className="flex-1 px-3">
            <AddTeamTimeBlockForm id={props.id} />
          </div>
          <div id="add-team-events" className="flex-1 px-3">
            <AddTeamTimeBlockEvents id={props.id} />
          </div>
        </div>
      </div>
      <div id="add-team-time-footer" className="bg-white sticky bottom-0 left-0 w-full flex flex-col pb-2">
        <hr className="w-full border-t-3 border-black mb-2" />
        <div className="flex w-full justify-end items-center mr-5 pr-5">
          <h4 className="text-gray-500 pt-2 mr-4">Next Step: Review</h4>
          <div>
            <button
              className="bg-white border border-green-800 text-green-800 rounded-full mr-3 px-6 py-2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
              onClick={handleBackClick} // Set up the onClick handler for the Back button
            >
              Back
            </button>
            <button
              className="bg-white border border-green-800 text-green-800 rounded-full px-6 py-2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
              onClick={handleReviewClick} // Set up the onClick handler for the Review button
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTeamTimeBlocks;
