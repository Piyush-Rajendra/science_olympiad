"use client";

import { useAuth } from './AuthProvider';
import { useRouter } from 'next/navigation'; 
import { useEffect } from 'react';

const ProtectedSuperAdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth(); // Get the auth status
  const router = useRouter();

  useEffect(() => {
    console.log("Auth status:", isAuthenticated); // Debugging log
    
    if (!isAuthenticated) {
      router.push('/superadminlogin'); // Redirect if not authenticated
    } else {
      router.push('/superadmin');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return <div>Loading...</div>; // Show loading state while checking auth
  }
  
  return <>{children}</>; // Render children if authenticated
};

export default ProtectedSuperAdminRoute;
