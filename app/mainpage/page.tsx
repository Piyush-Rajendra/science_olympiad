"use client";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import '../styles/header.module.css';
import AttendanceView from '../components/Attendance/attendanceView';
import CreateTournament from '../pages/create-tournament';
import CreateTourneyLanding from '../components/create-tourney/create-tourney-landing';
import Score from '../components/score/score';
import ManageUsers from '../pages/manageUsers';
import ManageTournament from '../components/ManageTournament/ManageTournament';
import ResourceLibrary from '../components/Resource-Library/resource-lib';
import { useState, useEffect } from 'react';

export default function App() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [selected, setSelected] = useState<'create' | 'manage_t' | 'attendance' | 'score' | 'resources' | 'manage_a&e'>('resources');

  useEffect(() => {
    const userType = localStorage.getItem('isAdmin') || localStorage.getItem('isES');
    const token = localStorage.getItem('token');

    if (userType) {
      setIsAdmin(userType === 'admin');
    } else {
      router.push('/');
      return; // Exit early to prevent further execution
    }

    if (token) {
      setIsLoggedIn(true);
    } else {
      router.push('/');
    }
  }, []);

  if (!isLoggedIn) {
    return <div>Loading...</div>; // Loading state while checking login
  }

  const handleClick = (item: 'create' | 'manage_t' | 'attendance' | 'score' | 'resources' | 'manage_a&e') => {
    setSelected(item);
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
    localStorage.clear();
    router.push('/');
  };

  return (
    <div>
      <div>
        <div className="sidebar">
          <div className="sidebar-header">
            {isAdmin && <h1>Admin Portal</h1>}
            {!isAdmin && <h1>ES Portal</h1>}
          </div>
          <ul className="sidebar-menu">
            {isAdmin && (
              <>
                <li
                  className={selected === 'create' ? 'selected' : ''}
                  onClick={() => handleClick('create')}
                >
                  <h2>
                    <img src="/images/plus-circle.png" alt="Logo" />
                    Create Tournament
                  </h2>
                </li>
                <li
                  className={selected === 'manage_t' ? 'selected' : ''}
                  onClick={() => handleClick('manage_t')}
                >
                  <h2>
                    <img src="/images/share-network.png" alt="Logo" />
                    Manage Tournaments
                  </h2>
                </li>
                <li
                  className={selected === 'manage_a&e' ? 'selected' : ''}
                  onClick={() => handleClick('manage_a&e')}
                >
                  <h2>
                    <img src="/images/address-book.png" alt="Logo" />
                    Manage Admins and ES
                  </h2>
                </li>
              </>
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
