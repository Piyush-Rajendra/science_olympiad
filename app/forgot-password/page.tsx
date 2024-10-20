// components/ForgotPassword.tsx
"use client";
import React, { FC, useState } from 'react';
import { useRouter } from 'next/navigation';
import Popup from '../components/Popup'; // Import the Popup component

const ForgotPassword: FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [showPopup, setShowPopup] = useState(false); // State to control popup visibility

  const isValidEmail = (email: string) => {
    // Basic email validation regex
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate email
    if (!isValidEmail(email)) {
      setShowPopup(true); // Show the popup if email is invalid
      return;
    }

    // Simulate email sending logic here
    alert(`Password reset link sent to ${email}`);
    router.push('/'); // Redirect to login or another route
  };

  const closePopup = () => {
    setShowPopup(false); // Hide the popup
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
          <h2 className="text-2xl font-semibold mb-2 text-gray-700">Forgot Password?</h2>
          <p className="text-gray-600 mb-6 text-sm">
            No worries, we'll send you a link to reset your password.
          </p>

          {/* Email Input */}
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
                required
              />
            </div>

            {/* Send Email Button */}
            <button
              type="submit"
              className="w-full py-2 px-4 bg-olympiadGreen text-white rounded-lg shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-olympiadGreen mb-4"
            >
              Send Email
            </button>

            {/* Back to Sign In */}
            <div className="flex justify-center">
              <a href="/" className="text-green-700 mb-4 text-center">
                ← Back to Sign In
              </a>
            </div>
          </form>

          {/* Popup for invalid email address */}
          {showPopup && (
            <Popup message="Please check your spam and inbox! We have sent reset instructions to your email address." onClose={closePopup} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
