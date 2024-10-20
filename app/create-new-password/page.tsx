// components/ForgotPassword.tsx
"use client"
import React, { FC, useState } from 'react';
import { useRouter } from 'next/navigation';

const ForgotPassword: FC = () => {
  const router = useRouter();
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate email sending logic here
    alert(`Password reset link sent to ${password}`);
    router.push('/login'); // Redirect to login or another route
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
          <h2 className="text-2xl font-semibold mb-2 text-gray-700">Create New Password</h2>
          <p className="text-gray-600 mb-6 text-sm">
            Please enter a new password.
          </p>

          {/* Email Input */}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-olympiadGreen focus:border-olympiadGreen sm:text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Handle email input
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="confirm-password"
                id="confirm-password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-olympiadGreen focus:border-olympiadGreen sm:text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Handle email input
                required
              />
            </div>

            {/* Send Email Button */}
            <button
              type="submit"
              className="w-full py-2 px-4 bg-olympiadGreen text-white rounded-lg shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-olympiadGreen mb-4"
            >
              Reset Password
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
