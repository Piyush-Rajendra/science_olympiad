"use client";
import React, { FC, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'; // Add useSearchParams to access query params
import Popup from '../components/Popup'; // Import the Popup component

const ForgotPassword: FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [accountType, setAccountType] = useState("Administrator"); // Default to Administrator

  // Fetch account type from query parameters on component load
  useEffect(() => {
    const type = searchParams.get('accountType');
    if (type) {
      setAccountType(type);
    }
  }, [searchParams]);

  const isValidEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isValidEmail(email)) {
      setShowPopup(true); // Show popup if email is invalid
      return;
    }

    try {
      // Determine the correct API route based on account type
      const route =
        accountType === 'Administrator'
          ? 'http://localhost:3000/auth/forgot-passwordA'
          : 'http://localhost:3000/auth/forgot-passwordEs';

        console.log("ACCOUNT " + accountType);

      const response = await fetch(route, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Failed to send reset link');
      }

      alert(`Password reset link sent to ${email}`);
      router.push('/'); // Redirect to login or another route
    } catch (error) {
      console.error('Error:', error);
      alert('Error sending reset link. Please try again.');
    }
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
                onChange={(e) => setEmail(e.target.value)}
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
            <Popup message="Please enter a valid email address." onClose={closePopup} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
