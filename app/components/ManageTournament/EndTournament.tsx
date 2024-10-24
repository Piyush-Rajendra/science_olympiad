"use client";
import { useState } from "react";

interface Props {
    isOpen: boolean;
    onConfirm: () => void;
    onClose: () => void;
}

const EndTournament: React.FC<Props> = ({ isOpen, onConfirm, onClose }) => {
    const [groupId, setGroupID] = useState(localStorage.getItem('group_id'));
    if (!isOpen) return null;

    const submit = () => {
        onConfirm();
        onClose();
    }

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-5xl">
                <h1 className="text-3xl font-bold px-4 py-4">
                    End Tournament?
                </h1>
                <h1 className="text-1xl px-4 pb-10">
                    Are you sure you would like to end the tournament? The tournament will no longer
                    be active and will not be able to generate another master score sheet. This action
                    is not reversible.
                </h1>
                <div className="px-4 flex justify-end">
                    <button onClick={onClose} className="text-1xl font-bold underline px-4"
                        style={{color:'#006330'}}>
                        Cancel
                    </button>
                    <button onClick={submit} className="rounded-full text-xl font-bold px-8 py-3 text-white"
                            style={{backgroundColor:'#006330'}}>
                        End Tournament
                    </button>
                </div>
            </div>
        </div>
    )
}

export default EndTournament;
