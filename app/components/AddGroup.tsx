"use client"

import React, { useState} from 'react';

interface Props {
    isOpen: boolean;
    onAdd: (name: string) => void;
    onClose: () => void;
}

const AddGroup: React.FC<Props> = ({ isOpen, onAdd, onClose }) => {
    if (!isOpen) return null;

    const [name, setName] = useState('');

    const submit= () => {
        if (name.trim()) {
            onAdd(name);
            setName('');
            onClose();
        }
    }

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-blue-200 text-blue-800 text-center p-6 rounded-lg shadow-lg">
                <h2>Group Creation</h2>
                <div>
                    <p>Group Name</p>
                    <input value={name} onChange={(e) => setName(e.target.value)} className="shadow-md rounded-md"/>
                </div>
                <div className="flex justify-between mt-4">
                    <button onClick={submit} className="bg-blue-600 text-white rounded px-4 py-2 shadow-md">
                        Add
                    </button>
                    <button onClick={onClose} className="bg-blue-600 text-white rounded px-4 py-2 shadow-md">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );

}

export default AddGroup;