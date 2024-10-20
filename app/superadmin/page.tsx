"use client"

import React, { useState, Suspense, useEffect } from 'react';
import EditIcon from '../images/edit-246.png';
import DeleteIcon from '../images/delete.png';
import AddPersonIcon from '../images/add-person.png';
import Image from 'next/image';
const LazyAddGroup = React.lazy(() => import('../components/Groups/AddGroup'))
const LazyAdmins = React.lazy(() => import('../components/Groups/Admins'))
const LazyDeleteGroup = React.lazy(() => import('../components/Groups/DeleteGroup'))
const LazyAddUser = React.lazy(() => import('../components/Groups/AddUser'))

interface GroupContent {
    school_group_id: number;
    name: string;
}

const Groups: React.FC = ()  => {

    /*
    const [groups, setGroups] = useState<GroupContent[]>([
        {id: 0, school: "UGA"},
        {id: 1, school: "MGA"},
        {id: 2, school: "GT"},
    ])*/

    const [groups, setGroups] = useState<GroupContent[]>([]);
    useEffect(() => {
        fetch('http://localhost:3000/get-schoolgroups-all')
            .then((response) => response.json())
            .then((data) => setGroups(data))
            .catch((error) => console.error('Could not retrieve groups'))
    }, []);

    

    const [dropdownIds, setDropdownIds] = useState({});
    const [nextId, setNextId] = useState<number>(3);
    const [currentId, setCurrentId] = useState(0);
    const [currentName, setCurrentName] = useState("")
    const [isAddGroup, setAddGroup] = useState(false);
    const [isAddUser, setAddUser] = useState(false);
    const [isDeleteGroup, setDeleteGroup] = useState(false);
    const [isEdit, setEdit] = useState(false)


    const openGroup = (index: number) => {
        const groupInfo = document.getElementById(`row-${index}`);
        groupInfo.classList.toggle('hidden')
    }

    const toggleDropdown = (index: number) => {
        setDropdownIds(state => ({
            ...state, [index]: !state[index]
        }))
    }

    const addGroup = async (name: string) => {
        try {
            await fetch('http://localhost:3000/add-schoolgroup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ schoolname: name})
            })

            const newGroups = await fetch('http://localhost:3000/get-schoolgroups-all')
            const data = await newGroups.json()
            setGroups(data)
                
            
        } catch (error) {
            console.log('Error occured adding school group')
        }
    };

    const editGroup = async (name: string) => {
        try {
            await fetch(`http://localhost:3000/edit-schoolgroup/${currentId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: name})
            })

            const newGroups = await fetch('http://localhost:3000/get-schoolgroups-all')
            const data = await newGroups.json()
            setGroups(data)
        } catch (error) {
            console.log('Error occur editing school group')
        }
    }

    const addUser = async (first: string, last: string, email: string, isDirector: boolean) => {
        try {
            await fetch('http://localhost:3000/auth/registerAdmin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ school_group_id: currentId, firstName: first, lastName: last, email: email, username: "gdfgd", isTournamentDirector: isDirector})
            })
        } catch (error) {
            console.log('Error occured adding user')
        }
    }

    const openAddGroup = (id: number, name: string, edit: boolean) => {
        setCurrentId(id);
        setEdit(edit);
        if (edit) {
            setCurrentName(name)
        } else {
            setCurrentName("")
        }
        setAddGroup(true);
    }

    const closeAddGroup = () => {
        setAddGroup(false);
    }

    const openAddUser = (id: number, edit: boolean) => {
        setCurrentId(id);
        setAddUser(true);
    }

    const closeAddUser= () => {
        setAddUser(false);
    }

    const openDeleteGroup = (id: number, name: string) => {
        setCurrentId(id);
        setCurrentName(name);
        setDeleteGroup(true);
    }

    const closeDeleteGroup = () => {
        setDeleteGroup(false);
    }

    const deleteGroup = async (id: number) => {
        try {
            await fetch(`http://localhost:3000/delete-schoolgroup/${currentId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            const newGroups = await fetch('http://localhost:3000/get-schoolgroups-all')
            const data = await newGroups.json()
            setGroups(data)
        } catch (error) {
            console.log('Error deleting school group')
        }
    }

    return (
        <div className="font-sans">
            <div className="px-4 py-4">
                <div className="py-4 border-b border-gray-300 px-2">
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
                                <th className="py-4 flex justify-end pr-80">Manage</th>
                            </tr>
                        </thead>
                        <tbody>
                            {groups.map((row, index) => (
                                <React.Fragment key={index}>
                                    <tr className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} border-b`}>
                                        <td className="pl-2" onClick={() => {openGroup(index); toggleDropdown(row.school_group_id)}}>
                                            {dropdownIds[row.school_group_id] ? '▲' : '▼'}
                                        </td>
                                        <td className="pr-20 py-4">{row.name}</td>
                                        <td className="py-4 flex justify-end space-x-4 pr-60">
                                            <button className="flex justify-center"
                                                onClick = {() => {openAddUser(row.school_group_id, true)} }>
                                                <Image 
                                                    src={AddPersonIcon} 
                                                    alt="e"
                                                    className="mx-auto w-10 h-10"/>
                                            </button>
                                            <button className="flex justify-center"
                                                onClick = {() => {openAddGroup(row.school_group_id, row.name, true)} }>
                                                <Image 
                                                    src={EditIcon} 
                                                    alt="e"
                                                    className="mx-auto w-10 h-10"/>
                                            </button>
                                            <button className="flex justify-center"
                                                onClick ={() => {openDeleteGroup(row.school_group_id, row.name)} }>
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
                                                    group_id={row.school_group_id}/>
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
                <button onClick={() => openAddGroup(nextId, currentName, false)} className="text-1xl font-bold underline px-4"
                    style={{color:'#006330'}}>
                    Add a school
                </button>
                <button className="rounded-full text-1xl px-6 py-3 text-white"
                        style={{backgroundColor:'#006330'}}>
                    Return
                </button>
                </div>
            </div>
            <Suspense fallback={<div>Loading Add Group</div>}>
                <LazyAddGroup
                    isOpen={isAddGroup}
                    currentName = {currentName}
                    onAdd={(name: string) => addGroup(name)}
                    onEdit={(name: string) => editGroup(name)}
                    onClose={closeAddGroup}
                    isEdit = {isEdit}
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
            <Suspense fallback={<div>Loading Add Group</div>}>
                <LazyAddUser
                    isOpen={isAddUser}
                    onAdd={(firstName: string, lastName: string, email: string, director: boolean) => addUser(firstName, lastName, email, director)}
                    onClose={closeAddUser}
                />
            </Suspense>
        </div>
    )
}

export default Groups