import React, {useEffect, useState, Suspense } from 'react'
import Image from 'next/image';
import EditIcon from '../../images/edit-246.png'
import DeleteIcon from '../../images/delete.png'
import axios from 'axios';

const LazyEditTimeBlock = React.lazy(() => import('../ManageTournament/Edit/EditTimeBlock'));

interface timeBlockContent {
    start: string;
    end: string;
    address: string;
    roomNumber: number;
    id: number;
}

const TimeblockTable = ({id, trigger}) => {
    const [timeblocks, setTimeblocks] = useState([])
    const [isEditTimeBlock, setIsEditTimeBlock] = useState(false)
    const [currentTimeBlockId, setCurrentTimeBlockId] = useState(0)
    useEffect(() => {
        fetchTimeblocks()
    }, [trigger]);

    const fetchTimeblocks = async () => {
        try {
            let timeblocksResponse; 
            timeblocksResponse = await axios.get(`http://localhost:3000/get-timeblock-by-event/${id}`); 
            const sortedTimeBlocks = timeblocksResponse.data.sort((a, b) => new Date(a.TimeBegin).getTime() - new Date(b.TimeBegin).getTime());

            setTimeblocks(sortedTimeBlocks);
        } catch (error) {
            console.error("Error retrieving timeblocks", error)
        }
    }


    const openEditTimeBlock = (id: number) => {
        setCurrentTimeBlockId(id)
        setIsEditTimeBlock(true)
    }

    const closeEditTimeBlock = () => {
        setIsEditTimeBlock(false)
    }

    const editTimeBlock = async (updatedTimeBlock: timeBlockContent) => {
        try {
            const currentTimeblock = timeblocks.find(timeblock => timeblock.TimeBlock_ID === currentTimeBlockId)
            
            await fetch(`http://localhost:3000/edit-timeblock/${currentTimeBlockId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    startTime: updatedTimeBlock.start,
                    endTime: updatedTimeBlock.end,
                    event_id: currentTimeblock.Event_ID,
                    tournament_id: currentTimeblock.Tournament_ID,
                    building: updatedTimeBlock.address,
                    roomNumber: updatedTimeBlock.roomNumber,
                    status: currentTimeblock.Status
                })
            })

            fetchTimeblocks()
        } catch (error) {
            console.error("Error editing timeblock", error.message)
        }
    }

    const deleteTimeBlock = async (id: number) => {
        try {
            await fetch(`http://localhost:3000/delete-timeblock/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            fetchTimeblocks()
            
        } catch (error) {
            console.error("Error deleting timeblock", error.message)
        }
    }


    return (
        <div>
            <table className="table-auto text-left">
                <thead className="border-b border-gray-300">
                    <tr>
                        <th className="px-2 py-2">Time Blocks</th>
                        <th className="px-8 py-2">Location</th>
                        <th className="px-6 py-2">Room Number</th>
                        <th className="px-2 py-2">Manage</th>
                    </tr>
                </thead>
                    <tbody>
                    {timeblocks.length === 0 ? (
                        <tr>
                            <td colSpan={4} className="text-center pt-4">No time blocks available.</td>
                        </tr>
                    ) : (
                        timeblocks.map((row) => (
                            <React.Fragment key={row.TimeBlock_ID}>
                                <tr className="border-b">
                                    <td className="px-2 py-2">
                                        {new Date(row.TimeBegin).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} to 
                                        {new Date(row.TimeEnd).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </td>
                                    <td className="px-8 py-2">{row.Building}</td>
                                    <td className="px-6 py-2">{row.RoomNumber}</td>
                                    <td className="px-2 py-2 justify-normal flex space-x-2">
                                        <button className="flex justify-center" onClick={() => openEditTimeBlock(row.TimeBlock_ID)}>
                                            <Image src={EditIcon} alt="Edit" className="mx-auto w-10 h-10"/>
                                        </button>
                                        <button className="flex justify-center" onClick={() => deleteTimeBlock(row.TimeBlock_ID)}>
                                            <Image src={DeleteIcon} alt="Delete" className="mx-auto w-10 h-10"/>
                                        </button>
                                    </td>
                                </tr>
                            </React.Fragment>
                        ))
                    )}
                </tbody>
            </table>
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
export default TimeblockTable;
