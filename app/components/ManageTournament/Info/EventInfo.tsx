"use client"

import React, { useState, Suspense } from 'react';
import EditIcon from '../../../images/edit-246.png'
import DeleteIcon from '../../../images/delete.png'
import Image from 'next/image';
const LazyTimeInfo = React.lazy(() => import('./TimeInfo'))
const LazyAddTimeBlock = React.lazy(() => import('../Add/AddTimeBlock'))
const LazyEditTimeBlock = React.lazy(() => import('../Edit/EditTimeBlock'))

interface EventProps {
    name: string;
    description: string;
    id: number;
}

interface timeBlockContent {
    start: string;
    end: string;
    address: string;
    roomNumber: number;
    id: number;
}

const EventInfo: React.FC<EventProps> = ({ name, description, id }: EventProps)  => {

    const [timeBlocks, setTimeBlocks] = useState<timeBlockContent[]>([]);
    const [nextId, setNextId] = useState<number>(1);
    const [isCreateTimeBlock, setIsCreateTimeBlock] = useState(false);
    const [isEditTimeBlock, setIsEditTimeBlock] = useState(false);
    const [currentTimeBlockId, setCurrentTimeBlockId] = useState(0);
    const [dropdownIds, setDropdownIds] = useState({});
    

    const createTimeBlock = () => {
        setIsCreateTimeBlock(true)
    }

    const closeTimeBlock = () => {
        setIsCreateTimeBlock(false)
    }

    const openEditTimeBlock = (id: number) => {
        setCurrentTimeBlockId(id);
        setIsEditTimeBlock(true);
    }

    const closeEditTimeBlock = () => {
        setIsEditTimeBlock(false);
    }

    const editTimeBlock = (updatedTimeBlock: timeBlockContent) => {
        setTimeBlocks((prevBlocks) => 
            prevBlocks.map((block) => 
                block.id === updatedTimeBlock.id ? { ...block, ...updatedTimeBlock } : block
            )
        );
    };

    const addTimeBlock = (newTimeBlocks) => {
        setTimeBlocks([...timeBlocks, ...newTimeBlocks]);
        setNextId(nextId + newTimeBlocks.length);
    }

    const deleteTimeBlock = (index: number) => {
        setTimeBlocks((prevBlocks) =>
            prevBlocks.filter((timeBlock) => timeBlock.id !== index)
        );

    }

    const openTimeBlock = (index: number) => {
        const timeInfo = document.getElementById(`time-${index}`);
        timeInfo.classList.toggle('hidden')
    }

    const toggleDropdown = (index) => {
        setDropdownIds(state => ({
            ...state, [index]: !state[index]
        }))
    }







    return (
        <div>
            <div className="px-4 py-2">
                <div className="py-4">
                    <h2 className='text-2xl font-bold'>
                        Name:
                    </h2>
                    <div className="text-1xl py-2">{name}</div>
                </div>
                
                <div className="py-4">
                    <h2 className='text-2xl font-bold'>
                        Description:
                    </h2>
                    <div className="text-1xl py-2">{description}</div>
                </div>

            </div>
            <Suspense fallback={<div>Loading Add Time Block</div>}>
                <LazyAddTimeBlock
                    isOpen={isCreateTimeBlock}
                    onAdd={(timeblocks: timeBlockContent[]) => addTimeBlock(timeblocks)}
                    onClose={closeTimeBlock}
                    id={nextId}
                />
            </Suspense>

            <Suspense fallback={<div>Loading Edit Time Block</div>}>
                <LazyEditTimeBlock
                    isOpen={isEditTimeBlock}
                    onEdit={(timeblock: timeBlockContent) => editTimeBlock(timeblock)}
                    onClose={closeEditTimeBlock}
                    nextId={currentTimeBlockId}
                />
            </Suspense>
        </div>
        
    )
}

export default EventInfo;