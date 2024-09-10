"use client"

import React, { useState } from 'react';

interface Props {
    isOpen: boolean;
    admins: string[];
    onRemove: () => void;
    onClose: () => void;
}

const EditGroup: React.FC<Props> = ({isOpen, admins, onRemove, onClose}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
            
        </div>



    )


}