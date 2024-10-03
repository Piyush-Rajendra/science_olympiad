"use client"

import React, { useState} from 'react';

interface GroupContent {
    tier: string;
    id: number
}

interface Props {
    isOpen: boolean;
    onEdit: (tier: GroupContent) => void;
    onClose: () => void;
    deftier: string;
    id: number
}

const EditTier: React.FC<Props> = ({ isOpen, onEdit, onClose, deftier, id }) => {
    if (!isOpen) return null;
    const [tier, setTier] = useState("");

    const submit = () => {
        onEdit({tier: tier, id: id});
        setTier("");
        onClose();
    }

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-5xl">
                <h1 className="text-3xl font-bold px-4 py-4">
                    Edit tier
                </h1>
                <div className="flex justify-between">
                    <h1 className="text-2xl font-bold px-4">
                        {deftier}
                    </h1>
                </div>
                <div>
                    <div className="flex items-center justify-between py-2 px-4">
                        <input
                        className="border border-gray-300 bg-gray-50 rounded-lg p-2.5 w-1/2 mr-4"
                        placeholder="Tier"
                        onChange={(e) => setTier(e.target.value)}
                        />
                    </div>
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

export default EditTier;