"use client"

import React, { useState} from 'react';
import DeleteIcon from '../../../images/delete.png'
import Image from 'next/image';

interface GroupContent {
    tier: string;
    id: number;
}

interface Props {
    isOpen: boolean;
    onAdd: (timeblocks: GroupContent[]) => void;
    onClose: () => void;
    name: string
}


const AddTier: React.FC<Props> = ({ isOpen, onAdd, onClose, name }) => {
    if (!isOpen) return null;

    const [groups, setGroups] = useState<GroupContent[]>([
        {tier: "", id: 1},
        {tier: "", id: 2},
        {tier: "", id: 3},
        {tier: "", id: 4},
    ]);
    
    const [nextId, setNextId] = useState<number>(5);

    const addGroup = () => {
        setGroups([...groups, {tier: "", id: nextId}]);
        setNextId(nextId + 1);
    };


    const handleChange = (index, value) => {
        const newGroups = [...groups];
        newGroups[index].tier = value;
        setGroups(newGroups);
    }

    const deleteGroup = (index: number) => {
        setGroups(groups.filter(group => group.id !== index));
    }

    const submit = () => {
        const filledGroups = groups.filter(group => group.tier.trim() !== "");

        onAdd(filledGroups);
        
        setGroups([
            {tier: "", id: 1},
            {tier: "", id: 2},
            {tier: "", id: 3},
            {tier: "", id: 4},
        ])
        setNextId(5);
        onClose();
    
    }

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-5xl">
                <h1 className="text-3xl font-bold px-4 py-4">
                    Add tier
                </h1>
                <div className="flex justify-between">
                    <h1 className="text-2xl font-bold px-4">
                        {name}
                    </h1>
                    <button onClick={addGroup} className="text-1xl font-bold underline px-4"
                        style={{color:'#006330'}}>
                        Add tier
                    </button>
                </div>
                <div>
                    {groups.map((group, index) => (
                        <React.Fragment key={group.id}>
                            <div className="flex items-center justify-between py-2 px-4">
                                <input
                                className="border border-gray-300 bg-gray-50 rounded-lg p-2.5 w-1/2 mr-4"
                                placeholder="Tier"
                                onChange={(e) => handleChange(index, e.target.value)}
                                />
                                <button className="px-4"
                                    onClick={() => deleteGroup(group.id)}>
                                    <Image 
                                        src={DeleteIcon} 
                                        alt="d"
                                        className="h-10 w-10" />
                                </button>
                            </div>
                        </React.Fragment>
                        
                    ))}
                </div>
                <div className="px-4 flex justify-end">
                    <button onClick={onClose} className="text-1xl font-bold underline px-4"
                        style={{color:'#006330'}}>
                        Cancel
                    </button>
                    <button onClick={submit} className="rounded-full px-6 py-2"
                            style={{backgroundColor:'#B7E394'}}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AddTier;