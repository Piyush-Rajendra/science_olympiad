// "use client";
// import {useRouter, useSearchParams} from 'next/navigation';
// import Link from 'next/link';
// import './styles/header.module.css';
// import AttendanceView from './pages/attendanceView';
// import CreateTournament from './pages/create-tournament'
// import Login from './log-in/page';
// import Image from 'next/image';
// import { useState, useEffect } from 'react';

// export default function App() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const loggedIn = searchParams.get('loggedIn')

//   const [selected, setSelected] = useState<MenuItem | null>(null);
//   const [isLoggedIn, setIsLoggedIn] = useState(loggedIn === 'true'); // Track login state

//   type MenuItem = 'home' | 'create' | 'manage_t' | 'attendance' | 'score' | 'resources' | 'manage_a&e';

//   const handleClick = (item: MenuItem) => {
//     setSelected(item);
//   };

//   const handleSignOut = () => {

//     setIsLoggedIn(false);    
//     router.push('/log-in');
//   }

//   useEffect(() => {
//     console.log(isLoggedIn);
//     if (isLoggedIn !== true) {
//       router.push('/log-in'); // Redirect to login if not logged in
//       //return null; // Prevent rendering the admin panel if not logged in
//     }

//   }, [loggedIn]);

//   if (isLoggedIn !== true) {
//     return null;
//   }
//     return (
//       <div>
//           <div>
//             <div className="sidebar">
//               <div className="sidebar-header">
//                 <h1>Admin Panel</h1>
//               </div>
//               <ul className="sidebar-menu">
//                 <li
//                   className={selected === 'home' ? 'selected' : ''}
//                   onClick={() => handleClick('home')}
//                 >
//                   <h2>
//                     <img src="/images/house.png" alt="Logo" />
//                     Home
//                   </h2>
//                 </li>
//                 <li
//                   className={selected === 'create' ? 'selected' : ''}
//                   onClick={() => handleClick('create')}
//                 >
//                   <h2>
//                     <img src="/images/plus-circle.png" alt="Logo" />
//                     Create Tournament
//                   </h2>
//                 </li>
//                 <li
//                   className={selected === 'manage_t' ? 'selected' : ''}
//                   onClick={() => handleClick('manage_t')}
//                 >
//                   <h2>
//                     <img src="/images/share-network.png" alt="Logo" />
//                     Manage Tournaments
//                   </h2>
//                 </li>
//                 <li
//                   className={selected === 'manage_a&e' ? 'selected' : ''}
//                   onClick={() => handleClick('manage_a&e')}
//                 >
//                   <h2>
//                     <img src="/images/address-book.png" alt="Logo" />
//                     Manage Admins and ES
//                   </h2>
//                 </li>
//                 <li
//                   className={selected === 'attendance' ? 'selected' : ''}
//                   onClick={() => handleClick('attendance')}
//                 >
//                   <h2>
//                     <img src="/images/user-list.png" alt="Logo" />
//                     Attendance
//                   </h2>
//                 </li>
//                 <li
//                   className={selected === 'score' ? 'selected' : ''}
//                   onClick={() => handleClick('score')}
//                 >
//                   <h2>
//                     <img src="/images/chart-bar.png" alt="Logo" />
//                     Score
//                   </h2>
//                 </li>
//                 <li
//                   className={selected === 'resources' ? 'selected' : ''}
//                   onClick={() => handleClick('resources')}
//                 >
//                   <h2>
//                     <img src="images/book-bookmark.png" alt="Logo" />
//                     Resource Library
//                   </h2>
//                 </li>
//               </ul>
//               <button className="sign-out-button" onClick={handleSignOut}>Sign Out</button> {/* Sign out functionality */}
//             </div>
//             <div className="content">
//               {/* Display content based on selection */}
//               {selected === 'attendance' && <AttendanceView />}
//               {selected === 'create' && <CreateTournament />}
//               {selected === 'home'}
//               {selected === 'manage_t'}
//               {selected === 'manage_a&e'}
//               {selected === 'score'}
//               {selected === 'resources'}
//             </div>
//           </div>
//       </div>
//     );
// }
"use client";
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function App() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulating a successful login - you can replace this with actual login logic
    if (email === 'admin@example.com' && password === 'password123') {
      localStorage.setItem('isLoggedIn', 'true');
      router.push('/admin?loggedIn=true'); // Redirect to home or another route after login
    } else {
      alert('Invalid email or password'); // Basic error handling
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side */}
      <div className="w-1/2 bg-olympiadGreen flex items-center justify-center">
        <div className="text-center text-white">
          <img
            src="/images/science-olympiad-logo.png"
            alt="Science Olympiad Logo"
            className="mx-auto mb-6"
            style={{ width: '600px', height: 'auto' }}
          />
        </div>
      </div>

      {/* Right Side */}
      <div className="w-1/2 bg-white flex items-center justify-center">
        <div className="w-3/4 max-w-md">
          <h2 className="text-2xl font-semibold mb-6 text-gray-700">Sign In</h2>

          {/* Sign In Form */}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-olympiadGreen focus:border-olympiadGreen sm:text-sm"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Handle email input
              />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-olympiadGreen focus:border-olympiadGreen sm:text-sm"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Handle password input
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-olympiadGreen text-white rounded-lg shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-olympiadGreen"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
