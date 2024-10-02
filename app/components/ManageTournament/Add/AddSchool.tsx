"use client"

import React, { useState} from 'react';
import DeleteIcon from '../../../images/delete.png'
import Image from 'next/image';


interface SchoolContent {
    name: string;
    teamID: string;
    id: number;
}


interface Props {
    isOpen: boolean;
    onAdd: (timeblocks: SchoolContent[]) => void;
    onClose: () => void;
    id: number;
}


const AddSchool: React.FC<Props> = ({ isOpen, onAdd, onClose, id }) => {
    if (!isOpen) return null;

    const [schools, setSchools] = useState<SchoolContent[]>([
        {name: "", teamID: "", id: 0 + id},
        {name: "", teamID: "", id: 1 + id},
        {name: "", teamID: "", id: 2 + id},
        {name: "", teamID: "", id: 3 + id},
    ]);
    
    const [nextId, setNextId] = useState<number>(4 + id);

    const addSchool = () => {
        setSchools([...schools, {name: "", teamID: "", id: nextId}]);
        setNextId(nextId + 1 + id);
    };


    const handleChange = (index, valueType, value) => {
        const newSchools = [...schools];
        newSchools[index][valueType] = value;
        setSchools(newSchools);
    }

    const deleteTimeBlock = (index: number) => {
        setSchools(schools.filter(school => school.id !== index));
    }

    const submit = () => {
        const filledSchools = schools.filter((school) => school.name && school.teamID);

        onAdd(filledSchools);
        
        setSchools([
            {name: "", teamID: "", id: 0 + id},
            {name: "", teamID: "", id: 1 + id},
            {name: "", teamID: "", id: 2 + id},
            {name: "", teamID: "", id: 3 + id},
        ])
        setNextId(4 + id);
        onClose();
    
    }

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-5xl">
                <h1 className="text-3xl font-bold px-4 py-4">
                    Add School
                </h1>
                <div className="flex justify-between">
                    <h1 className="text-2xl font-bold px-4">
                        School
                    </h1>
                    <button onClick={addSchool} className="text-1xl font-bold underline px-4"
                        style={{color:'#006330'}}>
                        Add school
                    </button>
                </div>
                <div>
                    {schools.map((timeblock, index) => (
                        <React.Fragment key={timeblock.id}>
                            <div className="flex items-center justify-between py-2 px-4">
                                <input
                                className="border border-gray-300 bg-gray-50 rounded-lg p-2.5 w-2/3 mr-4"
                                placeholder="School Name"
                                onChange={(e) => handleChange(timeblock.id, 'name', e.target.value)}
                                />
                                <input
                                className="border border-gray-300 bg-gray-50 rounded-lg p-2.5 mr-14"
                                placeholder="Team ID"
                                onChange={(e) => handleChange(timeblock.id, 'teamID', e.target.value)}
                                />
                                <button className="px-4"
                                    onClick={() => deleteTimeBlock(timeblock.id)}>
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

export default AddSchool;