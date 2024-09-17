"use client"

import Link from 'next/link'
import './styles/header.module.css'
import NewTournamentForm from './components/newTournamentForm';
import TournamentView from './components/tournamentView';
import AttendanceView from './components/AttendanceView'
import home_logo from './images/house.png'
import book_logo from './images/book-bookmark.png'
import chart_logo from './images/chart-bar.png'
import plus_logo from './images/plus-circle.png'
import share_logo from './images/share-network.png'
import user_logo from './images/user-list.png'
import Image from 'next/image';
import { useState } from 'react';
import CreateTourney from './create-tourney/create-tourney';
import CreateEvent from './create-tourney/create-event';
import EventItem from './create-tourney/event-item';
import NewEventForm from './create-tourney/new-event-form';
import TimeBlockItem from './create-tourney/time-block-item';

export default function app() {
 
  const [selected, setSelected] = useState<MenuItem | null>(null);

  type MenuItem = 'home' | 'create' | 'manage' | 'attendance' | 'score' | 'resources';

  const handleClick = (item: MenuItem) => {
    setSelected(item);
  };
 
  return (

<div>
  <div className="sidebar">
    <div className="sidebar-header">
        <h1>Admin Panel</h1>
    </div>
    <ul className="sidebar-menu">
          <li
            className={selected === 'home' ? 'selected' : ''}
            onClick={() => handleClick('home')}
          >

            <h2><Image
              src={home_logo}
              alt="Logo"
            />Home</h2>
          </li>
          <li
            className={selected === 'create' ? 'selected' : ''}
            onClick={() => handleClick('create')}
          >
                      
            <h2><Image
              src={plus_logo}
              alt="Logo"
            />Create Tournament</h2>
          </li>
          <li
            className={selected === 'manage' ? 'selected' : ''}
            onClick={() => handleClick('manage')}
          >
                      
            <h2><Image
              src={share_logo}
              alt="Logo"
            />Manage Tournaments</h2>
          </li>
          <li
            className={selected === 'attendance' ? 'selected' : ''}
            onClick={() => handleClick('attendance')}
          >
                      
            <h2><Image
              src={user_logo}
              alt="Logo"
            />Attendance</h2>
          </li>
          <li
            className={selected === 'score' ? 'selected' : ''}
            onClick={() => handleClick('score')}
          >
                      
            <h2><Image
              src={chart_logo}
              alt="Logo"
            />Score</h2>
          </li>
          <li
            className={selected === 'resources' ? 'selected' : ''}
            onClick={() => handleClick('resources')}
          >
                      
            <h2><Image
              src={book_logo}
              alt="Logo"
            />Resource Library</h2>
          </li>
        </ul>
        <button className="sign-out-button">Sign Out</button>
  </div>
  <div>
    <CreateEvent/>
  </div>
</div>
 );
}