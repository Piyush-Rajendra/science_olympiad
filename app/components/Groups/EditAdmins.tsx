"use client"

import React, { useState } from 'react';

interface Props {
    defaultName: string
    defaultEmail: string
    onEdit: (name: string, email: string) => void;
    onClose: () => void
}


const EditAdmins: React.FC<Props> = ({ defaultName, defaultEmail, onEdit, onClose })  => {

    const [name, setName] = useState(defaultName);
    const [email, setEmail] = useState(defaultEmail);

    const submit = () => {
        onEdit(name, email);
        setName("");
        setEmail("");
        onClose();
    }

    return (
        <div>
            <div className="flex justify-normal space-x-8">
                <div className = "w-1/4">
                    <h1 className="text-2xl font-bold py-2">
                        First Name
                    </h1>
                    <input
                        className="border border-gray-300 bg-gray-50 rounded-lg p-2.5 w-full mr-4"
                        defaultValue={defaultName}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className = "w-1/4">
                    <h1 className="text-2xl font-bold py-2">
                        Last Name
                    </h1>
                    <input
                        className="border border-gray-300 bg-gray-50 rounded-lg p-2.5 w-full mr-4"
                        defaultValue={defaultName}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
            </div>
            <div>
                <h1 className="text-2xl font-bold py-2">
                    Email
                </h1>
                <input
                    className="border border-gray-300 bg-gray-50 rounded-lg p-2.5 w-3/4 mr-4"
                    defaultValue={defaultEmail}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div>
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
    )
}

export default EditAdmins;