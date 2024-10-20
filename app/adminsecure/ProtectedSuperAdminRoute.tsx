"use client"; // Ensure this component is treated as a client component

import { useAuth } from './AuthProvider';
import { useRouter } from 'next/navigation'; // Use next/navigation for Next.js 13 and later
import { useEffect } from 'react';

const ProtectedSuperAdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {token} = useAuth();
  const router = useRouter();

  useEffect(() => {
    const handleRedirect = () => {
      console.log('Token: ', token); // Debugging log
      if (!token) {
        router.push('/superadminlogin'); // Redirect to login if token is not present
      }
    };

    handleRedirect(); // Call the redirect function

    // Optionally, you can add a dependency array to re-check on token changes
  }, [token, router]);

  // Return children only if token exists
  if (!token) {
    return null; // You can also return a loading state or a placeholder if desired
  }

  return <>{children}</>; // Render children only if token exists
};

export default ProtectedSuperAdminRoute;