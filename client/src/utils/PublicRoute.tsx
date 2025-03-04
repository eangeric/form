import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";

export const PublicRoute = () => {
  const [auth, setAuth] = useState<boolean | null>(null);
  useEffect(() => {
    const getAuth = async () => {
      const response = await fetch(`${import.meta.env.VITE_BACKEND}/api/auth`, {
        credentials: "include",
      });
      const data = await response.json();
      setAuth(data.isAuthenticated);
    };

    getAuth();
  }, []);
  if (auth === null) return <h1>Loading...</h1>; // Show loading screen while fetching
  return auth ? <Navigate to="/" replace={true} /> : <Outlet />;
};
