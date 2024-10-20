"use client"
import React, { useState } from 'react';
import CreateTourney from './create-tourney';

const CreateTourneyLanding = () => {
  const [showTourneyForm, setShowTourneyForm] = useState(false);

  const handleCreateTourney = () => {
    setShowTourneyForm(true);
  };

  return (
    <div id="create-tourney-landing-page" className='bg-white min-h-screen relative'>
      {!showTourneyForm ? (
        <>
          <div id="create-tourney-header">
            <h1 className="text-3xl pl-7 pt-4 pb-5 ">Create Tournament</h1>
          </div>
          <hr className='border-t-3 border-black pb-5'></hr>
          <div id="create-tourney-images" className="flex justify-center space-x-4 pb-8">
            <img src="/images/create-tourney.png" alt="Tournament" className="h-auto w-1/3 border-2 border-gray-200"/>
            <img src="/images/create-event.png" alt="Tournament" className="h-auto w-1/3 border-2 border-gray-200"/>
          </div>
          <div id="create-tourney-text" className='flex flex-col justify-center items-center space-y-4 px-24 mx-12 pb-36 mb-12'>
            <p className="font-bold">
              Welcome to the Tournament Creation Portal. This is your starting point for organizing a distinguished event. Our 
              streamlined interface will assist you in setting up and managing your tournament efficiently.
            </p>

            <p className="font-bold">
              To proceed, please click the create tournament button and enter the required details. You will be able to outline the tournament's structure, 
              establish events, and manage participant registrations with ease.
            </p>
          </div>

          <div id="create-tourney-footer" className="bg-white sticky bottom-0 left-0 w-full flex flex-col pb-2">
            <hr className='w-full border-t-3 border-black mb-2' />
            <div className="flex w-full justify-end items-center mr-5 pr-5"> 
              <button 
                className="bg-green-700 border text-white text-bold rounded-full px-6 py-2 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                onClick={handleCreateTourney}
              >
                Create Tournament
              </button>
            </div>
          </div>
        </>
      ) : (
        <CreateTourney />
      )}
    </div>
  );
};

export default CreateTourneyLanding;
