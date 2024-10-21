"use client"

import React, { useState, Suspense, useEffect } from 'react';
import EditIcon from '../../images/edit-246.png'
import DeleteIcon from '../../images/delete.png'
import Image from 'next/image';
const LazyEditAdmins = React.lazy(() => import('./EditAdmins'))

interface AdminContent {
    admin_id: number;
    school_group_id: number;
    firstName: string;
    lastName: string;
    email: string;
}


interface Props {
    group_id: number;
}

const Admins: React.FC<Props> = ( {group_id})  => {

    /*
    const [admins, setAdmins] = useState<AdminContent[]>([
        {admin_id: 0, group_id: 0, name: "John Doe", email: "jdoe@gmail.com"},
        {admin_id: 2, group_id: 0, name: "Tim Cook", email: "tcook@gmail.com"},
        {admin_id: 1, group_id: 1, name: "Rebecca Black", email: "rblack@gmail.com"},
    ])*/
    const token = localStorage.getItem('token');
    const [admins, setAdmins] = useState<AdminContent[]>([]);

    useEffect(() => {
        
        fetch('http://localhost:3000/auth/admin', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if(!response.ok) {
                    throw new Error('Failed to get admins');
                }
                return response.json()
            })
            .then((data) => {
                const currentAdmins = data
                    .filter((admin: any) => admin.school_group_id === group_id)
                    .map((admin: any) => ({
                        admin_id: admin.admin_id,
                        school_group_id: admin.school_group_id,
                        firstName: admin.firstName,
                        lastName: admin.lastName,
                        email: admin.email
                    }))
                setAdmins(currentAdmins)
            })
    })

    const editAdmin = async (id: number, first: string, last: string, email: string) => {
        try {

            const response = await fetch(`http://localhost:3000/auth/AId/${id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            })
            
            if (!response.ok) {
                throw new Error('Failed to fetch admin data');
            }

            const data = await response.json()
            const user = data.user

            const newResponse = await fetch(`http://localhost:3000/auth/updateadmin`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    "admin_id": id,
                    "school_group_id": group_id,
                    "firstName": first,
                    "lastName": last,
                    "email": email,
                    "username": user.username,
                    "password": user.password,
                    "isTournamentDirector": user.isTournamentDirector
                })
            })

            if (!newResponse.ok) {
                throw new Error('Failed to update admin data');
            }

            setAdmins((prevAdmins) => prevAdmins.filter(admin => admin.admin_id !== id));
        } catch (error) {
            console.log('Error occur editing admin')
        }
    } 

    const toggleAdmin = (index) => {
        const groupInfo = document.getElementById(`admin-${index}`);
        groupInfo.classList.toggle('hidden')
    }

    const deleteAdmin = async (index) => {
        try {
            await fetch(`http://localhost:3000/auth/deleteAdmin/${index}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            setAdmins((prevAdmins) => prevAdmins.filter(admin => admin.admin_id !== index));
        } catch (error) {
            console.log('Error deleting admin')
        }
    }



    return (
        <div>
            <div className="px-4 py-4">
                <table className="w-full table-auto text-left">
                    <thead className="border-b border-gray-300">
                        <tr>
                            <th className="px-4 py-2">Administrator</th>
                            <th className="px-4 py-2">Email</th>
                            <th className="px-4 py-4 flex justify-end pr-80">Manage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {admins.map((row, index) => (
                            <React.Fragment key={index}>
                                <tr className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} border-b`}>
                                    <td className="px-4 py-4">{`${row.firstName} ${row.lastName}`}</td>
                                    <td className="px-4 py-4">{row.email}</td>
                                    <td className="px-4 py-4 flex justify-end pr-80">
                                        <button className="flex justify-center"
                                            onClick = {() => {toggleAdmin(row.admin_id)} }>
                                            <Image 
                                                src={EditIcon} 
                                                alt="e"
                                                className="mx-auto w-10 h-10"/>
                                        </button>
                                        <button className="flex justify-center"
                                            onClick ={() => {deleteAdmin(row.admin_id)} }>
                                            <Image 
                                                src={DeleteIcon} 
                                                alt="d"
                                                className="mx-auto w-10 h-10"/>
                                        </button>
                                    </td>
                                </tr>
                                <tr id ={`admin-${row.admin_id}`} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} border-b hidden`}>
                                    
                                    <td colSpan={3} className="p-4">
                                        <Suspense fallback={<div>Loading Edit Admin</div>}>
                                            <LazyEditAdmins
                                                defaultFirst={row.firstName}
                                                defaultLast={row.lastName}
                                                defaultEmail={row.email}
                                                onEdit={(first: string, last: string, email: string) => editAdmin(row.admin_id, first, last, email)}
                                                onClose={() => toggleAdmin(row.admin_id)}
                                            />
                                        </Suspense>
                                    </td>
                                
                                </tr>
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    )
}

export default Admins