import React, { useState, Suspense } from 'react';
import EditIcon from '../../../images/edit-246.png'
import DeleteIcon from '../../../images/delete.png'
import Image from 'next/image';

const LazySchoolInfo = React.lazy(() => import('./SchoolInfo'))
const LazyAddSchool = React.lazy(() => import('../Add/AddSchool'))
const LazyEditSchool = React.lazy(() => import('../Edit/EditSchool'))

interface SchoolContent {
    name: string;
    teamID: string;
    flight: string;
    id: number;
}

const TimeInfo: React.FC = ()  => {


    const [schools, setSchools] = useState<SchoolContent[]>([]);
    const [nextId, setNextId] = useState<number>(1);
    const [isCreateSchool, setIsCreateSchool] = useState(false);
    const [currentSchoolId, setCurrentSchoolId] = useState(0);
    const [isEditSchool, setIsEditSchool] = useState(false);
    const [dropdownIds, setDropdownIds] = useState({});

    const createSchool = () => {
        setIsCreateSchool(true)
    }

    const closeSchool = () => {
        setIsCreateSchool(false)
    }

    const openEditSchool = (id: number) => {
        setCurrentSchoolId(id);
        setIsEditSchool(true);
    }

    const closeEditSchool = () => {
        setIsEditSchool(false);
    }

    const editSchool = (updatedSchool: SchoolContent) => {
        setSchools((prevSchools) =>
            prevSchools.map((school) =>
                school.id === updatedSchool.id ? {...school, ...updatedSchool } : school
            )
        );
    };
    

    const addSchool = (newSchools) => {
        setSchools([...schools, ...newSchools]);
        setNextId(nextId + newSchools.length)
    }

    const deleteSchool = (index: number) => {
        setSchools(schools.filter(school => school.id !== index));
    }

    const openSchool = (index) => {
        const schoolInfo = document.getElementById(`school-${index}`);
        schoolInfo.classList.toggle('hidden')
    }

    const toggleDropdown = (index) => {
        setDropdownIds(state => ({
            ...state, [index]: !state[index]
        }))
    }

    return (
        <div>
            <div className="px-2 py-4">
                <div className="flex justify-between">
                    <h2 className='text-3xl font-bold'>
                        Schools
                    </h2>
                    <button onClick={createSchool} className="rounded-full px-6 py-2"
                            style={{backgroundColor:'#B7E394'}}>
                        Add School
                    </button>
                </div>
            </div>
            <table className="w-full table-auto text-left">
                <thead className="border-b border-gray-300">
                    <tr>
                        <th className="px-2"></th>
                        <th className="py-2 px-2">School Name</th>
                        <th className="py-2 px-8">Team ID</th>
                        <th className="py-2 px-8">Flights</th>
                        <th className="px-2 py-2">Manage</th>
                    </tr>
                </thead>
                <tbody>
                    {schools.map((row, index) => (
                        <React.Fragment key={index}>
                            <tr className="border-b">
                                <td className="px-2"></td>
                                <td className="py-2 px-2">{row.name}</td>
                                <td className="py-2 px-8">{row.teamID}</td>
                                <td className="py-2 px-8">{row.flight}</td>
                                <td className="px-4 py-2 justify-normal flex space-x-4">
                                    <button className="flex justify-center"
                                        onClick ={() => openEditSchool(row.id)}>
                                        <Image 
                                            src={EditIcon} 
                                            alt="e"
                                            className="mx-auto w-10 h-10"/>
                                    </button>
                                    <button className="flex justify-center"
                                        onClick ={() => deleteSchool(row.id)}>
                                        <Image 
                                            src={DeleteIcon} 
                                            alt="d"
                                            className="mx-auto w-10 h-10"/>
                                    </button>
                                </td>
                            </tr>
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
            <Suspense fallback={<div>Loading Add School</div>}>
                <LazyAddSchool
                    isOpen={isCreateSchool}
                    onAdd={(newSchools: SchoolContent[]) => addSchool(newSchools)}
                    onClose={closeSchool} 
                    id={nextId}
                />
            </Suspense>
            
            <Suspense fallback={<div>Loading Edit School</div>}>
                <LazyEditSchool
                    isOpen={isEditSchool}
                    onEdit={(newSchool: SchoolContent) => editSchool(newSchool)}
                    onClose={closeEditSchool}
                    nextId={currentSchoolId}
                />
            </Suspense>
        </div>
    )
}

export default TimeInfo;