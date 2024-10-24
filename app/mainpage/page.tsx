"use client";
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import AttendanceView from '../components/Attendance/attendanceView';
import CreateTourneyLanding from '../components/create-tourney/create-tourney-landing';
import Score from '../components/score/score';
import ManageUsers from '../pages/manageUsers';
import ManageTournament from '../components/ManageTournament/ManageTournament';
import ResourceLibrary from '../components/Resource-Library/resource-lib';
import '../styles/header.module.css';

export default function App() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isCurrent, setIsCurrent] = useState<number | null>(null);
  const [isTournamentDirector, setIsTournamentDirector] = useState<boolean>(false);
  const [selected, setSelected] = useState<'create' | 'manage_t' | 'attendance' | 'score' | 'resources' | 'manage_a&e'>('manage_t');

  // Effect for checking login status
  useEffect(() => {
    const userType = localStorage.getItem('isAdmin') || localStorage.getItem('isES');
    const token = localStorage.getItem('token');

    if (userType) {
      setIsAdmin(userType === 'admin');
    }

    if (token) {
      setIsLoggedIn(true);
    } else {
      router.push('/');
    }

    const tournamentDirectorValue = localStorage.getItem('isTournamentDirector');
    setIsTournamentDirector(tournamentDirectorValue === '1');
  }, [router]);

 
  

  // Fetch current tournament based on group ID
  useEffect(() => {
    const fetchCurrentTournament = async () => {
      const groupId = localStorage.getItem('group_id');
      if (groupId) {
        try {
          const response = await fetch(`http://localhost:3000/get-current-tournaments/${groupId}`);
          const data = await response.json();
          if (data.length > 0) {
            setIsCurrent(data[0].isCurrent);
            if (data[0].isCurrent === 1 && isAdmin) {
              setSelected('manage_t');
            }
          } else {
            setIsCurrent(0);
          }
        } catch (error) {
          console.error('Error fetching current tournament:', error);
        }
      }
    };

    // Fetch current tournament only if logged in
    if (isLoggedIn) {
      fetchCurrentTournament();
    }
  }, [isAdmin, isLoggedIn]);

  // Set selected view based on conditions
  useEffect(() => {
    if (isTournamentDirector && isCurrent === 0 && isAdmin) {
      setSelected('create');
    } else if (!isTournamentDirector && isAdmin) {
      setSelected('manage_t');
    }
  }, [isCurrent, isTournamentDirector, isAdmin]);

  const handleClick = (item: 'create' | 'manage_t' | 'attendance' | 'score' | 'resources' | 'manage_a&e') => {
    setSelected(item);
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
    localStorage.clear();
    router.push('/');
  };

  if (!isLoggedIn) {
    return <div>Loading...</div>; // Loading state while checking login
  }

  return (
    <div>
      <div>
        <div className="sidebar">
          <div className="sidebar-header">
            {isAdmin ? <h1>Admin Portal</h1> : <h1>ES Portal</h1>}
          </div>
          <ul className="sidebar-menu">
            {isAdmin && isTournamentDirector && (
              <li
                className={selected === 'create' ? 'selected' : ''}
                onClick={() => isCurrent === 0 && handleClick('create')}
                style={{
                  cursor: isCurrent === 1 ? 'not-allowed' : 'pointer',
                  color: isCurrent === 1 ? '#999' : 'inherit',
                  opacity: isCurrent === 1 ? 0.6 : 1,
                  pointerEvents: isCurrent === 1 ? 'none' : 'auto',
                }}
              >
                <h2>
                  <img src="/images/plus-circle.png" alt="Logo" />
                  Create Tournament
                </h2>
              </li>
            )}
            {isAdmin && (
              <li className={selected === 'manage_t' ? 'selected' : ''} onClick={() => handleClick('manage_t')}>
                <h2>
                  <img src="/images/share-network.png" alt="Logo" />
                  Manage Tournaments
                </h2>
              </li>
            )}
            {isAdmin && (
              <li className={selected === 'manage_a&e' ? 'selected' : ''} onClick={() => handleClick('manage_a&e')}>
                <h2>
                  <img src="/images/address-book.png" alt="Logo" />
                  Manage Admins and ES
                </h2>
              </li>
            )}
            <li className={selected === 'attendance' ? 'selected' : ''} onClick={() => handleClick('attendance')}>
              <h2>
                <img src="/images/user-list.png" alt="Logo" />
                Attendance
              </h2>
            </li>
            <li className={selected === 'score' ? 'selected' : ''} onClick={() => handleClick('score')}>
              <h2>
                <img src="/images/chart-bar.png" alt="Logo" />
                Score
              </h2>
            </li>
            <li className={selected === 'resources' ? 'selected' : ''} onClick={() => handleClick('resources')}>
              <h2>
                <img src="/images/book-bookmark.png" alt="Logo" />
                Resource Library
              </h2>
            </li>
          </ul>
          <button className="sign-out-button" onClick={handleSignOut}>
            Sign Out
          </button>
        </div>
        <div className="content">
          {selected === 'attendance' && <AttendanceView />}
          {selected === 'create' && <CreateTourneyLanding />}
          {selected === 'manage_t' && <ManageTournament />}
          {selected === 'manage_a&e' && <ManageUsers />}
          {selected === 'score' && <Score />}
          {selected === 'resources' && <ResourceLibrary />}
        </div>
      </div>
    </div>
  );
}
