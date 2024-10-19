"use client"

import React, { useState, Suspense } from 'react';
import EditIcon from '../../images/edit-246.png'
import DeleteIcon from '../../images/delete.png'
import Image from 'next/image';
const LazyEditAdmins = React.lazy(() => import('./EditAdmins'))

interface AdminContent {
    admin_id: number;
    group_id: number
    name: string;
    email: string
}

interface Props {
    group_id: number;
}

const Admins: React.FC<Props> = ( {group_id})  => {

    const [admins, setAdmins] = useState<AdminContent[]>([
        {admin_id: 0, group_id: 0, name: "John Doe", email: "jdoe@gmail.com"},
        {admin_id: 2, group_id: 0, name: "Tim Cook", email: "tcook@gmail.com"},
        {admin_id: 1, group_id: 1, name: "Rebecca Black", email: "rblack@gmail.com"},
    ])
    const [nextId, setNextId] = useState<number>(2);

    const editAdmin = (id: number, name: string, email: string) => {
        setAdmins((prevAdmins) =>
            prevAdmins.map((admin) =>
                admin.admin_id === id ? {...admins, ...{admin_id: id, group_id:group_id, name: name, email: email } } : admin
            )
        )
    } 

    const toggleAdmin = (index) => {
        const groupInfo = document.getElementById(`admin-${index}`);
        groupInfo.classList.toggle('hidden')
    }

    const deleteAdmin = (index) => {
        setAdmins((prevAdmins) =>
            prevAdmins.filter((admin) => admin.admin_id !== index)
        );
    }

    const groupAdmins = admins.filter(admin => admin.group_id === group_id)


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
                        {groupAdmins.map((row, index) => (
                            <React.Fragment key={index}>
                                <tr className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} border-b`}>
                                    <td className="px-4 py-4">{row.name}</td>
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
                                                defaultName={row.name}
                                                defaultEmail={row.email}
                                                onEdit={(name: string, email: string) => editAdmin(row.admin_id, name, email)}
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