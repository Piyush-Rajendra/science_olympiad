// components/ForgotPassword.tsx
"use client";
import React, { FC, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const ForgotPassword: FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [accountType, setAccountType] = useState<'Administrator' | 'Event Supervisor'>('Administrator');
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      alert('Invalid token. Redirecting to login.');
      router.push('/');
    }
  }, [token, router]);

  const validatePassword = (password: string) => {
    const errors: string[] = [];
    if (password.length < 8) errors.push('At least 8 characters required.');
    if (!/[A-Z]/.test(password)) errors.push('At least one uppercase letter required.');
    if (!/\d/.test(password)) errors.push('At least one number required.');
    if (!/[\W_]/.test(password)) errors.push('At least one special character required.');

    // Create a dynamic error message
    return errors.length > 0 ? errors.join(' ') : null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    const validationError = validatePassword(password);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);

    const apiUrl = accountType === 'Administrator' 
      ? 'http://localhost:3000/auth/change-passwordA'
      : 'http://localhost:3000/auth/change-passwordEs';

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword: password }),
      });

      if (!response.ok) {
        const { message } = await response.json();
        setError(message);
        return;
      }

      const data = await response.json();
      setSuccessMessage(data.message);
      alert(data.message);
      router.push('/');
    } catch (error) {
      setError('Error resetting password. Either wrong user type or token error.');
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side */}
      <div className="w-1/2 bg-olympiadGreen flex items-center justify-center">
        <img
          src="/images/Epoch_Scoring_System.png"
          alt="Epoc Scoring System Logo"
          className="mx-auto mb-6"
          style={{ width: '600px', height: 'auto' }}
        />
      </div>

      {/* Right Side */}
      <div className="w-1/2 bg-white flex items-center justify-center">
        <div className="w-3/4 max-w-md">
          <h2 className="text-2xl font-semibold mb-2 text-gray-700">Create New Password</h2>
          <p className="text-gray-600 mb-6 text-sm">Enter a new password and select your user type.</p>

          {/* Account Type Toggle */}
          <div className="flex justify-between mb-6">
            <div className="w-full bg-white border-2 border-black rounded-full relative p-1">
              <div className={`absolute top-0 left-0 w-1/2 h-full bg-green-700 rounded-full transition-transform duration-300 ease-in-out ${accountType === "Event Supervisor" ? "translate-x-full" : ""}`}></div>
              <div className="relative z-10 flex justify-between">
                <button className={`w-1/2 text-center py-1 font-bold ${accountType === "Administrator" ? "text-white" : "text-black"}`} onClick={() => setAccountType("Administrator")}>Administrator</button>
                <button className={`w-1/2 text-center py-1 font-bold ${accountType === "Event Supervisor" ? "text-white" : "text-black"}`} onClick={() => setAccountType("Event Supervisor")}>Event Supervisor</button>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 mb-4">{error}</p>}
          {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}

          {/* Password Input */}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input type="password" id="password" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-olympiadGreen focus:border-olympiadGreen sm:text-sm" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>

            <div className="mb-6">
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input type="password" id="confirm-password" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-olympiadGreen focus:border-olympiadGreen sm:text-sm" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            </div>

            {/* Reset Password Button */}
            <button type="submit" className="w-full py-2 px-4 bg-olympiadGreen text-white rounded-lg shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-olympiadGreen mb-4">Reset Password</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
