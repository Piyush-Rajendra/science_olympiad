"use client"

import React, { useState, Suspense } from 'react';
import EditIcon from '../images/edit-246.png';
import DeleteIcon from '../images/delete.png';
// import EditIcon from '../../images/edit-246.png'
// import DeleteIcon from '../../images/delete.png'
import Image from 'next/image';
const LazyAddGroup = React.lazy(() => import('../components/Groups/AddGroup'))
const LazyAdmins = React.lazy(() => import('../components/Groups/Admins'))
const LazyDeleteGroup = React.lazy(() => import('../components/Groups/DeleteGroup'))


interface GroupContent {
    id: number;
    school: string;
}

const Groups: React.FC = ()  => {

    const [groups, setGroups] = useState<GroupContent[]>([
        {id: 0, school: "UGA"},
        {id: 1, school: "MGA"},
        {id: 2, school: "GT"},
    ])

    const [dropdownIds, setDropdownIds] = useState({});
    const [nextId, setNextId] = useState<number>(3);
    const [currentId, setCurrentId] = useState(0);
    const [currentName, setCurrentName] = useState("")
    const [isAddGroup, setAddGroup] = useState(false);
    const [isDeleteGroup, setDeleteGroup] = useState(false);

    const openGroup = (index: number) => {
        const groupInfo = document.getElementById(`row-${index}`);
        groupInfo.classList.toggle('hidden')
    }

    const toggleDropdown = (index: number) => {
        setDropdownIds(state => ({
            ...state, [index]: !state[index]
        }))
    }

    const addGroup = (name: string) => {
        if (groups.some(group => group.id === currentId)) {
            setGroups((prevGroups) => 
                prevGroups.map((group) => 
                    group.id === currentId ? { ...groups, ...{ id: currentId, school: name } } : group
                )
            );
        } else {
            setGroups([...groups, { id: nextId, school: name}]);
            setNextId(nextId + 1);
        }
    };

    const openAddGroup = (id: number) => {
        setCurrentId(id);
        setAddGroup(true);
    }

    const closeAddGroup = () => {
        setAddGroup(false);
    }

    const openDeleteGroup = (id: number, name: string) => {
        setCurrentId(id);
        setCurrentName(name);
        setDeleteGroup(true);
    }

    const closeDeleteGroup = () => {
        setDeleteGroup(false);
    }

    const deleteGroup = (id: number) => {
        setGroups((prevGroups) => 
            prevGroups.filter((group) => group.id !== id)
        );   
    }

    return (
        <div className="font-sans">
            <div className="px-4 py-4">
                <div className="py-4 border-b border-gray-300">
                    <h2 className='text-3xl font-bold'>
                        School Groups
                    </h2>
                </div>
                <div className="py-4">
                    <table className="w-full table-auto text-left">
                        <thead className="border-b border-gray-300">
                            <tr>
                                <th className="pl-2"></th>
                                <th className="pr-20 py-2">School Name</th>
                                <th className="pl-10 py-2">Manage</th>
                            </tr>
                        </thead>
                        <tbody>
                            {groups.map((row, index) => (
                                <React.Fragment key={index}>
                                    <tr className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} border-b`}>
                                        <td className="pl-2" onClick={() => {openGroup(index); toggleDropdown(row.id)}}>
                                            {dropdownIds[row.id] ? '▲' : '▼'}
                                        </td>
                                        <td className="pr-20 py-4">{row.school}</td>
                                        <td className="pl-10 py-4 flex">
                                            <button className="flex justify-center"
                                                onClick = {() => {openAddGroup(row.id)} }>
                                                <Image 
                                                    src={EditIcon} 
                                                    alt="e"
                                                    className="mx-auto w-10 h-10"/>
                                            </button>
                                            <button className="flex justify-center"
                                                onClick ={() => {openDeleteGroup(row.id, row.school)} }>
                                                <Image 
                                                    src={DeleteIcon} 
                                                    alt="e"
                                                    className="mx-auto w-10 h-10"/>
                                            </button>
                                        </td>
                                    </tr>
                                    <tr id ={`row-${index}`} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} border-b hidden`}>
                                        <td colSpan={3} className="p-4">
                                            <Suspense fallback={<div>Loading Admins</div>}>
                                                <LazyAdmins 
                                                    group_id={row.id}/>
                                            </Suspense>
                                            
                                        </td>
                                    </tr>
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="absolute bottom-0 left-0 w-full border-t border-gray-300 bg-gray-50 px-12 py-4">
                <div className="flex justify-between">
                <button onClick={() => openAddGroup(nextId)} className="text-1xl font-bold underline px-4"
                    style={{color:'#006330'}}>
                    Add a school
                </button>
                <button className="rounded-full text-1xl px-6 py-3 text-white"
                        style={{backgroundColor:'#006330'}}>
                    Save Changes
                </button>
                </div>
            </div>
            <Suspense fallback={<div>Loading Add Group</div>}>
                <LazyAddGroup
                    isOpen={isAddGroup}
                    onAdd={(name: string) => addGroup(name)}
                    onClose={closeAddGroup}
                />
            </Suspense>
            <Suspense fallback={<div>Loading Delete Group</div>}>
                <LazyDeleteGroup
                    isOpen={isDeleteGroup}
                    onConfirm={() => deleteGroup(currentId)}
                    onClose={closeDeleteGroup}
                    name={currentName}
                />
            </Suspense>
        </div>
    )
}

export default Groups