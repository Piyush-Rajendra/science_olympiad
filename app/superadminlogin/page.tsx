"use client"
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useAuth } from '../adminsecure/AuthProvider';
import { AuthProvider } from '../adminsecure/AuthProvider';

const Login: React.FC = () => {
  const router = useRouter();
  const { login } = useAuth(); // Use the login function from AuthProvider
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Make API request to the backend to login the user
      const response = await fetch('http://localhost:3000/auth/loginSA', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.token) {
        // If login is successful, call the login function from the AuthProvider
        login(data.token);
        router.push('/superadmin'); // Redirect to the superadmin page
      } else {
        // If login fails, show the error message
        setErrorMessage(data.message || 'Login failed');
      }
    } catch (error) {
      setErrorMessage('An error occurred while trying to log in');
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
          <h2 className="text-2xl font-semibold mb-6 text-gray-700">Super Admin Sign In</h2>

          {/* Display error message */}
          {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

          {/* Sign In Form */}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                id="username"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-olympiadGreen focus:border-olympiadGreen sm:text-sm"
                placeholder="Your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)} // Handle username input
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

// Wrap the Login component in AuthProvider when it's used
const WrappedLogin: React.FC = () => (
  <AuthProvider>
  
    <Login />
  </AuthProvider>
);

export default WrappedLogin;