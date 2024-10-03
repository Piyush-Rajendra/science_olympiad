"use client";
import React, { useState } from 'react';
import TabContainer from '../components/ManageUsers/TabContainer';
import ActionButtons from '../components/ManageUsers/ActionButtons';

const ManageUsers = () => {
    const [activeTab, setActiveTab] = useState('Admins');

    return (
        <div className="flex flex-col min-h-screen">
            <div className="h-20 border-b border-gray-300 flex items-center pl-10">
                <h1 className="font-bold text-2xl">Manage Admins and Event Supervisors</h1>
            </div>

            <div className="flex-grow pt-3 pb-20">
                <TabContainer setActiveTab={setActiveTab} /> {/* Pass setActiveTab to TabContainer */}
            </div>

            <div className="bg-white border-t border-[#D9D9D9] z-10">
                <ActionButtons activeTab={activeTab} /> {/* Pass activeTab to ActionButtons */}
            </div>
        </div>
    );
};

export default ManageUsers;

