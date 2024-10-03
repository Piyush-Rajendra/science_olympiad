import React, { useState } from 'react';
import GeneralRules from '../components/generalRules';

const ResourceLibrary = () => {
  const [activeTab, setActiveTab] = useState(1);

  // Function to change the active tab
  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div>
      <div className="h-20 border-b border-gray-300 flex items-center pl-10">
        <h1 className="font-bold text-2xl">Resource Library</h1>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Tabs */}
        <div className="bloc-tabs flex space-x-2">
          <div
            className={`tabs cursor-pointer py-2 px-4 rounded-lg transition-all duration-300 ${
              activeTab === 1
                ? 'bg-green-700 text-white font-semibold outline outline-2 outline-black'
                : 'bg-gray-200 text-gray-600 hover:bg-green-300'
            }`}
            onClick={() => handleTabClick(1)}
          >
            General Rules
          </div>
          <div
            className={`tabs cursor-pointer py-2 px-4 rounded-lg transition-all duration-300 ${
              activeTab === 2
                ? 'bg-green-700 text-white font-semibold outline outline-2 outline-black'
                : 'bg-gray-200 text-gray-600 hover:bg-green-300'
            }`}
            onClick={() => handleTabClick(2)}
          >
            FAQ
          </div>
        </div>

        {/* Tab Content */}
        <div className="content-tabs mt-6">
          {activeTab === 1 && (
            <GeneralRules/>
          )}
          {activeTab === 2 && (
            <div className="content active-content">
              <h2 className="text-xl font-bold mb-4">FAQ</h2>
              <p className="text-gray-600">This is where the FAQ content will go.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResourceLibrary;