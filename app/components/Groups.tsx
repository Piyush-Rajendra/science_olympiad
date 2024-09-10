"use client";

import React, { useState } from 'react';
import SchoolGroup from "@/components/SchoolGroup";
import DeleteConfirm from "@/components/DeleteConfirm";
import AddGroup from "@/components/AddGroup";


interface GroupContent {
    id: number;
    name: string;
    admins: string[];
}

/*
interface GroupContent {
    id: number;
    TimeBlock_ID: number;
    School_ID: number;
    SchoolName: string;
}
    */

const Groups: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [isGroupOpen, setIsGroupOpen] = useState(false)
    const [groups, setGroups] = useState<GroupContent[]>([]);
    const [nextId, setNextId] = useState<number>(1);
    const [currentGroup, setNextGroup] = useState<number>(1);


    
    const openConfirm = (id: number) => {
        setIsOpen(true);
        setNextGroup(id);
    }
    
    const closeConfirm = () => {
        setIsOpen(false);
    }

    const openGroup = () => {
        setIsGroupOpen(true);
    }

    const closeGroup = () => {
        setIsGroupOpen(false);
    }

    const addGroup = (name: string) => {
        setGroups([...groups, { id: nextId, name, admins: ['mike', 'larry']}]);
        setNextId(nextId + 1);
    }

    
    const deleteGroup = (id: number) => {
        setGroups(groups.filter(group => group.id !== id));
        setIsOpen(false);
    };


    /*
    const addGroup = async (name: string) => {
        let response = await fetch('http://localhost:3000/schools/addGroup', {
            method: 'POST',
            body: JSON.stringify({
                name: name,
            })
        })

        const newGroup = await response.json();
        setGroups([...groups, newGroup]);
    }

    const deleteGroup = async (id: number) => {
        let response = await fetch('http://localhost:3000/schools/deleteGroup', {
            method: 'DELETE',
            body: JSON.stringify({
                School_ID: id,
            })
        })

        setGroups(groups.filter(group => group_id !== id));
        setIsOpen(false);
    }
    */





    return (
        <div className="p-10 ml-50 mr-50">
            <div className="grid grid-cols-3 gap-4">
                {groups.map((group) => (
                    <SchoolGroup 
                    key={group.id} 
                    name={group.name} 
                    admins={group.admins}  
                    onEdit={() => deleteGroup(group.id)}
                    onDelete={() => openConfirm(group.id)}
                    />
                ))}
                <DeleteConfirm 
                    isOpen={isOpen}
                    onConfirm={() => deleteGroup(currentGroup)} 
                    onClose={closeConfirm} />
                <AddGroup 
                    isOpen={isGroupOpen} 
                    onAdd={(name: string) => addGroup(name)}
                    onClose={closeGroup} />
                <button onClick={openGroup} className="bg-green-400 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg">
                    +
                </button>
            </div>
        </div>
    )
}

export default Groups;
