import React, { useState, Suspense } from 'react';
import EditIcon from '../../../images/edit-246.png'
import DeleteIcon from '../../../images/delete.png'
import Image from 'next/image';

const LazyAddTier = React.lazy(() => import('../Add/AddTier'))
const LazyEditTier = React.lazy(() => import('../Edit/EditTier'))

interface GroupContent {
    tier: string;
    id: number;
}

interface SchoolInfoProps {
    name: string; 
}

const SchoolInfo: React.FC<SchoolInfoProps> = ({ name }) => {

    const [groups, setGroups] = useState<GroupContent[]>([]);
    const [nextId, setNextId] = useState<number>(1);
    const [isCreateTier, setIsCreateTier] = useState(false);
    const [isEditTier, setIsEditTier] = useState(false);
    const [currentId, setCurrentId] = useState(0);
    const [currentTier, setCurrentTier] = useState("");
    
    const createTier = () => {
        setIsCreateTier(true)
    }

    const closeTier = () => {
        setIsCreateTier(false)
    }

    const openEditTier = (id: number, tier: string) => {
        setCurrentId(id);
        setCurrentTier(tier)
        setIsEditTier(true);
    }

    const closeEditTier = () => {
        setIsEditTier(false)
    }

    const editTier = (editgroup: GroupContent) => {
        setGroups((prevGroups) => 
            prevGroups.map((group) => 
                group.id === editgroup.id ? { ...group, ...editgroup } : group
            )
        );
    }


    const addTier = (newGroups) => {
        setGroups([...groups, ...newGroups]);
        setNextId(nextId + newGroups.length)
    }

    const deleteGroup = (index: number) => {
        setGroups(groups.filter(group => group.id !== index))
    }

    return (
        <div>
            <div className="px-2 py-4">
                <div className="flex justify-between">
                    <h2 className='text-3xl font-bold'>
                        Groups
                    </h2>
                    <button onClick={createTier} className="rounded-full px-6 py-2"
                            style={{backgroundColor:'#B7E394'}}>
                        Add Tier
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
                {groups.map((group) => (
                    <div className="border border-gray-300 shadow-md rounded-lg flex flex-col px-4 py-8">
                        <div className = "flex justify-between py-4">
                            <h2>School</h2>
                            <h2 className="text-left">{name}</h2>
                        </div>
                        <div className = "flex justify-between py-4">
                            <h2>Tier</h2>
                            <h2 className="text-left">{group.tier}</h2>
                        </div>
                        <div className = "text-right flex">
                            <button className="flex justify-center"
                                onClick = {() => {openEditTier(group.id, group.tier)}}>
                                <Image 
                                    src={EditIcon} 
                                    alt="e"
                                    className="mx-auto w-10 h-10"/>
                            </button>
                            <button className="flex justify-center px-2"
                                onClick ={() => deleteGroup(group.id)}>
                                <Image 
                                    src={DeleteIcon} 
                                    alt="d"
                                    className="mx-auto w-10 h-10"/>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <Suspense fallback={<div>Loading Add Tier</div>}>
                <LazyAddTier
                    isOpen={isCreateTier}
                    onAdd={(groups: GroupContent[]) => addTier(groups)}
                    onClose={closeTier}
                    name={name}/>
            </Suspense>
            <Suspense fallback={<div>Loading Edit Tier</div>}>
                <LazyEditTier
                    isOpen={isEditTier}
                    onEdit={(group: GroupContent) => editTier(group)}
                    onClose={closeEditTier}
                    deftier={currentTier}
                    id={currentId}
                    />
                    
            </Suspense>
            
        </div>
    )
}

export default SchoolInfo;