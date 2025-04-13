// src/routes/PrivateRoute.tsx
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import LoginPage from "../pages/login/AuthDialog";
import AuthDialog from "../pages/login/AuthDialog";

const PrivateRoute: React.FC = () => {
  const { currentUser, loading } = useAuthContext();
  const location = useLocation();

  if (loading) {
    return <div>Loading&hellip;</div>;
  }

  return currentUser ? (
    <Outlet />
  ) : (
    // Pass the originally requested path to the login component
    <AuthDialog redirectPath={location.pathname} />
  );
};

export default PrivateRoute;

// import { Navigate, Outlet, useLocation } from "react-router-dom";
// import { useAuthContext } from "../hooks/useAuthContext";

// const PrivateRoute: React.FC = () => {
//   const { currentUser, loading } = useAuthContext();
//   const location = useLocation();

//   if (loading) {
//     // Show a loading indicator while authentication state is being resolved
//     return <div>Loading&hellip;</div>;
//   }

//   if (!currentUser) {
//     // Redirect to login and preserve the current location for redirection after login
//     return <Navigate to="/login" state={{ from: location }} />;
//   }

//   return <Outlet />;
// };

// export default PrivateRoute;
