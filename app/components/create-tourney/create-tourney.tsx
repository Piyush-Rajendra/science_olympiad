"use client";
import React, { useState } from 'react';

const CreateTourney = () => {

    

    const [addresses, setAddresses] = useState(['']);

    // Function to handle adding a new address input
    const addLocation = () => {
        setAddresses([...addresses, '']);
    };

    // Function to handle changing the value of an address input
    const handleChange = (index, event) => {
        const newAddresses = [...addresses];
        newAddresses[index] = event.target.value;
        setAddresses(newAddresses);
    };

    const handleDelete = (index) => {
        const newAddresses = addresses.filter((_, i) => i !== index);
        setAddresses(newAddresses);
    };


return (
<div id="create-tourney-page" className='bg-white min-h-screen relative'>
    <div id="create-tourney-header">
        <h1 className="text-3xl pl-7 pt-4 pb-5 ">Create Tournament</h1>
    </div>
    <hr className='border-t-3 border-black'></hr>
    <div id="name-and-divison" className="flex space-x-4">
        <div id="name">
            <h2 className="pl-7  pt-3">Name</h2>
            <input className=" ml-7 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
               id="inputBox" type="text" placeholder="Tournament Name"></input>
        </div>
        <div id="division">
            <h2 className='pl-7 pt-3'>Division</h2>
            <select className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 pr-8 ml-6 rounded leading-tight focus:outline-none focus:shadow-outline" id="selectBox">
            <option value="B">B</option>
            <option value="C">C</option>
        </select>
        </div>
    </div>
    <div id="description">
        <h2 className="pl-7 pt-4">Description</h2>
        <textarea className="ml-7 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32 max-w-xl" 
                  id="textarea"  placeholder="Tournament Description"></textarea>
    </div>
    <div id="create-tourney-date">
        <h2 className="pl-7 pt-4">Date</h2>
        <div id="date-inputs" className="flex space-x-4">
            <input type="date" id="first-date" className=" ml-7 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></input>
           
        </div>
        
    </div>
    <div id="location">
    <div id="location-header" className="flex justify-between items-center mb-4 pr-3">
                <h2 className="pl-7 pt-4">Location</h2>
                <button 
                    onClick={addLocation} 
                    className="bg-green-200 border border-green-400 text-black rounded-full px-5 py-1 hover:bg-green-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 ml-7"
                >
                    Add location
                </button>
            </div>
            <div id="addresses" className="flex flex-col pb-12">
            {addresses.map((address, index) => (
                    <div key={index} className="flex items-center mb-2">
                        <input
                            className="ml-7 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline max-w-md"
                            type="text"
                            placeholder="Enter Address"
                            value={address}
                            onChange={(event) => handleChange(index, event)}
                        />
                        <button
                            onClick={() => handleDelete(index)}
                            className="ml-4 bg-red-200 border border-red-400 text-black rounded-full px-3 py-1 hover:bg-red-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
    </div>
    <div className='pb-12'></div>
    {/*
    <div id="rules" className='pb-12'>
        <h2 className='pl-7 pt-4'>Rules</h2>
        <div id="general-rules">
            <h3 className="pl-7 pt-3">General Rules</h3>

        </div>
        <div id="specific-rules">
        <h3 className="pl-7 pt-3">Specific Rules</h3>
            
        </div>
        <div id="faq-rules" className='pb-7'>
        <h3 className="pl-7 pt-3">FAQ</h3>
            
        </div>
    
    </div>
    */}
    <div id="footer-and-submit" className="bg-white sticky bottom-0 left-0 w-full max-w-screen-xl flex flex-col items-end pb-5">
        <hr className='w-full border-t-3 border-black mb-2' />
        <div className="flex space-x-4 mr-5">
            <h4 className='text-gray-500 pt-2'>Next Step: Create Your Events</h4>
            <button className="ml-6 mr-6 bg-white border border-green-800 text-green-800 rounded-full px-6 py-2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
                Next
            </button>
        </div>
</div>
</div>
)




}

export default CreateTourney; 



