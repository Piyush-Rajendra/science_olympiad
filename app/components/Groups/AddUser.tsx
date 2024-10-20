"use client"

import React, { useState } from 'react';

interface Props {
    isOpen: boolean
    onAdd: (firstName: string, lastName: string, email: string, director: boolean) => void;
    onClose: () => void;
}

const AddUser: React.FC<Props> = ({ isOpen, onAdd, onClose }) => {
    if (!isOpen) return null;
    const [firstName, setFirst] = useState("");
    const [lastName, setLast] = useState("");
    const [email, setEmail] = useState("");
    const [director, setDirector] = useState(false);

    const submit = () => {
        onAdd(firstName, lastName, email, director);
        setFirst("");
        setLast("")
        setEmail("");
        onClose()
    }

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-5xl px-10">
                <h1 className="text-3xl font-bold py-4">
                    Add Admin
                </h1>
                <div className="flex justify-normal space-x-8">
                    <div className = "w-1/2">
                        <h1 className="text-xl font-bold py-2">
                            First Name
                        </h1>
                        <input
                            className="border border-gray-300 bg-gray-50 rounded-lg p-2.5 w-full mr-4"
                            onChange={(e) => setFirst(e.target.value)}
                        />
                    </div>
                    <div className = "w-1/2">
                        <h1 className="text-xl font-bold py-2">
                            Last Name
                        </h1>
                        <input
                            className="border border-gray-300 bg-gray-50 rounded-lg p-2.5 w-full mr-4"
                            onChange={(e) => setLast(e.target.value)}
                        />
                    </div>
                </div>
                <div>
                    <h1 className="text-xl font-bold py-2">
                        Email
                    </h1>
                    <input
                        className="border border-gray-300 bg-gray-50 rounded-lg p-2.5 w-full mr-4"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="py-4 flex items-center">
                    <input
                        type="checkbox"
                        className="form-checkbox h-7 w-7 border-gray-300 rounded"
                        onChange={(e) => setDirector(e.target.checked)}
                    />
                    <label className="ml-4">Is Tournament Director?</label>
                </div>
                <div className="py-4">
                    <div className="px-4 flex justify-end">
                        <button onClick={() => onClose()} className="text-1xl font-bold underline px-4"
                            style={{color:'#006330'}}>
                            Cancel
                        </button>
                        <button onClick={() => submit()} className="rounded-full px-6 py-2"
                                style={{backgroundColor:'#B7E394'}}>
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddUser;