"use client";
import React, { useState } from 'react';
import { Hanuman } from "next/font/google";

const hanuman = Hanuman({
  subsets: ["latin"],
  weight: "400", // Specify the weight you need, e.g., 400 for normal
});


const NewTournamentForm = () => {
  const [name, setName] = useState('');
  const [option, setOption] = useState('');

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log('Tournament Name:', name);
    console.log('Division:', option);
    setName('');
    // You can add additional logic here, such as sending the form data to a server
  };

  return (
    <div className={`${hanuman.className} flex flex-col items-center justify-center h-screen bg-light-mint font-serif`}>
      <div className="p-6 rounded-t-2xl shadow-lg bg-dark-navy w-full max-w-2xl flex justify-center text-grass-lime">
        <h1 className="text-2xl">Create a New Tournament</h1>
      </div>
      <div className="p-6 rounded-b-2xl shadow-lg bg-light-navy w-full max-w-2xl -mt-1">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="text-grass-lime block text-sm font-bold mb-2" htmlFor="name">
              Title of Tournament
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="shadow appearance-none border rounded-2xl w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4 py-2">
            <label className="block text-grass-lime text-sm font-bold mb-2" htmlFor="option">
              Division
            </label>
            <select
              id="option"
              value={option}
              onChange={(e) => setOption(e.target.value)}
              className="shadow appearance-none border rounded-2xl w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              style={{ maxWidth: 'calc(100% - 33rem)' }}
            >
              <option value="B">B</option>
              <option value="C">C</option>
            </select>
          </div>
          <div className="flex justify-center">
          <button
              type="submit"
              className="bg-dark-navy text-light-navy text-sm font-bold py-1 px-2 rounded-full focus:outline-none focus:shadow-outline hover:scale-95"
              style={{ minWidth: '6rem' }} // Ensure the button has a minimum width for better appearance
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewTournamentForm;
