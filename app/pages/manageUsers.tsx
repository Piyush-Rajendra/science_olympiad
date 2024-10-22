"use client";
import React, { useState } from 'react';
import TabContainer from '../components/ManageUsers/TabContainer';
import ActionButtons from '../components/ManageUsers/ActionButtons';

const ManageUsers = () => {
    const [activeTab, setActiveTab] = useState('Admins');
    const [adminData, setAdminData] = useState<{ id: number; name: string; email: string }[]>([]);
    const [supervisorData, setSupervisorData] = useState<{ id: number; name: string; email: string }[]>([]);

    const addAdmin = (newAdmin: { id: number; name: string; email: string }) => {
        setAdminData((prev) => [...prev, newAdmin]);
    };

    const addEventSupervisor = (newSupervisor: { id: number; name: string; email: string }) => {
        setSupervisorData((prev) => [...prev, newSupervisor]);
    };

    return (
        <div className="flex flex-col min-h-screen overflow-x-hidden">
            <div className="h-20 border-b border-gray-300 flex items-center pl-10">
                <h1 className="font-bold text-2xl">Manage Admins and Event Supervisors</h1>
            </div>

            <div className="flex-grow pt-3 pb-20 max-w-full">
                <TabContainer aData={adminData} sData={supervisorData} setActiveTab={setActiveTab} />
            </div>

            <div className="bg-white border-t border-[#D9D9D9] z-10 w-full">
                <ActionButtons 
                    activeTab={activeTab} 
                    addAdmin={addAdmin} 
                    addEventSupervisor={addEventSupervisor} 
                />
            </div>
        </div>
    );
};

export default ManageUsers;


