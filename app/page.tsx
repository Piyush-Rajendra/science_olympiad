"use client";
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function App() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accountType, setAccountType] = useState("Administrator");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (accountType === 'Administrator') {
      try {
        const response = await fetch('http://localhost:3000/auth/adminlogin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        });

        if (!response.ok) {
          alert('Invalid email or password');
          return;
        }

        const data = await response.json();
        localStorage.setItem('isAdmin', 'admin');
        localStorage.setItem('token', data.token)
        localStorage.setItem('group_id', data.school_group_id);
        localStorage.setItem('isTournamentDirector', data.isTournamentDirector);
        router.push('/mainpage');
        // Handle login success (e.g., store token, redirect)
      } catch (error) {
        console.error('Error:', error);
        // Handle login error
      }
    } else {
      try {
        const response = await fetch('http://localhost:3000/auth/esLogin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        });

        if (!response.ok) {
          alert('Invalid email or password');
          return;
        }

        const data = await response.json();
        localStorage.setItem('isES', 'es');
        localStorage.setItem('token', data.token);
        localStorage.setItem('group_id', data.school_group_id);
        localStorage.setItem('es_id', data.eventSupervisor_id);
        router.push('/mainpage');
        // Handle login success (e.g., store token, redirect)
      } catch (error) {
        alert('Login failed');
        return;
        // Handle login error
      }
    }

  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side */}
      <div className="w-1/2 bg-olympiadGreen flex items-center justify-center">
        <div className="text-center text-white">
          <img
            src="/images/Epoch_Scoring_System.png"
            alt="Epoc Scoring System Logo"
            className="mx-auto mb-6"
            style={{ width: '600px', height: 'auto' }}
          />
        </div>
      </div>

      {/* Right Side */}
      <div className="w-1/2 bg-white flex items-center justify-center">
        <div className="w-3/4 max-w-md">
          <h2 className="text-2xl font-semibold mb-6 text-gray-700">Sign In</h2>

          {/* Account Type Toggle */}
          <div className="flex justify-between mb-6">
            <div className="w-full bg-white border-2 border-black rounded-full relative p-1">
              <div
                className={`absolute top-0 left-0 w-1/2 h-full bg-green-700 rounded-full transition-transform duration-300 ease-in-out ${accountType === "Event Supervisor" ? "translate-x-full" : ""
                  }`}></div>
              <div className="relative z-10 flex justify-between">
                <button
                  className={`w-1/2 text-center py-1 font-bold transition-colors duration-300 ease-in-out ${accountType === "Administrator" ? "text-white" : "text-black"
                    }`}
                  onClick={() => setAccountType("Administrator")}>
                  Administrator
                </button>
                <button
                  className={`w-1/2 text-center py-1 font-bold transition-colors duration-300 ease-in-out ${accountType === "Event Supervisor" ? "text-white" : "text-black"
                    }`}
                  onClick={() => setAccountType("Event Supervisor")}>
                  Event Supervisor
                </button>
              </div>
            </div>
          </div>

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
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Pass accountType in query parameter */}
            <a
              href={`/forgot-password?accountType=${accountType}`}
              className="text-green-700 mb-4 block text-left">
              Forgot password?
            </a>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-olympiadGreen text-white rounded-lg shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-olympiadGreen">
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
