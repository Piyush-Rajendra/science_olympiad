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
  let loggedIn;
  let userType;
  
  
  try {
    userType = localStorage.getItem('isAdmin') || localStorage.getItem('isES');
    if (!userType) {
      throw new Error();
    }
    loggedIn = localStorage.getItem('token');
    if (!loggedIn) {
      throw new Error();
    }
  }, []);

  const [isLoggedIn, setIsLoggedIn] = useState(loggedIn === 'true');
  const [isAdmin, setIsAdmin] = useState(userType === 'admin');
  const [isCurrent, setIsCurrent] = useState<number | null>(null); // State for current tournament
  const [isTournamentDirector, setIsTournamentDirector] = useState<boolean>(false); // State for tournament director
  type MenuItem = 'create' | 'manage_t' | 'attendance' | 'score' | 'resources' | 'manage_a&e';
  const [selected, setSelected] = useState<MenuItem>(isAdmin ? 'create' : 'resources');

  useEffect(() => {
    const fetchCurrentTournament = async () => {
      const groupId = localStorage.getItem('group_id');
      if (groupId) {
        try {
          const response = await fetch(`http://localhost:3000/get-current-tournaments/${groupId}`);
          const data = await response.json();
          if (data.length > 0) {
            setIsCurrent(data[0].isCurrent); // Store isCurrent value
            // If current tournament exists, set the default tab to "Manage Tournament"
            if (data[0].isCurrent === 1 && isAdmin) {
              setSelected('manage_t');
            }
          } else {
            setIsCurrent(0); // No active tournament found
          }
        } catch (error) {
          console.error('Error fetching current tournament:', error);
        }
      }
    };

    // Check isTournamentDirector value
    const tournamentDirectorValue = localStorage.getItem('isTournamentDirector');
    setIsTournamentDirector(tournamentDirectorValue === '1'); // Convert to boolean

    fetchCurrentTournament();
  }, [isAdmin]);

  const handleClick = (item: MenuItem) => {
    setSelected(item);
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
    localStorage.clear();
    router.push('/');
  };

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/');
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div>
      <div>
        <div className="sidebar">
          <div className="sidebar-header">

            {isAdmin ? <h1>Admin Portal</h1> : <h1>ES Portal</h1>}
          </div>
          <ul className="sidebar-menu">
            {isAdmin && isTournamentDirector && ( // Only show if admin and tournament director
              <li
                className={selected === 'create' ? 'selected' : ''}
                onClick={() => isCurrent === 0 && handleClick('create')} // Only clickable if no current tournament
                style={{
                  cursor: isCurrent === 1 ? 'not-allowed' : 'pointer',
                  color: isCurrent === 1 ? '#999' : 'inherit', // Grey out when current tournament exists
                  opacity: isCurrent === 1 ? 0.6 : 1, // Reduce opacity
                  pointerEvents: isCurrent === 1 ? 'none' : 'auto', // Disable hover and clicks
                }}
              >
                <h2>
                  <img src="/images/plus-circle.png" alt="Logo" />
                  Create Tournament
                </h2>
              </li>
            )}
            {isAdmin && (
              <li
                className={selected === 'manage_t' ? 'selected' : ''}
                onClick={() => handleClick('manage_t')}
              >
                <h2>
                  <img src="/images/share-network.png" alt="Logo" />
                  Manage Tournaments
                </h2>
              </li>
            )}
            {isAdmin && (
              <li
                className={selected === 'manage_a&e' ? 'selected' : ''}
                onClick={() => handleClick('manage_a&e')}
              >
                <h2>
                  <img src="/images/address-book.png" alt="Logo" />
                  Manage Admins and ES
                </h2>
              </li>
            )}
            <li
              className={selected === 'attendance' ? 'selected' : ''}
              onClick={() => handleClick('attendance')}
            >
              <h2>
                <img src="/images/user-list.png" alt="Logo" />
                Attendance
              </h2>
            </li>
            <li
              className={selected === 'score' ? 'selected' : ''}
              onClick={() => handleClick('score')}
            >
              <h2>
                <img src="/images/chart-bar.png" alt="Logo" />
                Score
              </h2>
            </li>
            <li
              className={selected === 'resources' ? 'selected' : ''}
              onClick={() => handleClick('resources')}
            >
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
          {/* Display content based on selection */}
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
