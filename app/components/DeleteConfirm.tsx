"use client"

import React, { useState } from 'react';

interface Props {
    isOpen: boolean;
    onConfirm: () => void;
    onClose: () => void;
}

const DeleteConfirm: React.FC<Props> = ({ isOpen, onConfirm, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
            <div className="bg-blue-200 text-blue-800 text-center p-6 rounded-lg shadow-lg">
                <p>Are you sure you would like to delete this school?</p>
                <div className="flex justify-between mt-4">
                    <button onClick={onConfirm} className="bg-blue-600 text-white rounded px-4 py-2">
                        Confirm
                    </button>
                    <button onClick={onClose} className="bg-blue-600 text-white rounded px-4 py-2">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeleteConfirm;