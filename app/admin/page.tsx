"use client";
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import '../styles/header.module.css';
import AttendanceView from '../pages/attendanceView';
import CreateTournament from '../pages/create-tournament';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import CreateTourney from '../components/create-tourney/create-tourney';
import CreateTourneyLanding from '../components/create-tourney/create-tourney-landing';
import Score from '../components/score/score';

export default function App() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const loggedIn = searchParams.get('loggedIn');
  const userType = searchParams.get('role');

  // Track login state and set default selected menu item to 'create'
  const [isLoggedIn, setIsLoggedIn] = useState(loggedIn === 'true'); 
  const [isAdmin, setIsAdmin] = useState(userType ===  'admin');
  type MenuItem = 'create' | 'manage_t' | 'attendance' | 'score' | 'resources' | 'manage_a&e';
  const [selected, setSelected] = useState<MenuItem>(isAdmin ? 'create' : 'resources');

  const handleClick = (item: MenuItem) => {
    setSelected(item);
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
    router.push('/');
  };

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/'); // Redirect to login if not logged in
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
            {isAdmin &&
            <h1>Admin Portal</h1>
            }
            {!isAdmin &&
            <h1>ES Portal</h1>
            }
          </div>
          <ul className="sidebar-menu">
            {isAdmin &&
              <li
                className={selected === 'create' ? 'selected' : ''}
                onClick={() => handleClick('create')}
              >
                <h2>
                  <img src="/images/plus-circle.png" alt="Logo" />
                  Create Tournament
                </h2>
              </li>
            }
            {isAdmin && 
              <li
                className={selected === 'manage_t' ? 'selected' : ''}
                onClick={() => handleClick('manage_t')}
              >
                <h2>
                  <img src="/images/share-network.png" alt="Logo" />
                  Manage Tournaments
                </h2>
              </li>
            }
            {isAdmin && 
            <li
              className={selected === 'manage_a&e' ? 'selected' : ''}
              onClick={() => handleClick('manage_a&e')}
            >
              <h2>
                <img src="/images/address-book.png" alt="Logo" />
                Manage Admins and ES
              </h2>
            </li>
            }
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
                <img src="images/book-bookmark.png" alt="Logo" />
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
          {selected === 'manage_t' && <div>Manage Tournament</div>}
          {selected === 'manage_a&e' && <div>Manage Admins and ES</div>}
          {selected === 'score' && <Score />}
          {selected === 'resources' && <div>Resource Library</div>}
        </div>
      </div>
    </div>
  );
}