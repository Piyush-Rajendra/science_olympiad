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
            <div className="px-4 py-4">
                <div className="py-4">
                    <h2 className='text-3xl font-bold'>
                        Name
                    </h2>
                    <div className="py-2">{name}</div>
                </div>
                
                <div className="py-4">
                    <h2 className='text-3xl font-bold'>
                        Description
                    </h2>
                    <div className="py-2">{description}</div>
                </div>

                <div className="py-4">
                    <div className="flex justify-between">
                        <h2 className='text-3xl font-bold'>
                            Time Blocks
                        </h2>
                        <button onClick={createTimeBlock} className="rounded-full px-6 py-2"
                                style={{backgroundColor:'#B7E394'}}>
                            Add Time Block
                        </button>
                    </div>
                    <table className="w-full table-auto text-left">
                        <thead className="border-b border-gray-300">
                            <tr>
                                <th className="px-2"></th>
                                <th className="py-2 px-2">Time Blocks</th>
                                <th className="py-2 px-8">Building</th>
                                <th className="py-2 px-8">Room Number</th>
                                <th className="px-2 py-2">Manage</th>
                            </tr>
                        </thead>
                        <tbody>
                            {timeBlocks.map((row, index) => (
                                <React.Fragment key={index}>
                                    <tr className="border-b">
                                        <td className="px-2" onClick={() => {openTimeBlock(index); toggleDropdown(row.id)}}>
                                            {dropdownIds[row.id] ? '▲' : '▼'}
                                        </td>
                                        <td className="py-6 px-2">{row.start} to {row.end}</td>
                                        <td className="py-6 px-8">{row.address}</td>
                                        <td className="py-2 px-8">{row.roomNumber}</td>
                                        <td className="px-4 py-2 justify-normal flex space-x-4">
                                            <button className="flex justify-center"
                                                onClick = {() => {openEditTimeBlock(row.id)} }>
                                                <Image 
                                                    src={EditIcon} 
                                                    alt="e"
                                                    className="mx-auto w-10 h-10"/>
                                            </button>
                                            <button className="flex justify-center"
                                                onClick ={() => {deleteTimeBlock(row.id)} }>
                                                <Image 
                                                    src={DeleteIcon} 
                                                    alt="d"
                                                    className="mx-auto w-10 h-10"/>
                                            </button>
                                        </td>
                                    </tr>
                                    <tr id={`time-${index}`} className="border-b hidden">
                                        <td colSpan={5} className="p-4">
                                            <Suspense fallback={<div>Loading Time Info</div>}>
                                                <LazyTimeInfo/>
                                            </Suspense>
                                        </td>
                                    </tr>
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
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